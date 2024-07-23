<template>
<ul class="flex-vertical">
    <li v-for="(item, index) in props.list" :key="index">
        <div class="history-list-item flex-horizontal">
            <div>{{ index + 1 }}.</div>
            <div>{{ formattedDate(item.date) }}</div>
            <div>{{ item.category }}</div>
            <div>{{ item.session.distance }}</div>
            <div>{{ passedTime(item.session.endingTime, item.session.startingTime) }}</div>
        </div>
    </li>
</ul>
</template>

<script lang="ts" setup>
import { type History } from "@/services/local-storage-service"
import { formattedDate, passedTime } from "@/services/time-service"

const props = defineProps({
    list: Array<History>
})
</script>

<style scoped>
ul {
    padding-left: 0;
}
ul li {
    list-style-type: none;
}
</style>