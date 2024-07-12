<template>
<button :id="`button-${label.toLowerCase()}`" :class="{ highlight: value }" @click="props.storeUpdateFunction">
    <component :is="currentIcon" class="icon" />
    <small>{{ label }}</small>
</button>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"

const props = defineProps({
    label: {
        type: String,
        default: "Label"
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

const currentIcon = computed(() => (props.value ? props.icons.checked : props.icons.default))
</script>

<style scoped>
.highlight {
    border: solid var(--main-border-width);
    border-color: var(--primary-color);
}

button {
    pointer-events: all;
}
button svg {
    position: relative;
    top: 0.15em;
    margin-right: 0.35em;
}
</style>
