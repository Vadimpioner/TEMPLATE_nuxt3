<template>
  <div
    :class="[
      'CommonSelect d-flex fd-c',
      {'loadingFetch': skeleton}
    ]"
    >

    <label
      v-if="options?.label"
      v-html="options?.label"
      :class="[
        {'customRequired': options?.customRequired}
      ]"
    />

    <ClientOnly>
      <Transition name="fade" mode="out-in">
        <ElSelect
          v-model="selectValue"
          value-key="val"
          :class="[
            'transition-color',
            {'done': options?.done},
            {'error': options?.error},
            {'disabled pointer-none opacity-5': options?.disabled},
          ]"
          :disabled="options?.disabled"
          :multiple="options?.multiple"
          :collapseTags="options?.collapseTags"
          :clearable="options?.clearable"
          :multiple-limit="options?.multipleLimit"
          :placeholder="`${options?.customRequired ? `${options.placeholder} *` : options?.placeholder ?? ''}`"
          >

          <template
            #prefix
            v-if="$slots.prefix || (!Array.isArray(selectValue) && selectValue?.image)"
            >
            <Transition name="fade" mode="out-in">
              <NuxtPicture
                v-if="!Array.isArray(selectValue) && selectValue?.image"
                loading="eager"
                class="br-circle over-hidden"
                :src="selectValue.image"
                :alt="selectValue.val"
                :key="selectValue.image"
              />
            </Transition>
          </template>

          <ElOption
            v-for="item in data"
            :label="item.val"
            :value="item"
            :disabled="options?.disabledList && options.disabledList.some(i => i.key == item.key)"
            >

            <NuxtPicture
              v-if="item.image"
              loading="eager"
              class="br-circle over-hidden"
              :src="item.image"
              :alt="item.val"
            />

            <span v-html="item.val" />

          </ElOption>

        </ElSelect>
      </Transition>
    </ClientOnly>

    <CommonTransitionY>
      <div v-if="options?.error ?? (Array.isArray(selectValue) && selectValue.length >= Number(options?.multipleLimit))">
        <Transition name="fade" mode="out-in">
          <small
            class="red"
            v-html="`${options?.errorMessage || ''} ${Array.isArray(selectValue) && selectValue.length >= Number(options?.multipleLimit) ? `Лимит: ${options?.multipleLimit}` : ''}`"
            :key="options?.errorMessage"
          />
        </Transition>
      </div>
    </CommonTransitionY>

  </div>
</template>

<script setup lang="ts">

  type Props = {
    skeleton?: boolean,
    options?: CommonSelectOptions,
    data: CommonSelectData[]
  }
  const props = withDefaults(defineProps<Props>(), {
    skeleton: false
  })
  const emits = defineEmits<{
    <T extends CommonSelectData | CommonSelectData[]>(name: 'updateValue', val: T): void
  }>()
  const slots = defineSlots<{
    prefix?: () => unknown
  }>()

  const { $listen } = useNuxtApp()

  const selectValue = ref(props.options?.checkedList ?? (props.options?.multiple ? [] as CommonSelectData[] : {} as CommonSelectData))

  watch(() => selectValue.value,
    (newValue, oldValue) => {
      if(JSON.stringify(oldValue) != JSON.stringify(newValue)) emits('updateValue', newValue)
    },
    { immediate: true }
  )

  $listen('reset', () => {
    selectValue.value = props.options?.checkedList ?? (props.options?.multiple ? [] : {} as CommonSelectData)
  })

</script>

<style scoped lang="scss">
  .CommonSelect {
    &.loadingFetch {
      @include value_adaptive(height, 50, 42);
    }
    :deep() .el-select {
      &.fade-enter-active,
      &.fade-leave-active {
        transition: opacity .15s;
      }
      &.error {
        background-color: rgba($red, .05);
        .el-input {
          border-color: $red !important;
        }
      }
      &.done {
        background-color: rgba($green, .05);
        .el-input {
          border-color: $green !important;
        }
      }
      &.disabled {
        :nth-child(n) {
          pointer-events: none;
        }
      }
      .is-near {
        max-width: unset !important;
        cursor: pointer;
        overflow: hidden;
        overflow-x: auto;
        height: 100%;
        margin: 0;
        flex-wrap: nowrap;
        @include value_adaptive(column-gap, 16, 8);
        &::-webkit-scrollbar, &::-webkit-scrollbar-thumb {
          display: none;
        }
        .el-select__selected-item {
          height: 60%;
          .el-tag {
            margin: 0;
            border: 1px solid $blue;
            border-radius: unset;
            background-color: transparent;
            height: 100%;
            @include value_adaptive(column-gap, 8, 4);
            @include value_adaptive((padding-right, padding-left), 16, 8);
            span {
              display: flex;
              color: $black;
            }
            i {
              margin: 0;
              color: $black;
              transition: background-color .3s, color .3s;
            }
          }
        }
      }
      &__wrapper {
        border: 1px solid $gray;
        transition: border-color .3s;
        border-radius: 0;
        background-color: transparent;
        box-shadow: unset !important;
        padding: 0;
        @include value_adaptive(column-gap, 16, 8);
        @include value_adaptive(padding-left, 24, 16);
        @include value_adaptive(height, 50, 42);
        &.is-focused {
          z-index: 1;
          border-color: $blue !important;
        }
      }
      &__prefix {
        picture {
          @include value_adaptive((height, width), 34, 32);
          img {
            object-fit: cover;
          }
        }
      }
      &__suffix {
        justify-content: center;
        @include value_adaptive(width, 40, 32);
        .el-icon {
          svg {
            color: $black;
          }
        }
      }
      &__selection {
        .el-select__placeholder {
          position: initial;
          transform: unset;
          min-width: 40px;
        }
      }
    }
  }
</style>
