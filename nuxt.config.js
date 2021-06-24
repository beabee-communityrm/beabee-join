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
    ['nuxt-buefy', {css: false}]
  ],
  css: [
    '~/assets/css/fork-awesome.min',
    `~/assets/css/theme/${process.env.THEME}`,
    '~/assets/css/main',
  ],
  http: {serverTimeout: 5000},
  serverMiddleware: [
    '~/server-middleware/rest.js',
  ],
  target: 'server',
  build: { // https://github.com/nuxt/nuxt.js/issues/9224#issuecomment-830577523
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]],
    }
  },
  env: {
    AUDIENCE_URL: process.env.AUDIENCE_URL,
    API_URL: process.env.API_URL
  }
}
