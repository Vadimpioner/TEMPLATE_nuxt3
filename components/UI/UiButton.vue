<template>
  <Component
    v-loading="options?.loading"
    :is="options?.to ? NuxtLink : 'button'"
    :target="options?.target"
    :to="options?.to"
    :class="[
      `UiButton__${view} d-flex aic jcc minwmc transition-all pos-r over-hidden`,
      {'pointer-none': options?.pointerNone},
      {'disabled pointer-none': options?.disabled},
      {'error pointer-none': options?.error},
      {'fullOnSM': options?.fullOnSM},
      {'loadingFetch': options?.skeleton},
      options?.fullWidth ? 'w100' : 'wmc'
    ]"
    @click="emits('clickBtn', $event)"
    >
    <div class="d-flex aic nowrap">
      <slot />
    </div>
  </Component>
</template>

<script setup lang="ts">

  import { NuxtLink } from '#components'

  type Props = {
    view?: 'one' | 'two',
    options?: UiButtonOptions
  }
  const props = withDefaults(defineProps<Props>(), {
    view: 'one'
  })
  const emits = defineEmits<{
    (name: 'clickBtn', event: Event): void
  }>()
  const slots = defineSlots<{
    default: () => unknown
  }>()

  watch(() => props.options?.error,
    (val) => val && window.navigator.vibrate([17, 57, 17, 57, 17, 57, 57, 57, 17, 57, 57, 57, 17, 57, 17])
  )

</script>

<style scoped lang="scss">
  .UiButton {
    &__one,
    &__two {
      border: 1px solid transparent;
      @include value_adaptive(height, 56, 40);
      @include value_adaptive((padding-right, padding-left), 24, 16);
      &.disabled {
        background-color: $gray;
        div {
          color: $white;
        }
      }
      &.error {
        background-color: $red;
        animation: btnError $maxTime;
      }
      &.fullOnSM {
        @include value_change(width, null, 100%, $sm);
      }
    }
    &__one {
      background-color: $blue;
      @include hover {
        box-shadow: 0px 5px 20px rgba($blue, .6);
      }
    }
    &__two {
      background-color: $green;
      @include hover {
        box-shadow: 0px 5px 10px rgba($green, .4);
      }
    }
  }
</style>
