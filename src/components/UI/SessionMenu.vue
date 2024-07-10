<template>
<h2>Session menu</h2>

<p>Progress: {{ distances.current || 0 }} m</p>
<p v-show="distances.goal">Your goal: </p>

<button @click="endSession">End the session</button>
</template>

<script setup lang="ts">
import { sessionStore, sessionDetails } from "@/stores/hud-store"
import { ref, watch } from "vue"

interface DistanceObject {
    current: null | undefined | number,
    goal: null | undefined | number
}

const distances = ref<DistanceObject>({
    current: sessionStore.traveledDistance,
    goal: sessionDetails.goal.distance
})

function createPrompt() {}

function endSession() {
    sessionStore.sessionStartStatus = false
    // const sessionStatistics = getMapStatistics()
}

// watch(() => sessionStore.traveledDistance, (currentDistance) => {
//     distances.value.current = currentDistance
// })
</script>

<style>
</style>