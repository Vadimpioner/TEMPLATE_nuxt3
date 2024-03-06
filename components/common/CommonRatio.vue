<template>
  <div class="CommonRatio d-flex fd-c">

    <label
      v-if="options?.label"
      v-html="options?.label"
      :class="[
        '__label transition-color',
        {'customRequired': options?.customRequired},
        {'red': options?.error}
      ]"
    />

    <div class="__list d-flex flex-wrap">
      <div
        v-for="item in data"
        :class="[
          `__item d-flex aic jcc pos-r c-p transition-color ${view}`,
          {'active': active?.key == item.key},
          {'disabled pointer-none opacity-5': options?.disabledList && options.disabledList.some(i => i.key == item.key)},
        ]"
        :style="{'background-color': ['circle'].includes(view) && item.key || undefined}"
        @click="active?.key == item.key && !options?.noToggle ? (active = {} as CommonRatioData) : active = item"
        >
        <span
          v-if="['tab', 'group'].includes(view)"
          v-html="item.val"
        />
      </div>
    </div>

    <CommonTransitionY>
      <div
        v-if="active?.list?.length && ['group'].includes(view)"
        :class="'__childList d-flex fd-c'"
        >
        <div
          v-for="item in active?.list"
          :class="[
            `__item d-flex aic jcc pos-r c-p transition-color wmc ${view}`,
            {'active': activeChild?.key == item.key},
            {'disabled pointer-none opacity-5': options?.disabledChildList?.some(i => i.key == item.key)},
          ]"
          @click="activeChild?.key == item.key && !options?.noToggle ? activeChild = undefined : activeChild = item"
          >
          <span v-html="item.val" />
        </div>
      </div>
    </CommonTransitionY>

  </div>
</template>

<script setup lang="ts">

  type Props = {
    view?: CommonRatioView,
    data: CommonRatioData[],
    options?: CommonRatioOptions,
  }
  const props = withDefaults(defineProps<Props>(), {
    view: 'tab',
  })
  const emits = defineEmits<{
    (name: 'updateValue', val: _globalData & { child?: _globalData }): void
  }>()

  const { $listen } = useNuxtApp()

  const active = ref<CommonRatioData>(props.data.find(i => i.key == props.options?.checked?.key) || {} as CommonRatioData)

  const activeChild = ref<_globalData>()

  watch(() => active.value,
    (val) => {
      activeChild.value = val?.list?.find(i => i.key == props.options?.checkedChild?.key) ? props.options?.checkedChild : undefined
    },
    { deep: true,
      immediate: true
    },
  )
  watch(() => [active.value, activeChild.value],
    () => {
      emits('updateValue', {
        val: active.value.val,
        key: active.value.key,
        child: activeChild.value && {
          val: activeChild.value.val,
          key: activeChild.value.key,
        }
      })
    },
    { immediate: true }
  )

  $listen('reset', () => {
    active.value = props.data.find(i => i.key == props.options?.checked?.key) || {} as CommonRatioData
  })

</script>

<style scoped lang="scss">
  .CommonRatio {
    .__list {
      @include value_adaptive(gap, 8, 4);
    }
    .__childList {
      margin-top: 20px;
      @include value_adaptive(gap, 8, 4);
    }
    .__item {
      border: 1px solid rgba($black, .3);
      @media((hover) and (min-width: #{$sm + 1 + px})) {
        &:hover {
          border-color: rgba($black, .5);
        }
      }
      &.active {
        border-color: $black;
      }
      &.tab, &.group {
        @include value_adaptive((min-height, max-height), 40, 32);
        @include value_adaptive((padding-right, padding-left), 8, 4);
      }
      &.circle {
        border-radius: 50%;
        @include value_adaptive((height, width), 32, 28);
      }
    }
  }
</style>
