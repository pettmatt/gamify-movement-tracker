<template>
<ul>
    {{ props.history ? "Statistics" : "No statistics to show" }}
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
