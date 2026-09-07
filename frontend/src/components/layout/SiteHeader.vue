<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SiteBrand from './SiteBrand.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'
import { socialLinks } from '@/config/site'

const open = ref(false)
const header = ref(null)
const menuButton = ref(null)
function closeWithEscape() {
  if (!open.value) return
  open.value = false
  menuButton.value?.focus()
}
function closeOutside(event) {
  if (open.value && !header.value?.contains(event.target)) open.value = false
}
onMounted(() => document.addEventListener('pointerdown', closeOutside))
onBeforeUnmount(() => document.removeEventListener('pointerdown', closeOutside))
const route = useRoute()
watch(
  () => route.path,
  () => {
    open.value = false
  },
)
</script>

<template>
  <header ref="header" class="header" @keydown.esc="closeWithEscape">
    <SiteBrand /><button
      ref="menuButton"
      type="button"
      class="menu"
      :aria-label="open ? t('nav.close') : t('nav.menu')"
      :aria-expanded="open"
      aria-controls="navigation"
      @click="open = !open"
    >
      <span class="burger" :class="{ 'burger--open': open }" aria-hidden="true"
        ><span></span><span></span><span></span
      ></span>
    </button>
    <nav @click="open = false" id="navigation" :class="{ open }" :aria-label="t('nav.label')">
      <RouterLink :to="{ name: 'home', params: { locale } }">{{ t('nav.home') }}</RouterLink
      ><RouterLink :to="{ name: 'programs', params: { locale } }">{{
        t('nav.programs')
      }}</RouterLink
      ><a class="nav-cta" :href="socialLinks.instagram" target="_blank" rel="noopener noreferrer"
        >{{ t('nav.talk') }} <span>↗</span></a
      >
    </nav>
    <LanguageSwitcher />
  </header>
</template>

<style scoped>
.burger {
  position: relative;
  display: block;
  width: 22px;
  height: 18px;
}
.burger > span {
  position: absolute;
  left: 0;
  width: 22px;
  height: 2px;
  border-radius: 2px;
  background: currentColor;
  transition:
    transform 180ms ease,
    opacity 180ms ease;
}
.burger > span:nth-child(1) {
  top: 0;
}
.burger > span:nth-child(2) {
  top: 8px;
}
.burger > span:nth-child(3) {
  top: 16px;
}
.burger--open > span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}
.burger--open > span:nth-child(2) {
  opacity: 0;
}
.burger--open > span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}
@media (max-width: 850px) {
  .header {
    position: sticky;
    top: 0;
    z-index: 15;
    width: 100%;
    background: var(--background);
    box-shadow: 0 4px 18px #4430390d;
  }
  .header .menu {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 46px;
    padding: 0;
    flex-shrink: 0;
  }
  .header > nav {
    gap: 8px;
    max-height: calc(100dvh - 140px);
    overflow-y: auto;
    border-radius: 0 0 16px 16px;
    box-shadow: 0 14px 22px #44303918;
  }
  .header > nav > a {
    display: flex;
    align-items: center;
    min-height: 48px;
    padding: 14px 16px;
    border: 0;
    border-radius: 8px;
    font-size: 1rem;
  }
  .header > nav > a.router-link-exact-active {
    background: var(--rose);
    font-weight: 700;
  }
  .header > nav > a:not(.nav-cta):hover {
    background: var(--sand);
  }
}
</style>
