<template>
<div id="progress-bar" class="flex-horizontal">
    <div class="left-side" :style="`width:${ progressWidthLeft }%;${ handleRightBorderRadius }`">{{ props.progress }}</div>
    <div class="right-side" :style="`${ progressWidthRight }${ handleLeftBorderRadius }`">{{ props.max }}</div>
</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
    progress: {
        type: Number,
        required: true
    },
    max: {
        type: Number,
        required: true
    },
    allowPassingMax: {
        type: Boolean,
        default: false
    }
})

const progressWidthLeft = computed(() => {
    return Math.min((props.progress / props.max) * 100)
})
const progressWidthRight = computed(() => {
    if (props.progress / props.max * 100 < 100)
        return `width:${ Math.min(100 - (props.progress / props.max) * 100) }%;`
    else
        return `display: none;`
})

const handleLeftBorderRadius = computed(() => {
    if (progressWidthLeft.value < 1)
        return `border-top-left-radius:0.2em;border-bottom-left-radius:0.2em;`
    else
        return `border-top-left-radius:0em;border-bottom-left-radius:0em;`
})

const handleRightBorderRadius = computed(() => {
    if (progressWidthLeft.value >= 100)
        return `border-top-right-radius:0.2em;border-bottom-right-radius:0.2em;`
    else
        return `border-top-right-radius:0em;border-bottom-right-radius:0em;`
})
</script>

<style scoped>
#progress-bar {
    gap: 0;
}
.left-side,
.right-side {
    text-align: center;
    font-weight: 600;
}
.left-side {
    border-top-left-radius: 0.2em;
    border-bottom-left-radius: 0.2em;
    background-color: aliceblue;
    color: var(--main-background-color-light);
}
.right-side {
    overflow-x: hidden;
    min-width: 0;
    border-top-right-radius: 0.2em;
    border-bottom-right-radius: 0.2em;
    background-color: var(--main-background-color);
}
</style>