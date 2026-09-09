<script setup>
import { Dumbbell, Trophy, UserRound } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import MentorshipContact from './MentorshipContact.vue'

defineProps({ program: { type: Object, required: true } })
</script>

<template>
  <article
    class="mentorship-card"
    :class="{ 'mentorship-card--featured': program.featured }"
    :aria-labelledby="'program-' + program.id"
  >
    <span v-if="program.featured" class="mentorship-card__badge">{{
      t('programs.recommended')
    }}</span>
    <header class="mentorship-card__header">
      <div>
        <span class="mentorship-card__category">{{ program.category }}</span>
        <h2 :id="'program-' + program.id">{{ program.name }}</h2>
      </div>
      <span class="mentorship-card__symbol" aria-hidden="true"
        ><component
          :is="program.type === 'personal' ? UserRound : program.featured ? Trophy : Dumbbell"
          class="program-icon"
          aria-hidden="true"
          focusable="false"
      /></span>
    </header>
    <p class="mentorship-card__description">{{ program.description }}</p>
    <ul class="mentorship-card__features">
      <li v-for="feature in program.features" :key="feature">
        <span class="mentorship-card__check" aria-hidden="true">✓</span>
        <span>{{ feature }}</span>
      </li>
    </ul>
    <MentorshipContact :program-name="program.name" :featured="program.featured" />
  </article>
</template>

<style scoped>
.mentorship-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: clamp(24px, 2.2vw, 36px);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
}
.mentorship-card--featured {
  background: var(--rose);
  border: 2px solid var(--accent-text);
  box-shadow: 0 12px 32px #884b6020;
}
.mentorship-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.mentorship-card__category {
  display: block;
  color: var(--muted);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  margin-bottom: 12px;
}
.mentorship-card h2 {
  font-size: clamp(2rem, 2.8vw, 3rem);
  text-transform: uppercase;
}
.mentorship-card__symbol {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--sand);
  color: var(--ink);
  font-size: 2rem;
}
.mentorship-card--featured .mentorship-card__symbol {
  background: var(--accent);
}
.mentorship-card__description {
  color: var(--muted);
  font-size: 1rem;
  line-height: 1.7;
  margin: 24px 0;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border);
}
.mentorship-card__features {
  list-style: none;
  padding: 0;
  margin: 0 0 32px;
  flex: 1;
}
.mentorship-card__features li {
  display: flex;
  align-items: start;
  gap: 12px;
  font-size: 1rem;
  line-height: 1.75;
  margin-bottom: 14px;
}
.mentorship-card__features li:last-child {
  margin-bottom: 0;
}
.mentorship-card__check {
  flex-shrink: 0;
  color: var(--accent-text);
  font-weight: 700;
}
.mentorship-card--featured .mentorship-card__features li:first-child {
  font-weight: 700;
}
.mentorship-card__badge {
  position: absolute;
  top: -16px;
  left: 24px;
  padding: 8px 16px;
  border-radius: 999px;
  background: var(--accent-text);
  color: var(--on-dark);
  font-size: 0.8rem;
  font-weight: 700;
}
.mentorship-card__header > div {
  min-width: 0;
}
</style>
