<template>
  <form
    novalidate
    :class="[
      'AuthRegister d-flex fd-c',
      {'pointer-none': validation.status},
    ]"
    @submit.prevent="submit()"
    >

    <UIInput
      :options="{
        customRequired: true,
        label: validation.FORM.email.label,
        placeholder: validation.FORM.email.placeholder,
        done: validation.FORM.email.done,
        error: validation.FORM.email.error,
        errorMessage: validation.FORM.email.errorMessage,
        inputmode: 'email',
      }"
      @updateValue="(val) => myForm.email.val = val"
    />
    <UIInput
      :options="{
        customRequired: true,
        label: validation.FORM.password.label,
        placeholder: validation.FORM.password.placeholder,
        done: validation.FORM.password.done,
        error: validation.FORM.password.error,
        errorMessage: validation.FORM.password.errorMessage,
        type: 'password',
        tooltipContent: validation.FORM.password.DEFAULT.tooltipContent
      }"
      @updateValue="(val) => myForm.password.val = val"
    />

    <Transition name="fade" mode="out-in">
      <UIButton
        :options="{
          error: validation.btnError,
          loading: validation.loading,
          pointerNone: Boolean(validation.status)
        }"
        :key="validation.status"
        >
        {{ validation.status || 'Отправить' }}
      </UIButton>
    </Transition>

  </form>
</template>

<script setup lang="ts">

  const { validationForm } = useHelpers()

  let myForm = reactive<Pick<_globalFormData, 'email' | 'password'>>({
    email: { val: '', inheritFrom: { type: 'email' } },
    password: { val: '', inheritFrom: { type: 'password' } },
  })

  const validation = reactive(validationForm<typeof myForm>('AuthRegister', myForm))

  watch(() => myForm,
    (val) => Object.assign(validation, validationForm<typeof val>('AuthRegister', val)),
    { deep: true }
  )

  const submit = async () => {
    if(!validation.isValid()) return

    validation.loading = true

    await $fetch('/custom/v1/user/register', {
      baseURL: process.env.fakeApiThree || useRuntimeConfig().public.apiUrl,
      method: 'POST',
      body: {
        email: myForm.email.val,
        password: myForm.password.val,
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
      console.error(`ERRORRegister ${error}`)
    })
  }

  onBeforeRouteLeave(() => {
    validation.resetForm('unmounted')
  })

</script>

<style scoped lang="scss">
  .AuthRegister {
    row-gap: 15px;
  }
</style>
