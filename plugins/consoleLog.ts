export default defineNuxtPlugin(() => {
  return {
    provide: {
      log: console.log
    }
  }
})
