<template>
  <div class="CommonCheckbox d-flex fd-c">

    <div
      :class="[
        '__head d-flex aic c-gap-10',
        {'c-p': toggleStatus},
        {'active': visible}
      ]"
      @click="toggleStatus ? visible = !visible : null"
      >
      <label
        v-if="options?.label"
        v-html="options?.customRequired
          ?
          `${options.label} ${checkboxGroup.length && options?.selectedCounter ? `(${checkboxGroup.length})` : ''} <span class='red'>*</span>`
          :
          `${options.label} ${checkboxGroup.length && options?.selectedCounter ? `(${checkboxGroup.length})` : ''}`"
        :class="[
          'transition-color',
          {'done': options?.done},
          {'red': options?.error}
        ]"
      />
      <SvgIcon
        v-if="toggleStatus"
        name="arrowRight"
        class="stroke_black transition-transform"
        width="6"
        height="10"
      />
    </div>

    <ElCheckbox
      v-if="!options?.min && !options?.max && options?.elName && !options?.disabledList"
      v-model="checkbox"
      :disabled="options?.disabled"
      :checked="options?.checked"
      :class="[{'error': options?.error}]"
      @change="getAll(checkbox)"
      >
      <span v-html="options.elName" />
    </ElCheckbox>

    <CommonTransitionY>
      <div
        v-if="options?.checkboxGroup"
        v-show="visible"
        class="__content d-flex fd-c r-gap-15"
        >
        <ElCheckboxGroup
          v-model="checkboxGroup"
          :class="['__content-main d-flex fd-c']"
          :min="options?.min"
          :max="options?.max"
          :disabled="options?.disabled"
          >
          <ElCheckbox
            v-for="(i, idx) in data?.slice(0, options?.trimTo || data.length)"
            :key="idx"
            :label="i"
            :checked="options?.checkedList && options.checkedList.some(item => item.key == i.key)"
            :disabled="options?.disabledList && options.disabledList.some(item => item.key == i.key)"
            @change="emits('updateValue', checkboxGroup)"
            >
            <div
              v-if="['color'].includes(view) && i.key"
              class="_color br-circle jcc transition-color"
              :style="{'background-color': i.key}"
            />
            <span v-html="`${i.val} ${Number(i.count) && `<small class=red>${i.count}</small>` || ''}`" />
          </ElCheckbox>

          <CommonTransitionY>
            <div
              v-if="options?.trimTo"
              v-show="fullList"
              class="__content-mainFull d-flex fd-c"
              >
              <ElCheckbox
                v-for="(i, idx) in data?.slice(options.trimTo, data.length)"
                :key="idx"
                :label="i"
                :checked="options?.checkedList && options.checkedList.some(item => item.key == i.key)"
                :disabled="options?.disabledList && options.disabledList.some(item => item.key == i.key)"
                @change="emits('updateValue', checkboxGroup)"
                >
                <div
                  v-if="['color'].includes(view) && i.key"
                  class="_color br-circle jcc transition-color"
                  :style="{'background-color': i.key}"
                />
                <span v-html="`${i.val} ${Number(i.count) && `<small class=red>${i.count}</small>` || ''}`" />
              </ElCheckbox>
            </div>
          </CommonTransitionY>

        </ElCheckboxGroup>
        <button
          v-if="data && (data.length >= Number(options?.trimTo))"
          class="__content-btn wmc"
          v-html="fullList ? 'Свернуть' : 'Показать все'"
          @click="fullList = !fullList"
        />
      </div>
    </CommonTransitionY>

  </div>
</template>

<script setup lang="ts">
  type Props = {
    view?: CommonCheckboxView
    data?: CommonCheckboxData[],
    options?: CommonCheckboxOptions,
  }
  const props = withDefaults(defineProps<Props>(), {
    view: 'simple',
  })
  const emits = defineEmits<{
    <T extends boolean | CommonCheckboxData[]>(name: 'updateValue', val: T): void
  }>()

  const { $listen } = useNuxtApp()
  const { statusBreakpoint } = useResponsive()

  const toggleStatus = computed(() => {
    if(props.options?.toggleDeactivate) return false
    return props.options?.toggleVisible && props.options?.checkboxGroup || statusBreakpoint.value.nowMOBILE && props.options?.checkboxGroup && props.options?.label
  })

  const fullList = ref(false)

  const checkbox = ref(props.options?.checked ?? false)

  const checkboxGroup = ref<CommonCheckboxData[]>([])

  const visible = ref(props.options?.toggleVisible && toggleStatus.value ? props.options?.toggleVisibleStatus ?? true : false)

  const getAll = (val: boolean) => {
    if(!props.options?.checkboxGroup) checkbox.value = val
    else checkboxGroup.value = val && props.data || []
  }

  watch(() => checkbox.value,
    (val) => emits('updateValue', val),
    { immediate: true }
  )
  watch(() => checkboxGroup.value,
    (val) => props.options?.checkboxGroup && emits('updateValue', val),
    {
      deep: true,
      immediate: true
    }
  )
  watch(() => statusBreakpoint.value.nowMOBILE,
    (val) => {
      if(!val && !props.options?.toggleVisible) visible.value = true
      if(val && toggleStatus.value) visible.value = props.options?.toggleVisibleStatus ?? true
    },
    { immediate: true }
  )

  $listen('reset', () => {
    onNuxtReady(() => {
      checkbox.value = props.options?.checked ?? false
      checkboxGroup.value = props.options?.checkedList ?? []
    })
  })

</script>

<style scoped lang="scss">
  .CommonCheckbox :deep() {
    .__head {
      &.active {
        .svgIcon {
          transform: rotate(-90deg);
        }
      }
      .svgIcon {
        transform: rotate(90deg);
      }
      label {
        &.done {
          color: $green;
        }
      }
    }
    .__content {
      &-main, &-mainFull {
        .el-checkbox {
          @include value_adaptive(margin-bottom, 8, 4);
          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
      &-mainFull {
        @include value_adaptive(margin-top, 8, 4);
      }
    }
    .el-checkbox {
      width: max-content;
      white-space: nowrap;
      height: initial;
      margin: 0;
      @include value_adaptive(column-gap, 8, 4);
      @media((hover) and (min-width: #{$sm + 1 + px})) {
        &:hover {
          .el-checkbox__inner {
            border-color: $black;
          }
        }
      }
      &.is-checked {
        .el-checkbox__inner {
          &::after {
            transform: translateY(-50%) translateX(-50%) rotate(45deg) scale(1.3);
          }
        }
      }
      &.is-disabled {
        opacity: .5;
        cursor: initial;
        pointer-events: none;
        :nth-child(n) {
          cursor: initial;
        }
      }
      &.error {
        .el-checkbox__label {
          span {
            color: $red;
          }
        }
      }
      &__label {
        color: $black;
        padding: 0;
        display: flex;
        align-items: center;
        @include value_adaptive(column-gap, 8, 4);
        span {
          transition: color .3s;
        }
      }
      &__inner {
        border-color: transparent;
        min-width: 16px;
        max-width: 16px;
        height: 16px;
        transition: border-color .3s;
        &::after {
          top: 40%;
          left: 50%;
          transform: translateY(-50%) translateX(-50%) rotate(45deg) scale(0);
          transition: transform .3s;
        }
      }
      ._color {
        border: 1px solid rgba($black, .05);
        min-width: 18px;
        max-width: 18px;
        height: 18px;
        @media((hover) and (min-width: #{$sm + 1 + px})) {
          &:hover {
            border-color: $black;
          }
        }
      }
    }
  }
</style>
