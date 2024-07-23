<template>
<ul>
    {{ props.historyStatistics ? "Statistics" : "No statistics to show" }}    
</ul>
</template>

<script lang="ts" setup>
const props = defineProps({
    history: Array<History>
})
</script>