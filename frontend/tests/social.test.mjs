import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { socialPlatforms } from '../src/config/socialPosts.js'
import { socialLinks } from '../src/config/site.js'
import { siteOrigin } from '../src/config/seo.js'

const publicFile = (path) => new URL('../public' + path, import.meta.url)
const locales = ['en', 'sr'].map((locale) =>
  JSON.parse(readFileSync(new URL('../src/locales/' + locale + '.json', import.meta.url))),
)

test('each platform lists three newest-first posts with captions and a self-hosted poster', () => {
  const idPattern = { instagram: /^[\w-]{11}$/, tiktok: /^\d{19}$/ }
  for (const [key, platform] of Object.entries(socialPlatforms)) {
    assert.equal(platform.posts.length, 3, key)
    const dates = platform.posts.map((post) => post.date)
    assert.deepEqual(dates, [...dates].sort().reverse(), `${key} posts must be newest first`)
    for (const post of platform.posts) {
      assert.match(post.id, idPattern[key])
      assert.match(post.date, /^\d{4}-\d{2}-\d{2}$/)
      assert.ok(!Number.isNaN(Date.parse(post.date)))
      assert.ok(post.caption.trim() && !post.caption.includes('#'), `${key} ${post.id} caption`)
      assert.ok(existsSync(publicFile(platform.poster(post.id))), `Missing poster for ${post.id}`)
    }
    for (const messages of locales)
      for (const group of ['follow', 'viewOn', 'play', 'playerTitle'])
        assert.ok(messages.social[group][key]?.trim(), `Missing social.${group}.${key}`)
  }
})

test('structured data and link previews point at the real profiles and share image', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
  const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]
  const person = JSON.parse(json)['@graph'].find((node) => node['@type'] === 'Person')
  assert.deepEqual(person.sameAs, Object.values(socialLinks))
  const image = html.match(/property="og:image" content="([^"]+)"/)[1]
  assert.ok(image.startsWith(siteOrigin + '/'))
  assert.ok(existsSync(publicFile(image.slice(siteOrigin.length))))
})
