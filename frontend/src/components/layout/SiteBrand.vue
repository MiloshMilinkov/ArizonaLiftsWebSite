<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
</script>
<template>
  <RouterLink class="brand" :to="{ name: 'home', params: { locale } }" :aria-label="t('nav.brand')"
    >arizona<span>lifts</span><i>↗</i></RouterLink
  >
</template>
