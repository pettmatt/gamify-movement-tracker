<template>
<button :id="`button-${label.toLowerCase()}`" :class="{ highlight: value }" @click="handleClick">
    <component :is="currentIcon" class="icon" />
    <small>{{ label }}</small>
</button>
</template>

<script lang="ts" setup>
import { reactive, computed } from "vue"

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
    store: {
        type: Object,
        default: reactive({ value: false })
    },
    storeUpdateFunction: {
        type: Function,
        default: (boolean: boolean) => !boolean
    }
})

const currentIcon = computed(() => (props.value ? props.icons.checked : props.icons.default))

function handleClick() {
    props.store.value.update(props.storeUpdateFunction)
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
