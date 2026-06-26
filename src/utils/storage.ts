import { Storage } from '@capacitor/storage'

export async function saveToStorage(key: string, value: any): Promise<void> {
  try {
    await Storage.set({
      key,
      value: JSON.stringify(value),
    })
  } catch (error) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export async function getFromStorage(key: string): Promise<any> {
  try {
    const { value } = await Storage.get({ key })
    return value ? JSON.parse(value) : null
  } catch (error) {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : null
  }
}

export async function removeFromStorage(key: string): Promise<void> {
  try {
    await Storage.remove({ key })
  } catch (error) {
    localStorage.removeItem(key)
  }
}

export async function getAllStorage(): Promise<Record<string, any>> {
  try {
    const { keys } = await Storage.keys()
    const result: Record<string, any> = {}
    for (const key of keys) {
      const value = await getFromStorage(key)
      result[key] = value
    }
    return result
  } catch (error) {
    const result: Record<string, any> = {}
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key) {
        result[key] = getFromStorage(key)
      }
    }
    return result
  }
}

export async function clearAllStorage(): Promise<void> {
  try {
    const { keys } = await Storage.keys()
    for (const key of keys) {
      await Storage.remove({ key })
    }
  } catch (error) {
    localStorage.clear()
  }
}
