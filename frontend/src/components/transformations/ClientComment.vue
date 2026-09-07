<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const props = defineProps({ comment: { type: Object, required: true } })
const { t, locale } = useI18n()
const copy = computed(() => props.comment[locale.value] || props.comment.en)
</script>
<template>
  <article class="client-comment">
    <h4>{{ copy.title }}</h4>
    <img
      :src="comment.image"
      :width="comment.width"
      :height="comment.height"
      :alt="t('transformations.commentImageAlt', { title: copy.title })"
      lang="sr-Latn"
      loading="lazy"
      decoding="async"
    />
    <details>
      <summary>
        {{
          locale === 'en'
            ? t('transformations.readTranslation')
            : t('transformations.readTranscript')
        }}
      </summary>
      <p>{{ copy.text }}</p>
    </details>
  </article>
</template>
<style scoped>
.client-comment {
  break-inside: avoid;
  margin-bottom: 24px;
  padding: clamp(18px, 3vw, 28px);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
}
h4 {
  font-size: 1.6rem;
  margin: 0 0 20px;
}
img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 10px;
}
details {
  margin-top: 20px;
}
summary {
  cursor: pointer;
  color: var(--accent-text);
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.5;
}
summary:focus-visible {
  outline: 3px solid var(--focus);
  outline-offset: 5px;
}
p {
  padding-top: 16px;
  color: var(--muted);
  line-height: 1.8;
}
</style>
