import type { ObjectDirective } from 'vue'

interface HTMLElementWithClickOutside extends HTMLElement {
  __vueClickOutside__: any;
}

const outsideDirective: ObjectDirective<HTMLElementWithClickOutside> = {
  beforeMount(el, binding, vNode) {
    const bubble = binding.modifiers.bubble
    const handler = (e: MouseEvent) => {
      if(bubble || (!el.contains(e.target as Node) && el !== e.target)) {
        binding.value(e)
      }
    }
    el.__vueClickOutside__ = handler

    document.addEventListener('click', handler)
  },

  unmounted(el) {
    const handler = el.__vueClickOutside__
    if(handler) {
      document.removeEventListener('click', handler)
      delete el.__vueClickOutside__
    }
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('outside', outsideDirective)
})
