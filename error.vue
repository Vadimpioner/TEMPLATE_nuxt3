<template>
  <div class="TEMPLATE">
    <main>
      <SectionError
        :data="{
          title: title,
          statusCode: props.error.statusCode,
        }"
      />
    </main>
  </div>
</template>

<script setup lang="ts">

  import type { NuxtError } from '#app'

  type Props = {
    error: NuxtError
  }
  const props = defineProps<Props>()

  const { isMobileOrTablet, isSafari } = useDevice();

  const title = computed(() => props.error.statusCode == 404 ? 'Страница не найдена' : props.error.message)

  onMounted(() => {
    const sheet = document.head.appendChild(document.createElement('style')).sheet

    if(isMobileOrTablet || isSafari) document.body.style.paddingRight = '0 !important'
    if(isSafari && sheet) sheet.insertRule('*::-webkit-scrollbar { display: none !important; }')
  })

</script>
