<template>
  <div :class="['UiAccordion pos-r d-flex fd-c']">
    <slot />
  </div>
</template>

<script setup lang="ts">

  import { UiAccordion } from '~/injects'

  type Props = {
    accordionSimple?: boolean
  }
  const props = defineProps<Props>()
  const slots = defineSlots<{
    default: () => unknown
  }>()

  const count = ref(0)

  const active = ref(undefined)

  provide(UiAccordion, {
    count: count.value,
    active: active.value,
    accordionSimple: props.accordionSimple
  })

</script>

<style scoped lang="scss">
  .UiAccordion {
    @include value_adaptive(row-gap, 24, 16);
  }
</style>
