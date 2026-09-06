<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { contactLinks } from '@/config/site'

const props = defineProps({
  programName: { type: String, required: true },
  featured: { type: Boolean, default: false },
})
const { t } = useI18n()
const emailLink = computed(() => {
  const subject = t('contact.emailSubject', { program: props.programName })
  return 'mailto:' + contactLinks.email + '?subject=' + encodeURIComponent(subject)
})
</script>

<template>
  <details class="mentorship-contact">
    <summary class="button contact-toggle" :class="{ 'contact-toggle--featured': featured }">
      {{ t('programs.ask') }} <span class="contact-toggle__indicator" aria-hidden="true">+</span>
    </summary>
    <div class="contact-options">
      <a :href="contactLinks.instagramMessage" target="_blank" rel="noopener noreferrer">
        {{ t('contact.instagramMessage') }} <span aria-hidden="true">↗</span>
      </a>
      <a :href="emailLink"> {{ t('contact.emailArizona') }} <span aria-hidden="true">↗</span> </a>
    </div>
  </details>
</template>

<style scoped>
.mentorship-contact {
  width: 100%;
}
.contact-toggle {
  width: 100%;
  cursor: pointer;
  list-style: none;
  border-color: var(--control-border);
}
.contact-toggle::-webkit-details-marker {
  display: none;
}
.contact-toggle:hover {
  background: var(--rose);
}
.contact-toggle:focus-visible {
  outline: 3px solid var(--focus);
  outline-offset: 5px;
}
.contact-toggle--featured {
  background: var(--ink);
  color: var(--on-dark);
  border-color: var(--ink);
}
.contact-toggle--featured:hover {
  background: var(--accent-text);
}
.contact-toggle__indicator {
  font-size: 1.25rem;
}
details[open] .contact-toggle__indicator {
  transform: rotate(45deg);
}
.contact-options {
  display: grid;
  gap: 10px;
  margin-top: 12px;
}
.contact-options a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 48px;
  padding: 14px 16px;
  border: 1px solid var(--control-border);
  border-radius: 10px;
  background: var(--surface);
  color: var(--ink);
  font-size: 0.9rem;
  line-height: 1.5;
}
.contact-options a:hover {
  background: var(--sand);
}
</style>
