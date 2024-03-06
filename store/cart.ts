export const cartStore = defineStore('cart', () => {

  const { getProductById } = useMyApiRoutes()

  const cartList: Ref<_fetchCard[]> = ref([])

  const cartListSum = computed(() => {
    return cartList.value.reduce((accumulate: number, item) => accumulate += (item.price * (item.count ?? 1)), 0).toFixed(2)
  })

  const appendFromLocalStorageCart = async (arrCard: _fetchCard[]) => {
    if(!arrCard || arrCard && !arrCard.length) return

    await Promise.all(arrCard.map(i => getProductById(i.id)))
    .then((data) => {
      cartList.value = data.filter(i => i).map(i => ({
        ...i!,
        count: arrCard.find(item => item.id == i?.id)?.count
      }))
      updateLocalStorage()
    })
    .catch((error) => console.error(`ERRORAppendFromLocalStorageCart ${error}`))
  }

  const updateLocalStorage = () => {
    localStorage.setItem('cartList_START_TEMPLATE', JSON.stringify(cartList.value.map(i => ({
      id: i.id,
      count: i.count
    }))))
  }

  const addCartItem = (cardItem: _fetchCard) => {
    const existingCardItem = cartList.value.find(i => i.id == cardItem.id)
    if(existingCardItem && existingCardItem.count) existingCardItem.count += (cardItem.count ?? 1)
    else cartList.value.push(cardItem)
    updateLocalStorage()
  }

  const removeCartItem = (cardItemID: _fetchCard['id']) => {
    cartList.value = cartList.value.filter((i) => i.id != cardItemID)
    updateLocalStorage()

  }

  const removeAllCartItems = () => {
    cartList.value = []
    updateLocalStorage()
  }

  const inCart = (cardItemID: _fetchCard['id']) => {
    return Boolean(cartList.value.find((i: _fetchCard) => i.id == cardItemID))
  }

  return {
    cartList,
    cartListSum,
    appendFromLocalStorageCart,
    addCartItem,
    removeCartItem,
    removeAllCartItems,
    inCart,
  }

})
