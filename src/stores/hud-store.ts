import { reactive } from "vue"
import type { sessionStoreInterface } from "./hud-store-interfaces"

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
    sessionMarkers: undefined,
    goal: {
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
    }
})

export const settingsStore = reactive({
    settingsStatus: false,
    settings: {
        menus: {
            display: {
                // fadeTopOnIdle: getItemFromLocalStorage("fadeTopOnIdle"),
                // fadeRightOnIdle: getItemFromLocalStorage("fadeRightOnIdle"),
                // fadeBottomOnIdle: getItemFromLocalStorage("fadeBottomOnIdle"),
            },
            functionality: {
                // enableIdle: getItemFromLocalStorage("fadeBottomOnIdle"),
                // idconstimer: getItemFromLocalStorage("idconstimer") || 10
            }
        },
        appFunctionality: {
            general: {
                // offlineMode: getItemFromLocalStorage("offlineMode"),
                units: { name: "metric", unit: "m"} || { name: "imperial", unit: ""}
            },
            services: {
                // allowThirdPartyServices: getItemFromLocalStorage("allowThirdPartyServices")
            }
        }
    }
})
