import { createRouter, createWebHistory } from 'vue-router'
import i18n from '@/i18n'
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
      component: () => import('@/views/HomeView.vue'),
      meta: { titleKey: 'meta.home' },
    },
    {
      path: '/:locale(en|sr)/programs',
      name: 'programs',
      component: () => import('@/views/ProgramsView.vue'),
      meta: { titleKey: 'meta.programs' },
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, from) {
    if (to.name === from.name && to.params.locale !== from.params.locale) return false
    return { top: 0 }
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
