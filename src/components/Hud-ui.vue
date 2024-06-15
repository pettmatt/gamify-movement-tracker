<template>
<div id="interface-hud">
    <div class="interface-container">
        <div class="panel-top" :class="panelTopClasses">
            <div v-if="sessionStartStatus" id="travel-distance-container">
                <b>{{ traveledDistance }} {{ unit }}</b>
            </div>
        </div>
        <div class="middle-section-panels">
            <div class="panel-left" />
            <div class="panel-middle">
            </div>
            <div class="panel-right">
            </div>
        </div>
        <div class="panel-bottom" :class="fadeInBottom">
        </div>
    </div>
</div>
</template>

<script lang="ts" setup>
    import { Trophy, TrophyFill, Archive, ArchiveFill, Geo, GeoFill, Gear, GearFill } from "bootstrap-icons-vue"
    import { sessionStartStatus, traveledDistance, placeMarkersStatus, settingsStatus, historyStatus, highscoresStatus, settingUpSessionStatus } from "../stores/hud-store"

    let unit = "m"
    let visibilityTop: boolean
    let visibilityBottom: boolean
    let inActivity: any

    onMounted(() => {
        visibilityTop = false
        visibilityBottom = true

        addInactivityTimers()
    })

    beforeUnmount(() => { // Same as onDestroy()
        removeInactivityTimers()
    })

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

    
    settingUpSessionStatus.subscribe((settingUpBoolean: any) => {
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
        margin: 1rem;
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

    .middle-section-panels {
        display: flex;
        flex-direction: row;
        height:100%;
    }

    #interface-hud .panel-top,
    #interface-hud .panel-bottom {
        flex: 0 1 auto;
    }

    #interface-hud .panel-top {
        text-align: center;
        color: #000;
    }

    #interface-hud .panel-right,
    #interface-hud .panel-left {
        flex: 0 0 2rem;
        margin: auto 0;
    }

    #interface-hud .panel-bottom,
    #interface-hud .panel-right {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 0.3em;
        padding: 0.5em 0;
    }

    #interface-hud .panel-right {
        flex-direction: column;
        padding: 0 0.5em;
    }

    #interface-hud .panel-middle {
        flex: 1 1 auto;
    }

    #travel-distance-container {
        margin: 0 4vw;
    }

    #travel-distance-container b {
        margin: 0 auto;
    }

    /* Animations */
    .fade-out-top {
        opacity: 0;
        transform: translateY(0%);
        transition:
            opacity 0.3s ease-in-out,
            transform 0.5s ease-in-out;
    }
    .fade-in-top {
        opacity: 1;
        transform: translateY(10%);
        transition:
            opacity 0.3s ease-in-out,
            transform 0.5s ease-in-out;
    }
    .fade-out-bottom {
        opacity: 0;
        transform: translateY(50%);
        transition:
            opacity 0.3s ease-in-out,
            transform 0.5s ease-in-out;
    }
    .fade-in-bottom {
        opacity: 1;
        transform: translateY(0%);
        transition:
            opacity 0.3s ease-in-out,
            transform 0.5s ease-in-out;
    }
</style>
