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
import { ref } from "vue"
import { hudStore } from "@/stores/hud-store"
import HistorySummary from "./history/HistorySummary.vue"
import HistoryList from "./history/HistoryList.vue"

const historyStatistics = ref<History[] | null | undefined>(hudStore.historyList)

function viewSessionPath(sessionId: number) {}
</script>

<style scoped>
.history-statistics li {
    background-color: var(--main-background-color);
    padding: 0.25em;
}
</style>