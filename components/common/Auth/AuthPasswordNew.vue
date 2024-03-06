<template>
  <form
    novalidate
    :class="[
      'AuthPasswordNew d-flex fd-c',
      {'pointer-none': validation.status},
    ]"
    @submit.prevent="submit()"
    >

    <CommonInput
      :options="{
        customRequired: true,
        label: validation.FORM.password.label,
        placeholder: validation.FORM.password.placeholder,
        done: validation.FORM.password.done,
        error: validation.FORM.password.error,
        errorMessage: validation.FORM.password.errorMessage,
        type: 'password',
        tooltipContent: validation.FORM.passwordRepeat.DEFAULT.tooltipContent
      }"
      @updateValue="(val) => myForm.password.val = val"
    />
    <CommonInput
      :options="{
        customRequired: true,
        label: validation.FORM.passwordRepeat.label,
        placeholder: validation.FORM.passwordRepeat.placeholder,
        done: validation.FORM.passwordRepeat.done,
        error: validation.FORM.passwordRepeat.error,
        errorMessage: validation.FORM.passwordRepeat.errorMessage,
        type: 'password',
        tooltipContent: validation.FORM.passwordRepeat.DEFAULT.tooltipContent
      }"
      @updateValue="(val) => myForm.passwordRepeat.val = val"
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

  let myForm = reactive<Pick<_globalFormData, 'password' | 'passwordRepeat'>>({
    password: { val: '', inheritFrom: { type: 'password' } },
    passwordRepeat: {
      val: '',
      inheritFrom: {
        type: 'password',
        optionalData: {
          compareWithAnotherKeyIsVal: 'password'
        }
      }
    },
  })

  const validation = reactive(validationForm<typeof myForm>('AuthPasswordNew', myForm))

  watch(() => myForm,
    (val) => Object.assign(validation, validationForm<typeof val>('AuthPasswordNew', val)),
    { deep: true }
  )

  const submit = async () => {
    if(!validation.isValid()) return

    await $fetch(`/custom/v1/user/new-password?token=${useRoute().query.token}`, {
      baseURL: 'https://admin.ecoolska.com/wp-json' || useRuntimeConfig().public.apiUrl,
      method: 'POST',
      body: {
        password: myForm.password.val,
        repeatPassword: myForm.passwordRepeat.val,
      }
    })
    .then(() => {
      validation.resetForm('success', 'Пароль изменен')

      setTimeout(() => {
        navigateTo({
          path: useLocalePath()('/authorization'),
          query: {
            active: 'login'
          }
        })
      }, 2500)
    })
    .catch((error) => {
      validation.resetForm('error', error.response._data.message)
      console.error(`ERRORPasswordNew ${error}`)
    })
  }

  onBeforeRouteLeave(() => {
    validation.resetForm('unmounted')
  })

</script>

<style scoped lang="scss">
  .AuthPasswordNew {
    row-gap: 15px;
  }
</style>
