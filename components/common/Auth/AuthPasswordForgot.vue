<template>
  <form
    novalidate
    :class="[
      'AuthPasswordForgot d-flex fd-c',
      {'pointer-none': validation.status},
    ]"
    @submit.prevent="submit()"
    >

    <CommonInput
      :options="{
        customRequired: true,
        placeholder: validation.FORM.email.placeholder,
        done: validation.FORM.email.done,
        error: validation.FORM.email.error,
        errorMessage: validation.FORM.email.errorMessage,
        inputmode: 'email',
      }"
      @updateValue="(val) => myForm.email.val = val"
    />

    <Transition name="fade" mode="out-in">
      <CommonButton
        :options="{
          error: validation.btnError,
          loading: validation.loading,
          pointerNone: Boolean(validation.status)
        }"
        :key="validation.status"
        >
        {{ validation.status || 'Отправить' }}
      </CommonButton>
    </Transition>

  </form>
</template>

<script setup lang="ts">

  const { validationForm } = useHelpers()

  let myForm = reactive<Pick<_globalFormData, 'email'>>({
    email: { val: '', inheritFrom: { type: 'email' } }
  })

  const validation = reactive(validationForm<typeof myForm>('AuthPasswordForgot', myForm))

  watch(() => myForm,
    (val) => Object.assign(validation, validationForm<typeof val>('AuthPasswordForgot', val)),
    { deep: true }
  )

  const submit = async () => {
    if(!validation.isValid()) return

    validation.loading = true

    await $fetch(`/custom/v1/user/reset-password`, {
      baseURL: 'https://admin.ecoolska.com/wp-json' || useRuntimeConfig().public.apiUrl,
      method: 'POST',
      body: {
        email: myForm.email.val,
      }
    })
    .then(() => {
      validation.resetForm('success', 'Проверьте свою почту')
      setTimeout(() => {
        navigateTo({ path: useLocalePath()('/') })
      }, 2500)
    })
    .catch((error) => {
      validation.resetForm('error', error.response._data.message)
      console.error(`ERRORPasswordForgot ${error}`)
    })
  }

  onBeforeRouteLeave(() => {
    validation.resetForm('unmounted')
  })

</script>

<style scoped lang="scss">
  .AuthPasswordForgot {
    row-gap: 15px;
  }
</style>
