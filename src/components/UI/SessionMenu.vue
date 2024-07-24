<template>
<h2>Current session</h2>

<ProgressBar v-if="distances.goal" :progress="distances.current || 0" :max="distances.goal || 0" />
<ProgressBar v-if="distances.goal" :progress="timer" :max="time.goalEndingTime" />

<button @click="endSession">End the session</button>
</template>

<script setup lang="ts">
import ProgressBar from "./generic/ProgressBar.vue"
import { addItemToLocalStorage, convertStringValue, getItemFromLocalStorage, type History } from "@/services/local-storage-service"
import { currentTime } from "@/services/time-service"
import { hudStore, sessionDetails } from "@/stores/hud-store"
import { onMounted, onUnmounted, ref } from "vue"

interface DistanceObject {
    current: null | undefined | number,
    goal: null | undefined | number
}

interface TimeObject {
    startingTime: number,
    goalEndingTime: number
}

const distances = ref<DistanceObject>({
    current: sessionDetails.session.traveledDistance,
    goal: sessionDetails.goal.distance
})

const time = ref<TimeObject>({
    startingTime: sessionDetails.session.startingTime || 0,
    goalEndingTime: sessionDetails.goal.time || 0
})

const timer = ref<number>(0)
let intervalId: number | null = null

function increaseTimer() {
    const updatedTimer = currentTime() - time.value.startingTime
    timer.value = updatedTimer
}

function getStatistics(): History {
    return {
        date: currentTime(),
        ...sessionDetails
    }
}

function endSession() {
    hudStore.sessionStartStatus = false
    sessionDetails.session.endingTime = currentTime()
    const sessionStatistics = getStatistics()
    const historyString = getItemFromLocalStorage("history") 
    const history: History[] | [] = convertStringValue(historyString || "[]")
    history.unshift(sessionStatistics)
    addItemToLocalStorage("history", JSON.stringify(history))
}

onMounted(() => {
    intervalId = setInterval(increaseTimer, 1000)
})
onUnmounted(() => {
    if (intervalId)
        clearInterval(intervalId)
})
</script>

<style>
</style>