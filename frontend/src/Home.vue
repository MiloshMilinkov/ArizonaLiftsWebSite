<script setup>
import { onMounted, ref } from 'vue'
import { getJson } from './api'
const profile=ref(null), error=ref('')
async function load(){error.value='';try{profile.value=await getJson('/api/site')}catch{error.value='The trainer introduction is unavailable right now.'}}
onMounted(load)
</script>
<template>
<section class="hero"><div class="hero-copy"><div class="eyebrow"><span class="dot"></span> ARIZONA LIFTS · ONLINE FITNESS</div><h1>Built by you.<br>Stronger<br><em>together.</em></h1><p class="hero-description">A little guidance. A lot of growth. Make space for a stronger, more confident you — one workout at a time.</p><RouterLink class="button primary" to="/programs">Find your program <span>↗</span></RouterLink><a class="text-link" href="https://www.instagram.com/arizonalifts/" target="_blank" rel="noopener noreferrer">Get to know Arizona Lifts ↗</a><div class="hero-bottom"><span>STRENGTH WITH PURPOSE</span><span>01 / THE START</span></div></div><figure class="hero-image"><img src="https://images.pexels.com/photos/136410/pexels-photo-136410.jpeg?auto=compress&amp;dpr=1&amp;h=750&amp;w=1260" alt="Stock photograph of an athlete training with dumbbells in a gym" fetchpriority="high"><div class="image-label"><span>SHOW UP FOR<br><b>YOURSELF.</b></span><span class="round-arrow">↗</span></div><figcaption>Training inspiration · stock photo</figcaption></figure></section>
<div class="ticker" aria-label="Training values"><span>STRONGER EVERY DAY</span><b>✳</b><span>PROGRESS OVER PERFECTION</span><b>✳</b><span>YOUR PACE. YOUR POWER.</span><b>✳</b></div>
<section class="intro"><div><span class="eyebrow">THE MINDSET</span><h2>More than a workout.<br>A commitment to <em>you.</em></h2></div><div class="intro-copy"><template v-if="profile"><p>{{ profile.description }}</p><blockquote>{{ profile.quote }}</blockquote><span class="small">{{ profile.quoteAttribution }}</span></template><div v-else-if="error" role="alert"><p>{{ error }}</p><button class="text-button" @click="load">Try again ↗</button></div><p v-else role="status">Loading the introduction…</p><RouterLink class="text-link" to="/programs">Explore ways to train ↗</RouterLink></div></section>
</template>
