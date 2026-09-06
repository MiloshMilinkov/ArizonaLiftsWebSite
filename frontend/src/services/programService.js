import { getJson } from './http'
export function getPrograms(locale = 'en', signal) {
  return getJson('/api/programs?locale=' + encodeURIComponent(locale), signal)
}
