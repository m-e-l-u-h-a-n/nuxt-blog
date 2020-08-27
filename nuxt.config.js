const bodyParser = require('body-parser')
export default {
    /*
     ** Nuxt rendering mode
     ** See https://nuxtjs.org/api/configuration-mode
     */
    mode: 'universal',
    /*
     ** Nuxt target
     ** See https://nuxtjs.org/api/configuration-target
     */
    target: 'server',
    /*
     ** Headers of the page
     ** See https://nuxtjs.org/api/configuration-head
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;1,300&display=swap" }
        ]
    },
    /*
     ** Global CSS
     */
    css: [
        '~assets/styles/main.css'
    ],
    /*
     ** Plugins to load before mounting the App
     ** https://nuxtjs.org/guide/plugins
     */
    plugins: [
        '~plugins/core-components.js',
        '~plugins/date-filter.js'
    ],
    /*
     ** Auto import components
     ** See https://nuxtjs.org/api/configuration-components
     */
    components: true,
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [],
    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/axios',
    ],
    axios: {
        baseURL: process.env.BASE_URL || 'https://nuxt-blog-fcd31.firebaseio.com',
        credentials: false
    },
    /*
     ** Build configuration
     ** See https://nuxtjs.org/api/configuration-build/
     */
    build: {},
    env: {
        baseUrl: process.env.BASE_URL || 'https://nuxt-blog-fcd31.firebaseio.com',
        firebaseApiKey: "AIzaSyDyTnGRG0SC9jzuE49wi8b0r4_Ug2QWT84",
    },
    router: {
        extendedRoutes(routes, resolve) {
            routes.push({
                path: '*',
                component: resolve(__dirname, 'pages/index.vue') // This way we can always get to home page if we reach to unknown routes not defined via folder structure.
            });
        }
    },
    // srcDir: '/my-app', this can be used if we want nuxt to look for default folders like(pages, layout,...) into my-app folder.
    transition: {
        name: 'fade',
        mode: 'out-in',
    },
    serverMiddleware: [
        bodyParser.json(),
        '~/api', // testing the custom middleware.
    ]
}