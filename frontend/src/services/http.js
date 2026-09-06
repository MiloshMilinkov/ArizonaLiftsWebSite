export async function getJson(path, signal) {
  const controller = new AbortController()
  const abort = () => controller.abort()
  signal?.addEventListener('abort', abort, { once: true })
  if (signal?.aborted) controller.abort()
  const timeout = setTimeout(abort, 10000)
  try {
    const response = await fetch(path, { signal: controller.signal })
    if (!response.ok) throw new Error('Content request failed')
    return await response.json()
  } finally {
    clearTimeout(timeout)
    signal?.removeEventListener('abort', abort)
  }
}
