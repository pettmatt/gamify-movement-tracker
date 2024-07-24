export function meterFormatter(meters: number) {
    if (meters >= 1000) {
        const kilometers = meters / 1000
        return `${ kilometers.toFixed(2) } km`
    }
    else
        return `${ meters } m`
}