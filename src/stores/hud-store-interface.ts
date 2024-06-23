import type { Waypoints } from "@/interfaces/map-interfaces"

export interface sessionStoreInterface {
        // Booleans
        settingUpSessionStatus: Boolean,
        sessionStartStatus: Boolean,
        placeMarkersStatus: Boolean,
        highscoresStatus: Boolean,
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
}