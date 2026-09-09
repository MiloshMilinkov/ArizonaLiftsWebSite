<script setup>
import NutritionDisclaimer from '@/components/common/NutritionDisclaimer.vue'
import { useCoachingContent } from '@/composables/useCoachingContent'
import { heroSlides } from '@/config/heroSlides'
const content = useCoachingContent()
const photo = heroSlides.find((slide) => slide.id !== 'stock-training')
</script>
<template>
  <section id="about-kristina" class="coaching-about" aria-labelledby="about-title">
    <img v-if="photo" :src="photo.src" :alt="content.photoAlt" loading="lazy" decoding="async" />
    <div>
      <span class="eyebrow">{{ content.aboutLabel }}</span>
      <h2 id="about-title">{{ content.aboutTitle }}</h2>
      <p v-for="paragraph in content.about" :key="paragraph">{{ paragraph }}</p>
      <NutritionDisclaimer />
    </div>
  </section>
  <section class="coaching-section" aria-labelledby="audience-title">
    <h2 id="audience-title">{{ content.audienceTitle }}</h2>
    <div class="coaching-audience">
      <article v-for="item in content.audience" :key="item.title">
        <h3>{{ item.title }}</h3>
        <p>{{ item.text }}</p>
      </article>
    </div>
  </section>
  <section class="coaching-section coaching-steps" aria-labelledby="steps-title">
    <h2 id="steps-title">{{ content.stepsTitle }}</h2>
    <ol>
      <li v-for="(step, index) in content.steps" :key="step.title">
        <span class="step-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
        <div>
          <h3>{{ step.title }}</h3>
          <p>{{ step.text }}</p>
        </div>
      </li>
    </ol>
    <NutritionDisclaimer />
  </section>
</template>
<style scoped>
.coaching-about,
.coaching-section {
  max-width: 1400px;
  margin: auto;
  padding: clamp(40px, 6vw, 80px) 6%;
}
.coaching-about {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  align-items: center;
  gap: 6%;
  scroll-margin-top: 120px;
}
.coaching-about img {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: 20px;
}
h2 {
  font-size: clamp(2rem, 4vw, 3.4rem);
  margin: 18px 0 28px;
}
p {
  color: var(--muted);
  line-height: 1.8;
}
p + p {
  margin-top: 18px;
}
h3 {
  font-size: 1.6rem;
  margin: 0 0 16px;
}
.coaching-audience {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}
article {
  padding: 28px;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--surface);
}
.coaching-steps {
  background: linear-gradient(110deg, var(--sand), var(--rose));
  border-radius: 20px;
  margin-bottom: 64px;
}
ol {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
}
li {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}
.step-number {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--ink);
  color: var(--on-dark);
}
@media (max-width: 760px) {
  .coaching-about,
  .coaching-audience,
  ol {
    grid-template-columns: 1fr;
  }
  .coaching-about {
    gap: 32px;
  }
  .coaching-about img {
    max-height: 420px;
  }
  .coaching-steps {
    border-radius: 0;
    margin-bottom: 32px;
  }
}
</style>
