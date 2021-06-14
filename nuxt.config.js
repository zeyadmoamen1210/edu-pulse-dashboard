export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'educational-dashboard',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
  bootstrapVue: {
    // Add the icon plugin to the `componentsPlugins` array
    componentPlugins: ['LayoutPlugin']
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/moment.js',
    '@/plugins/vuesax.js',
    '@/plugins/vue-phone.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'bootstrap-vue/nuxt'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://educational-be.herokuapp.com/api/v1',
      common: { 
          Accept: 'application/json',
          Authorization: '',
      },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },


  auth: {
    // Options
    strategies: {
        local: {
            endpoints: {
                login: {
                    url: 'login',
                    method: 'post',
                    propertyName: 'token',
                },
                user: false,
                logout: false,
            },
            // tokenRequired: true,
            tokenType: 'Bearer',
        },
    },
    plugins: [{
      src: '~plugins/auth.js',
      ssr: false,
    }, ],
    },


}
