<template>
  <div class="TEMPLATE">

    <Header style="flex: 0 0 auto" :color="scrollAcc.value?.Header" />

    <main>
      <slot />
    </main>

    <!-- <Footer style="flex: 0 0 auto" /> -->

  </div>
</template>

<script setup lang="ts">

  const { isMobileOrTablet, isSafari } = useDevice()

  const { $scrollAnimate } = useNuxtApp()

  const { scrollRelative } = useHelpers()

  const { locale } = useI18n()

  const route = useRoute()

  const scrollAcc = ref({})

  watch(() => route.path,
    () => {
      onNuxtReady(() => {
        scrollAcc.value = scrollRelative(
          [
            {
              block: document.querySelector('.Header'),
              collection: Array.from(document.querySelectorAll('[data-section]'))
            },
          ],
        )
        $scrollAnimate()
      })
    },
    { immediate: true }
  )

  onMounted(() => {
    const sheet = document.head.appendChild(document.createElement('style')).sheet

    if(isMobileOrTablet || isSafari) document.body.style.paddingRight = '0 !important'
    if(isSafari && sheet) sheet.insertRule('*::-webkit-scrollbar { display: none !important; }')
  })

  useHead({
    htmlAttrs: {
      lang: locale
    }
  })

</script>
