<template>
<teleport to="head">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" 
        integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
        crossorigin=""
    />
</teleport>
<div id="leaf-map" style="height: 100%; background-color: #333;" v-map-action />
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, ref, watch } from "vue"
import { sessionStore } from "../stores/hud-store"
import * as L from "leaflet"
import "leaflet/dist/leaflet.css"
import * as LeafletRouting from "../services/leaflet-routing-machine"
import * as mapUtils from "../utils/map-utils"
import type { Waypoints, UserTracking, DistanceProvider } from "../interfaces/map-interfaces"

const map = ref<any>()
const generatedRoute = ref<any>(null)
const waypointDetails = ref<Waypoints>({
    coordinates: [],
    markers: [],
    polyline: null
})
const userTracking = ref<UserTracking>({
    currentLocation: [],
    coordinates: [],
    polyline: null
})
const totalDistances = ref<DistanceProvider>({
    planned: {
        markerDistances: [],
        getSum: function() {
            return this.markerDistances
                .reduce((sum: number, current: number) => sum + current)
        }
    },
    traveled: {
        markersPassed: [],
        sum: 0
    }
})

function createMap(container: any) {
    map.value = L.map(container).setView([50.08804, 14.42076], 5)
    L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
            attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,&copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
            subdomains: 'abcd',
            maxZoom: 20,
        }
    ).addTo(map.value)

    //  On click, put marker down
    function placeMarker(e: any) {
        const marker = L.marker()
        const coordinates = e.latlng
        console.log("Coordinates", coordinates)

        waypointDetails.value.coordinates.push(coordinates) // Used to get the coordinates easily
        waypointDetails.value.markers.push(marker) // Used to get easy access to the markers

        drawLine(waypointDetails.value.coordinates, "plan")
        let markerDistances = totalDistances.value.planned.markerDistances
        marker.setLatLng(coordinates, { draggable: true }).addTo(map.value)

        if (markerDistances.length < 1) {
            marker.bindPopup(`Starting point`)
        } else {
            const distance = markerDistances[markerDistances.length - 1]
            if (distance > 1000) {
                marker.bindPopup(`Distance from the previous marker is 
                ${ (distance / 1000).toFixed(2) } kilometers`)
            }
            else {
                marker.bindPopup(`Distance from the previous marker is 
                ${ (distance).toFixed(2) } meters`)
            }
        }

        map.value.addLayer(marker)
        sessionStore.sessionMarkers = waypointDetails.value
    }
    map.value.on("click", (event: any) => {
        if (sessionStore.placeMarkersStatus) placeMarker(event)
    })

    function createLoop(coordinates: Array<Array<number>>) {
        // Makes the route "loopable", bringing the user back to the starting point.
        if (coordinates.length > 2) {
            waypointDetails.value.polyline = L.polyline([...coordinates, coordinates[0]]).addTo(map.value)
            // Pushing the first point again makes sure the routing plugin 
            // displays the route correctly as a loop.
            waypointDetails.value.coordinates.push(coordinates[0])
            calculateNewLineLength(waypointDetails.value.coordinates)
        }

    }
    sessionStore.createLoopFunction = () => createLoop(waypointDetails.value.coordinates)

    // Locate user
    let trackingInterval: ReturnType<typeof setInterval | any> = null

    watch(() => sessionStore.sessionStartStatus, (sessionStarted) => {
        // Check if user has activated tracking through clicking on an element.
        if (sessionStarted) {
            if (!navigator.permissions) {
                console.warn("The browser doesn't support geolocating the user.")
                return
            }

            console.log("Starting geotracking")
            map.value.locate({ setView: true, maxZoom: 16, enableHighAccuracy: true })
            map.value.on("locationfound", (e: any) => {
                userTracking.value.currentLocation = L.marker()
                // Locate and show user's location immediately
                trackUser(e)

                trackingInterval = setInterval(() => {
                    // Now update the location every 2 seconds
                    trackUser(e)
                }, 2000)
            })

            map.value.on("locationerror", (e: any) => {
                console.warn(e.message)
                clearTimeout(trackingInterval)
                sessionStore.sessionStartStatus = false
            })
        }

        else {
            clearTrackingHistory(map)
            clearMapMarkersAndPolylines(map)
            clearTimeout(trackingInterval)
            trackingInterval = null
            console.log("Cleaning and stopping geotracking")
        }
    })
}

