<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const open = ref(false)
const route = useRoute()
watch(()=>route.path,()=>open.value=false)
</script>
<template>
  <a class="skip" href="#main">Skip to content</a>
  <header class="header"><RouterLink class="brand" to="/" aria-label="Arizona Lifts home">arizona<span>lifts</span><i>↗</i></RouterLink><button class="menu" :aria-expanded="open" aria-controls="navigation" @click="open=!open">{{ open ? 'Close −' : 'Menu +' }}</button><nav id="navigation" :class="{open}" aria-label="Main navigation"><RouterLink to="/">Home</RouterLink><RouterLink to="/programs">Programs & mentorship</RouterLink><a class="nav-cta" href="https://www.instagram.com/arizonalifts/" target="_blank" rel="noopener noreferrer">Let’s talk <span>↗</span></a></nav></header>
  <main id="main" tabindex="-1"><RouterView /></main>
  <footer><div class="footer-top"><RouterLink class="brand" to="/">arizona<span>lifts</span><i>↗</i></RouterLink><p>Build strength. Find your confidence.</p><a href="https://www.instagram.com/arizonalifts/" target="_blank" rel="noopener noreferrer">Instagram ↗</a></div><div class="footer-bottom"><span>© {{ new Date().getFullYear() }} Arizona Lifts. All rights reserved.</span><span>One rep. One day. One stronger you.</span></div></footer>
</template>
