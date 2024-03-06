<template>
  <section
    id="SectionFavorite"
    class="SectionFavorite"
    >
    <div class="__wrapper d-flex fd-c desktopContainer">
      <Transition name="fade" mode="out-in">

        <div
          v-if="!checkFavoriteList"
          class="bg_gray w100 d-flex aic jcc fz-30"
          style="height: 500px"
          >
          Ничего нет
        </div>

        <div v-else>
          <h1 @click="removeAllFavoriteItems()">
            remove all
          </h1>
          <div class="d-grid">
            <CommonCard
              v-for="item in checkFavoriteList && !favoriteList?.length ? Array(8) : favoriteList"
              :item="item"
            />
          </div>
        </div>

      </Transition>
    </div>
  </section>
</template>

<script setup lang="ts">

  const { favoriteList } = storeToRefs(favoriteStore())
  const { removeAllFavoriteItems } = favoriteStore()

  const FAVORITE = localStorage.getItem('favoriteList_START_TEMPLATE')
  const checkFavoriteList = ref(Boolean(FAVORITE && JSON.parse(FAVORITE)?.length))

  watch(() => favoriteList.value.length,
    (val) => !val && (checkFavoriteList.value = false)
  )

</script>

<style scoped lang="scss">
  .SectionFavorite {
    .d-grid {
      @include value_adaptive(gap, 24, 16);
      @include value_change(grid-template-columns, repeat(auto-fill, minmax(280px, 1fr)), repeat(auto-fill, minmax(calc(140px + 140 * ((100vw - #{$dno + px}) / ($desktop - ($dno)))), 1fr)), $desktop);
    }
  }
</style>
