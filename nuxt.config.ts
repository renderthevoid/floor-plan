// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true, componentInspector: false },
  runtimeConfig: {
    public: {
      NUXT_DEFAULT_PRICES: process.env.NUXT_DEFAULT_PRICES || "[2800000,20000000]",
      NUXT_DEFAULT_SQUARES: process.env.NUXT_DEFAULT_SQUARES || "[20,200]",
    },
  },
  ssr: true,
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxt/image",
    "@prisma/nuxt",
    "@pinia/nuxt",
    "nuxt-auth-utils",
    "@vueuse/nuxt",
  ],
  components: [
    {
      path: "~/components/shared",
      pathPrefix: false,
    },
  ],
  prisma: {
    autoSetupPrisma: true,
  },

  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
});
