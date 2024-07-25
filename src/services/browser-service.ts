function promptExitHandler(e: BeforeUnloadEvent): string {
    e.preventDefault
    // Most browsers don't allow setting a customized message when using beforeunload event, but it's necessary to return a string and empty string will not do.
    const message = "You are about to leave the page. Current session will be lost."
    e.returnValue = message // For legacy browsers, just incase.
    return message
}

export function createPromptBeforeExitHook() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
    window.addEventListener("beforeunload", promptExitHandler)
}

export function removePromptBeforeExitHook() {
    window.removeEventListener("beforeunload", promptExitHandler)
}