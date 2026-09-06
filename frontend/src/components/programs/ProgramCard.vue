<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
import { socialLinks } from '@/config/site'

defineProps({
  program: { type: Object, required: true },
  index: { type: Number, required: true },
  expanded: { type: Boolean, default: false },
})
const emit = defineEmits(['toggle'])
</script>

<template>
  <article class="program-card" :class="{ featured: program.featured }">
    <div class="card-top">
      <span>0{{ index + 1 }} / {{ program.category }}</span
      ><span>{{ program.symbol }}</span>
    </div>
    <div class="card-body">
      <span class="pill">{{ program.label }}</span>
      <h2>{{ program.name }}</h2>
      <p>{{ program.description }}</p>
      <ul>
        <li v-for="feature in program.features" :key="feature"><span>↗</span>{{ feature }}</li>
      </ul>
      <button
        class="detail-toggle"
        :aria-expanded="expanded"
        :aria-controls="`details-${program.id}`"
        @click="emit('toggle')"
      >
        {{ t('programs.for') }} <span>{{ expanded ? '−' : '+' }}</span>
      </button>
      <p v-if="expanded" :id="`details-${program.id}`" class="detail">{{ program.suitedFor }}</p>
      <a
        class="button"
        :class="program.featured ? 'primary' : 'outline'"
        :href="socialLinks.instagram"
        target="_blank"
        rel="noopener noreferrer"
        >{{ t('programs.ask') }} <span>↗</span></a
      >
    </div>
  </article>
</template>
