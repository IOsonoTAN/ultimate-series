export const getCurrentTimestamp = (digit: number = 10): number => (
  +new Date().getTime().toString().substr(0, digit)
)