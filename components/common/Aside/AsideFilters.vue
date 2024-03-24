<template>
  <aside
    :class="[
      'AsideFilters d-flex fd-c pos-sticky hmc w100',
      {'loadingFetch': skeleton}
    ]"
    >
    <div class="d-flex" v-if="true">
      <!-- <pre class="flex-1"><ClientOnly>form - {{ form }}</ClientOnly></pre> -->
      <!-- <pre class="flex-1"><ClientOnly>formInitial - {{ formInitial }}</ClientOnly></pre> -->
      <!-- <pre class="flex-1"><ClientOnly>formLastSend - {{ formLastSend }}</ClientOnly></pre> -->
      <!-- <pre class="flex-1"><ClientOnly>loadingBtn - {{ loadingBtn }}</ClientOnly></pre> -->
    </div>
    <Component
      v-for="(item, index) in data"
      :is="item.componentName"
      :data="item.data"
      :key="`${index}${skeleton}`"
      :view="item.view"
      :options="{
        label: item.label,
        key: item.key,
        selectedCounter: item.selectedCounter,
        checkboxGroup: item.checkboxGroup,
        elName: item.elName,
        trimTo: item.trimTo,
        checked: checked(item.componentName, item.checked, item.key),
        checkedList: checkedList(item.componentName, item.checkedList, item.data, item.key),
        disabledList: item.disabledList,
        toggleDeactivate: item.toggleDeactivate,
        toggleVisible: item.toggleVisible,
        toggleVisibleStatus: item.toggleVisibleStatus,
      }"
      @updateValue="(val: unknown) => createFormParam(item, val)"
    />
    <div class="d-flex gap-20">
      <CommonButton
        v-loading="loadingBtn && loadingBtn['btnSend']"
        :options="{
          disabled: disabledBtnSend,
        }"
        :class="['loadingGreen flex-1']"
        @click="sendMyParent()"
        >
        Отправить
      </CommonButton>
      <CommonButton
        v-loading="loadingBtn && loadingBtn['btnReset']"
        view="two"
        :options="{
          disabled: disabledBtnReset,
        }"
        :class="['loadingGreen mobileNone flex-1']"
        @click="sendMyParent(formInitial)"
        >
        Сбросить
      </CommonButton>
    </div>

  </aside>
</template>

