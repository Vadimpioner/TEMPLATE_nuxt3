<template>
  <section
    id="SectionAuthorization"
    class="SectionAuthorization d-flex aic jcc h100 mobileContainer"
    >
    <Transition name="fade" mode="out-in">
      <div
        class="__wrapper w100 d-flex fd-c"
        :key="`${active}`"
        >

        <h2 :textContent="active" />

        <AuthLogin
          v-if="active == 'login'"
          @changeForm="active = 'passwordForgot'"
        />
        <AuthRegister v-if="active == 'registration'" />
        <AuthPasswordForgot v-if="active == 'passwordForgot'" />
        <AuthPasswordNew v-if="active == 'passwordNew'" />

        <button
          v-if="['login', 'registration'].includes(active)"
          v-html="active == 'login' ? 'регистрация' : 'зарегистрированы? войдите'"
          @click="active = active == 'login' ? 'registration' : 'login'"
        />

      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">

  const auth = useAuth()
  const route = useRoute()
  const router = useRouter()

  if(auth.loggedIn) router.push({ path: useLocalePath()('/') })

  const active = ref((route.query.active as string) || 'login')

  watch(() => active.value,
    async (val) => {
      await router.push({
        query: {
          ...route.query,
          active: val,
        }
      })
    },
    { immediate: true }
  )
  watch(() => (route.query.active as string),
    (val) => val != active.value && (active.value = val)
  )

</script>

<style scoped lang="scss">
  .SectionAuthorization {
    .__wrapper {
      background-color: white;
      row-gap: 15px;
      @include value_adaptive(padding, 42, 24);
    }
  }
</style>
