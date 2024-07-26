<template>
<div id="progress-bar" class="flex-horizontal">
    <div class="left-side" :class="checkIfSingle(progressWidthLeft)" :style="`width:${ progressWidthLeft }%;${ handleRightBorderRadius }`">
        {{ (props.progressFormatted) ? props.progressFormatted : props.progress }}
    </div>
    <div class="right-side" :class="checkIfSingle(progressWidthRight)" :style="`${ progressWidthRight }${ handleLeftBorderRadius }`">
        {{ (props.maxFormatted) ? props.maxFormatted : props.max }}
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

function checkIfSingle(value: number | string) {
    if (typeof value == "string")
        return ""
    else if (value >= 100)
        return "single"
    return ""
}

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
    white-space: nowrap;
    font-weight: 600;
    word-break: keep-all;
}
.left-side {
    text-align: left;
    padding-left: 0.5em;
    border-top-left-radius: 0.2em;
    border-bottom-left-radius: 0.2em;
    background-color: aliceblue;
    color: var(--main-background-color-light);
}
.right-side {
    text-align: right;
    padding-right: 0.5em;
    border-top-right-radius: 0.2em;
    border-bottom-right-radius: 0.2em;
    background-color: var(--main-background-color);
}
.single {
    text-align: center;
    padding: 0;
}
</style>