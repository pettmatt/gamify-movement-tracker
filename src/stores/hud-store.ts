import { reactive } from "vue"
import { convertStringValue, getItemFromLocalStorage, ifNullUseDefaultValue } from "@/services/local-storage-service"
import type { DynamicHudStoreInterface, SessionDetailsInterface } from "./hud-store-interface"

export const hudStore = reactive<DynamicHudStoreInterface>({
    // Booleans
    settingUpSessionStatus: false,
    sessionStartStatus: false,
    placeMarkersStatus: false,
    settingsStatus: false,
    historyStatus: false,
    // Functions
    removeMarkersFunction: undefined,
    createRouteFunction: undefined,
    createLoopFunction: undefined,
    removeLastMarker: undefined,
    getMapStatistics: undefined
})

export const sessionDetails = reactive<SessionDetailsInterface>({
    category: undefined,
    goal: {
        markers: undefined,
        estimatedDistance: undefined,
        lengthSpecified: false,
        plannedLength: 0,
        routeLength: 0,
        distance: undefined,
        time: undefined,
    },
    session: {
        traveledDistance: 0,
        routeCoordinates: undefined,
        markerCount: undefined,
        sessionMarkers: undefined,
        passedThroughMarkers: undefined,
        distance: undefined,
        startingTime: undefined,
        endingTime: undefined,
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
