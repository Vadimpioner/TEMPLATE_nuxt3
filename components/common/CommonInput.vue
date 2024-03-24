<template>
  <div class="CommonInput d-flex fd-c">

    <div
      v-if="options?.label"
      class="__label d-flex"
      >
      <label
        v-html="options?.label"
        :class="[
          {'customRequired': options?.customRequired}
        ]"
      />
      <ElTooltip
        v-if="options?.tooltipContent"
        placement="top-start"
        :content="options.tooltipContent"
        >
        <NuxtIcon
          filled
          name="help"
          class="c-p transition-color br-circle over-hidden opacity"
        />
      </ElTooltip>
    </div>

    <div
      v-outside="() => focus = false"
      :class="[
        '__content d-flex aic transition-color c-t',
        {prefix: $slots.prefix},
        {suffix: $slots.suffix},
        {focus: focus},
        {done: options?.done},
        {error: options?.error},
        {'disabled pointer-none opacity-5': options?.disabled},
      ]"
      @click="
        focus = true;
        refCommonInput?.focus()
      "
      >

      <span
        v-if="$slots.prefix"
        :class="['__content-prefix']"
        >
        <slot name="prefix" />
      </span>

      <input
        ref="refCommonInput"
        v-model.trim="inputValue"
        v-maska
        :class="[
          'fz-20 bg_transparent w100 h100 c-t',
          {hiddenIndicator: options?.hiddenIndicator},
          {notVisibleSelection: options?.notVisibleSelection},
        ]"
        :data-maska="options?.maska"
        :type="passwordShow ? 'text' : options?.type || 'text'"
        :autocomplete="options?.autocomplete || 'off'"
        :required="options?.required"
        :maxlength="options?.maxlength"
        :inputmode="options?.inputmode"
        :enterkeyhint="options?.enterkeyhint"
        :max="options?.max"
        :min="options?.min"
        :step="options?.step"
        :placeholder="options?.customRequired && options?.placeholder ? `${options?.placeholder} *` : options?.placeholder"
        @input="inputValue = inputValue.toString().replace(options?.replaceValue ?? '', '').trim()"
        @keyup="
          emits('keyAction', $event),
          $event.keyCode == 13 && (focus = false, refCommonInput?.blur())
        "
        @focusout="(focus = false, refCommonInput?.blur())"
      />

      <span
        v-if="$slots.suffix"
        :class="['__content-suffix']"
        >
        <slot name="suffix" />
      </span>

      <Transition name="fade">
        <NuxtIcon
          v-if="inputValue && $attrs.onReset && options?.type != 'password'"
          filled
          name="close"
          class="c-p opacity"
          @click.stop="
            emits('onReset'),
            inputValue = ''
          "
        />
      </Transition>

      <Transition name="fade">
        <NuxtIcon
          v-if="inputValue && options?.type == 'password'"
          filled
          class="c-p opacity"
          :name="passwordShow ? 'visibilityOff' : 'visibility'"
          @click.stop="passwordShow = !passwordShow"
        />
      </Transition>
    </div>

    <CommonTransitionY>
      <div v-if="options?.error && options?.errorMessage">
        <Transition name="fade" mode="out-in">
          <small
            class="red"
            v-html="options.errorMessage"
            :key="options.errorMessage"
          />
        </Transition>
      </div>
    </CommonTransitionY>

  </div>
</template>

<script setup lang="ts">

  type Props = {
    options?: CommonInputOptions
  }
  const props = defineProps<Props>()
  const emits = defineEmits<{
    (name: 'updateValue', val: typeof inputValue.value): void
    (name: 'keyAction', event: KeyboardEventInit): void
    (name: 'onReset'): void
  }>()
  const slots = defineSlots<{
    prefix?: () => unknown
    suffix?: () => unknown
  }>()

  const { $listen } = useNuxtApp()

  const refCommonInput = ref<HTMLInputElement>()
  const inputValue = ref(props.options?.setValue ?? '')
  const focus = ref(false)
  const passwordShow = ref(false)

  watch(() => focus.value,
    (val) => {
      if(!val && props.options?.hasOwnProperty('toFixed')) inputValue.value = Number(inputValue.value).toFixed(props.options.toFixed)
      if(!val) emits('updateValue', inputValue.value)
    }
  )
  watch(() => inputValue.value,
    (val) => !props.options?.updateAfterFocus && emits('updateValue', val)
  )
  watch(() => props.options?.setValue,
    (val) => val && (inputValue.value = val)
  )

  $listen('reset', () => {
    onNuxtReady(() => {
      inputValue.value = props.options?.setValue ?? ''
    })
  })

</script>

<style scoped lang="scss">
  .CommonInput {
    .__label {
      .nuxt-icon  {
        height: 14px;
        min-width: 14px;
        max-width: 14px;
      }
    }
    .__content {
      border: 1px solid $gray;
      @include value_adaptive(height, 50, 42);
      @include value_adaptive(column-gap, 16, 8);
      @include value_adaptive((padding-right, padding-left), 24, 16);
      @media((hover) and (min-width: #{$sm + 1 + px})) {
        &:hover {
          border-color: $green;
        }
      }
      &.prefix {
        @include value_adaptive(padding-left, 16, 8);
      }
      &.suffix {
        @include value_adaptive(padding-right, 16, 8);
      }
      &.focus {
        border-color: $blue !important;
      }
      &.done {
        border-color: $green !important;
        background-color: rgba($green, .05);
      }
      &.error {
        border-color: $red !important;
        background-color: rgba($red, .05);
      }
      &-prefix {}
      input {
        caret-color: $blue;
        &.notVisibleSelection {
          &::selection {
            color: inherit;
            background-color: transparent;
          }
        }
        &.hiddenIndicator {  // иконка индикаторов календаря, часов и тд.
          &::-webkit-calendar-picker-indicator {
            display: none;
          }
        }
      }
      &-suffix {}
      .nuxt-icon {
        @include value_adaptive((max-width, min-width, height), 24, 20);
      }
    }
  }
</style>
