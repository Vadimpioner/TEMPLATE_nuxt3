<template>
  <div class="UiShowMore d-flex fd-c">

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
      <UiButton
        v-if="data.fullText"
        :class="[{'show': showFullText}]"
        :key="`${showFullText}`"
        @click="
          showFullText = !showFullText,
          !showFullText ? scrollToElement(anchor) : null
        "
        >
        {{ showFullText ? (options?.btnHideText || 'Свернуть') : (options?.btnShowText || 'Подробнее') }}
      </UiButton>
    </Transition>

  </div>
</template>

<script setup lang="ts">

  type Props = {
    data: UiShowMoreData,
    options?: UiShowMoreOptions,
    anchor?: string,
  }
  const props = withDefaults(defineProps<Props>(), {
    anchor: '.UiShowMore'
  })

  const showFullText = ref(false)

</script>
