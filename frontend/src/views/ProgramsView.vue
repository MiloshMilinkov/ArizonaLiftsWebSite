<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
const { t } = useI18n()
import ProgramCard from '@/components/programs/ProgramCard.vue'
import { getPrograms } from '@/services/programService'
import { socialLinks } from '@/config/site'
import { useLocalizedResource } from '@/composables/useLocalizedResource'
const { data: programs, loading, error, reload: load } = useLocalizedResource(getPrograms, [])
const onlinePrograms = computed(() => programs.value.filter((program) => program.type === 'online'))
const personalPrograms = computed(() =>
  programs.value.filter((program) => program.type === 'personal'),
)
</script>
<template>
  <section class="program-heading mentorship-heading">
    <div class="eyebrow"><span class="dot"></span> {{ t('programs.chapter') }}</div>
    <div class="program-title">
      <h1>
        {{ t('programs.goals') }}<br /><em>{{ t('programs.forward') }}</em>
      </h1>
      <p>{{ t('programs.support') }}<br />{{ t('programs.fit') }}</p>
    </div>
  </section>
  <section class="program-section" :aria-label="t('nav.programs')">
    <p class="mentorship-note">
      {{ t('programs.note') }}
    </p>
    <div v-if="loading" class="status" role="status">{{ t('programs.loading') }}</div>
    <div v-else-if="error" class="status" role="alert">
      <p>{{ t('programs.error') }}</p>
      <button class="button primary" @click="load">{{ t('common.retry') }} ↻</button>
    </div>
    <p v-else-if="!programs.length" class="status">
      {{ t('programs.empty') }}
    </p>
    <div v-else class="mentorship-grid">
      <ProgramCard v-for="program in onlinePrograms" :key="program.id" :program="program" />
    </div>
  </section>
  <section
    v-if="!loading && !error && personalPrograms.length"
    class="program-section personal-mentorship"
    aria-labelledby="personal-mentorship-title"
  >
    <div class="personal-mentorship__heading">
      <h2 id="personal-mentorship-title">{{ t('programs.personalTitle') }}</h2>
      <p>{{ t('programs.personalDescription') }}</p>
    </div>
    <div class="personal-mentorship__cards">
      <ProgramCard v-for="program in personalPrograms" :key="program.id" :program="program" />
    </div>
  </section>
  <section class="contact-strip">
    <div>
      <span class="eyebrow">{{ t('contact.fit') }}</span>
      <h2>{{ t('contact.start') }}</h2>
      <p>{{ t('contact.goals') }}</p>
    </div>
    <a
      class="button primary"
      :href="socialLinks.instagram"
      target="_blank"
      rel="noopener noreferrer"
      >{{ t('contact.talk') }} <span>↗</span></a
    >
  </section>
</template>

<style scoped>
.mentorship-heading {
  text-align: center;
}
.mentorship-heading .eyebrow {
  justify-content: center;
}
.mentorship-heading .program-title {
  display: block;
}
.mentorship-heading h1 {
  text-transform: uppercase;
  font-size: clamp(3.25rem, 7vw, 6.5rem);
}
.mentorship-heading .program-title p {
  margin-top: 24px;
}
.mentorship-note {
  color: var(--muted);
  text-align: center;
  line-height: 1.7;
  font-size: 0.9rem;
  margin: 0 auto 28px;
}
.mentorship-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  max-width: 1120px;
  margin: 0 auto;
}
@media (max-width: 760px) {
  .mentorship-grid {
    grid-template-columns: 1fr;
  }
}
.personal-mentorship__heading {
  max-width: 1120px;
  margin: 0 auto 32px;
  padding-top: 48px;
  border-top: 1px solid var(--border);
  text-align: center;
}
.personal-mentorship__heading h2 {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  text-transform: uppercase;
}
.personal-mentorship__heading p {
  margin-top: 20px;
  color: var(--muted);
  line-height: 1.7;
}
.personal-mentorship__cards {
  max-width: 720px;
  margin: 0 auto;
  display: grid;
  gap: 24px;
}
</style>
