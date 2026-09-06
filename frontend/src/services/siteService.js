import { getJson } from './http'
export function getTrainerProfile(locale = 'en', signal) {
  return getJson('/api/site?locale=' + encodeURIComponent(locale), signal)
}
