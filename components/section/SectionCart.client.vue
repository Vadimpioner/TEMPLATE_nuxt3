<template>
  <section
    id="SectionCart"
    class="SectionCart"
    >
    <div class="__wrapper d-flex fd-c desktopContainer">
      <Transition name="fade" mode="out-in">

        <div
          v-if="!checkCartList"
          class="bg_gray w100 d-flex aic jcc fz-30"
          style="height: 500px"
          >
          Ничего нет
        </div>
        <div v-else>
          <h1 @click="removeAllCartItems()">
            remove all
          </h1>
          <div class="d-grid">
            <CommonCard
              v-for="item in checkCartList && !cartList?.length ? Array(8) : cartList"
              :item="item"
            />
          </div>
        </div>

      </Transition>
    </div>
  </section>
</template>

<script setup lang="ts">

  const { cartList } = storeToRefs(cartStore())
  const { removeAllCartItems } = cartStore()

  const CART = localStorage.getItem('cartList_START_TEMPLATE')
  const checkCartList = ref(Boolean(CART && JSON.parse(CART)?.length))

  watch(() => cartList.value.length,
    (val) => !val && (checkCartList.value = false)
  )

</script>

<style scoped lang="scss">
  .SectionCart {
    .d-grid {
      @include value_adaptive(gap, 24, 16);
      @include value_change(grid-template-columns, repeat(auto-fill, minmax(280px, 1fr)), repeat(auto-fill, minmax(calc(140px + 140 * ((100vw - #{$dno + px}) / ($desktop - ($dno)))), 1fr)), $desktop);
      :deep() {
        ._remove {
          display: flex !important;
        }
      }
    }
  }
</style>
