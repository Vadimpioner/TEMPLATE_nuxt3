<template>
  <nav class="UIBreadcrumbs d-flex c-gap-8 desktopContainer over-hidden over-x-auto scrollbarNone nowrap">

    <template v-for="item of [homePage, ...data].slice(0, -1)">
      <div
        v-if="item.slug"
        class="__item d-flex c-gap-8 aic"
        >
        <NuxtLink
          class="fz-14 opacity select-none ttс black"
          :textContent="item.title"
          :to="useLocalePath()(`/${item.slug}`)"
        />
        <NuxtIcon
          filled
          class="stroke_black"
          name="arrowRight"
          width="6"
          height="10"
        />
      </div>
    </template>

    <span
      class="fz-14 pointer-none"
      v-html="[homePage, ...data].at(-1)?.title"
    />

  </nav>
</template>

<script setup lang="ts">

  type Props = {
    data: UIBreadcrumbsData[]
  }
  const props = defineProps<Props>()

  const homePage = ref<UIBreadcrumbsData>({
    title: 'TEMPLATE',
  })

</script>
