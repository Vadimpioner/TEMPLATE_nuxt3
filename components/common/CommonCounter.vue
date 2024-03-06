<template>
  <div class="CommonCounter d-flex fd-c">

    <label
      v-if="options?.label"
      v-html="options?.label"
      :class="[
        {'customRequired': options?.customRequired}
      ]"
    />

    <div :class="`__wrapper d-flex ${view}`">

      <ElInputNumber
        v-model="counterValue.count"
        :class="['d-flex']"
        :min="1"
        :max="options?.max"
        :step="options?.step"
        :stepStrictly="options?.stepStrictly ?? true"
        :precision="options?.precision ?? 1"
        :disabled="options?.disabled"
      />

      <CommonSelect
        v-if="['withSelect'].includes(view) && data.select"
        :data="data.select"
        :options="{
          checkedList: options?.checkedSelect,
        }"
        @updateValue="(val: CommonSelectData) => counterValue.select = val"
      />

    </div>

    <CommonTransitionY>
      <small
        v-if="counterValue.count >= Number(options?.max)"
        v-html="`Максимум: ${Number(options?.max)}`"
      />
    </CommonTransitionY>

  </div>
</template>

<script setup lang="ts">

  type Props = {
    view?: 'simple' | 'withSelect'
    data: CommonCounterData,
    options?: CommonCounterOptions,
  }
  const props = withDefaults(defineProps<Props>(), {
    view: 'simple'
  })
  const emits = defineEmits<{
    (name: 'updateValue', val: typeof counterValue.value): void
  }>()

  const { $listen } = useNuxtApp()

  const refInputNumber = ref<ComponentPublicInstance>()

  const counterValue = ref({
    count: Number(props.data.count),
    select: props.options?.checkedSelect || {} as CommonSelectData
  })

  watch(() => counterValue.value,
    (val) => {
      emits('updateValue', {
        count: val.count,
        select: val.select,
      })
    },
    {
      deep: true,
      immediate: true
    }
  )

  onMounted(() => {
    refInputNumber.value?.$el.querySelector('.el-input__inner').setAttribute('inputmode', 'numeric')
  })

  $listen('reset', () => {
    counterValue.value = {
      count: Number(props.data.count),
      select: props.options?.checkedSelect || {} as CommonSelectData
    }
  })

</script>

<style scoped lang="scss">
  .CommonCounter :deep() {
    .__wrapper {
      background-color: $gray;
      @include value_adaptive(height, 50, 42);
      @include value_adaptive(max-width, 200, 160);
      &.withSelect {
        @include value_adaptive(max-width, 260, 220);
        .CommonSelect {
          .el-select {
            @include value_adaptive(height, 50, 42);
          }
        }
      }
      .el-input-number {
        width: 100% !important;
        &.is-disabled {
          pointer-events: none;
          opacity: .7;
        }
        &__decrease {
          order: 1;
        }
        &__increase {
          order: 3;
        }
        span[role=button] {
          position: initial;
          border: unset;
          border-radius: 0;
          transition: color .3s, background-color .3s;
          background-color: transparent;
          color: $black !important;
          @include value_adaptive((min-width, max-width), 50, 42);
          :nth-child(n) {
            color: $black;
          }
          @media((hover) and (min-width: #{$sm + 1 + px})) {
            &:hover {
              background-color: rgba($black, .2);
            }
          }
          &.is-disabled {
            pointer-events: none;
            opacity: .5;
          }
        }
        .el-input {
          order: 2;
          &__wrapper {
            padding: 0;
            box-shadow: unset;
            border-radius: 0;
            background-color: transparent;
            input {
              height: 100%;
            }
          }
          &__inner {
            &::selection {
              color: inherit;
              background-color: transparent;
            }
          }
        }
      }
    }
  }
</style>
