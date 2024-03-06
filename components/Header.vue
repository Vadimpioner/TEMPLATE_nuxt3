<template>
  <header class="Header bg_black pt-20 pb-20 pos-fixed w100 z-5">
    <div class="desktopContainer d-flex aic c-gap-20">
      <span
        class="white c-p opacity"
        v-html="'Main Page'"
        @click="
          scrollTop(),
          $router.push({path: localePath('/')})
        "
      />
      <div class="d-flex c-gap-15">
        <button
          v-for="(item, index) in locales"
          class="white"
          :key="index"
          @click="
            $i18n.locale = item.code,
            setLocale(item.code)
          "
          >
          {{item.code}}
        </button>
      </div>
      <h3
        class="white"
        v-html="`${$i18n.locale} | ${$t('svyazatsya-s-nami')}`"
      />

      <div style="margin-left: auto" class="d-flex c-gap-10">
        <NuxtLink
          textContent="Catalog"
          :to="localePath('/catalog')"
        />
        <NuxtLink
          v-if="$auth.loggedIn"
          textContent="Profile"
          :to="localePath('/profile')"
        />
        <NuxtLink
          v-if="!$auth.loggedIn"
          textContent="Authorization"
          :to="'/authorization'"
        />
        <span class="white">| Sum {{ cartListSum }} |</span>
        <NuxtLink
          textContent="Cart"
          :to="localePath('/cart')"
        />
        <NuxtLink
          textContent="Favorite"
          :to="localePath('/favorite')"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">

  const { cartListSum } = storeToRefs(cartStore())

  const { locale, locales, setLocale } = useI18n()

  const localePath = useLocalePath()

  const switchLocalePath = useSwitchLocalePath()

  watch(() => locale.value,
    (val) => locale.value = val
  )

</script>

<style scoped lang="scss">
  .Header {}
</style>
