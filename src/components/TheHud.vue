<template>
<div id="interface-hud">
    <div class="interface-container">
        <Transition name="fade-top">
            <div class="panel-top" :class="panelTopClasses" v-show="sessionStore.sessionStartStatus || false">
                <div id="travel-distance-container">
                    <b>{{ sessionStore.traveledDistance }} {{ unit }}</b>
                </div>
            </div>
        </Transition>
        <div class="panel-middle">
            <NotificationBox :position="(sessionStore.placeMarkersStatus) ? 'top' : 'default'">
                <div>
                    <SessionMenu v-if="sessionStore.sessionStartStatus" />
                    <PlaceMarkersMenu v-else-if="sessionStore.placeMarkersStatus" />
                    <SettingUpSession v-else-if="!sessionStore.placeMarkersStatus" />
                </div>
            </NotificationBox>
        </div>
        <Transition name="fade-bottom">
            <div class="panel-bottom" v-show="visibilityBottom">
                <ToggleButton v-for="(slot, index) in menu"
                    :key="index"
                    :label="slot.label"
                    :icons="slot.icons"
                    :value="Boolean(evaluateExpression(slot.value))"
                    :store="evaluateExpression(slot.store)"
                />
            </div>
        </Transition>
    </div>
</div>
</template>

<script lang="ts" setup>
import { onMounted, computed, onBeforeUnmount, watch } from "vue"
import { sessionStore, settingsStore } from "../stores/hud-store"
import { Trophy, TrophyFill, Archive, ArchiveFill, Geo, GeoFill, Gear, GearFill } from "bootstrap-icons-vue"
import { evaluateExpression } from "@/utils/json-utils"
import menu from "@/structure/hud/bottom-panel.json"
import ToggleButton from "./UI/ToggleButton.vue"
import SessionMenu from "./UI/SessionMenu.vue"
import PlaceMarkersMenu from "./UI/PlaceMarkersMenu.vue"
import SettingUpSession from "./UI/SettingUpSession.vue"

let unit = "m"
let visibilityTop: boolean
let visibilityBottom: boolean
let inActivity: any

const panelTopClasses = computed(() => {
    return {
        "fade-in-top": visibilityTop,
        "fade-out-top": !visibilityTop
    }
})

const fadeInBottom = computed(() => {
    return {
        "fade-in-bottom": visibilityBottom,
        "fade-out-bottom": !visibilityBottom
    }
})

function addInactivityTimers() {
    inActivity = setTimeout(() => {
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
    clearTimeout(inActivity)
    window.removeEventListener("click", resetTimer)
    window.removeEventListener("keydown", resetTimer)
    window.removeEventListener("mousemove", resetTimer)
    window.removeEventListener("touchmove", resetTimer)
    window.removeEventListener("scroll", resetTimer)
}

function resetTimer() {
    showUIElements()
    clearTimeout(inActivity)
    inActivity = setTimeout(hideUIElements, 10000)
}

function hideUIElements() {
    visibilityBottom = false
}

function showUIElements() {
    visibilityBottom = true
}

onMounted(() => {
    visibilityTop = false
    visibilityBottom = true

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
    flex: 0 1 auto;
}
#interface-hud .panel-top {
    text-align: center;
    color: #000;
}
#interface-hud .panel-bottom {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 0.5em 0;
    gap: 0.3em;
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