const vMapAction = {
    mounted: (container: HTMLDivElement) => {
        console.log("Creating Leaflet map")
        createMap(container)
    },
    unmounted() {
        console.log("Removing Leaflet map")
        map.value.remove()
    }
}

function resizeMap() {
    if (map.value) map.value.invalidateSize()
}

// Draw a line from marker to marker
function drawLine(coordinates: Array<Array<number>>, lineType: string = "plan" || "track") {
    if (coordinates.length < 2) return

    // Reset polyline, so the previous values won't become a problem
    if (lineType === "plan") {
        waypointDetails.value.polyline = L.polyline(coordinates).addTo(map.value)
        map.value.addLayer(waypointDetails.value.polyline)
        calculateNewLineLength(coordinates)
    }
    else if (lineType === "track") {
        // Possible fix to this is to get rid of if statement and to create polyline every time
        // if (trackingPolyline === null) {
        //     trackingPolyline = L.polyline(coordinates).addTo(map.value)
        //     map.value.addLayer(trackingPolyline)
        // }
        // else {
        //     // Creates "Uncaught TypeError: latlng is null" error
        //     trackingPolyline.addLatLng(coordinates)
        // }

        // This will be the fix to the issue pointed above, for now.
        userTracking.value.polyline = L.polyline(coordinates).addTo(map.value)
        map.value.addLayer(userTracking.value.polyline)
        mapUtils.calculateNewTraveledDistance(map.value, coordinates, totalDistances.value.traveled.sum)
    }
}

function trackUser(e: any) {
    // Sometimes the hook is unable to provide coordinates.
    if (e === null || e.latlng === undefined) {
        console.log("No coordinates found. Skipping this iteration.")
        return
    }

    const radius = e.accuracy

    // Typescript error which will be fixed later.
    userTracking.value.currentLocation.setLatLng(e.latlng).addTo(map.value)
        .bindPopup(`Next marker is within ${ radius } meters`)

    userTracking.value.coordinates.push(userTracking.value.currentLocation.getLatLng())
    drawLine(userTracking.value.coordinates, "track")

    const newDistance = mapUtils.compareLocationWithNextMarker(waypointDetails.value, totalDistances.value, userTracking.value)
    if (newDistance) totalDistances.value.traveled = newDistance
}

function calculateNewLineLength(coordinates: Array<Array<number>>) {
    const distance = map.value.distance(
        coordinates[totalDistances.value.planned.markerDistances.length],
        coordinates[coordinates.length - 1]
    )

    totalDistances.value.planned.markerDistances.push(distance)
    // Update the store values so the HUD can show the planned distance
    sessionStore.plannedLength = totalDistances.value.planned.getSum()
}

function clearTrackingHistory(map: any) {
    map.value.removeLayer(userTracking.value.currentLocation)
    map.value.removeLayer(userTracking.value.coordinates)
    userTracking.value.currentLocation = []
    userTracking.value.coordinates = []
}

function clearMapMarkersAndPolylines(map: any) {
    map.value.eachLayer((layer: any) => {
        if (layer instanceof L.Marker || layer instanceof L.Polyline) {
            map.value.removeLayer(layer)
        }
    })

    waypointDetails.value = {
        coordinates: [],
        markers: [],
        polyline: null
    }

    totalDistances.value.planned.markerDistances = []
    sessionStore.plannedLength = 0
    sessionStore.routeLength = 0
}

function showPlanningMarkers() {

}

function hidePlanningMarkers() {

}

function createLeafletRouting() {
    // At this time I'm unable to calculate the distance of the route which is provided by the routing plugin
    const route = LeafletRouting.createRoute(L, map.value, generatedRoute.value, waypointDetails.value.coordinates)
    // console.log(route.getRouter())
    // routeLength.set(calculateDistanceOfRoute(route))
}

function checkLayers() {
    let markercount = 0
    let polylineCount = 0
    map.value.eachLayer((layer: any) => {
        if (layer instanceof L.Marker) {
            markercount++
        } else if (layer instanceof L.Polyline) {
            polylineCount++
        }
    })

    console.log("Markers:", markercount)
    console.log("Polylines:", polylineCount)
}

// Pass functions that need map parameters to hud-store.
// When necessary the function is passed else where in this file.
sessionStore.removeMarkersFunction = () => clearMapMarkersAndPolylines(map)
sessionStore.createRouteFunction = () => createLeafletRouting()

onMounted(() => {
    window.addEventListener("leaflet-map-resize", resizeMap)
})
onBeforeMount(() => {
    window.removeEventListener("leaflet-map-resize", resizeMap)
})
</script>