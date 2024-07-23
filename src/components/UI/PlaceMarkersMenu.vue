<template>
<p>Place your markers by selecting a location on the map</p>

<p v-if="sessionLength.estimated > 0">Estimated length: {{ (sessionLength.estimated).toFixed(2) }} m</p>

<p v-if="sessionLength.actual > 0">Length of the generated route: {{ (sessionLength.actual).toFixed(2) }} m</p>

<div class="button-container">
    <button @click="() => triggerFunction(hudStore.removeMarkersFunction)" :disabled="checkIfFunctionIsAvailable(hudStore.removeMarkersFunction)">Remove all markers</button>
    <button @click="() => triggerFunction(hudStore.createLoopFunction)" :disabled=" checkIfFunctionIsAvailable(hudStore.createLoopFunction)">Create a loop</button>
    <button @click="() => triggerFunction(hudStore.createRouteFunction)" :disabled="checkIfFunctionIsAvailable(hudStore.createRouteFunction)">Generate a route</button>
    <!-- <button @click="() => triggerFunction(removeLastMarker)" :disabled="checkIfFunctionIsAvailable(hudStore.removeLastMarker)">Undo</button> -->
    <button @click="planSessionRoute">Done</button>
</div>
</template>

<script lang="ts" setup>
import { hudStore, sessionDetails } from "@/stores/hud-store"
import { ref, watch } from "vue"

const sessionLength = ref({
    estimated: 0,
    actual: 0
})

function planSessionRoute() {
    sessionDetails.goal = {
        markers: sessionDetails.session.sessionMarkers,
        estimatedDistance: sessionLength.value.estimated,
        lengthSpecified: sessionDetails.goal.lengthSpecified,
        distance: sessionDetails.goal.distance,
        time: sessionDetails.goal.distance
    }

    hudStore.placeMarkersStatus = !hudStore.placeMarkersStatus
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

watch(() => hudStore.plannedLength, (distance: any) => {
    sessionLength.value.estimated = distance
})
watch(() => sessionDetails.goal.routeLength, (distance: any) => {
    sessionLength.value.estimated = distance
})
</script>

<style scoped>
p {
    text-align: center;
}
.button-container {
    display: flex;
    gap: 0.4em;
}
.button-container button {
    font-size: 0.8em;
}
</style>