<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const props = defineProps({ story: { type: Object, required: true } })
const { locale } = useI18n()
const copy = computed(() => props.story[locale.value] || props.story.en)
</script>
<template>
  <div class="transformation-photo">
    <img
      :src="story.image"
      :width="story.width"
      :height="story.height"
      :alt="copy.alt"
      loading="lazy"
      decoding="async"
    />
  </div>
</template>
<style scoped>
.transformation-photo {
  break-inside: avoid;
  margin-bottom: 24px;
  overflow: hidden;
  border-radius: 16px;
  background: var(--sand);
  border: 1px solid var(--border);
}
img {
  display: block;
  width: 100%;
  height: auto;
}
</style>
