function getBaseUrl() {
  if (process.env.API_ENV == "staging") return "http://localhost:5000/api";
  if (process.env.API_ENV == "production") return "http://localhost:5000/api";
  else return "http://localhost:5000/api";
}
const BASEURL = getBaseUrl();

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "AdaStruct",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{ src: "~assets/style/main.scss", lang: "scss" }],
  styleResources: {
    scss: [
      "~/node_modules/bootstrap/scss/_functions.scss",
      "~/node_modules/bootstrap/scss/_variables.scss",
      "~/node_modules/bootstrap/scss/_mixins.scss",
      "./assets/styles/*.scss",
    ],
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/axios.js",
    "@/plugins/api.js",
    "@/plugins/repository",
    "@/plugins/jwt.js",
    "@/plugins/nuxt-client-init.client.js",
    "@/plugins/bootstrapVueIcons.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    "cookie-universal-nuxt",
    "@nuxtjs/axios",
    "@nuxtjs/style-resources",
  ],
  axios: {
    // proxy: true
    baseURL: BASEURL,
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
