<template>
<ul class="flex-vertical">
    <li class="flex-header">
        <div class="flex-horizontal">
            <div>#</div>
            <div>Date</div>
            <div>Category</div>
            <div>Distance</div>
            <div>Time</div>
        </div>
    </li>
    <li class="flex-body" v-show="props.list" v-for="(item, index) in props.list" :key="index">
        <div class="flex-horizontal">
            <div>{{ index + 1 }}.</div>
            <div>{{ formattedDate(item.date) || "-" }}</div>
            <div>{{ item.category || "-" }}</div>
            <div>{{ meterFormatter(item.session.traveledDistance) }}</div>
            <div>{{ secondFormatter(passedTime(item.session.endingTime, item.session.startingTime)) || "-" }}</div>
        </div>
    </li>
</ul>
</template>

<script lang="ts" setup>
import { meterFormatter } from "@/services/distance-service";
import { type History } from "@/services/local-storage-service"
import { formattedDate, passedTime, secondFormatter } from "@/services/time-service"

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

ul .flex-header .flex-horizontal {
    font-weight: bold;
}

ul .flex-horizontal {
    justify-content: center;
}

ul .flex-horizontal > div:nth-child(1) {
    width: 2em;
}
ul .flex-horizontal > div:nth-child(2),
ul .flex-horizontal > div:nth-child(3),
ul .flex-horizontal > div:nth-child(4),
ul .flex-horizontal > div:nth-child(5) {
    width: 22%;
    max-width: 7em;
}
</style>