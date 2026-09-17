const PREFIX = 'tallergest:'

export function readCollection(name) {
  try {
    const value = window.localStorage.getItem(`${PREFIX}${name}`)
    const data = value ? JSON.parse(value) : []
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export function writeCollection(name, data) {
  window.localStorage.setItem(`${PREFIX}${name}`, JSON.stringify(data))
}

export function createId(prefix) {
  return `${prefix}-${crypto.randomUUID()}`
}
