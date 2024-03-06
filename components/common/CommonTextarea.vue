<template>
  <div class="CommonTextarea d-flex fd-c">

    <label
      v-if="options?.label"
      v-html="options?.label"
      :class="[
        {'customRequired': options?.customRequired}
      ]"
    />

    <textarea
      v-model.trim="textareaValue"
      :class="[
        'fz-20 transition-color bg_transparent',
        {error: options?.error},
        {done: options?.done},
      ]"
      :required="options?.required"
      :maxlength="options?.maxlength"
      :placeholder="options?.customRequired && options?.placeholder ? `${options?.placeholder} *` : options?.placeholder"
    />

    <CommonTransitionY>
      <div v-if="options?.error && options?.errorMessage || textareaValue.length >= Number(options?.maxlength)">
        <Transition name="fade" mode="out-in">
          <small
            class="red"
            v-html="options?.errorMessage || textareaValue.length >= Number(options?.maxlength) && `Max symbols: ${options?.maxlength}`"
            :key="options?.errorMessage"
          />
        </Transition>
      </div>
    </CommonTransitionY>

  </div>
</template>

<script setup lang="ts">

  type Props = {
    options?: CommonTextareaOptions
  }
  const props = defineProps<Props>()
  const emits = defineEmits<{
    (name: 'updateValue', val: typeof textareaValue.value): void
  }>()

  const { $listen } = useNuxtApp()

  const textareaValue = ref(props.options?.setValue ?? '')

  watch(() => textareaValue.value,
    (val) => emits('updateValue', val)
  )

  $listen('reset', () => {
    onNuxtReady(() => textareaValue.value = props.options?.setValue ?? '')
  })

</script>

<style scoped lang="scss">
  .CommonTextarea {
    textarea {
      border: 1px solid $gray;
      @include value_adaptive(height, 200, 180);
      @include value_adaptive(padding, 24, 16);
      @media((hover) and (min-width: #{$sm + 1 + px})) {
        &:hover {
          border-color: $green;
        }
      }
      &:focus {
        border-color: $blue;
      }
      &.error {
        border-color: $red !important;
        background-color: rgba($red, .05);
      }
      &.done {
        border-color: $green !important;
        background-color: rgba($green, .05);
      }
    }
  }
</style>
