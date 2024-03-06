<template>
  <div class="CommonCrawLine d-flex fd-c w100">
    <template v-for="(item, index) in data">
      <div
        v-if="item.content.length"
        :class="[
          '__line d-flex fd-r aic',
          {'goAnimation': data.length == Object.keys(lineAcc).length && readyAnimation}
        ]"
        :style="[
          {width: lineAcc[`line_${index}`] ? `${lineAcc[`line_${index}`].getBoundingClientRect().width * 2}px` : 'auto'},
          {'animation-duration': item.speed ? `${item.speed}s` : undefined},
          {'animation-direction': item.reverse ? `reverse` : undefined}
        ]"
        :key="`${readyAnimation}`"
        >
        <div
          v-for="repeat in 3"
          class="__line-item d-flex nowrap wmc"
          :ref="(el) => setRef(`line_${index}`, el as HTMLElement)"
          :key="repeat"
          >
          <div
            class="_content d-flex fd-r"
            v-for="(i, idx) in item.content"
            :key="idx"
            >
            <div
              v-if="i.icon"
              class="_content-image"
              >
              <NuxtPicture
                loading="eager"
                class="br-circle over-hidden h100"
                :alt="`icon_${idx}`"
                :src="i.icon"
                :imgAttrs="{class: 'obj-cover'}"
              />
            </div>
            <div
              v-if="i.text"
              class="_content-text bg_blue d-flex aic"
              >
              <span v-html="i.text" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">

  type Props = {
    data: CommonCrawLineData[]
  }
  const props = defineProps<Props>()

  const lineAcc = ref<Record<string, HTMLElement>>({})

  const readyAnimation = ref(false)

  const setRef = (name: string, el: HTMLElement) => {
    lineAcc.value[name] = el
  }

  onNuxtReady(() => readyAnimation.value = true)

</script>

<style scoped lang="scss">
  .CommonCrawLine {
    @include value_adaptive(row-gap, 24, 12);
    .__line {
      &.goAnimation {
        animation: animateLine linear infinite;
      }
      &:nth-child(odd) {
        animation-duration: 55s
      }
      &:nth-child(even) {
        animation-duration: 72s
      }
      &-item {
        @include value_adaptive((padding-right, column-gap), 24, 12);
        @include value_adaptive(height, 90, 80);
        ._content {
          @include value_adaptive(column-gap, 24, 12);
          &-image {
            picture {
              @include value_adaptive(width, 90, 80);
            }
          }
          &-text {
            @include value_adaptive((padding-left, padding-right, border-radius), 24, 12);
          }
        }
      }
    }
  }
</style>
