<template>
  <form
    novalidate
    :class="[
      'AuthLogin d-flex fd-c',
      {'pointer-none': validation.status},
    ]"
    @submit.prevent
    >

    <CommonInput
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
    <CommonInput
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

    <div class="__btns d-flex aie jcsb">
      <Transition name="fade" mode="out-in">
        <CommonButton
          :options="{
            error: validation.btnError,
            loading: validation.loading,
            pointerNone: Boolean(validation.status)
          }"
          :key="validation.status"
          @clickBtn="submit()"
          >
          {{ validation.status || 'Отправить' }}
        </CommonButton>
      </Transition>
      <button @click="$emit('changeForm')">
        Забыли пароль?
      </button>
    </div>

  </form>
</template>

<script setup lang="ts">

  const { validationForm } = useHelpers()
  const auth = useAuth()

  let myForm = reactive<Pick<_globalFormData, 'email' | 'password'>>({
    email: { val: '', inheritFrom: { type: 'email' } },
    password: { val: '', inheritFrom: { type: 'password' } },
  })

  const validation = reactive(validationForm<typeof myForm>('AuthLogin', myForm))

  watch(() => myForm,
    (val) => Object.assign(validation, validationForm<typeof val>('AuthLogin', val)),
    { deep: true }
  )

  const submit = async () => {
    if(!validation.isValid()) return

    validation.loading = true

    await auth.loginWith('local', {
      body: {
        username: myForm.email.val,
        password: myForm.password.val
      },
    })
    .then(() => {
      validation.resetForm('success')
      navigateTo({ path: useLocalePath()('/') })
    })
    .catch((error) => {
      validation.resetForm('error', error.response._data.message)
      console.error(`ERRORLogin ${error}`)
    })

  }
  onBeforeRouteLeave(() => {
    validation.resetForm('unmounted')
  })

</script>

<style scoped lang="scss">
  .AuthLogin {
    row-gap: 15px;
  }
</style>
