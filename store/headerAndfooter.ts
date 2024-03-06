import { $fetch } from 'ofetch'

export const headerAndfooterStore = defineStore('headerAndfooter', () => {

  const header = ref({})

  const footer = ref({})

  const getHeader = async () => {
    try {
      const [myCategory, myHeader]  = await Promise.all([
        $fetch(`https://admin.rialto.by/wp-json/custom/v1/category-three`),
        $fetch(`https://admin.rialto.by/wp-json/custom/v1/header`),
      ])
      header.value = {category: myCategory, ...myHeader}
    } catch(error) {
      console.error(`ERRORGetHeader ${error}`)
    }
  }

  const getFooter = async () => {
    await $fetch(`https://admin.rialto.by/wp-json/custom/v1/footer`)
    .then((data) => footer.value = data)
    .catch((error) => console.error(`ERRORGetFooter ${error}`))
  }

  return {
    header,
    footer,

    getHeader,
    getFooter,
  }

})
