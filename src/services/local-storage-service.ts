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
    console.log("ifNullUseDefaultValue", value, defaultValue, "result", value === null)
    return (value === null || value === undefined) ? defaultValue : value
}