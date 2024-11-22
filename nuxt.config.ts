// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/tailwindcss', 'nuxt-vuefire'],
  vuefire: {
    auth: {
      enabled: true,
    },
    config: {},
  },
});
