<template>
  <div class="CommonTheme">
    <ElSwitch v-model="themeDark"></ElSwitch>
  </div>
</template>

<script setup lang="ts">

  const colorMode = useColorMode()

  const themeDark = ref(false)

  watch(() => themeDark.value,
    (val) => colorMode.preference = val ? 'dark' : 'light'
  )

  onMounted(() => {
    const TEMPLATE = document.documentElement
    if(TEMPLATE.classList.contains('dark-mode')) themeDark.value = true
    if(TEMPLATE.classList.contains('light-mode')) themeDark.value = false
  })

</script>
