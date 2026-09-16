import { createI18n } from 'vue-i18n'
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { normalizeOrigin, pageMetadata, sitemapXml } from '../src/seo/metadata.js'
import { siteOrigin } from '../src/config/seo.js'
import { seoFiles } from '../build/seo.js'

test('canonical and language alternates use the production domain and matching language', () => {
  for (const locale of ['en', 'sr']) {
    const messages = JSON.parse(
      readFileSync(new URL('../src/locales/' + locale + '.json', import.meta.url)),
    ).meta
    const meta = pageMetadata(siteOrigin, locale, messages)
    assert.equal(meta.canonical, siteOrigin + '/' + locale)
    assert.equal(meta.title, messages.home)
    const i18n = createI18n({ legacy: false, locale, messages: { [locale]: { meta: messages } } })
    assert.equal(i18n.global.t('meta.home'), messages.home)
    assert.ok(meta.description.includes('Kristin'))
    assert.deepEqual(meta.alternates, [
      { language: 'en', href: siteOrigin + '/en' },
      { language: 'sr', href: siteOrigin + '/sr' },
    ])
  }
})

test('origin validation prevents malformed canonical and sitemap URLs', () => {
  assert.equal(normalizeOrigin(siteOrigin + '/'), siteOrigin)
  for (const bad of [
    'http://example.com',
    'https://example.com/path',
    'https://example.com/?a=1',
    'https://user:pass@example.com',
  ])
    assert.throws(() => normalizeOrigin(bad))
})

test('build emits a sitemap with only two canonical URLs and a discoverable robots file', () => {
  const output = []
  seoFiles().generateBundle.call({ emitFile: (file) => output.push(file) })
  const sitemap = output.find((file) => file.fileName === 'sitemap.xml').source
  assert.equal(sitemap, sitemapXml(siteOrigin))
  assert.equal((sitemap.match(/<loc>/g) || []).length, 2)
  assert.ok(sitemap.includes('<loc>' + siteOrigin + '/en</loc>'))
  assert.ok(sitemap.includes('<loc>' + siteOrigin + '/sr</loc>'))
  assert.ok(!sitemap.includes('/programs'))
  const robots = output.find((file) => file.fileName === 'robots.txt').source
  assert.ok(robots.includes('Allow: /'))
  assert.ok(robots.includes('Sitemap: ' + siteOrigin + '/sitemap.xml'))
  const redirects = readFileSync(new URL('../public/_redirects', import.meta.url), 'utf8')
  assert.ok(!redirects.split('\n').some((line) => line.startsWith('/*')))
})
