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

        <!-- <div>
            <h3>Map</h3>
            <ul>
                Services
                <li>
                    Allow application to use third-party services <input type="checkbox" v-model="appSettings.appFunctionality.services.allowThirdPartyServices" name="allowThirdPartyServices" />
                </li>
            </ul>
        </div> -->
    </div>
</div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"
import { settingsStore } from "@/stores/hud-store"

const appSettings = ref(settingsStore.settings)
console.log("Application settings:", appSettings.value)

watch(() => appSettings, () => {
    settingsStore.settings = appSettings.value
    console.log("Application settings has been changed:", settingsStore.settings)
}, { deep: true })
</script>

<style scoped>
#settings-box ul {
    font-weight: bold;
}
#settings-box li {
    font-weight: normal;
    margin-left: 1.5em;
}
</style>