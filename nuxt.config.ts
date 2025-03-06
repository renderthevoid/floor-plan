// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: true,
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxt/image",
    "@prisma/nuxt",
    "@pinia/nuxt",
    "nuxt-auth-utils",
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