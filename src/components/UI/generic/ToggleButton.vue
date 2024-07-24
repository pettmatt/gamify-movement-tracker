<template>
<div class="toggle-button-container">
    <div class="hover-element" v-show="isHovering">
        <small>{{ label }}</small>
    </div>
    <button :id="`button-${label.toLowerCase()}`" :class="{ highlight: value }" @click="props.storeUpdateFunction" @mouseenter="handleMouseOver(true)" @mouseleave="handleMouseOver(false)">
        <component :is="currentIcon" class="icon" />
    </button>
</div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue"

const props = defineProps({
    label: {
        type: String,
        default: "Label"
    },
    showLabel: {
        type: Boolean,
        default: true
    },
    icons: {
        type: Object,
        default: () => ({ default: null, checked: null })
    },
    value: {
        type: Boolean,
        default: false
    },
    storeUpdateFunction: {
        type: Function,
        default: (boolean: boolean) => !boolean
    }
})

const isHovering = ref<boolean>(false)
const currentIcon = computed(() => (props.value ? props.icons.checked : props.icons.default))

function handleMouseOver(value: boolean) {
    if (!props.showLabel)
        isHovering.value = false
    else if (!props.value)
        isHovering.value = value
}

watch(() => props.value, (value) => {
    handleMouseOver(value)
})
</script>

<style scoped>
.toggle-button-container {
    width: 2.6em;
}

.highlight {
    border: solid var(--main-border-width);
    border-color: var(--primary-color);
}

button {
    pointer-events: all;
    border-radius: 1.5rem;
}
button svg {
    position: relative;
    top: 0.1em;
}

.hover-element {
    position: relative;
    bottom: 1.7em;
    left: -0.5em;
    height: 0;
    overflow: visible;
}
.hover-element small:first-child {
    background-color: var(--main-background-color);
    max-width: 6em;
    padding: 0.1em 0.6em;
    padding-bottom: 0.2em;
    border-radius: calc(var( --main-border-radius) - 0.2em);
}
</style>
