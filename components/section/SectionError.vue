<template>
  <section
    id="SectionError"
    class="SectionError d-flex aic jcc h100"
    >
    <div class="__wrapper d-flex fd-c aic desktopContainer">
      <h1>Error: {{data.statusCode}}</h1>
      <span v-html="data.title" />
    </div>
  </section>
</template>

<script setup lang="ts">

  import type { NuxtError } from '#app'

  type Props = {
    data: {
      title: string,
      statusCode: NuxtError['statusCode']
    }
  }
  const props = defineProps<Props>()

  onMounted(() => {
    console.log('SectionError')
  })

</script>

<style scoped lang="scss">
  .SectionError {

  }
</style>