<script setup lang="ts">

  import type { LocationQueryValue } from 'vue-router'

  type Props = {
    skeleton: boolean,
    loadingBtn: { btnSend?: boolean, btnReset?: boolean },
    data: AsideFiltersData[],
  }
  const props = withDefaults(defineProps<Props>(), {
    skeleton: true,
  })
  const emits = defineEmits<{
    (name: 'paramsFilters', val: typeof form.value, btnName: keyof typeof props.loadingBtn): void
    (name: 'disabledBtnReset', val: boolean): void
  }>()

  const { $listen, $throw, $router } = useNuxtApp()
  const route = useRoute()

  const disabledBtnSend = computed(() => {
    const sortForm = (argForm: typeof form.value) => Object.values(argForm)
      .flatMap((item) => {
        if(['boolean'].includes(typeof item)) return item!.toString()
        if(Array.isArray(item) && item.every(i => ['object'].includes(typeof i) && i)) return item.map((i: { val: string }) => i.val)
        else return JSON.stringify(item)
      })
      .sort()
    // console.log('incomingForm', sortForm(incomingForm))
    // console.log('form', sortForm(form.value))

    return JSON.stringify(sortForm(form.value)) == JSON.stringify(sortForm(formLastSend.value))
  })

  const disabledBtnReset = computed(() => {
    const isTrue = JSON.stringify(formInitial.value) == JSON.stringify(formLastSend.value)
    emits('disabledBtnReset', isTrue)

    return isTrue
  })

  const form = ref<Record<string, unknown>>({})
  const formInitial = ref<typeof form.value>({})
  const formLastSend = ref<typeof form.value>({})

  const createFormParam = (item: AsideFiltersData, val: unknown) => {

    if(item.key) form.value[item.key] = val

    if(!item.key && Array.isArray(item.data)) {
      item.data.forEach((i) => {
        if(val && i.key && typeof val == 'object') form.value[i.key] = (val as typeof form.value)[i.key]
      })
    }
  }

  const createQuery = (paramsForm: Record<string, unknown>) => {
    return Object.entries(paramsForm).reduce((acc, [key, value]) => {
      if(Array.isArray(value)) {
        if(value.every(item => ['string'].includes(typeof item))) {
          acc[`${key}_cb`] = value.join(',')
        } else if(value.every(item => ['number'].includes(typeof item))) {
          acc[key] = value.join('-')
        }
      } else if(['object'].includes(typeof value) && value) {
        acc[key] = Object.entries(value).map(([subKey, subValue]) => `${subKey}:${(subValue as number[]).join('-')}`).join(',')
      }
      else acc[key] = String(value)
      return acc
    }, {} as Record<string, string>)
  }

  const parserForm = (myForm: typeof form.value) => {
    return Object.entries(myForm).reduce((acc, [key, value]) => {
      if(Array.isArray(value)) {
        acc[key] = value.map(item => ['object'].includes(typeof item) && item ? item.key : item)
      } else if(['boolean', 'object'].includes(typeof value)) acc[key] = value as boolean | Record<string, (number | string)[]>

      return acc
    }, {} as Record<string, (number | string)[] | Record<string, (number | string)[]> | boolean>)
  }

  const sendMyParent = async (resetForm?: typeof form.value) => {

    const paramsForm = parserForm(resetForm || form.value)

    const exceptKeyForm = Object.fromEntries(Object.entries(route.query).filter(([key]) => !Object.keys(createQuery(parserForm(formInitial.value))).includes(key)))

    // console.log('exceptKeyForm', {...exceptKeyForm})
    // console.log('createQuery', createQuery(paramsForm))

    if(resetForm) $throw('reset')
    await $router.push({query: {
      ...exceptKeyForm,
      ...createQuery(paramsForm)
    }})
    formLastSend.value = JSON.parse(JSON.stringify(resetForm || form.value))
    localStorage.setItem('AsideFiltersFormLastSend', JSON.stringify(formLastSend.value))

    emits('paramsFilters', Object.entries(paramsForm)
      .filter(([key, value]) => !Array.isArray(value) && value || Array.isArray(value) && value.length)
      .reduce((acc, [key, value]) => {
        if(Array.isArray(value) && value.every(item => ['string'].includes(typeof item))) {
          if(!acc.params) acc.params = {}
          acc.params[key] = value as string[]
        } else acc[key as string] = value

        return Object.keys(acc).sort().reduce((sortedAcc, key) => ({ ...sortedAcc, [key]: acc[key] }), {})
      }, {} as { params?: Record<string, string[]>, [k: string]: unknown }), resetForm ? 'btnReset' : 'btnSend'
    )

  }

  const checked = (
    componentName: AsideFiltersData['componentName'],
    checked?: AsideFiltersData['checked'],
    keyItem?: AsideFiltersData['key']
    ) => {
    if(!['CommonCheckbox'].includes(componentName)) return false

    const checkedQuery = Object.values(Object.fromEntries(Object.entries(route.query).filter(([key]) => key == keyItem))).pop()

    return checkedQuery != undefined ? JSON.parse(checkedQuery.toString()) : checked
  }

  const checkedList = (
    componentName: AsideFiltersData['componentName'],
    checkedList?: AsideFiltersData['checkedList'],
    dataList?: AsideFiltersData['data'],
    keyItem?: AsideFiltersData['key']
    ) => {
    if(!['CommonCheckbox'].includes(componentName)) return false

    const checkedListQuery = Object.entries(route.query)
      .filter(([key]) => key.endsWith('_cb'))
      .map(([key, value]: [string, LocationQueryValue | LocationQueryValue[]]) => [key.replace('_cb', ''), (value as LocationQueryValue)?.split(',')])
      .map(([key, arr]) => ({key: key, checkedList: arr}))
      .filter(({key}) => key == keyItem)
      .flatMap(item => item.checkedList)

    return checkedListQuery.length ? dataList?.filter(({key}) => checkedListQuery.includes(key)).sort((a, b) => checkedListQuery.indexOf(a.key) - checkedListQuery.indexOf(b.key)) : checkedList
  }

  const resetAllFormData = (myForm: typeof form.value) => {
    return Object.keys(myForm).reduce((acc, key) => {

      if(['boolean'].includes(typeof myForm[key])) acc[key] = false
      else if(Array.isArray(myForm[key]) && Boolean(Object.values(myForm[key]!).filter(item => !['string', 'number'].includes(typeof item)).length)) acc[key] = []
      else acc[key] = myForm[key]

      return acc
    }, {} as typeof form.value)
  }

  onMounted(() => {
    nextTick(() => {
      formInitial.value = JSON.parse(localStorage.getItem('AsideFiltersFormInitial') || JSON.stringify(resetAllFormData(form.value)))
      formLastSend.value = JSON.parse(localStorage.getItem('AsideFiltersFormLastSend') || JSON.stringify(form.value))
      localStorage.setItem('AsideFiltersFormInitial', JSON.stringify(formInitial.value))
      localStorage.setItem('AsideFiltersFormLastSend', JSON.stringify(formLastSend.value))
    })
  })

  onBeforeRouteLeave(() => {
    localStorage.removeItem('AsideFiltersFormInitial')
    localStorage.removeItem('AsideFiltersFormLastSend')
  })

  $listen('AsideFiltersBtnReset', async () => await sendMyParent(formInitial.value))

</script>

<style scoped lang="scss">
  .AsideFilters {
    padding: 15px;
    row-gap: 15px;
    background-color: rgba($gray, .5);
    @include value_adaptive((max-width, min-width), 320, 300, $desktop, ($mobile + 1));
    @include value_change(max-width, null, 100%, $mobile);
    @include value_change(min-width, null, unset, $mobile);
    &.loadingFetch {
      @include value_adaptive(min-height, 320, 300, $desktop, ($mobile + 1));
      @include value_change(display, null, none !important, $mobile)
    }
  }
</style>
