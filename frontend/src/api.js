export async function getJson(path) {
  const response = await fetch(path, { signal: AbortSignal.timeout(10000) })
  if (!response.ok) throw new Error('Content is temporarily unavailable. Please try again.')
  return response.json()
}
