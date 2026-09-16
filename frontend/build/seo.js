import { normalizeOrigin, sitemapXml } from '../src/seo/metadata.js'
import { siteOrigin } from '../src/config/seo.js'

export function seoFiles() {
  const origin = normalizeOrigin(siteOrigin)
  return {
    name: 'seo-files',
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml(origin) })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: 'User-agent: *\nAllow: /\n\nSitemap: ' + origin + '/sitemap.xml\n',
      })
    },
  }
}
