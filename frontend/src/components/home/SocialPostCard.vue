<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import { ArrowUpRight, Play } from '@lucide/vue'
import { useI18n } from 'vue-i18n'

// Shows a self-hosted cover, caption and date; the third-party player (and its scripts and
// cookies) loads only when the visitor presses play.
const props = defineProps({
  platform: { type: Object, required: true },
  post: { type: Object, required: true },
})
const { t, locale } = useI18n()
const playing = ref(false)
const frame = ref(null)
const frameHeight = ref(0)
const captionId = 'social-caption-' + props.post.id
const dateLabel = computed(() =>
  new Intl.DateTimeFormat(locale.value === 'sr' ? 'sr-Latn-RS' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(props.post.date)),
)

// Instagram's embed reports its content height via postMessage; size the frame to fit.
function onMessage(event) {
  if (event.origin !== 'https://www.instagram.com' || event.source !== frame.value?.contentWindow)
    return
  try {
    const message = JSON.parse(event.data)
    if (message.type === 'MEASURE' && message.details?.height > 0)
      frameHeight.value = Math.ceil(message.details.height)
  } catch {
    // Not a message we understand.
  }
}

async function play() {
  window.addEventListener('message', onMessage)
  playing.value = true
  await nextTick()
  frame.value?.focus()
}
onBeforeUnmount(() => window.removeEventListener('message', onMessage))
</script>

<template>
  <article class="social-post">
    <iframe
      v-if="playing"
      ref="frame"
      class="social-post__media"
      :src="platform.embed(post.id)"
      :style="frameHeight ? { height: frameHeight + 'px' } : null"
      :title="t('social.playerTitle.' + platform.key)"
      scrolling="no"
      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
      allowfullscreen
    ></iframe>
    <button
      v-else
      type="button"
      class="social-post__poster"
      :aria-label="t('social.play.' + platform.key)"
      :aria-describedby="captionId"
      @click="play"
    >
      <img
        class="social-post__media"
        :src="platform.poster(post.id)"
        :alt="post.caption"
        lang="sr"
        width="540"
        height="960"
        loading="lazy"
        decoding="async"
      />
      <span class="social-post__play" aria-hidden="true"><Play focusable="false" /></span>
    </button>
    <div class="social-post__body">
      <time :datetime="post.date">{{ dateLabel }}</time>
      <p :id="captionId" lang="sr">{{ post.caption }}</p>
      <a
        :href="platform.url(post.id)"
        target="_blank"
        rel="noopener noreferrer"
        :aria-describedby="captionId"
        >{{ t('social.viewOn.' + platform.key) }}
        <ArrowUpRight class="ui-icon" aria-hidden="true" focusable="false"
      /></a>
    </div>
  </article>
</template>

<style scoped>
.social-post {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  background: var(--surface);
}
.social-post__media {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 9 / 16;
  border: 0;
  object-fit: cover;
  background: var(--ink);
}
.social-post__poster {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: none;
}
.social-post__poster:focus-visible {
  outline-offset: -6px;
}
.social-post__play {
  position: absolute;
  top: 50%;
  left: 50%;
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--accent);
  color: var(--ink);
  font-size: 1.6rem;
  transform: translate(-50%, -50%);
  box-shadow: 0 8px 24px rgb(0 0 0 / 0.3);
  transition: transform 0.18s;
}
.social-post__poster:hover .social-post__play {
  transform: translate(-50%, -50%) scale(1.08);
}
.social-post__body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  padding: 18px 20px 20px;
}
time {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: var(--muted);
}
p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  overflow: hidden;
  font-size: 0.92rem;
  line-height: 1.6;
}
a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 5px;
}
@media (prefers-reduced-motion: reduce) {
  .social-post__play {
    transition: none;
  }
}
</style>
