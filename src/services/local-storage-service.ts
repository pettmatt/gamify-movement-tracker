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

export interface History {
    id: string,
    date: Date,
    details: SessionDetailsInterface
}