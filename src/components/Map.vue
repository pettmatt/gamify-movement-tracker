<template>
    map
</template>

<script lang="ts" setup>
import * as L from "leaflet"
import "leaflet/dist/leaflet.css"
// import { createLoopFunction, createRouteFunction, sessionMarkers, placeMarkersStatus, plannedLength, removeLastMarker, removeMarkersFunction, routeLength, sessionStartStatus, traveledDistance } from "../stores/hud-store"
import * as LeafletRouting from "../services/leaflet-routing-machine"
import * as mapUtils from "../utils/mapUtils"
import type { Waypoints, UserTracking, DistanceProvider } from "../interfaces/mapInterfaces"

</script>