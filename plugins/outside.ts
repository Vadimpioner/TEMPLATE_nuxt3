import type { ObjectDirective } from 'vue'

type customHTMLElement = {
  _clickOutside: (event: MouseEvent) => void;
} & HTMLElement

const outsideDirective: ObjectDirective<customHTMLElement> = {
  beforeMount(el, binding, vNode) {
    const bubble = binding.modifiers.bubble
    el._clickOutside = (e) => {
      if(bubble || (!el.contains(e.target as Node) && el !== e.target)) {
        binding.value(e)
      }
    }

    document.addEventListener('click', el._clickOutside)
  },

  unmounted(el) {
    document.removeEventListener('click', el._clickOutside)
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('outside', outsideDirective)
})
