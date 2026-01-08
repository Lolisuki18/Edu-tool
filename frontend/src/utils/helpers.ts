
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}


export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}


export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}


export function isEmpty(value: any): boolean {
  if (value == null) return true
  if (typeof value === 'string') return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}


export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}
