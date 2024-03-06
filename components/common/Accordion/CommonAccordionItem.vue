<template>
  <div
    v-if="$slots.trigger && $slots.content"
    :class="[
      'CommonAccordionItem',
      {'active': visible}
    ]"
    >
    <div
      :class="[
        '__trigger c-p',
        {'active': visible}
      ]"
      @click="open()"
      >
      <slot
        name="trigger"
        :visibleAI="visible"
      />
    </div>
    <CommonTransitionY>
      <div
        v-show="visible"
        :class="[
          '__content',
          {'active': visible}
        ]"
        >
        <slot name="content" />
      </div>
    </CommonTransitionY>
  </div>
</template>

<script setup lang="ts">

  import { CommonAccordion } from '~/inject'

  type Props = {
    show?: boolean
  }
  const props = defineProps<Props>()
  const slots = defineSlots<{
    trigger: (props: { visibleAI?: boolean }) => unknown
    content: () => unknown
  }>()

  const visible = computed(() => {
    if(accordion.value?.accordionSimple) return localShow.value
    return index.value == accordion.value?.active
  })

  const accordion = ref(inject(CommonAccordion))

  const index = ref(accordion.value && accordion.value.count++)

  const localShow = ref(props.show || false)

  const open = () => {
    localShow.value = !localShow.value
    if(accordion.value) accordion.value.active = visible.value ? undefined : index.value
  }

</script>

<style scoped lang="scss">
  .CommonAccordionItem {
    border: 2px solid $blue;
    background-color: rgba($black, .1);
    transition: padding-bottom .3s;
    &.active {
      @include value_adaptive(padding-bottom, 24, 16);
    }
    .__trigger {
      @include value_adaptive(padding, 24, 16);
    }
    .__content {
      @include value_adaptive((padding-right, padding-left), 24, 16);
    }
  }
</style>
