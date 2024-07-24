<template>
<div id="interface-hud">
    <div class="interface-container">
        <div class="panel-top">
            <Transition name="fade-top">
                <div class="panel-container" v-show="visibilityTop">
                    <div id="travel-distance-container">
                        <b>{{ sessionDetails.session.traveledDistance }} {{ unit }}</b>
                    </div>
                </div>
            </Transition>
        </div>
        <div class="panel-middle">
            <Transition name="fade-middle">
                <NotificationBox v-show="showNotification" :position="definePosition">
                    <TheSettings v-if="settingsStatus" />
                    <SessionHistory v-else-if="historyStatus" />
                    <SessionMenu v-else-if="sessionStartStatus" />
                    <PlaceMarkersMenu v-else-if="placeMarkersStatus" />
                    <SettingUpSession v-else-if="settingUpSessionStatus" />
                </NotificationBox>
            </Transition>
        </div>
        <div class="panel-bottom">
            <Transition name="fade-bottom">
                <div class="panel-container" v-show="visibilityBottom">
                    <ToggleButton
                        :label="'History'"
                        :showLabel="showLabel"
                        :icons="{ default: BIconClockHistory, checked: BIconClockFill }"
                        :value="Boolean(hudStore.historyStatus)"
                        :storeUpdateFunction="() => resetHudMainButtons('historyStatus')"
                    />
                    <ToggleButton
                        :label="'Session'"
                        :showLabel="showLabel"
                        :icons="{ default: BIconDiamond, checked: BIconDiamondFill }"
                        :value="Boolean(hudStore.settingUpSessionStatus)"
                        :storeUpdateFunction="() => resetHudMainButtons('settingUpSessionStatus')"
                    />
                    <ToggleButton
                        :label="'Settings'"
                        :showLabel="showLabel"
                        :icons="{ default: BIconGear, checked: BIconGearFill }"
                        :value="Boolean(hudStore.settingsStatus)"
                        :storeUpdateFunction="() => resetHudMainButtons('settingsStatus')"
                    />
                </div>
            </Transition>
        </div>
    </div>
</div>
</template>

<script lang="ts" setup>
import { BIconClockHistory, BIconClockFill, BIconDiamond, BIconDiamondFill, BIconGear, BIconGearFill } from "bootstrap-icons-vue"
import { onMounted, computed, onBeforeUnmount, watch, ref } from "vue"
import { hudStore, sessionDetails, settingsStore } from "../stores/hud-store"
import type { DynamicHudStoreInterface } from "@/stores/hud-store-interface"
import ToggleButton from "./UI/generic/ToggleButton.vue"
import SessionMenu from "./UI/SessionMenu.vue"
import TheSettings from "./UI/TheSettings.vue"
import PlaceMarkersMenu from "./UI/PlaceMarkersMenu.vue"
import SettingUpSession from "./UI/SettingUpSession.vue"
import NotificationBox from "./UI/generic/NotificationBox.vue"
import SessionHistory from "./UI/SessionHistory.vue"

const unit = ref(settingsStore.settings.appFunctionality.general.unit)
const visibilityTop = ref<boolean>(false)
const visibilityBottom = ref<boolean>(true)
const inactivity = ref<number>()
const settingsStatus = ref<boolean>(hudStore.settingsStatus)
const sessionStartStatus = ref<boolean>(hudStore.sessionStartStatus)
const placeMarkersStatus = ref<boolean>(hudStore.placeMarkersStatus)
const settingUpSessionStatus = ref<boolean>(hudStore.settingUpSessionStatus)
const historyStatus = ref<boolean>(hudStore.historyStatus)

const definePosition = computed(() => {
    let position = null
    if (hudStore.placeMarkersStatus && (!hudStore.settingsStatus && !hudStore.historyStatus))
        position = "top"
    else {
        if (hudStore.sessionStartStatus)
            position = "bottom"
        else
            position = "default"
    }

    return position
})

const showLabel = computed(() => {
    let show = true
    if (hudStore.sessionStartStatus && (hudStore.settingUpSessionStatus || hudStore.settingsStatus || hudStore.historyStatus))
        show = false

    return show
})

const showNotification = computed(() => {
    return (hudStore.sessionStartStatus && hudStore.settingUpSessionStatus) || (hudStore.placeMarkersStatus && hudStore.settingUpSessionStatus) || hudStore.settingUpSessionStatus || hudStore.settingsStatus || hudStore.historyStatus
})

