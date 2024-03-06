export function useMyApiRoutes() {

  const baseFetch = $fetch.create({
    baseURL: useRuntimeConfig().public.apiUrl,
  })

  const useMyFetch: typeof useFetch = (request, options?) => {
    return useFetch(
      request,
      {
        baseURL: useRuntimeConfig().public.apiUrl,
        ...options
      }
    )
  }

  async function getPages(namePage = 'index', options?: Parameters<typeof useMyFetch>[1]) {
    try {
      return await useMyFetch(`/wp/v2/pages?slug=${namePage}`, {
        ...options,
        baseURL: 'https://admin.rialto.by/wp-json'
      })
    } catch(error) {
      showError({ statusCode: 404 })
    }
  }

  async function getProductById(id: _fetchCard['id']) {
    try {
      return await baseFetch<_fetchCard>(`/CartList/${id}`)
    } catch(error) {
      console.error(`ERRORGetProductById ${error instanceof Error && error.message}`)
    }
  }

  return {
    useMyFetch,
    getPages,
    getProductById,
  }

}

