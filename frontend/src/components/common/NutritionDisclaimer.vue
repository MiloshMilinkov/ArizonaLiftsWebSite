<script setup>
import { ref, useId, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { Info, X } from '@lucide/vue'
const { t } = useI18n()
const dialog = ref(null)
const trigger = ref(null)
const titleId = useId()
function close() {
  dialog.value?.close()
}
function restoreFocus() {
  trigger.value?.focus({ preventScroll: true })
}
function closeBackdrop(event) {
  if (event.target !== dialog.value) return
  const rect = dialog.value.getBoundingClientRect()
  if (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  )
    close()
}
onBeforeUnmount(close)
</script>
<template>
  <button
    ref="trigger"
    type="button"
    class="disclaimer-trigger"
    aria-haspopup="dialog"
    @click="dialog.showModal()"
  >
    <Info :size="18" aria-hidden="true" />{{ t('nutrition.button') }}
  </button>
  <Teleport to="body">
    <dialog
      ref="dialog"
      class="disclaimer-dialog"
      :aria-labelledby="titleId"
      @click="closeBackdrop"
      @close="restoreFocus"
    >
      <header class="disclaimer-heading">
        <h2 :id="titleId">{{ t('nutrition.title') }}</h2>
        <button
          type="button"
          class="disclaimer-close"
          :aria-label="t('nutrition.close')"
          autofocus
          @click="close"
        >
          <X :size="22" aria-hidden="true" />
        </button>
      </header>
      <p>{{ t('nutrition.short') }}</p>
      <p>{{ t('nutrition.detail') }}</p>
    </dialog>
  </Teleport>
</template>
<style scoped>
.disclaimer-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 16px 0;
  padding: 10px 14px;
  min-height: 44px;
  background: var(--surface);
  color: var(--accent-text);
  border: 1px solid var(--control-border);
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
}
.disclaimer-trigger:hover {
  background: var(--rose);
}
.disclaimer-dialog {
  width: min(560px, calc(100% - 32px));
  max-height: calc(100dvh - 48px);
  overflow-y: auto;
  padding: clamp(22px, 5vw, 36px);
  margin: auto;
  border: 1px solid var(--border);
  border-radius: 20px;
  background: var(--surface);
  color: var(--ink);
  box-shadow: 0 24px 80px #44303940;
}
.disclaimer-dialog::backdrop {
  background: #30202899;
}
.disclaimer-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}
h2 {
  margin: 0;
  font-size: clamp(1.6rem, 5vw, 2rem);
}
.disclaimer-close {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: var(--rose);
  color: var(--ink);
}
p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.8;
  color: var(--muted);
}
p + p {
  margin-top: 16px;
}
</style>
