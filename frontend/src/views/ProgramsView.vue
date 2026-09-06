<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
import { ref } from 'vue'
import ProgramCard from '@/components/programs/ProgramCard.vue'
import { getPrograms } from '@/services/programService'
import { socialLinks } from '@/config/site'
import { useLocalizedResource } from '@/composables/useLocalizedResource'
const { data: programs, loading, error, reload: load } = useLocalizedResource(getPrograms, [])
const expanded = ref(null)
</script>
<template>
  <section class="program-heading">
    <div class="eyebrow"><span class="dot"></span> {{ t('programs.chapter') }}</div>
    <div class="program-title">
      <h1>
        {{ t('programs.goals') }}<br /><em>{{ t('programs.forward') }}</em>
      </h1>
      <p>{{ t('programs.support') }}<br />{{ t('programs.fit') }}</p>
    </div>
  </section>
  <section class="program-section" :aria-label="t('nav.programs')">
    <p class="draft-note">
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
    <div v-else class="program-grid">
      <ProgramCard
        v-for="(program, index) in programs"
        :key="program.id"
        :program="program"
        :index="index"
        :expanded="expanded === program.id"
        @toggle="expanded = expanded === program.id ? null : program.id"
      />
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
