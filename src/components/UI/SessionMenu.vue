<template>
<h2>Session menu</h2>

<p>Progress: {{ distances.current || 0 }} m</p>
<p v-show="distances.goal">Your goal: {{ distances.goal }} km</p>

<button @click="endSession">End the session</button>
</template>

<script setup lang="ts">
import { addItemToLocalStorage, getItemFromLocalStorage, ifNullUseDefaultValue, type History } from "@/services/local-storage-service"
import { currentTime } from "@/services/time-service"
import { hudStore, sessionDetails } from "@/stores/hud-store"
import { ref } from "vue"

interface DistanceObject {
    current: null | undefined | number,
    goal: null | undefined | number
}

const distances = ref<DistanceObject>({
    current: sessionDetails.session.traveledDistance,
    goal: sessionDetails.goal.distance
})

function getStatistics(): History {
    return {
        date: currentTime(),
        details: sessionDetails
    }
}

function endSession() {
    hudStore.sessionStartStatus = false
    sessionDetails.session.endingTime = currentTime()
    const sessionStatistics: History = getStatistics()
    const history: History[] | [] = JSON.parse(ifNullUseDefaultValue(getItemFromLocalStorage("history"), "[]"))
    history.unshift(sessionStatistics)

    addItemToLocalStorage("history", JSON.stringify(history))
}

// watch(() => sessionDetails.session.traveledDistance, (currentDistance) => {
//     distances.value.current = currentDistance
// })
</script>

<style>
</style>