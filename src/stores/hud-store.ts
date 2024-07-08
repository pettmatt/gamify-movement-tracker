import { reactive } from "vue"
import { getItemFromLocalStorage } from "@/services/local-storage-service"
import type { sessionStoreInterface, sessionDetailsInterface } from "./hud-store-interface"

export const sessionStore = reactive<sessionStoreInterface>({
    // Booleans
    settingUpSessionStatus: false,
    sessionStartStatus: false,
    placeMarkersStatus: false,
    highscoresStatus: false,
    historyStatus: false,
    // numeric
    traveledDistance: 0,
    plannedLength: 0,
    routeLength: 0,
    // Functions
    removeMarkersFunction: undefined,
    createRouteFunction: undefined,
    createLoopFunction: undefined,
    removeLastMarker: undefined,
    getMapStatistics: undefined,
    // User session settings
    // These values are meant to be stored and displayed in History / Highscore menu
    sessionMarkers: undefined
})

export const sessionDetails = reactive<sessionDetailsInterface>({
    category: undefined,
    goal: {
        markers: undefined,
        estimatedDistance: undefined,
        lengthSpecified: false,
        distance: undefined,
        time: undefined,
    },
    session: {
        routeCoordinates: undefined,
        markerCount: undefined,
        passedThroughMarkers: undefined,
        distance: undefined,
        startingTime: undefined,
        endTimer: undefined
    }
})

export const settingsStore = reactive({
    settingsStatus: false,
    settings: {
        menus: {
            display: {
                fadeTopOnIdle: getItemFromLocalStorage("fadeTopOnIdle") || true,
                fadeBottomOnIdle: getItemFromLocalStorage("fadeBottomOnIdle") || true
            },
            functionality: {
                enableIdle: getItemFromLocalStorage("fadeBottomOnIdle") || true,
                idleTimer: getItemFromLocalStorage("idleTimer") || 10
            }
        },
        appFunctionality: {
            general: {
                offlineMode: getItemFromLocalStorage("offlineMode") || false,
                unit: { name: "metric", unit: "m" } || { name: "imperial", unit: "" }
            },
            services: {
                allowThirdPartyServices: getItemFromLocalStorage("allowThirdPartyServices") || false
            }
        }
    }
})
