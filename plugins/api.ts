export default defineNuxtPlugin((nuxtApp) => {
  const api = $fetch.create({
    baseURL: useRuntimeConfig().public.apiBaseUrl ?? 'http://localhost:7250',
    credentials: 'include',
  });

  nuxtApp.provide('api', api);
});
