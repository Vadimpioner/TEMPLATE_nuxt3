export const favoriteStore = defineStore('favorite', () => {

  const { getProductById } = useMyApiRoutes()

  const favoriteList: Ref<_fetchCard[]> = ref([])

  const appendFromLocalStorageFavorite = async (arrCard: string[]) => {
    if(!arrCard || arrCard && !arrCard.length) return
    await Promise.all(arrCard.map(i => getProductById(i)))
    .then((data) => {
      favoriteList.value = data.filter(i => i).map(i => i!)
    })
    .catch((error) => console.error(`ERRORAppendFromLocalStorageCart ${error instanceof Error && error.message}`))
  }

  const updateLocalStorage = () => {
    localStorage.setItem('favoriteList_START_TEMPLATE', JSON.stringify(favoriteList.value.map(i => i.id)))
  }

  const addFavoriteItem = (cardItem: _fetchCard) => {
    favoriteList.value.push(cardItem)
    updateLocalStorage()
  }

  const removeFavoriteItem = (cardItemID: _fetchCard['id']) => {
    favoriteList.value = favoriteList.value.filter(i => i.id != cardItemID)
    updateLocalStorage()
  }

  const removeAllFavoriteItems = () => {
    favoriteList.value = []
    updateLocalStorage()
  }

  const inFavorite = (cardItemID: _fetchCard['id']) => {
    return Boolean(favoriteList.value.find(i => i.id == cardItemID))
  }

  return {
    favoriteList,

    appendFromLocalStorageFavorite,
    addFavoriteItem,
    removeFavoriteItem,
    removeAllFavoriteItems,
    inFavorite,
  }

})
