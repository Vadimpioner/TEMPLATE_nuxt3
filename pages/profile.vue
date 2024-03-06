<template>
  <div class="desktopContainer">
    <pre>{{ auth.user }}</pre>

    <button class="fw600 ttu mt-15 bg_blue" @click="logout()">logout</button>
  </div>
</template>

<script setup lang="ts">

  const { $localePath } = useNuxtApp()

  const auth = useAuth()

  const logout = async () => {
    await auth.logout()
    .then(() => {
      navigateTo({ path: $localePath('/') })
    })
    .catch((error) => console.error('ERRORLogOut', error))
  }

</script>
