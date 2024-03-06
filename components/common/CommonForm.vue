<template>
  <form
    novalidate
    :class="[
      'CommonForm d-flex fd-c r-gap-15',
      {'pointer-none': validation.status}
    ]"
    @submit.prevent="submit()"
    >
    <!-- <pre>{{ myForm }}</pre> -->
    <!-- <pre>{{ validation.FORM }}</pre> -->
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
    <CommonInput
      :options="{
        setValue: myForm.name.val,
        customRequired: true,
        label: validation.FORM.name.label,
        placeholder: validation.FORM.name.placeholder,
        done: validation.FORM.name.done,
        error: validation.FORM.name.error,
        errorMessage: validation.FORM.name.errorMessage,
      }"
      @updateValue="(val) => myForm.name.val = val"
    />
    <CommonInput
      :options="{
        customRequired: true,
        placeholder: validation.FORM.phone.placeholder,
        done: validation.FORM.phone.done,
        error: validation.FORM.phone.error,
        errorMessage: validation.FORM.phone.errorMessage,
        replaceValue: validation.FORM.phone.DEFAULT.regExp,
        inputmode: 'tel', // numeric - с маской || tel - без маски
      }"
      @updateValue="(val) => myForm.phone.val = val"
    />
    <CommonTextarea
      :options="{
        setValue: myForm.textarea.val,
        placeholder: validation.FORM.textarea.placeholder,
        done: validation.FORM.textarea.done,
        error: validation.FORM.textarea.error,
        errorMessage: validation.FORM.textarea.errorMessage,
        maxlength: validation.FORM.textarea.maxlength
      }"
      @updateValue="(val) => myForm.textarea.val = val"
    />
    <CommonCheckbox
      :options="{
        elName: validation.FORM.checkbox.elName,
        error: validation.FORM.checkbox.error,
        checked: true,
      }"
      @updateValue="(val: boolean) => myForm.checkbox.val = val"
    />
    <CommonCheckbox
      view="color"
      :data="data.checkboxData"
      :options="{
        label: validation.FORM.checkboxMultiple.label,
        done: validation.FORM.checkboxMultiple.done,
        error: validation.FORM.checkboxMultiple.error,
        checkboxGroup: true,
        max: 3,

        checkedList: data.CHECKBOXcheckedList,
        disabledList: data.CHECKBOXdisabledList,
      }"
      @updateValue="(val: _globalData[]) => myForm.checkboxMultiple.val = val"
    />
    <CommonSelect
      :data="data.selectData"
      :options="{
        label: validation.FORM.select.label,
        placeholder: validation.FORM.select.placeholder,
        done: validation.FORM.select.done,
        error: validation.FORM.select.error,
        errorMessage: validation.FORM.select.errorMessage,

        checkedList: data.SELECTcheckedList[0],
        disabledList: data.SELECTdisabledList,
      }"
      @updateValue="(val: CommonSelectData) => myForm.select.val = val"
    />
    <CommonSelect
      :data="data.selectData"
      :options="{
        multiple: true,
        done: validation.FORM.selectMultiple.done,
        error: validation.FORM.selectMultiple.error,
        errorMessage: validation.FORM.selectMultiple.errorMessage,

        checkedList: data.SELECTcheckedList,
        disabledList: data.SELECTdisabledList,
      }"
      @updateValue="(val: CommonSelectData[]) => myForm.selectMultiple.val = val"
    />
    <CommonInput
      :options="{
        type: 'time',
        customRequired: true,
        hiddenIndicator: true,
        label: validation.FORM.time.label,
        done: validation.FORM.time.done,
        error: validation.FORM.time.error,
        errorMessage: validation.FORM.time.errorMessage,
      }"
      @updateValue="(val) => myForm.time.val = val"
    />
    <CommonInput
      :options="{
        type: 'date',
        customRequired: true,
        hiddenIndicator: true,
        label: validation.FORM.date.label,
        done: validation.FORM.date.done,
        error: validation.FORM.date.error,
        errorMessage: validation.FORM.date.errorMessage,
        max: validation.FORM.date.max,
        min: validation.FORM.date.min,
      }"
      @updateValue="(val) => myForm.date.val = val"
    />
    <CommonInput
      :options="{
        type: 'datetime-local',
        customRequired: true,
        hiddenIndicator: true,
        label: validation.FORM.dateTimeLocal.label,
        done: validation.FORM.dateTimeLocal.done,
        error: validation.FORM.dateTimeLocal.error,
        errorMessage: validation.FORM.dateTimeLocal.errorMessage,
        max: validation.FORM.dateTimeLocal.max,
        min: validation.FORM.dateTimeLocal.min,
      }"
      @updateValue="(val) => myForm.dateTimeLocal.val = val"
    />
    <CommonUpload
      :options="{
        label: validation.FORM.file.label,
        error: validation.FORM.file.error,
      }"
      @updateValue="(val: File) => myForm.file.val = val"
    />
    <CommonUpload
      :options="{
        multiple: true,
        label: validation.FORM.fileMultiple.label,
        multipleLimit: 3,
        error: validation.FORM.fileMultiple.error,
      }"
      @updateValue="(val: File[]) => myForm.fileMultiple.val = val"
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

  const props = defineProps({
    data: {
      type: Object,
      default: () => ({})
    },
  })

  const { validationForm } = useHelpers()
  const { $moment } = useNuxtApp()

  let myForm = reactive<Omit<_globalFormData, 'password' | 'passwordRepeat'>>({
    email: { val: '', inheritFrom: { type: 'email' } },
    name: { val: 'vad', inheritFrom: { type: 'text', optionalData: 9 } },
    phone: { val: '', inheritFrom: { type: 'text', optionalData: 7 } },
    textarea: { val: 'lorem text', inheritFrom: { type: 'text', } },
    checkbox: { val: false, inheritFrom: { type: 'checkbox' } },
    checkboxMultiple: { val: [], inheritFrom: { type: 'multiple' } },
    select: { val: {} as CommonSelectData, inheritFrom: { type: 'select' } },
    selectMultiple: { val: [], inheritFrom: { type: 'multiple' } },
    time: { val: '', inheritFrom: { type: 'time' } },
    date: { val: '', inheritFrom: { type: 'date' } },
    dateTimeLocal: {
      val: '',
      inheritFrom: {
        type: 'date',
        optionalData: {
          min: $moment('2019-05-05T13:59').format('YYYY-MM-DD HH:mm')
        }
      }
    },
    file: { val: undefined, inheritFrom: { type: 'file' } },
    fileMultiple: { val: [], inheritFrom: { type: 'file' } },
  })

  const validation = reactive(validationForm<typeof myForm>('CommonForm', myForm))

  watch(() => myForm,
    (val) => Object.assign(validation, validationForm<typeof val>('CommonForm', val)),
    { deep: true }
  )

  const submit = async () => {
    if(!validation.isValid()) return

    await $fetch('/api/sendMail', {
      method: 'POST',
      baseURL: useRuntimeConfig().public.baseLocaleUrl,
      body: validation.createFormDate('Заявка с CommonForm'),
    })
    .then(() => {
        validation.resetForm('success', 'СУПЕР УСПЕШНАЯ ОТПРАВКА', (initialData) => {
          Object.assign(myForm, initialData)
        })
      }
    )
    .catch((error) => {
      validation.resetForm('error')
      console.error(`ERRORCommonForm ${error}`)
    })

  }

  onBeforeRouteLeave(() => {
    validation.resetForm('unmounted')
  })

</script>
