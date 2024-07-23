import type { Waypoints } from "@/interfaces/map-interfaces"

export interface HudStoreInterface {
    // Booleans
    settingUpSessionStatus: boolean,
    sessionStartStatus: boolean,
    placeMarkersStatus: boolean,
    settingsStatus: boolean,
    historyStatus: boolean,
    // Functions
    removeMarkersFunction: undefined | Function,
    createRouteFunction: undefined | Function,
    createLoopFunction: undefined | Function,
    removeLastMarker: undefined | Function,
    getMapStatistics: undefined | Function,
}

type HudStoreInterfaceValues = number | boolean | Function | Waypoints | undefined
export interface DynamicHudStoreInterface extends HudStoreInterface {
    [key: string]: HudStoreInterfaceValues
}

export interface SessionDetailsInterface {
    category: undefined | string,
    goal: {
        markers: undefined | number[][],
        estimatedDistance: undefined | number,
        lengthSpecified: boolean,
        plannedLength: number,
        routeLength: number,
        distance: undefined | number,
        time: undefined | number,
    },
    session: {
        traveledDistance: number,
        routeCoordinates: undefined | string[],
        markerCount: undefined | number,
        // These values are meant to be stored and displayed in History / Highscore menu
        sessionMarkers: undefined | Waypoints,
        passedThroughMarkers: undefined | number,
        distance: undefined | number,
        startingTime: undefined | number,
        endingTime: undefined | number
    }
}