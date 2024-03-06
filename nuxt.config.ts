import { generateI18n, myEmails, mySitemap } from './utils/gInfo'

const {
  BASELOCALEURL,
  API_URL,
} = process.env as Record<string, string>

export default async () => defineNuxtConfig({
  site: {
    url: BASELOCALEURL,
  },
  experimental: {
    viewTransition: true
  },
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        },
      ],
    },
  },
  runtimeConfig: {
    mailer: {
      host: '',
      port: '',
      user: '',
      pass: '',
      to: await myEmails(API_URL)
    },
    public: {
      apiUrl: API_URL,
      baseLocaleUrl: BASELOCALEURL,
      gmapKey: ''
    },
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
      global: true
    }
  ],
  plugins: [
    {src: '~/plugins/moment.ts', ssr: false},
    {src: '~/plugins/scrollAnimate.ts', mode: 'client'},
    '~/plugins/consoleLog.ts',
    '~/plugins/globalEmit.ts',
    '~/plugins/outside.ts',
    '~/plugins/portal.ts',
    '~/plugins/vMaska.ts',
    '~/plugins/storeInit.ts',
  ],
  modules: [
    'nuxt-swiper',
    'nuxt-simple-sitemap',
    'nuxt-icons',
    '@nuxtjs/device',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@nuxt-alt/auth',
    '@pinia/nuxt',
    '@element-plus/nuxt',
  ],
  css: [
    "@/assets/_accomulate.scss",
  ],
  i18n: await generateI18n(API_URL),
  sitemap: {
    inferStaticPagesAsRoutes: false,
    sitemaps: await mySitemap(API_URL),
  },
  router: {
    options: {
      linkActiveClass: 'nuxtLink',
      linkExactActiveClass: 'nuxtLinkActive',
    },
  },
  auth: {
    strategies: {
      local: {
        token: {
					property: 'access_token',
					maxAge: 60 * 60 * 24,
					global: true,
				},
        refreshToken: {
					property: 'refresh_token',
					data: 'token',
					maxAge: 60 * 60 * 24 * 30
				},
        user: {
          property: 'user',
          autoFetch: true,
        },
        endpoints: {
          login: {
            url: `https://admin.ecoolska.com/wp-json/api-bearer-auth/v1/login`,
            method: 'post',
          },
          refresh: {
            url: `https://admin.ecoolska.com/api-bearer-auth/v1/tokens/refresh`,
            method: 'post'
          },
          user: {
            url: `https://admin.ecoolska.com/wp-json/custom/v1/user/user`,
            method: 'get',
          },
          logout: false,
        },
      },
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/_variable.scss";
            @import "@/assets/_mixins&functions.scss";
          `,
        }
      }
    },
  },
  imports: {
    dirs: ['types/*.ts', 'store/*.ts'],
    global: true,
  },
  devtools: {
    enabled: false
  },
})
