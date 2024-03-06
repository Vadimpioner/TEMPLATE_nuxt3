import mitt from 'mitt'
export default defineNuxtPlugin(() => {
  const emitter = mitt<_globalEmit>()
  return {
    provide: {
      throw: emitter.emit,
      listen: emitter.on
    }
  }
})
