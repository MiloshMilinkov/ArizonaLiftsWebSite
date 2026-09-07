// Add photos to src/assets/images/hero. Number filenames to control their order.
// Vite bundles these assets for both local development and production hosting.
const photos = import.meta.glob(
  '/src/assets/images/hero/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  },
)

export const slideIntervalMs = 5000
export const heroSlides = Object.entries(photos)
  .sort(([a], [b]) => a.localeCompare(b, 'en', { numeric: true }))
  .map(([id, src]) => ({ id, src, altKey: 'hero.trainerPhoto', position: 'center' }))

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
