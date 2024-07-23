<template>
<div class="history-list-item flex-horizontal">
    <h3>{{ new Date(props.item?.date) }}</h3>
    <div>{{ props.item?.category }}</div>
    <div>{{ props.item?.session.distance }} km</div>
    <div>{{ Number(props.item?.session.endingTime) - Number(props.item?.session.startingTime) }} min</div>
</div>
</template>

<script lang="ts" setup>
import { type History } from "@/services/local-storage-service"

const props = defineProps({
    item: History
})
</script>