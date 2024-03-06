export default defineNuxtPlugin(async () => {

  const { getHeader, getFooter } = headerAndfooterStore()

  const { appendFromLocalStorageCart } = cartStore()

  const { appendFromLocalStorageFavorite } = favoriteStore()

  // await getHeader()
  // await getFooter()

  onNuxtReady(async () => {
    const CART = localStorage.getItem('cartList_START_TEMPLATE')
    const FAVORITE = localStorage.getItem('favoriteList_START_TEMPLATE')
    if(CART) await appendFromLocalStorageCart(JSON.parse(CART))
    if(FAVORITE) await appendFromLocalStorageFavorite(JSON.parse(FAVORITE))
  })

})
