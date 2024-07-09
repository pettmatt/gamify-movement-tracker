import type { Waypoints } from "@/interfaces/map-interfaces"

export interface sessionStoreInterface {
    // Booleans
    settingUpSessionStatus: Boolean,
    sessionStartStatus: Boolean,
    placeMarkersStatus: Boolean,
    highscoresStatus: Boolean,
    settingsStatus: Boolean,
    historyStatus: Boolean,
    // numeric
    traveledDistance: number,
    plannedLength: number,
    routeLength: number,
    // Functions
    removeMarkersFunction: undefined | Function,
    createRouteFunction: undefined | Function,
    createLoopFunction: undefined | Function,
    removeLastMarker: undefined | Function,
    getMapStatistics: undefined | Function,
    // User session settings
    // These values are meant to be stored and displayed in History / Highscore menu
    sessionMarkers: undefined | Waypoints,
}

export interface sessionDetailsInterface {
    category: undefined | string,
    goal: {
        markers: undefined | number[][],
        estimatedDistance: undefined | number,
        lengthSpecified: boolean,
        distance: undefined | number,
        time: undefined | number,
    },
    session: {
        routeCoordinates: undefined | string[],
        markerCount: undefined | number,
        passedThroughMarkers: undefined | number,
        distance: undefined | number,
        startingTime: undefined | number,
        endTimer: undefined | number
    }
}