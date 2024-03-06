<template>
  <Component
    v-loading="options?.loading"
    :is="options?.to ? NuxtLink : 'button'"
    :target="options?.target"
    :to="options?.to"
    :class="[
      `CommonButton__${view} d-flex aic jcc wmc transition-all pos-r over-hidden`,
      {'pointer-none': options?.pointerNone ?? options?.error},
      {'disabled pointer-none': options?.disabled},
      {'error pointer-none': options?.error},
      {'fullSM': options?.fullSM},
      {'loadingFetch': options?.skeleton},
    ]"
    @click="emits('clickBtn', $event)"
    >
    <span class="fz-16 nowrap">
      <slot />
    </span>
  </Component>
</template>

<script setup lang="ts">

  import { NuxtLink } from '#components'

  type Props = {
    view?: 'one' | 'two',
    options?: CommonButtonOptions
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
  .CommonButton {
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
        animation: btnError .7s;
      }
      &.fullSM {
        @media(max-width: #{$sm + px}) {
          width: 100%;
        }
      }
    }
    &__one {
      background-color: $blue;
      @media((hover) and (min-width: #{$sm + 1 + px})) {
        &:hover {
          box-shadow: 0px 5px 20px rgba($blue, .6);
        }
      }
    }
    &__two {
      background-color: $green;
      @media((hover) and (min-width: #{$sm + 1 + px})) {
        &:hover {
          box-shadow: 0px 5px 10px rgba($green, .4);
        }
      }
    }
  }
</style>
