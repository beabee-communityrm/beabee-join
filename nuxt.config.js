export default {
  head: {
    title: 'Beabee',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'my website description'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  plugins: [
    '~/plugins/submitForm.client'
  ],
  modules: [
    '@nuxt/http',
    'nuxt-buefy',
  ],
  css: [
    '~/assets/css/fork-awesome.min.css',
    `~/assets/css/theme/${process.env.THEME}.scss`,
    '~/assets/css/main.css',
  ],
  http: {serverTimeout: 5000},
  serverMiddleware: [
    '~/server-middleware/rest.js',
  ],
  target: 'server',
  build: { // https://github.com/nuxt/nuxt.js/issues/9224#issuecomment-830577523
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]],
    },
  },
  env: {
    THEME: process.env.THEME,
    AUDIENCE_URL: process.env.AUDIENCE_URL,
    API_URL: process.env.API_URL
  }
}
