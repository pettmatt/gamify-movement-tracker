import { format, fromZonedTime } from "date-fns-tz"
import { isThisYear, isThisMonth } from "date-fns"

export function currentTime(): number {
    return Math.floor(Date.now() / 1000)
}

export function formattedDate(timestamp: number): string {
    const date = new Date(timestamp * 1000) // Convert to milliseconds
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const zoneDate = fromZonedTime(date, timeZone)
    let dateFormat = null

    if (isThisMonth(zoneDate))
        dateFormat = "d"
    if (isThisYear(zoneDate))
        dateFormat = "MMM d"
    else 
        dateFormat = "MMM d, yyyy"

    return format(zoneDate, dateFormat, { timeZone })
}

export function passedTime(epoch01: number, epoch02: number) {
    return epoch01 - epoch02
}