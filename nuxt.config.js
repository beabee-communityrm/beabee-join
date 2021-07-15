import meta from './content/meta.json';

export default {
  components: true,
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
  plugins: [
    '~/plugins/submitForm.client'
  ],
  modules: [
    '~/modules/content',
    '@nuxtjs/axios',
    ['nuxt-buefy', {css: false}]
  ],
  axios: {
    baseURL: process.env.AUDIENCE_URL
  },
  css: [
    '~/assets/css/fork-awesome.min',
    `~/assets/css/theme/${process.env.THEME}`
  ],
  http: {serverTimeout: 5000},
  serverMiddleware: [
    '~/server-middleware/rest.js',
  ],
  target: 'server',
  env: {
    AUDIENCE_URL: process.env.AUDIENCE_URL
  }
}
