<template>
  <div :class="['UiAccordion pos-r d-flex fd-c']">
    <slot />
  </div>
</template>

<script setup lang="ts">

  import { UiAccordion } from '~/injects'

  type UiAccordionType = typeof UiAccordion extends InjectionKey<infer T> ? T : never
  type Props = {
    accordionSimple?: boolean
  }
  const props = defineProps<Props>()
  const slots = defineSlots<{
    default: () => unknown
  }>()

  const count = ref<UiAccordionType['count']>(0)
  const active = ref<UiAccordionType['active']>(undefined)

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
