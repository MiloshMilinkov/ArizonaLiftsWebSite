<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { activeSection } from '@/composables/useActiveSection'
import HomeView from './HomeView.vue'
import ProgramsView from './ProgramsView.vue'
import TransformationsView from './TransformationsView.vue'
let observer
let frame
let sections = []
function updateActiveSection() {
  frame = null
  const offset = (document.querySelector('.header')?.getBoundingClientRect().height || 100) + 40
  activeSection.value = sections.reduce(
    (current, section) => (section.getBoundingClientRect().top <= offset ? section.id : current),
    'home',
  )
}
function scheduleUpdate() {
  if (frame == null) frame = requestAnimationFrame(updateActiveSection)
}
onMounted(() => {
  sections = [...document.querySelectorAll('.journey-section')]
  updateActiveSection()
  window.addEventListener('scroll', scheduleUpdate, { passive: true })
  window.addEventListener('resize', scheduleUpdate)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('journey-section--entered')
          observer.unobserve(entry.target)
        }
      }
    },
    { threshold: 0 },
  )
  document.querySelectorAll('.journey-section').forEach((section) => observer.observe(section))
})
onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('scroll', scheduleUpdate)
  window.removeEventListener('resize', scheduleUpdate)
  if (frame != null) cancelAnimationFrame(frame)
})
</script>

<template>
  <div id="home" class="journey-section"><HomeView /></div>
  <div id="programs" class="journey-section"><ProgramsView /></div>
  <div id="transformations" class="journey-section"><TransformationsView /></div>
</template>

<style scoped>
.journey-section {
  scroll-margin-top: 120px;
}
.journey-section + .journey-section {
  border-top: 1px solid var(--border);
}
@media (prefers-reduced-motion: no-preference) {
  .journey-section--entered {
    animation: section-enter 600ms ease-out both;
  }
  @keyframes section-enter {
    from {
      opacity: 0.65;
    }
    to {
      opacity: 1;
    }
  }
}
</style>
