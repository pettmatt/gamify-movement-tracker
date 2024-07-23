<template>
<div id="interface-hud">
    <div class="interface-container">
        <div class="panel-top">
            <Transition name="fade-top">
                <div class="panel-container" v-show="sessionStore.sessionStartStatus || false">
                    <div id="travel-distance-container">
                        <b>{{ sessionStore.traveledDistance }} {{ unit }}</b>
                    </div>
                </div>
            </Transition>
        </div>
        <div class="panel-middle">
            <Transition name="fade-middle">
                <NotificationBox v-show="showNotification" :position="definePosition">
                    <TheSettings v-if="settingsStatus" />
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
                        :icons="{ default: BIconClockHistory, checked: BIconClockFill }"
                        :value="Boolean(sessionStore.historyStatus)"
                        :storeUpdateFunction="() => resetHudMainButtons('historyStatus')"
                    />
                    <ToggleButton
                        :label="'Session'"
                        :icons="{ default: BIconDiamond, checked: BIconDiamondFill }"
                        :value="Boolean(sessionStore.settingUpSessionStatus)"
                        :storeUpdateFunction="() => resetHudMainButtons('settingUpSessionStatus')"
                    />
                    <ToggleButton
                        :label="'Settings'"
                        :icons="{ default: BIconGear, checked: BIconGearFill }"
                        :value="Boolean(sessionStore.settingsStatus)"
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
import { sessionStore, settingsStore } from "../stores/hud-store"
import ToggleButton from "./UI/ToggleButton.vue"
import SessionMenu from "./UI/SessionMenu.vue"
import TheSettings from "./UI/TheSettings.vue"
import PlaceMarkersMenu from "./UI/PlaceMarkersMenu.vue"
import SettingUpSession from "./UI/SettingUpSession.vue"
import NotificationBox from "./UI/NotificationBox.vue"
import type { dynamicSessionStoreInterface } from "@/stores/hud-store-interface"

const unit = ref(settingsStore.settings.appFunctionality.general.unit)
const visibilityTop = ref<boolean>(false)
const visibilityBottom = ref<boolean>(true)
const inactivity = ref<number>()
const settingsStatus = ref<boolean>(sessionStore.settingsStatus)
const sessionStartStatus = ref<boolean>(sessionStore.sessionStartStatus)
const placeMarkersStatus = ref<boolean>(sessionStore.placeMarkersStatus)
const settingUpSessionStatus = ref<boolean>(sessionStore.settingUpSessionStatus)

const definePosition = computed(() => {
    let position = null
    if (sessionStore.placeMarkersStatus) {
        position = "top"
    }
    else {
        if (sessionStore.sessionStartStatus) {
            position = "bottom"
        }
        else {
            position = "default"
        }
    }

    return position
})

const showNotification = computed(() => {
    return (sessionStore.sessionStartStatus && sessionStore.settingUpSessionStatus) || sessionStore.settingUpSessionStatus || sessionStore.placeMarkersStatus || sessionStore.settingsStatus
})

function resetHudMainButtons(currentButton: keyof dynamicSessionStoreInterface) {
    const mainButtonVariables = ["settingsStatus", "historyStatus", "settingUpSessionStatus"]

    mainButtonVariables.forEach(variableName => {
        if (currentButton === variableName)
        sessionStore[currentButton] = !sessionStore[currentButton]
        else
            sessionStore[variableName] = false
    })
}

function addInactivityTimers() {
    inactivity.value = setTimeout(() => {
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
    if (!sessionStore.placeMarkersStatus && !sessionStore.settingsStatus && !sessionStore.historyStatus && !sessionStore.settingUpSessionStatus)
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

function delayedMenuAction(customFunction: Function, value: boolean) {
    const menuStatuses = [settingsStatus.value, placeMarkersStatus.value, settingUpSessionStatus.value]
    const activeMenus = menuStatuses.filter(boolean => boolean === true)
    if (!value && activeMenus.length < 1)
        setTimeout(customFunction, 400) // The time delay should be updated if the animation length is changed
    else
        customFunction()
}

watch(() => sessionStore.settingsStatus, (newValue) => {
    delayedMenuAction(() => settingsStatus.value = newValue, newValue)
})
watch(() => sessionStore.sessionStartStatus, (newValue) => {
    delayedMenuAction(() => sessionStartStatus.value = newValue, newValue)
})
watch(() => sessionStore.placeMarkersStatus, (newValue) => {
    delayedMenuAction(() => placeMarkersStatus.value = newValue, newValue)
})
watch(() => sessionStore.settingUpSessionStatus, (newValue) => {
    delayedMenuAction(() => settingUpSessionStatus.value = newValue, newValue)
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
