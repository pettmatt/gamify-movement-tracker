<script setup lang="ts">
import "@/assets/main.css"
import TheHud from "./components/TheHud.vue"
import LeafletMap from "./components/LeafletMap.vue"
import { hudStore, settingsStore } from "./stores/hud-store"
import { watch } from "vue"
import { addItemToLocalStorage, convertStringValue, getItemFromLocalStorage, ifNullUseDefaultValue, synchronizeLocalStorage } from "./services/local-storage-service"

// Handles updating the local storage, so the local storage logic can be centralized in one spot. Individual components should only make changes to the application's store values.
watch(() => hudStore.historyList, (updatedList) => {
	addItemToLocalStorage("history", JSON.stringify(updatedList))
})
watch(() => settingsStore.settings, (updatedSettings) => {
	synchronizeLocalStorage(updatedSettings)
}, { deep: true })
</script>

<template>
<main>
	<LeafletMap></LeafletMap>
	<TheHud></TheHud>
</main>
</template>

<style scoped>

</style>
