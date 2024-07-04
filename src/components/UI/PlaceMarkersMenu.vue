<template>
<p>Place your markers by selecting a location on the map</p>

<p v-if="sessionLength.estimated > 0">Estimated length: {{ (sessionLength.estimated).toFixed(2) }} m</p>

<p v-if="sessionLength.actual > 0">Length of the generated route: {{ (sessionLength.actual).toFixed(2) }} m</p>

<button @click="() => triggerFunction(sessionStore.removeMarkersFunction)" :disabled="checkIfFunctionIsAvailable(sessionStore.removeMarkersFunction)">Remove all markers</button>
<button @click="() => triggerFunction(sessionStore.createLoopFunction)" :disabled=" checkIfFunctionIsAvailable(sessionStore.createLoopFunction)">Create a loop</button>
<button @click="() => triggerFunction(sessionStore.createRouteFunction)" :disabled="checkIfFunctionIsAvailable(sessionStore.createRouteFunction)">Generate a route</button>
<!-- <button @click="() => triggerFunction(removeLastMarker)" :disabled="checkIfFunctionIsAvailable(sessionStore.removeLastMarker)">Undo</button> -->
<button @click="planSessionRoute">Done</button>
</template>

<script lang="ts" setup>
import { sessionStore, sessionDetails } from "@/stores/hud-store"
import { ref, watch } from "vue"

const sessionLength = ref({
    estimated: 0,
    actual: 0
})

function planSessionRoute() {
    sessionDetails.goal = {
        markers: sessionStore.sessionMarkers,
        estimatedDistance: sessionLength.value.estimated,
        lengthSpecified: sessionDetails.goal.lengthSpecified,
        distance: sessionDetails.goal.distance,
        time: sessionDetails.goal.distance
    }

    sessionStore.placeMarkersStatus = !sessionStore.placeMarkersStatus
    console.log("Plan session route", sessionDetails)
}

// Triggers the function passed by the map to hud-store
const triggerFunction = (storeFunction: Function | undefined) => {
    if (typeof storeFunction === "function")
        storeFunction()
}

const checkIfFunctionIsAvailable = (func: Function | undefined) => {
    return typeof func === "function" ? false : true
}

watch(() => sessionStore.plannedLength, (distance: any) => {
    sessionLength.value.estimated = distance
})
watch(() => sessionStore.routeLength, (distance: any) => {
    sessionLength.value.estimated = distance
})
</script>

<style scoped>
p {
    text-align: center;
}
</style>