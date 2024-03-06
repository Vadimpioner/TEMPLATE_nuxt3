<template>
  <div :class="[`CommonSlider__${view} w100 h100 d-flex`]">
    <Swiper
      v-bind="{
        slidesPerView: 'auto',
        speed: 800,
        touchRatio: .5,
        fadeEffect: {
          crossFade: true
        },
        pagination: options?.pagination && {
          ...options?.pagination as PaginationOptions,
          clickable: (options?.pagination as PaginationOptions)?.clickable ?? true
        },
        autoplay: options?.autoplay && {
          ...options?.autoplay as AutoplayOptions,
          delay: (options?.autoplay as AutoplayOptions)?.delay ?? 1000
        },
        zoom: options?.zoom && {
          ...options?.zoom as ZoomOptions,
          maxRatio: (options?.zoom as ZoomOptions)?.maxRatio ?? 5
        },
        ...options,
      }"
      @swiper="(val) => mySwiper = val"
      @slideChange="(val) => emits('currentSlide', val.activeIndex)"
      >
      <slot />
    </Swiper>
  </div>
</template>

<script setup lang="ts">

  import type {
    Swiper,
    SwiperOptions,
    PaginationOptions,
    AutoplayOptions,
    ZoomOptions
  } from 'swiper/types'

  type Props = {
    view?: 'one' | 'two' | 'three',
    options?: SwiperOptions,
    changeSlide?: number,
  }
  const props = withDefaults(defineProps<Props>(), {
    view: 'one',
  })
  const emits = defineEmits<{
    (name: 'currentSlide', val: Swiper['activeIndex']): void
  }>()
  const slots = defineSlots<{
    default: () => unknown
  }>()

  const mySwiper = ref<Swiper>()

  watch(() => props.changeSlide,
    (val) => val && mySwiper.value?.slideTo(val, props.options?.speed ?? 800)
  )

</script>

<style scoped lang="scss">
  .CommonSlider {
    &__one :deep(),
    &__two :deep(),
    &__three :deep() {
      .swiper {
        &-slide {
          @include value_adaptive(margin-right, 24, 16);
          &:last-child {
            margin-right: 0;
          }
        }
        &-container-fade {
          .swiper-slide {
            opacity: 0 !important;
            &-active {
              opacity: 1 !important;
            }
          }
        }
        &-pagination {
          span {
            opacity: 1;
            background-color: rgba($green, .5);
            transition: transform .3s, background-color .3s !important;
          }
          .swiper-pagination-bullet-active {
            transform: scale(1);
            background-color: $green;
          }
        }
        &-button {
          &-next, &-prev {
            transition: opacity .3s, border-color .3s, background-color .3s, color .3s;
            border: 1px solid $black;
            border-radius: 50%;
            margin-top: 0;
            transform: translateY(-50%);
            @include value_adaptive((height, width), 40, 34);
            @media((hover) and (min-width: #{$sm + 1 + px})) {
              &:hover {
                background-color: $white;
                border-color: transparent;
              }
            }
            &::after {
              font-family: unset;
              font-size: unset;
            }
          }
          &-next {
            &::after {
              content: url("data:image/svg+xml,%3Csvg width='8' height='12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m.8 10 4-4-4-4L1.6.4 7.2 6l-5.6 5.6L.8 10Z' fill='%23000'/%3E%3C/svg%3E");
            }
          }
          &-prev {
            &::after {
              content: url("data:image/svg+xml,%3Csvg width='8' height='12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m7.2 2-4 4 4 4-.8 1.6L.8 6 6.4.4 7.2 2Z' fill='%23000'/%3E%3C/svg%3E");
            }
          }
          &-disabled {
            opacity: .5;
            border-color: $black !important;
            background-color: transparent !important;
          }
        }
        &-scrollbar {
          height: 1px;
          background: $gray;
          &-drag {
            background: $green;
          }
        }
      }
    }
    &__two :deep() {
      .swiper {
        padding-bottom: 50px;
        &-button {
          &-next, &-prev {
            bottom: 0;
            top: unset;
            transform: unset;
          }
          &-next {
            @include value_adaptive(left, 50, 42);
          }
          &-prev {
            left: 0;
          }
        }
        &-scrollbar {
          left: unset;
          right: 0;
          @include value_adaptive(bottom, 20, 17);
          @include value_change(width, calc(100% - 100px), calc(100% - calc(90px + 10 * ((100vw - #{$dno + px}) / ($desktop - $dno)))), $mobile);
        }
      }
    }
  }
</style>
