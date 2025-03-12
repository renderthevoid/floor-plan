// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true, componentInspector: false },
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