function resetHudMainButtons(currentButton: keyof DynamicHudStoreInterface) {
    const mainButtonVariables = ["settingsStatus", "historyStatus", "settingUpSessionStatus"]

    mainButtonVariables.forEach(variableName => {
        if (currentButton === variableName)
            hudStore[currentButton] = !hudStore[currentButton]
        else
            hudStore[variableName] = false
    })
}

function addInactivityTimers() {
    inactivity.value = setTimeout(() => {
        /* Disable UI elements if screen is inactive.
        This should NOT override settings. */
        hideUIElements()
    }, 10000)

    window.addEventListener("click", resetTimer)
    window.addEventListener("keydown", resetTimer)
    window.addEventListener("mousemove", resetTimer)
    window.addEventListener("touchmove", resetTimer)
    window.addEventListener("scroll", resetTimer)
}

function removeInactivityTimers() {
    clearTimeout(inactivity.value)
    window.removeEventListener("click", resetTimer)
    window.removeEventListener("keydown", resetTimer)
    window.removeEventListener("mousemove", resetTimer)
    window.removeEventListener("touchmove", resetTimer)
    window.removeEventListener("scroll", resetTimer)
}

function resetTimer() {
    showUIElements()
    clearTimeout(inactivity.value)
    inactivity.value = setTimeout(hideUIElements, 10000)
}

function hideUIElements() {
    if (!hudStore.placeMarkersStatus && !hudStore.settingsStatus && !hudStore.historyStatus && !hudStore.settingUpSessionStatus && !hudStore.historyStatus)
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

watch(() => settingsStore.settings.appFunctionality.general.unit, (newUnit: string) => {
    console.log("Hud, unit preference changed", newUnit)
    unit.value = newUnit
})

function delayedMenuAction(customFunction: Function, value: boolean) {
    const menuStatuses = [settingsStatus.value, placeMarkersStatus.value, settingUpSessionStatus.value]
    const activeMenus = menuStatuses.filter(boolean => boolean === true)
    if (!value && activeMenus.length < 1)
        setTimeout(customFunction, 400) // The time delay should be updated if the animation length is changed
    else
        customFunction()
}

watch(() => hudStore.settingsStatus, (newValue) => {
    delayedMenuAction(() => settingsStatus.value = newValue, newValue)
})
watch(() => hudStore.sessionStartStatus, (newValue) => {
    delayedMenuAction(() => sessionStartStatus.value = newValue, newValue)
})
watch(() => hudStore.placeMarkersStatus, (newValue) => {
    delayedMenuAction(() => placeMarkersStatus.value = newValue, newValue)
})
watch(() => hudStore.settingUpSessionStatus, (newValue) => {
    delayedMenuAction(() => settingUpSessionStatus.value = newValue, newValue)
})
watch(() => hudStore.historyStatus, (newValue) => {
    delayedMenuAction(() => historyStatus.value = newValue, newValue)
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
    justify-content: center;
    flex-direction: row;
    flex: 1 1 auto;
}
#interface-hud .panel-top,
#interface-hud .panel-bottom {
    height: 3.5em;
    flex: 0 1 auto;
}
#interface-hud .panel-top .panel-container {
    text-align: center;
    color: #000;
}
#interface-hud .panel-bottom .panel-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: var(--main-padding);
    margin-left: var(--main-padding);
    margin-right: var(--main-padding);
    padding-bottom: 0.5em;
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
/* Note: Check "delayedAction" function if animation length is changed from 400ms */
.fade-top-enter-active, .fade-top-leave-active,
.fade-bottom-enter-active, .fade-bottom-leave-active,
.fade-middle-enter-active, .fade-middle-leave-active {
    transition:
        opacity 0.3s ease-in-out,
        transform 0.4s ease-in-out;
}
.fade-top-enter-from,
.fade-top-leave-to {
    opacity: 0;
    transform: translateY(0%);
}
.fade-top-enter-to,
.fade-top-leave-from {
    opacity: 1;
    transform: translateY(10%);
}
.fade-bottom-enter-from,
.fade-bottom-leave-to {
    opacity: 0;
    transform: translateY(50%);
    
}
.fade-bottom-enter-to,
.fade-bottom-leave-from {
    opacity: 1;
    transform: translateY(0%);
}
.fade-middle-enter-from,
.fade-middle-leave-to {
    opacity: 0;
    transform: translateY(10%);
}
.fade-middle-enter-to,
.fade-middle-leave-from {
    opacity: 1;
    transform: translateY(0%);
}
</style>
