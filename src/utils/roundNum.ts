export function roundToDecimal(num: number) {
  const factor = Math.pow(10, 2)
  return Math.round(num * factor) / factor
}
