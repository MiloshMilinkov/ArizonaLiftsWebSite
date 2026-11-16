import test from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync, statSync } from 'node:fs'

const dir = (path) => new URL('../' + path, import.meta.url)
const readJson = (path) => JSON.parse(readFileSync(dir(path)))

// Pixel size from a WebP header (lossy VP8, lossless VP8L or extended VP8X).
function webpSize(path) {
  const b = readFileSync(dir(path))
  assert.equal(b.toString('latin1', 0, 4) + b.toString('latin1', 8, 12), 'RIFFWEBP', path)
  const chunk = b.toString('latin1', 12, 16)
  if (chunk === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)]
  if (chunk === 'VP8L') {
    const bits = b.readUInt32LE(21)
    return [1 + (bits & 0x3fff), 1 + ((bits >> 14) & 0x3fff)]
  }
  return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff]
}

test('gallery and comment images are WebP with their real width and height', () => {
  const items = [
    ...readJson('src/content/transformations.json'),
    ...readJson('src/content/testimonials.json'),
  ]
  for (const item of items) {
    assert.match(item.image, /^\/images\/transformations\/[\w-]+\.webp$/)
    assert.deepEqual(webpSize('public' + item.image), [item.width, item.height], item.image)
  }
})

test('photos stay small enough for fast page loads', () => {
  const folders = ['src/assets/images/hero', 'public/images/about', 'public/images/transformations']
  const isImage = (name) => /\.(jpe?g|png|webp|avif)$/i.test(name)
  for (const folder of folders)
    for (const name of readdirSync(dir(folder)).filter(isImage)) {
      const kb = statSync(dir(folder + '/' + name)).size / 1024
      assert.ok(kb <= 200, `${folder}/${name} is ${Math.round(kb)} KB; resize and export as WebP`)
    }
})
