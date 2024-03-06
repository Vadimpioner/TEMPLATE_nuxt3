<template>
  <Transition
    name="transitionY"
    @after-leave="(val) => afterLeave(val)"
    @enter="(val) => enter(val)"
    @leave="(val) => leave(val)"
    >
    <slot />
  </Transition>
</template>

<script setup lang="ts">

  const slots = defineSlots<{
    default: () => unknown
  }>()

  const afterLeave = (el: Element) => {
    if(el instanceof HTMLElement) {

      el.style.removeProperty('height')
      el.style.removeProperty('margin-top')

    }
  }

  const enter = (el: Element) => {
    if(el instanceof HTMLElement) {

      const { height, marginTop } = getComputedStyle(el)

      el.style.position = 'absolute'
      el.style.visibility = 'hidden'

      el.style.position = ''
      el.style.visibility = ''

      requestAnimationFrame(() => {
        el.animate(
          [
            { height: '0', marginTop: '0', opacity: '0' },
            { height, marginTop: marginTop, opacity: '1' },
          ],
          { duration: 200 }
        )
        el.style.marginTop = marginTop
      })

    }
  }

  const leave = (el: Element) => {
    if(el instanceof HTMLElement) {

      const { height } = getComputedStyle(el)

      el.style.height = height

      requestAnimationFrame(() => {
        el.style.height = '0'
        el.style.marginTop = '0'
      })

    }
  }

</script>

<style lang="scss">
  .transitionY-enter-active,
  .transitionY-leave-active {
    will-change: height, opacity, margin-top;
    transition-property: opacity, height, margin-top;
    transition-duration: .2s;
    overflow: hidden;
  }

  .transitionY-leave-to {
    height: 0;
    opacity: 0;
    margin-top: 0 !important;
  }
</style>
