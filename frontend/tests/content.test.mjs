import test from 'node:test'
import assert from 'node:assert/strict'
import { getSiteContent } from '../src/content/index.js'

test('both languages preserve online and personal mentorship content', () => {
  for (const locale of ['en', 'sr']) {
    const content = getSiteContent(locale)
    assert.ok(content.profile.description)
    assert.ok(content.profile.quote)
    assert.deepEqual(
      content.programs.map((p) => p.id),
      ['basic', 'advanced', 'premium', 'personal-mentorship'],
    )
    assert.deepEqual(
      content.programs.map((p) => p.type),
      ['online', 'online', 'online', 'personal'],
    )
    assert.equal(content.programs[0].features.length, 10)
    assert.equal(content.programs[1].features.length, 4)
    assert.deepEqual(
      content.programs.filter((p) => p.featured).map((p) => p.id),
      ['advanced'],
    )
    assert.equal(content.programs[2].features.length, 5)
    assert.ok(content.programs.every((p) => !Object.hasOwn(p, 'price')))
  }
})

test('content selection switches languages synchronously and falls back safely', () => {
  const english = getSiteContent('en')
  const serbian = getSiteContent('sr')
  assert.notEqual(english.profile.description, serbian.profile.description)
  assert.notEqual(english.programs[0].description, serbian.programs[0].description)
  assert.equal(getSiteContent('unsupported'), english)
  assert.equal(getSiteContent('toString'), english)
  assert.equal(getSiteContent('en'), english)
})

test('content remains available with network access disabled', () => {
  const originalFetch = globalThis.fetch
  globalThis.fetch = () => {
    throw new Error('Unexpected network request')
  }
  try {
    assert.equal(getSiteContent('en').programs[0].name, 'Basic')
    assert.equal(getSiteContent('sr').programs[1].name, 'Advanced')
  } finally {
    globalThis.fetch = originalFetch
  }
})
