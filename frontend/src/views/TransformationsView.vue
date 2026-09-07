<script setup>
import { useI18n } from 'vue-i18n'
import TransformationCard from '@/components/transformations/TransformationCard.vue'
import ClientComment from '@/components/transformations/ClientComment.vue'
import comments from '@/content/testimonials.json'
import stories from '@/content/transformations.json'
const { t } = useI18n()
</script>

<template>
  <section class="transformations" aria-labelledby="transformations-title">
    <div class="transformations__heading">
      <span class="eyebrow">{{ t('transformations.eyebrow') }}</span>
      <h2 id="transformations-title">{{ t('transformations.title') }}</h2>
      <p>{{ t('transformations.description') }}</p>
    </div>
    <div class="transformations__grid">
      <TransformationCard v-for="story in stories" :key="story.id" :story="story" />
    </div>
    <section class="client-comments" aria-labelledby="client-comments-title">
      <div class="transformations__heading">
        <span class="eyebrow">{{ t('transformations.commentsEyebrow') }}</span>
        <h3 id="client-comments-title">{{ t('transformations.commentsTitle') }}</h3>
        <p>{{ t('transformations.commentsDescription') }}</p>
      </div>
      <div class="client-comments__grid">
        <ClientComment v-for="comment in comments" :key="comment.id" :comment="comment" />
      </div>
    </section>
  </section>
</template>

<style scoped>
.transformations {
  max-width: 1600px;
  margin: auto;
  padding: clamp(48px, 7vw, 96px) 6%;
}
.transformations__heading {
  max-width: 800px;
  margin: 0 auto 48px;
  text-align: center;
}
.transformations__heading .eyebrow {
  justify-content: center;
}
.transformations__heading h2 {
  font-size: clamp(2.8rem, 6vw, 5.5rem);
  margin: 24px 0;
  text-transform: uppercase;
}
.transformations__heading p {
  color: var(--muted);
  line-height: 1.8;
}
.transformations__grid {
  columns: 3;
  column-gap: 24px;
  max-width: 1120px;
  margin: auto;
}
.client-comments {
  margin-top: clamp(56px, 8vw, 100px);
  padding-top: 56px;
  border-top: 1px solid var(--border);
}
.client-comments h3 {
  font-size: clamp(2.4rem, 5vw, 4rem);
  margin: 24px 0;
}
.client-comments__grid {
  columns: 2;
  column-gap: 24px;
  max-width: 1000px;
  margin: auto;
}
@media (max-width: 1000px) {
  .transformations__grid {
    columns: 2;
  }
}
@media (max-width: 600px) {
  .transformations__grid,
  .client-comments__grid {
    columns: 1;
  }
}
</style>
