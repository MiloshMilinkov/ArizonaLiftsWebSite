import { createRouter, createWebHistory } from 'vue-router'
import i18n from '@/i18n'
import JourneyView from '@/views/JourneyView.vue'
import { browserLocale, languageTags, rememberLocale } from '@/i18n/locale'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: (to) => ({
        name: 'home',
        params: { locale: browserLocale() },
        query: to.query,
        hash: to.hash,
      }),
    },
    {
      path: '/programs',
      redirect: (to) => ({
        name: 'programs',
        params: { locale: browserLocale() },
        query: to.query,
        hash: to.hash,
      }),
    },
    {
      path: '/:locale(en|sr)',
      name: 'home',
      component: JourneyView,
      meta: { titleKey: 'meta.home' },
    },
    {
      path: '/:locale(en|sr)/programs',
      name: 'programs',
      component: JourneyView,
      meta: { titleKey: 'meta.programs' },
    },
    {
      path: '/transformations',
      redirect: () => ({ name: 'transformations', params: { locale: browserLocale() } }),
    },
    {
      path: '/:locale(en|sr)/transformations',
      name: 'transformations',
      component: JourneyView,
      meta: { titleKey: 'meta.transformations' },
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (from.name && to.params.locale !== from.params.locale) return false
    // Wait until the initial app mount has rendered the shared sections.
    return new Promise((resolve) =>
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          const target = document.getElementById(to.hash.slice(1) || to.name)
          if (!target) return resolve({ top: 0 })
          const headerHeight =
            document.querySelector('.header')?.getBoundingClientRect().height || 100
          resolve({
            el: target,
            top: headerHeight + 20,
            behavior:
              from.name && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
                ? 'smooth'
                : 'auto',
          })
        }),
      ),
    )
  },
})

router.afterEach((to, from, failure) => {
  if (failure || !languageTags[to.params.locale]) return
  const locale = to.params.locale
  i18n.global.locale.value = locale
  rememberLocale(locale)
  document.documentElement.lang = languageTags[locale]
  document.title = i18n.global.t(to.meta.titleKey)
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', i18n.global.t('meta.description'))
})
export default router
