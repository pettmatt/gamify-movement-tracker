export function evaluateExpression(expression: string, optionalArg: any = {}) {
    // TODO: Fix, using with is not advised
    const fn = new Function("context", `with(context) { return ${expression} }`)
    return fn(optionalArg)
}