<template>
  <div class="CommonRange d-flex fd-c">

    <div
      v-if="groupHasParent"
      :class="[
        '__head d-flex aic c-gap-10',
        {'c-p': toggleStatus},
        {'active': visible},
      ]"
      @click="toggleStatus ? visible = !visible : null"
      >
      <label v-html="options?.label" />
      <SvgIcon
        v-if="toggleStatus"
        name="arrowRight"
        class="stroke_black transition-transform"
        width="6"
        height="10"
      />
    </div>

    <CommonTransitionY>
      <div
        v-show="visible || !groupHasParent"
        class="__content d-flex fd-c r-gap-15"
        >
        <div
          v-for="item in data"
          class="__content-item d-flex fd-c"
          >

          <div
            :class="[
              '_headChild d-flex aic c-gap-10',
              {'c-p': toggleStatus && !groupHasParent || toggleStatus && !groupHasParent},
              {'active': visibleChild[item.key]},
            ]"
            @click="toggleStatus && !groupHasParent ? visibleChild[item.key] = !visibleChild[item.key] : null"
            >
            <span
              v-if="item.val"
              v-html="item.val"
            />
            <SvgIcon
              v-if="toggleStatus && !groupHasParent"
              name="arrowRight"
              class="stroke_black transition-transform"
              width="6"
              height="10"
            />
          </div>

          <CommonTransitionY>
            <div
              class="_contentChild d-flex fd-c"
              v-show="visibleChild[item.key] || groupHasParent"
              >
              <div class="_contentChild-input d-flex c-gap-15">
                <CommonInput
                  class="flex-1"
                  :options="{
                    setValue: `${form[item.key] && form[item.key][0]}`,
                    updateValue: `${form[item.key] && form[item.key][0]}`,
                    min: Number(item.min),
                    max: Number(item.max),
                    inputmode: 'numeric',
                    toFixed: 2,
                    notVisibleSelection: true,
                    updateAfterFocus: true,
                    replaceValue: (/[^.\d]|(\.)(?=.*\.)/g),
                  }"
                  @updateValue="(val) => form[item.key][0] = Number(val)"
                  >
                  <template #prefix>от</template>
                </CommonInput>
                <CommonInput
                  class="flex-1"
                  :options="{
                    setValue: `${form[item.key] && form[item.key][1]}`,
                    updateValue: `${form[item.key] && form[item.key][1]}`,
                    min: Number(item.min),
                    max: Number(item.max),
                    inputmode: 'numeric',
                    toFixed: 2,
                    notVisibleSelection: true,
                    updateAfterFocus: true,
                    replaceValue: (/[^.\d]|(\.)(?=.*\.)/g),
                  }"
                  @updateValue="(val) => form[item.key][1] = Number(val)"
                  >
                  <template #prefix>до</template>
                </CommonInput>
              </div>

              <ClientOnly>
                <ElSlider
                  v-model="form[item.key]"
                  show-input-controls
                  range
                  :min="Number(item.min)"
                  :max="Number(item.max)"
                  :step=".01"
                  :show-tooltip="false"
                />
              </ClientOnly>
            </div>
          </CommonTransitionY>

        </div>
      </div>
    </CommonTransitionY>

  </div>
</template>

<script setup lang="ts">

  type Props = {
    data: CommonRangeData[],
    options?: CommonRangeOptions
  }
  const props = defineProps<Props>()
  const emits = defineEmits<{
    (name: 'updateValue', val: typeof form.value): void
  }>()

  const { $listen } = useNuxtApp()
  const { statusBreakpoint } = useResponsive()
  const route = useRoute()

  const toggleStatus = computed(() => {
    if(props.options?.toggleDeactivate) return false
    return props.options?.toggleVisible || statusBreakpoint.value.nowMOBILE
  })

  const groupHasParent = computed(() => Boolean(props.options?.label))

  const form = ref(props.data.reduce((accumulate: Record<string, number[]>, item) => {
    if(route.query[item.key]) {
      accumulate[item.key] = [...(route.query[item.key] as string).toString().split('-').map(i => Number(i))]
    }
    else if(props.options?.key && route.query[props.options.key]) {
      accumulate = (route.query[props.options.key] as string)
        .toString()
        .split(',')
        .reduce((acc: Record<string, number[]>, item) => (([key, value]) => (acc[key] = value.split('-').map(i => Number(i)), acc))(item.split(':')), {})
    }
    else accumulate[item.key] = [Number(item.min), Number(item.max)]

    return accumulate
  }, {}))

  const visibleChild = ref(!groupHasParent.value ? props.data.reduce((accumulate: Record<string, boolean>, item) => {
    accumulate[item.key] = props.options?.toggleVisible && toggleStatus.value && props.options?.toggleVisibleStatus != undefined ? props.options.toggleVisibleStatus : true

    return accumulate
  }, {}) : {})

  const visible = ref(groupHasParent.value && props.options?.toggleVisible && toggleStatus.value ? props.options?.toggleVisibleStatus ?? true : false)

  watch(() => form.value,
    (val) => emits('updateValue', val),
    {
      deep: true,
      immediate: true
    }
  )
  watch(() => statusBreakpoint.value.nowMOBILE,
    (val) => {
      if(!val && !props.options?.toggleVisible && groupHasParent.value) visible.value = true
      if(val && groupHasParent.value && toggleStatus.value) visible.value = props.options?.toggleVisibleStatus ?? true

      if(!val && !props.options?.toggleVisible && !groupHasParent.value) {
        Object.keys(visibleChild.value).forEach(key => visibleChild.value[key] = true)
      }
      if(val && !groupHasParent.value && toggleStatus.value) {
        Object.keys(visibleChild.value).forEach(key => visibleChild.value[key] = props.options?.toggleVisibleStatus ?? true)
      }
    },
    { immediate: true }
  )

  $listen('reset', () => {
    form.value = props.data.reduce((accumulate: typeof form.value, item) => {
      accumulate[item.key] = [Number(item.min), Number(item.max)]
      return accumulate
    }, {})
  })

</script>

<style scoped lang="scss">
  .CommonRange {
    .__head, ._headChild {
      &.active {
        .svgIcon {
          transform: rotate(-90deg);
        }
      }
      .svgIcon {
        transform: rotate(90deg);
      }
    }
    .__content {
      &-item {
      }
    }
  }
</style>
