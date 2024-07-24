<template>
<ul v-show="props.history && props.history.length > 3">
</ul>
</template>

<script lang="ts" setup>
const props = defineProps({
    history: Array<History>
})
</script>

<style scoped>
ul {
    padding-left: 0;
}
</style>
