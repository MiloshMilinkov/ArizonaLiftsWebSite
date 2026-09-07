<script setup>
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { heroSlides, slideIntervalMs } from '@/config/heroSlides'

const { t } = useI18n()
const failed = ref([])
const slides = computed(() => heroSlides.filter((slide) => !failed.value.includes(slide.id)))
const index = ref(0)
const paused = ref(false)
const hovered = ref(false)
const hidden = ref(false)
const activeSlide = computed(() => slides.value[index.value])
let timer
let motionPreference

function stop() {
  clearInterval(timer)
  timer = undefined
}
function restart() {
  stop()
  if (slides.value.length > 1 && !paused.value && !hovered.value && !hidden.value) {
    timer = setInterval(() => {
      index.value = (index.value + 1) % slides.value.length
    }, slideIntervalMs)
  }
}
function move(direction) {
  if (!slides.value.length) return
  index.value = (index.value + direction + slides.value.length) % slides.value.length
  restart()
}
function removeFailed(id) {
  failed.value = [...failed.value, id]
  index.value = 0
}
function visibilityChanged() {
  hidden.value = document.hidden
}
function motionChanged() {
  if (motionPreference.matches) paused.value = true
}
watch([paused, hovered, hidden, () => slides.value.length], restart)
onMounted(() => {
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  paused.value = motionPreference.matches
  hidden.value = document.hidden
  motionPreference.addEventListener('change', motionChanged)
  document.addEventListener('visibilitychange', visibilityChanged)
  restart()
})
onBeforeUnmount(() => {
  stop()
  motionPreference?.removeEventListener('change', motionChanged)
  document.removeEventListener('visibilitychange', visibilityChanged)
})
</script>

<template>
  <figure
    class="hero-image hero-slideshow"
    :aria-label="t('hero.slideshow')"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <img
      v-for="(slide, slideIndex) in slides"
      :key="slide.id"
      :src="slide.src"
      :alt="slideIndex === index ? t(slide.altKey) : ''"
      :aria-hidden="slideIndex !== index"
      :class="{ 'slide-active': slideIndex === index }"
      :style="{ objectPosition: slide.position }"
      :fetchpriority="slideIndex === 0 ? 'high' : 'auto'"
      @error="removeFailed(slide.id)"
    />
    <p v-if="!slides.length" class="slideshow-error">{{ t('hero.imageUnavailable') }}</p>
    <div class="image-label">
      <span
        >{{ t('hero.show') }}<br /><b>{{ t('hero.yourself') }}</b></span
      >
      <span class="round-arrow" aria-hidden="true">↗</span>
    </div>
    <figcaption v-if="activeSlide?.captionKey">{{ t(activeSlide.captionKey) }}</figcaption>
  </figure>
</template>

<style scoped>
.hero-slideshow img {
  opacity: 0;
  transition: opacity 300ms ease;
}
.hero-slideshow img.slide-active {
  opacity: 1;
}
</style>
