export function evaluateExpression(expression: string) {
    return new Function(`return ${expression}`)()
}