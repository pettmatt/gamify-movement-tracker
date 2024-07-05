<template>
<div id="notification-box" :class="props.position">
    <slot></slot>
</div>
</template>

<script setup lang="ts">
const props = defineProps({
    position: String
})
</script>

<style scoped>
#notification-box {
    border-radius: 0.5em;
    display: flex;
    flex-direction: column;
    padding: 0.5em 1em;
    max-width: 50em;
    max-height: 100%;
    overflow-y: scroll;
    color: #000;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.8), rgba(144, 144, 144, 0.4));
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
#notification-box {
    pointer-events: all;
}
.default {
    margin: auto;
}
.top {
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
    margin: 0 auto auto auto;
}
</style>