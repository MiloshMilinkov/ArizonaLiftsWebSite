import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { preferredLocale, localeStorageKey } from '../src/i18n/locale.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const en = JSON.parse(readFileSync(join(root, 'src/locales/en.json'), 'utf8'))
const sr = JSON.parse(readFileSync(join(root, 'src/locales/sr.json'), 'utf8'))
function flatten(value, prefix = '') {
  return Object.entries(value).flatMap(([key, item]) =>
    typeof item === 'object' ? flatten(item, prefix + key + '.') : [[prefix + key, item]],
  )
}
test('both locales contain identical nonempty message keys', () => {
  assert.deepEqual(
    flatten(en)
      .map(([key]) => key)
      .sort(),
    flatten(sr)
      .map(([key]) => key)
      .sort(),
  )
  for (const [, value] of [...flatten(en), ...flatten(sr)])
    assert.ok(typeof value === 'string' && value.trim())
})
test('saved choice takes precedence over browser language', () => {
  assert.equal(
    preferredLocale({ getItem: (key) => (key === localeStorageKey ? 'en' : null) }, ['sr-RS']),
    'en',
  )
})
test('detect Serbian variants, ignore unknown preferences, and fall back to English', () => {
  assert.equal(preferredLocale(null, ['sr-Latn-RS']), 'sr')
  assert.equal(preferredLocale({ getItem: () => 'fr' }, ['sr-Cyrl']), 'sr')
  assert.equal(preferredLocale(null, ['fr-FR']), 'en')
})
test('blocked storage never prevents language detection', () => {
  assert.equal(
    preferredLocale(
      {
        getItem() {
          throw new Error('blocked')
        },
      },
      ['sr'],
    ),
    'sr',
  )
})
test('every literal UI translation key exists and Vue tags remain valid', () => {
  const keys = new Set(flatten(en).map(([key]) => key))
  function scan(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const file = join(directory, entry.name)
      if (entry.isDirectory()) scan(file)
      else if (entry.name.endsWith('.vue')) {
        const source = readFileSync(file, 'utf8')
        assert.ok(!source.includes('<{{'), `Invalid component tag in ${file}`)
        for (const match of source.matchAll(/\bt\('([^']+)'\)/g))
          assert.ok(keys.has(match[1]), `Missing ${match[1]}`)
      }
    }
  }
  scan(join(root, 'src'))
})
