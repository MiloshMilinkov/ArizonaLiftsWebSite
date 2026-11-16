// Add photos to src/assets/images/hero. Number filenames to control their order.
// Vite bundles these assets for both local development and production hosting.
// Optional responsive sizes: name files <name>-<width>w.webp (e.g. 01-photo-1200w.webp and
// 01-photo-800w.webp); files sharing <name> become one slide with a srcset.
const photos = import.meta.glob(
  '/src/assets/images/hero/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  },
)

// Rendered slide width per layout in src/assets/styles/main.css (.hero, .hero-image).
export const heroSizes =
  '(max-width: 700px) 88vw, (max-width: 1000px) 430px, (max-width: 1600px) 41vw, 660px'

const variants = new Map()
for (const [path, src] of Object.entries(photos)) {
  const [, name, width] = path.match(/([^/]+?)(?:-(\d+)w)?\.\w+$/)
  variants.set(name, [...(variants.get(name) || []), { src, width: Number(width) || 0 }])
}

export const slideIntervalMs = 5000
export const heroSlides = [...variants]
  .sort(([a], [b]) => a.localeCompare(b, 'en', { numeric: true }))
  .map(([id, files]) => {
    files.sort((a, b) => b.width - a.width)
    const sized = files.filter((file) => file.width)
    return {
      id,
      src: files[0].src,
      srcset: sized.length > 1 ? sized.map((f) => `${f.src} ${f.width}w`).join(', ') : undefined,
      altKey: 'hero.trainerPhoto',
      position: 'center',
    }
  })

// Keep the existing photo until the trainer supplies images; no repeated placeholders.
if (!heroSlides.length) {
  heroSlides.push({
    id: 'stock-training',
    src: 'https://images.pexels.com/photos/136410/pexels-photo-136410.jpeg?auto=compress&dpr=1&h=750&w=1260',
    altKey: 'hero.alt',
    captionKey: 'hero.caption',
    position: '44% center',
  })
}
