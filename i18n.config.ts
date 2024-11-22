export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      welcome: 'Welcome',
      login: 'Login',
    },
    hu: {
      welcome: 'Üdvözöljük',
      login: 'Bejelentkezés',
    },
  },
}));
