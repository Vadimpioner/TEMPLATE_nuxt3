export default defineNuxtRouteMiddleware(async (to, from) => {

  const { $i18n, $localePath, $auth } = useNuxtApp()

  if(!$auth.loggedIn && to.query.token && to.name == `authorization___${$i18n.locale.value}` && to.query.active == 'activateAccount') {
    try {

      await $fetch(`/custom/v1/user/confirm-register?token=${to.query.token}`, {
        baseURL: 'https://admin.ecoolska.com/wp-json' || useRuntimeConfig().public.apiUrl,
        method: 'GET',
      })

      return navigateTo({ path: $localePath('/') })

    } catch(error) {
      console.error(`ERRORAuthConfirmRegister ${error}`)
    }
  }

})
