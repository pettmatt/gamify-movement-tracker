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

export function passedTime(epoch01: number, epoch02: number): number | string {
    return epoch01 - epoch02
}

export function secondFormatter(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
  
    const hoursString = hours > 0 ? `${ hours } h ` : ""
    const minutesString = minutes > 0 ? `${ minutes } min ` : ""
    const secondsString = remainingSeconds > 0 ? `${remainingSeconds}s` : ""
  
    let time = hoursString + minutesString

    if (minutesString || hoursString)
        time += secondsString

    return time
}