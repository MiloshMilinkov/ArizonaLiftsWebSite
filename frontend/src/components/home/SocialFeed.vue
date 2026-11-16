<script setup>
import { ArrowUpRight } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
import { socialLinks } from '@/config/site'
import { socialPlatforms } from '@/config/socialPosts'
import SocialPostCard from './SocialPostCard.vue'

const { t } = useI18n()
const platforms = Object.entries(socialPlatforms).map(([key, platform]) => ({
  key,
  ...platform,
  profile: socialLinks[key],
}))
</script>

<template>
  <section id="social" class="social-feed" aria-labelledby="social-title">
    <header class="social-feed__intro">
      <span class="eyebrow"
        ><span class="dot" aria-hidden="true"></span>{{ t('social.eyebrow') }}</span
      >
      <h2 id="social-title">{{ t('social.title') }}</h2>
      <p>{{ t('social.description') }}</p>
    </header>

    <div
      v-for="platform in platforms"
      :key="platform.key"
      class="social-feed__platform"
      :aria-labelledby="'social-' + platform.key"
    >
      <div class="social-feed__label">
        <h3 :id="'social-' + platform.key">{{ platform.name }}</h3>
        <span class="social-feed__handle">@arizonalifts</span>
        <a :href="platform.profile" target="_blank" rel="noopener noreferrer"
          >{{ t('social.follow.' + platform.key) }}
          <ArrowUpRight class="ui-icon" aria-hidden="true" focusable="false"
        /></a>
      </div>
      <ul class="social-feed__posts">
        <li v-for="post in platform.posts" :key="post.id">
          <SocialPostCard :platform="platform" :post="post" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.social-feed {
  max-width: 1400px;
  margin: 0 auto 64px;
  padding: clamp(40px, 6vw, 80px) 6%;
  scroll-margin-top: 120px;
}
.social-feed__intro {
  max-width: 640px;
  margin-bottom: clamp(28px, 4vw, 48px);
}
h2 {
  font-size: clamp(2rem, 4vw, 3.4rem);
  margin: 18px 0 16px;
}
.social-feed__intro p {
  color: var(--muted);
  line-height: 1.8;
}
.social-feed__platform {
  display: grid;
  grid-template-columns: minmax(180px, 1fr) minmax(0, 3.4fr);
  gap: clamp(24px, 3vw, 40px);
  padding-top: 28px;
  border-top: 1px solid var(--border);
}
.social-feed__platform + .social-feed__platform {
  margin-top: clamp(40px, 5vw, 64px);
}
.social-feed__label {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
}
h3 {
  margin: 0;
  font-family: var(--font-heading);
  font-weight: 400;
  font-size: clamp(1.8rem, 2.6vw, 2.4rem);
  letter-spacing: 0.02em;
}
.social-feed__handle {
  font-size: 0.9rem;
  color: var(--accent-text);
}
.social-feed__label a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  padding: 12px 18px;
  border-radius: 10px;
  background: var(--ink);
  color: var(--on-dark);
  font-size: 0.85rem;
  font-weight: 600;
  transition: transform 0.18s;
}
.social-feed__label a:hover {
  transform: translateY(-2px);
}
.social-feed__posts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.social-feed__posts li {
  min-width: 0;
}
@media (max-width: 1000px) {
  .social-feed__platform {
    grid-template-columns: 1fr;
  }
  .social-feed__label {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: baseline;
    column-gap: 12px;
  }
  .social-feed__label a {
    margin: 0 0 0 auto;
  }
}
@media (max-width: 850px) {
  /* Swipeable row instead of six tall cards stacked on a phone. */
  .social-feed__posts {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-bottom: 12px;
  }
  .social-feed__posts li {
    flex: 0 0 min(78%, 300px);
    scroll-snap-align: start;
  }
}
@media (prefers-reduced-motion: reduce) {
  .social-feed__label a {
    transition: none;
  }
}
</style>
