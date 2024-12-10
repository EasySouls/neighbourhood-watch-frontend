export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      welcome: 'Welcome',
      login: 'Login',
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
    },
    hu: {
      welcome: 'Üdvözöljük',
      login: 'Bejelentkezés',
      firstName: 'Keresztnév',
      lastName: 'Vezetéknév',
      email: 'Email',
      password: 'Jelszó',
      confirmPassword: 'Jelszó megerősítése',
    },
  },
}));
