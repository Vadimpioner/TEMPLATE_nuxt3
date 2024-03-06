import { $fetch } from 'ofetch'

type I18nConfig = {
  defaultLocale: string
  locales: {
    code: string
    name: string
    file: string
  }[] | string[]
  detectBrowserLanguage: {
    useCookie: boolean
  }
  langDir?: string
  lazy?: boolean
  experimental?: {
    jsTsFormatResource?: boolean
  }
}

export async function generateI18n(apiUrl: string) {

  let i18nConfig: I18nConfig = {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    detectBrowserLanguage: {
      useCookie: false,
    },
    experimental: {
      jsTsFormatResource: true,
    },
  }

  await $fetch(`${'https://admin.bro-graphics.com/wp-json'}/pll/v1/languages`)
  .then((data: { slug: string; name: string }[]) => {
    if(Array.isArray(data)) i18nConfig.locales = data.map((i) => ({
      code: i.slug,
      name: i.name,
      file: 'load.ts'
    }))
    i18nConfig.langDir = 'lang',
    i18nConfig.lazy = true
  })
  .catch((error) => {
    console.error(`ERRORGenerateI18nConfig ${error}`)
  })

  return i18nConfig

}

export async function myEmails(apiUrl: string) {

  let emails: string[] = []

  await $fetch(`${apiUrl}/myEmails`)
  .then((data: string[]) => {
    emails = data
  })
  .catch((error) => {
    console.error(`ERRORMyEmails ${error}`)
  })

  return emails

}

export async function mySitemap(apiUrl: string) {

  let sitemap: { [k: string]: { urls: string[] } } = {}

  await $fetch(`https://admin.rialto.by/wp-json/custom/v1/sitemap`)
  .then((data: Record<string, string[]>) => {
    sitemap = Object.fromEntries(Object.keys(data).map(key => [key, { urls: data[key] }]))
  })
  .catch((error) => {
    console.error(`ERRORMySitemap ${error}`)
  })

  return sitemap

}
