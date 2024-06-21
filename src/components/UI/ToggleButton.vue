<template>
<button :id="`button-${label.toLowerCase()}`" :class="{ highlight: value }" @click="handleClick">
    <component :is="currentIcon" class="icon" />
    <small>{{ label }}</small>
</button>
</template>

<script lang="ts" setup>
import { reactive } from "vue"

interface ToggleIcon {
    default: Function,
    checked: Function
}

const props = defineProps({
    label: {
        type: String,
        default: "Label"
    },
    icons: {
        type: ToggleIcon,
        default: { default: null, checked: null }
    },
    value: {
        type: Boolean,
        default: false
    },
    store: {
        type: Object,
        default: reactive(false)
    },
    storeUpdateFunction: {
        type: Function,
        default: (boolean) => !boolean
    }
})

const currentIcon = computed(() => (props.value ? props.icons.checked : props.icons.default))

function handleClick() {
    props.store.update(props.storeUpdateFunction)
}
</script>

<style scoped>
.highlight {
    border: solid 2px;
    border-color: #646cff;
}

button {
    pointer-events: all;
}
</style>
