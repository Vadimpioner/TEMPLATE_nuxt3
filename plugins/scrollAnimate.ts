export default defineNuxtPlugin(() => {
  return {
    provide: {
      scrollAnimate: () => {
        let animate = document.querySelectorAll<HTMLElement>('._animations')
        if(animate.length > 0) {
          function animOnScroll() {
            for(let index = 0; index < animate.length; index++) {
              const elements = animate[index]
              const elementsHeight = elements.offsetHeight
              const elementsOffset = offset(elements).top
              const elementsStart = 4

              let elementsPoint = window.innerHeight - elementsHeight / elementsStart

              if(elementsHeight > window.innerHeight) {
                elementsPoint = window.innerHeight - window.innerHeight / elementsStart
              }

              if(scrollY > elementsOffset - elementsPoint && scrollY < elementsOffset + elementsHeight) { elements.classList.add('_active')}
              else {
                if(!elements.classList.contains('_animations-no-hide'))
                  // если такой класс имеется, при скроле вверх анимации не будет
                  elements.classList.remove('_active')
              }
            }
          }
          function offset(e: HTMLElement) {
            const rect = e.getBoundingClientRect(),
              scrollLeft = window.scrollX || document.documentElement.scrollLeft,
              scrollTop = window.scrollY || document.documentElement.scrollTop
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
          }
          window.addEventListener('scroll', animOnScroll)
        }
      }
    }
  }
})
