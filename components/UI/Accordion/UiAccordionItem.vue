<template>
  <div
    v-if="$slots.trigger && $slots.content"
    :class="[
      'UiAccordionItem',
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

  import { UiAccordion } from '~/injects'

  type Props = {
    show?: boolean
  }
  const props = defineProps<Props>()
  const slots = defineSlots<{
    trigger: (props: { visibleAI?: boolean }) => unknown
    content: () => unknown
  }>()

  const visible = computed(() => {
    if(accordion.accordionSimple) return localShow.value
    return index.value == accordion.active
  })
  const accordion = reactive(inject(UiAccordion)!)
  const index = ref(accordion && accordion.count++)
  const localShow = ref(props.show || false)

  const open = () => {
    localShow.value = !localShow.value
    accordion.active = visible.value ? undefined : index.value
  }

</script>

<style scoped lang="scss">
  .UiAccordionItem {
    border: 2px solid $blue;
    background-color: rgba($black, .1);
    transition: padding-bottom $minTime;
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
