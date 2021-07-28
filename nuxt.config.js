import meta from './content/meta.json';

export default {
  components: true,
  target: 'server',
  head: {
    title: meta.title,
    bodyAttrs: {
      class: 'no-js'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: meta.description
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  css: [
    '~/assets/css/fork-awesome.min',
    `~/assets/css/theme/${process.env.THEME}`
  ],
  plugins: [
    '~/plugins/submitForm.client'
  ],
  modules: [
    '~/modules/content',
    '@nuxtjs/axios',
    'nuxt-i18n',
    ['nuxt-buefy', {css: false}]
  ],
  axios: {
    baseURL: process.env.AUDIENCE_URL
  },
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en'
  },
  serverMiddleware: [
    '~/server-middleware/rest.js',
  ]
}
