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

<style>
#notification-box {
    border-radius: 0.5em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0.5em 1em;
    width: 70vw;
    max-width: 40em;
    max-height: 80vh;
    color: #ddd;
    background: var(--main-background-color-light);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
}
#notification-box {
    pointer-events: all;
}
#notification-box > div {
    margin-top: 0em;
    margin-bottom: 0.3em;
}
#notification-box p {
    margin: 0;
    margin-bottom: 0.3em;
}
.default {
    margin: auto;
}
.top {
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
    margin: 0 auto;
    position: fixed;
    top: 0;
    width: auto !important;
}
.bottom {
    margin: auto;
    margin-bottom: 0.5em;
}

@media only screen and (max-width: 435px) {
    #notification-box {
        margin-right: 1em;
        margin-left: 1em;
        width: 100%;
    }
}
</style>