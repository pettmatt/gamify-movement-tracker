<template>
<div id="progress-bar" class="flex-horizontal">
    <div class="left-side" :style="`width:${ progressWidthLeft }%;${ handleRightBorderRadius }`">
        {{ props.progressFormatted || props.progress }}
    </div>
    <div class="right-side" :style="`${ progressWidthRight }${ handleLeftBorderRadius }`">
        {{ props.maxFormatted || props.max }}
    </div>
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
    progressFormatted: {
        type: String,
        required: false
    },
    maxFormatted: {
        type: String,
        required: false
    },
    allowPassingMax: {
        type: Boolean,
        default: false
    }
})

const progressWidthLeft = computed(() => {
    if (props.max <= 0)
        return 100
    else 
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
    overflow-x: hidden;
    text-align: center;
    font-weight: 600;
    word-break: keep-all;
}
.left-side {
    border-top-left-radius: 0.2em;
    border-bottom-left-radius: 0.2em;
    background-color: aliceblue;
    color: var(--main-background-color-light);
}
.right-side {
    border-top-right-radius: 0.2em;
    border-bottom-right-radius: 0.2em;
    background-color: var(--main-background-color);
}
</style>