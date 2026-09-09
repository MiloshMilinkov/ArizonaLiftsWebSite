<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { Pause, Play } from '@lucide/vue'
import { slideIntervalMs } from '@/config/heroSlides'
defineProps({ content: { type: Object, required: true } })
const photos = [1, 2, 3].map((n) => ({
  src: '/images/about/kristina-transformation-' + n + '.jpeg',
  label: n,
}))
const active = ref(0)
const paused = ref(false)
const hovering = ref(false)
const focused = ref(false)
const visible = ref(false)
const gallery = ref(null)
const current = computed(() => photos[active.value])
let timer, observer, motion
function select(index) {
  active.value = index
  paused.value = true
}
function respectMotion() {
  if (motion.matches) paused.value = true
}
onMounted(() => {
  motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  respectMotion()
  motion.addEventListener('change', respectMotion)
  observer = new IntersectionObserver(([entry]) => {
    visible.value = entry.isIntersecting
  })
  observer.observe(gallery.value)
  timer = window.setInterval(() => {
    if (!paused.value && !hovering.value && !focused.value && visible.value && !document.hidden)
      active.value = (active.value + 1) % photos.length
  }, slideIntervalMs)
})
onBeforeUnmount(() => {
  window.clearInterval(timer)
  observer?.disconnect()
  motion?.removeEventListener('change', respectMotion)
})
</script>

<template>
  <figure
    ref="gallery"
    class="about-gallery"
    :aria-label="content.galleryLabel"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
    @focusin="focused = true"
    @focusout="focused = $event.currentTarget.contains($event.relatedTarget)"
  >
    <div class="photo-frame">
      <img
        v-for="(photo, index) in photos"
        :key="photo.src"
        :src="photo.src"
        :alt="index === active ? content.photoAlts[photo.label] : ''"
        :aria-hidden="index !== active"
        :class="{ active: index === active }"
        width="2048"
        height="2048"
        loading="lazy"
        decoding="async"
      />
    </div>
    <figcaption>
      <span class="eyebrow">{{ content.galleryCaption }}</span>
      <p>{{ content.photoLabels[current.label] }}</p>
    </figcaption>
    <div class="photo-controls">
      <button
        v-for="(photo, index) in photos"
        :key="photo.src"
        type="button"
        :aria-label="content.photoLabels[photo.label]"
        :aria-pressed="active === index"
        class="photo-dot"
        @click="select(index)"
      >
        <span />
      </button>
      <button
        type="button"
        class="photo-toggle"
        :aria-label="paused ? content.playPhotos : content.pausePhotos"
        @click="paused = !paused"
      >
        <Play v-if="paused" :size="18" aria-hidden="true" /><Pause
          v-else
          :size="18"
          aria-hidden="true"
        />
      </button>
    </div>
  </figure>
</template>

<style scoped>
.about-gallery {
  margin: 0;
  min-width: 0;
  padding: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
}
.photo-frame {
  display: grid;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 16px;
  background: var(--sand);
}
.photo-frame img {
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  min-height: 0;
  object-fit: contain;
  opacity: 0;
  transition: opacity 600ms ease;
}
.photo-frame img.active {
  opacity: 1;
}
figcaption {
  padding: 24px 12px 0;
}
figcaption p {
  margin: 10px 0 0;
  color: var(--muted);
}
.photo-controls {
  display: flex;
  align-items: center;
  padding: 8px 4px 0;
}
.photo-controls button {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 0;
  background: transparent;
  color: var(--ink);
  cursor: pointer;
  border-radius: 50%;
}
.photo-dot span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--muted);
  opacity: 0.4;
}
.photo-dot[aria-pressed='true'] span {
  width: 22px;
  border-radius: 8px;
  background: var(--ink);
  opacity: 1;
}
.photo-toggle {
  margin-left: auto;
}
.photo-controls button:focus-visible {
  outline: 2px solid var(--ink);
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .photo-frame img {
    transition: none;
  }
}
</style>
