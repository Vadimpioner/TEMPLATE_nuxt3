<template>
  <div class="CommonShowMore d-flex fd-c">

    <div
      class="__shortText deepText"
      v-html="data.shortText"
    />

    <CommonTransitionY>
      <div
        v-if="data.fullText"
        v-show="showFullText"
        v-html="data.fullText"
        class="__fullText deepText"
      />
    </CommonTransitionY>

    <Transition name="fade" mode="out-in">
      <CommonButton
        v-if="data.fullText"
        :class="[{'show': showFullText}]"
        :key="`${showFullText}`"
        @click="
          showFullText = !showFullText,
          !showFullText ? scrollToElement(anchor) : null
        "
        >
        {{ showFullText ? (options?.btnHideText || 'Свернуть') : (options?.btnShowText || 'Подробнее') }}
      </CommonButton>
    </Transition>

  </div>
</template>

<script setup lang="ts">

  type Props = {
    data: CommonShowMoreData,
    options?: CommonShowMoreOptions,
    anchor?: string,
  }
  const props = withDefaults(defineProps<Props>(), {
    anchor: '.CommonShowMore'
  })

  const showFullText = ref(false)

</script>
