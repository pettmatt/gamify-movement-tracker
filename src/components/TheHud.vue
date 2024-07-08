<template>
<div id="interface-hud">
    <div class="interface-container">
        <Transition name="fade-top">
            <div class="panel-top" :class="panelTopClasses" v-show="sessionStore.sessionStartStatus || false">
                <div id="travel-distance-container">
                    <b>{{ sessionStore.traveledDistance }} {{ unit.unit }}</b>
                </div>
            </div>
        </Transition>
        <div class="panel-middle">
            <NotificationBox v-show="(sessionStore.sessionStartStatus || sessionStore.placeMarkersStatus || sessionStore.settingUpSessionStatus)" :position="(sessionStore.placeMarkersStatus) ? 'top' : 'default'">
                <SessionMenu v-if="sessionStore.sessionStartStatus" />
                <PlaceMarkersMenu v-else-if="sessionStore.placeMarkersStatus" />
                <SettingUpSession v-else-if="sessionStore.settingUpSessionStatus" />
            </NotificationBox>
            <TheSettings v-if="settingsStore.settingsStatus" />
        </div>
        <div class="panel-bottom">
            <Transition name="fade-bottom">
                <div class="panel-container" v-show="visibilityBottom">
                    <ToggleButton
                        :label="'History'"
                        :icons="{ default: BIconArchive, checked: BIconArchiveFill }"
                        :value="Boolean(sessionStore.historyStatus)"
                        :storeUpdateFunction="() => sessionStore.historyStatus = !sessionStore.historyStatus"
                    />
                    <ToggleButton
                        :label="'Session'"
                        :icons="{ default: BIconGeo, checked: BIconGeoFill }"
                        :value="Boolean(sessionStore.settingUpSessionStatus)"
                        :storeUpdateFunction="() => sessionStore.settingUpSessionStatus = !sessionStore.settingUpSessionStatus"
                    />
                    <ToggleButton
                        :label="'Settings'"
                        :icons="{ default: BIconGear, checked: BIconGearFill }"
                        :value="settingsStore.settingsStatus"
                        :storeUpdateFunction="() => settingsStore.settingsStatus = !settingsStore.settingsStatus"
                    />
                </div>
            </Transition>
        </div>
    </div>
</div>
</template>

<script lang="ts" setup>
import { onMounted, computed, onBeforeUnmount, watch, ref } from "vue"
import { sessionStore, settingsStore } from "../stores/hud-store"
import { BIconArchive, BIconArchiveFill, BIconGeo, BIconGeoFill, BIconGear, BIconGearFill } from "bootstrap-icons-vue"
import ToggleButton from "./UI/ToggleButton.vue"
import SessionMenu from "./UI/SessionMenu.vue"
import TheSettings from "./UI/TheSettings.vue"
import PlaceMarkersMenu from "./UI/PlaceMarkersMenu.vue"
import SettingUpSession from "./UI/SettingUpSession.vue"
import NotificationBox from "./UI/NotificationBox.vue"

const unit = ref(settingsStore.settings.appFunctionality.general.unit)
const visibilityTop = ref(false)
const visibilityBottom = ref(true)
const inActivity = ref()

const panelTopClasses = computed(() => {
    return {
        "fade-in-top": visibilityTop,
        "fade-out-top": !visibilityTop.value
    }
})

const fadeInBottom = computed(() => {
    return {
        "fade-in-bottom": visibilityBottom,
        "fade-out-bottom": !visibilityBottom.value
    }
})

function addInactivityTimers() {
    inActivity.value = setTimeout(() => {
        // Disable UI elements if screen is inactive.
        // This should NOT override settings.
        hideUIElements()
    }, 10000)

    window.addEventListener("click", resetTimer)
    window.addEventListener("keydown", resetTimer)
    window.addEventListener("mousemove", resetTimer)
    window.addEventListener("touchmove", resetTimer)
    window.addEventListener("scroll", resetTimer)
}

function removeInactivityTimers() {
    clearTimeout(inActivity.value)
    window.removeEventListener("click", resetTimer)
    window.removeEventListener("keydown", resetTimer)
    window.removeEventListener("mousemove", resetTimer)
    window.removeEventListener("touchmove", resetTimer)
    window.removeEventListener("scroll", resetTimer)
}

function resetTimer() {
    showUIElements()
    clearTimeout(inActivity.value)
    inActivity.value = setTimeout(hideUIElements, 10000)
}

function hideUIElements() {
    visibilityBottom.value = false
}

function showUIElements() {
    visibilityBottom.value = true
}

onMounted(() => {
    visibilityTop.value = false
    visibilityBottom.value = true
    addInactivityTimers()
})
onBeforeUnmount(() => {
    removeInactivityTimers()
})

watch(() => sessionStore.settingUpSessionStatus, (settingUpBoolean: any) => {
    /* Used to setting up the session and hand 
    over the control of the setup phase */
    let enteredSetupMode = false

    if (settingUpBoolean)
        enteredSetupMode = true
})

watch(() => settingsStore.settings.appFunctionality.general.unit, (unitChanged: any) => {
    console.log("Hud, unit preference changed", unitChanged)
    unit.value = unitChanged
})
</script>

<style scoped>
#interface-hud {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    pointer-events: none;
}
.interface-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

#interface-hud .panel-middle {
    height: 100%;
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;
}
#interface-hud .panel-top,
#interface-hud .panel-bottom .panel-container {
    flex: 0 1 auto;
    height: 3em;
}
#interface-hud .panel-top {
    text-align: center;
    color: #000;
}
#interface-hud .panel-bottom .panel-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 0.5em 0;
    gap: 0.5em;
    text-align: center;
}

#travel-distance-container {
    margin: 0 4vw;
}

#travel-distance-container b {
    margin: 0 auto;
}

/* Animations */
.fade-top-leave-from,
.fade-top-leave-to {
    opacity: 0;
    transform: translateY(0%);
    transition:
        opacity 0.3s ease-in-out,
        transform 0.5s ease-in-out;
}
.fade-top-enter-active,
.fade-top-leave-active {
    opacity: 1;
    transform: translateY(10%);
    transition:
        opacity 0.3s ease-in-out,
        transform 0.5s ease-in-out;
}
.fade-bottom-enter-from,
.fade-bottom-leave-to {
    opacity: 0;
    transform: translateY(50%);
    transition:
        opacity 0.3s ease-in-out,
        transform 0.5s ease-in-out;
}
.fade-bottom-enter-active,
.fade-bottom-leave-active {
    opacity: 1;
    transform: translateY(0%);
    transition:
        opacity 0.3s ease-in-out,
        transform 0.5s ease-in-out;
}
</style>
