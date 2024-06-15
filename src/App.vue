<script setup lang="ts">
import HudUi from "./components/Hud-ui.vue"
import LeafletMap from "./components/Leaflet-Map.vue"
</script>

<template>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	</head>
	<main>
		<LeafletMap></LeafletMap>
		<HudUi></HudUi>
	</main>
</template>

<style scoped>

</style>
