<template>
<div id="settings-box">
    <h2>Settings</h2>

    <div class="flex">
        <div>
            <h3>Menus</h3>
            <ul>
                Display
                <li>
                    Fade top display bar on idle <input type="checkbox" :checked="appSettings.menus.display.fadeTopOnIdle" :change="onInputChange" name="fadeTopOnIdle" />
                </li>
                <li>
                    Fade bottom menu on idle <input type="checkbox" :checked="appSettings.menus.display.fadeBottomOnIdle" :change="onInputChange" name="fadeBottomOnIdle" />
                </li>
            </ul>
        </div>
        <div>
            <ul>
                Functionality
                <li>
                    Enable idle functionality <input type="checkbox" :checked="appSettings.menus.functionality.enableIdle" :change="onInputChange" name="enableIdle" />
                </li>
                <li v-show="appSettings.menus.functionality.enableIdle">
                    App goes idle after <input type="number" :value="appSettings.menus.functionality.idleTimer" :change="onInputChange" name="idleTimer" /> seconds
                </li>
            </ul>
        </div>

        <div>
            <h3>Map</h3>
            <ul>
                General
                <li>Support offline mode <input type="checkbox" :checked="appSettings.appFunctionality.general.offlineMode" :change="onInputChange" name="offlineMode" /></li>
            </ul>
            <ul>
                Services
                <li>
                    Allow application to use third-party services <input type="checkbox" :checked="appSettings.appFunctionality.services.allowThirdPartyServices" :change="onInputChange" name="allowThirdPartyServices" />
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
console.log("Application settings:", appSettings)

watch(() => settingsStore.settings, (settingsObject) => {
    appSettings.value = settingsObject
    console.log("Application settings has been changed:", appSettings)
})

function onInputChange(event: any) {
    let inputDetails = {
        value: null,
        name: null
    }

    if (event.target.type === "checkbox")
        inputDetails.value = event.target.checked

    else if (event.target.type === "number")
        inputDetails.value = event.target.value

    else console.warn("Settings, onInputChange, input type", event.target.type)

    inputDetails.name = event.target.name
    if (inputDetails.name && inputDetails.value)
        addItemToLocalStorage(inputDetails.name, inputDetails.value)
    else console.warn("Settings, onInputChange, inputDetails include fasely value", inputDetails)
}
</script>

<style scoped>
#settings-box {
    border-radius: 0.5em;
    display: flex;
    flex-direction: column;
    margin: auto;
    padding: 0.5em 1em;
    max-width: 700px;
    max-height: 100%;
    overflow-y: scroll;
    color: #000;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.8), rgba(144, 144, 144, 0.4));
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
#settings-box {
    pointer-events: all;
}

.flex {
    display: flex;
    flex-direction: column;
}

.flex > div {
    min-width: 15rem;
}
</style>