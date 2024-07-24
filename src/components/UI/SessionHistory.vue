<template>
<h2>Session history</h2>

<div class="history-summary flex-horizontal">
    <HistorySummary :history="historyStatistics" />
</div>

<div class="previous-sessions">
    <HistoryList :list="historyStatistics" />
</div>
</template>

<script setup lang="ts">
import { convertStringValue, getItemFromLocalStorage, type History } from "@/services/local-storage-service"
import { onMounted, ref } from "vue"
import HistorySummary from "./history/HistorySummary.vue"
import HistoryList from "./history/HistoryList.vue"

const historyStatistics = ref<History[] | null>()

function viewSessionPath(sessionId: number) {}

onMounted(() => {
    const sessionHistory: string | null = getItemFromLocalStorage("history")
    historyStatistics.value = convertStringValue(sessionHistory)
})
</script>

<style scoped>
.history-statistics li {
    background-color: var(--main-background-color);
    padding: 0.25em;
}
</style>