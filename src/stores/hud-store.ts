import { reactive } from "vue"
import { convertStringValue, getItemFromLocalStorage, ifNullUseDefaultValue } from "@/services/local-storage-service"
import type { dynamicSessionStoreInterface, sessionDetailsInterface } from "./hud-store-interface"

export const sessionStore = reactive<dynamicSessionStoreInterface>({
    // Booleans
    settingUpSessionStatus: false,
    sessionStartStatus: false,
    placeMarkersStatus: false,
    highscoresStatus: false,
    settingsStatus: false,
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
    settings: {
        menus: {
            display: {
                fadeTopOnIdle: ifNullUseDefaultValue(convertStringValue(getItemFromLocalStorage("fadeTopOnIdle")), true),
                fadeBottomOnIdle: ifNullUseDefaultValue(Boolean(getItemFromLocalStorage("fadeBottomOnIdle")), true)
            },
            functionality: {
                enableIdle: ifNullUseDefaultValue(convertStringValue(getItemFromLocalStorage("fadeBottomOnIdle")), true),
                idleTimer: ifNullUseDefaultValue(getItemFromLocalStorage("idleTimer"), 10)
            }
        },
        appFunctionality: {
            general: {
                offlineMode: ifNullUseDefaultValue(convertStringValue(getItemFromLocalStorage("offlineMode")), false),
                unit: "metric"
            },
            services: {
                allowThirdPartyServices: ifNullUseDefaultValue(convertStringValue(getItemFromLocalStorage("allowThirdPartyServices")), false)
            }
        }
    }
})
