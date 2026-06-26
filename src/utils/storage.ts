export async function saveToStorage(key: string, value: any): Promise<void> {
  localStorage.setItem(key, JSON.stringify(value))
}

export async function getFromStorage(key: string): Promise<any> {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}

export async function clearStorage(): Promise<void> {
  localStorage.clear()
}
