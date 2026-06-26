export async function saveToStorage(key: string, value: any): Promise<void> {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Storage error:', error)
  }
}

export async function getFromStorage(key: string): Promise<any> {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error('Storage error:', error)
    return null
  }
}

export async function removeFromStorage(key: string): Promise<void> {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Storage error:', error)
  }
}

export async function clearAllStorage(): Promise<void> {
  try {
    localStorage.clear()
  } catch (error) {
    console.error('Storage error:', error)
  }
}
