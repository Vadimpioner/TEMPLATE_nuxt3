<template>
  <Teleport to="body">
    <Transition name="fade" mode="out-in">
      <div
        v-if="showModal"
        :class="[
          'CommonModal d-flex jcc aic pos-fixed w100 h100 top-0 left-0 z-10',
          disabled ? 'pointer-none' : 'pointer-initial'
        ]"
        @click.self="emits('closeModal')"
        >
        <div
          class="__content d-flex fd-c pos-r bg_white transition-transform"
          :style="`width: ${options?.width || 1000}px`"
          >
          <SvgIcon
            v-if="options?.closeIcon"
            class="fill_white pos-a z-2 opacity c-p"
            name="close"
            @click="emits('closeModal')"
          />
          <div class="__content-body over-y-auto pointer-initial">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">

  const { $listen } = useNuxtApp()
  const { stopScrollBody } = useHelpers()

  type Props = {
    showModal: boolean,
    options?: CommonModalOptions
  }
  const props = defineProps<Props>()
  const emits = defineEmits<{
    (name: 'closeModal'): void
  }>()
  const slots = defineSlots<{
    default: () => unknown
  }>()

  const disabled = ref(false)

  const escCloseModal = (event: KeyboardEvent) => {
    if(props.showModal && !disabled.value && event.key == 'Escape') emits('closeModal')
  }

  watch(() => props.showModal,
    (val) => {
      if(val) {
        stopScrollBody()
        document.addEventListener('keydown', escCloseModal)
      } else {
        stopScrollBody('reset')
        emits('closeModal')
        document.removeEventListener('keydown', escCloseModal)
      }
    }
  )

  onBeforeRouteLeave(() => {
    emits('closeModal')
    document.removeEventListener('keydown', escCloseModal)
  })

  $listen('disabledModal', (val) => disabled.value = val)

</script>

<style scoped lang="scss">
  .CommonModal {
    background-color: rgba($black, .8);
    backdrop-filter: blur(35px);
    .__content {
      max-height: 85%;
      @include value_adaptive(padding, 40, 16);
      @include value_adaptive(padding-right, 32, 12);
      @include value_adaptive(margin-top, 54, 36);
      @include value_change(max-width, calc(100% - (#{$pdMax + px} * 2)), calc(100% - (calc(#{$pdMin + px} + #{$pdMax - $pdMin} * ((100vw - #{$dno + px}) / #{$desktop - $dno})) * 2)), $desktop);
      &-body {
        @include value_adaptive(padding-right, 8, 4);
      }
      .svgIcon {
        right: -5px;
        @include value_adaptive(top, -40, -30);
        @include value_adaptive((height, width), 26, 22);
      }
    }
  }
  .fade-enter,
  .fade-leave-active {
    .__content {
      transform: scale(1.05);
    }
  }
  .fade-leave-active {
    @include value_adaptive(padding-left, 12, 4, $desktop, ($sm + 1));
    @include value_change(padding-left, null, unset, $sm);
  }
</style>
