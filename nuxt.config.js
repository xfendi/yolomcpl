import tailwindTypography from "@tailwindcss/typography";

module.exports = {
  /*
   ** Headers of the page
   */
  publicRuntimeConfig: {
    shop_id: 13760, // id sklepu na vishop
    description: "Innowacyjny serwer BOXPVP.", // opis serwera
    address: "yolomc.pl", // adres serwera
    primaryColor: "#c300ff", // nie warto zmieniać
    socialMedia: [
      // social media serwera
      {
        name: "Discord",
        icon: "https://www.svgrepo.com/show/353655/discord-icon.svg",
        link: "https://dc.yolomc.pl/",
      },
      {
        name: "TikTok",
        icon: "https://www.svgrepo.com/show/452114/tiktok.svg",
        link: "https://tt.yolomc.pl/",
      },
      {
        name: "YouTube",
        icon: "https://www.svgrepo.com/show/475700/youtube-color.svg",
        link: "https://yt.yolomc.pl/",
      },
      {
        name: "Facebook",
        icon: "https://www.svgrepo.com/show/349359/facebook.svg",
        link: "https://fb.yolomc.pl/",
      },
    ],
  },
  head: {
    title: "Yolomc.pl | Innowacyjny serwer BOXPVP", // tytuł strony
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Epicki szablon VIshop.pl",
      }, // opis strony dla wyszukiwarek i discorda
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }, // ikona strony, podmień ją w folderze static
      {
        rel: "stylesheet ",
        href: "https://fonts.googleapis.com/css2?family=Titillium+Web:wght@600&display=swap",
      },
      {
        rel: "stylesheet ",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@500;600&display=swap",
      },
    ],
  },
  /*
   ** Poniższa konfiguracja jest dla bardziej zaawansowanych użytkowników, nie ma tam nic ciekawego
   */
  server: {
    host: "0.0.0.0",
  },
  css: ["@/assets/css/main.css"],
  plugins: [
    { src: "~/plugins/price.js" },
    { src: "@/plugins/aos", ssr: false, mode: "client" },
  ],
  purgeCSS: {
    whitelist: [
      "aos-init",
      "aos-animate",
      "data-aos-delay",
      "data-aos-duration",
      "fade-up",
      "zoom-in",
    ],
  },
  buildModules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    config: {
      plugins: [tailwindTypography],
      theme: {
        extend: {
          typography: {
            DEFAULT: {
              css: {
                color: "#ececec",
                h1: {
                  color: "#ececec",
                },
                h2: {
                  color: "#ececec",
                },
                h3: {
                  color: "#ececec",
                },
                h4: {
                  color: "#ececec",
                },
                h5: {
                  color: "#ececec",
                },
                h6: {
                  color: "#ececec",
                },
                strong: {
                  color: "#ececec",
                },
                blockquote: {
                  color: "#ececec",
                },
                code: {
                  color: "#ececec",
                },
                figcaption: {
                  color: "#ececec",
                },
              },
            },
          },
        },
      },
    },
  },
  modules: ["vue-toastification/nuxt"],
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
        });
      }
    },
  },
};
