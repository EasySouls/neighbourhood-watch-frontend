// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
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
    config: {
      apiKey: 'AIzaSyA_regKu9fgQ4c-R8AS3TfF0ySW5gZRBEE',
      authDomain: 'neighbourhood-watch-509e0.firebaseapp.com',
      projectId: 'neighbourhood-watch-509e0',
      storageBucket: 'neighbourhood-watch-509e0.firebasestorage.app',
      messagingSenderId: '565255526617',
      appId: '1:565255526617:web:558dc8ec6e4628c0a9c6c8',
      measurementId: 'G-7G7CT2QN21',
    },
  },
  ui: {
    global: true,
  },
});
