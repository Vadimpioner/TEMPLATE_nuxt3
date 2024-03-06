<template>
  <div
    v-if="!item"
    :class="{'CommonCard loadingFetch': !item}"
  />
  <div
    v-else
    class="CommonCard"
    >
    <span
      class="d-flex jcfe _remove d-none"
      @click="removeCartItem(item.id)"
      >
      remove
    </span>
    <h3 class="pb-15">CommonCard {{ item.price }} | {{ item.oldPrice }}</h3>
    <CommonCounter
      :key="item.count"
      :data="{
        count: item.count || 1
      }"
      :options="{
        label: 'Количество:',
        max: 20,
        min: 1,
        step: 1,
      }"
      @updateValue="(val) => item.count = val.count"
    />
    <div class="d-flex gap-15">
      <CommonButton
        :options="{
          disabled: false,
        }"
        @clickBtn="addCartItem({
          ...item,
          count: item.count,
        })"
        >
        add cart
      </CommonButton>
      <CommonButton
        :options="{
          disabled: false,
        }"
        @clickBtn="inFavorite(item.id) ? removeFavoriteItem(item.id) : addFavoriteItem(item)"
        >
        {{ inFavorite(item.id) ? 'remove favorite' : 'add favorite' }}
      </CommonButton>
    </div>
  </div>
</template>

<script setup lang="ts">

  type Props = {
    item: _fetchCard
  }
  const props = defineProps<Props>()

  const { addCartItem, removeCartItem, inCart } = cartStore()
  const { addFavoriteItem, removeFavoriteItem, inFavorite } = favoriteStore()

</script>

<style scoped lang="scss">
  .CommonCard {
    padding: 15px;
    background-color: $gray;
    &.loadingFetch {
      @include value_adaptive(height, 300, 250);
    }
  }
</style>
