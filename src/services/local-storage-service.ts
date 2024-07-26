import type { SessionDetailsInterface } from "@/stores/hud-store-interface"

export function addItemToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value)
}

export function getItemFromLocalStorage(key: string): string | null {
    return localStorage.getItem(key)
}

export function convertStringValue(value: string | null) {
    return (value === null) ? null : JSON.parse(value)
}

export function ifNullUseDefaultValue(value: any, defaultValue: any) {
    return (value === null || value === undefined) ? defaultValue : value
}

export interface History extends SessionDetailsInterface {
    date: number
}

export function synchronizeLocalStorage(settings: any) {
    // console.log("=============================")
    // console.log("Settings, synchronizeLocalStorage, settings:", settings)
    for (const property in settings) {
        const value = settings[property]
        if (typeof value === "object") {
            // console.log("Settings, setting property is object", value)
            synchronizeLocalStorage(value)
        }

        else {
            console.log(`Pushed to local storage: "${ property }: ${ value }"`)
            addItemToLocalStorage(property, value)
        }
    }
}