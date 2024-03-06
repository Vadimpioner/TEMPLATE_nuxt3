export default defineI18nLocale(async (locale) => {

  try {
    const response: unknown = await $fetch(`${'https://admin.bro-graphics.com/wp-json' || useRuntimeConfig().public.apiUrl}/acf/v3/options/options?lang=${locale}&_fields=acf.static_fields`)

    return response.acf.static_fields
  } catch(error) {
    throw createError(`ERRORLoadLanguages ${error}`)
  }

})
