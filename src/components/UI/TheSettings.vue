<template>
<div id="settings-box">
    <h2>Settings</h2>
    <div class="flex">
        <div>
            <h3>Menus</h3>
            <ul>
                Functionality
                <li>
                    Enable idle functionality <input type="checkbox" v-model="appSettings.menus.functionality.enableIdle" name="enableIdle" />
                </li>
                <li>
                    App goes idle after <input type="number" v-model="appSettings.menus.functionality.idleTimer" :disabled="!appSettings.menus.functionality.enableIdle" name="idleTimer" min="0" max="999" /> seconds
                </li>
                <li>
                    Hide top display bar on idle <input type="checkbox" v-model="appSettings.menus.display.fadeTopOnIdle" :disabled="!appSettings.menus.functionality.enableIdle" name="fadeTopOnIdle" />
                </li>
                <li>
                    Hide bottom menu on idle <input type="checkbox" v-model="appSettings.menus.display.fadeBottomOnIdle" :disabled="!appSettings.menus.functionality.enableIdle" name="fadeBottomOnIdle" />
                </li>
            </ul>
        </div>

        <div>
            <h3>Map</h3>
            <ul>
                General
                <li>Support offline mode <input type="checkbox" v-model="appSettings.appFunctionality.general.offlineMode" name="offlineMode" /></li>
            </ul>
            <ul>
                Services
                <li>
                    Allow application to use third-party services <input type="checkbox" v-model="appSettings.appFunctionality.services.allowThirdPartyServices" name="allowThirdPartyServices" />
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"
import { addItemToLocalStorage } from "@/services/local-storage-service"
import { settingsStore } from "@/stores/hud-store"

const appSettings = ref(settingsStore.settings)
console.log("Application settings:", appSettings.value)

watch(() => appSettings, () => {
    settingsStore.settings = appSettings.value
    /* Other components are going to use the store as the source for the settings, so let's use it as well. This can minimize possible issues in the future or at least makes debugging easier. */
    synchronizeLocalStorage(settingsStore.settings)
    console.log("Application settings has been changed:", appSettings)
}, { deep: true })

function synchronizeLocalStorage(settings: any) {
    // console.log("=============================")
    // console.log("Settings, synchronizeLocalStorage, settings:", settings)
    for (const property in settings) {
        const value = settings[property]
        if (typeof value === "object") {
            // console.log("Settings, setting property is object", value)
            synchronizeLocalStorage(value)
        }

        else {
            console.log(`Settings, push to local storage: "${ property }: ${ value }"`)
            addItemToLocalStorage(property, value)
        }
    }
}
</script>

<style scoped>
</style>