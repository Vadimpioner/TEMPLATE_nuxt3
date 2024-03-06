const myBreakpoint = useVariable()

export function useResponsive() {

  const width = ref(0)
  const height = ref(0)
  const scrollY = ref(0)
  const scrollToggle = ref(false)

  const statusBreakpoint = computed(() => {

    return Object.assign({}, ...Object.entries(myBreakpoint).map(([key, value]) => ({
      [`now${key}`]: Boolean(width.value <= value && width.value)
    }))) as { [P in keyof typeof myBreakpoint as `now${P}`]: boolean }

  })

  const updateResponsive = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  const updateScollY = () => {
    let scrolltop = scrollY.value
    scrollY.value = window.scrollY
    if(scrollY.value > scrolltop) scrollToggle.value = false
    else scrollToggle.value = true
    scrolltop = scrollY.value
  }

  onNuxtReady(() => {
    updateScollY()
    window.addEventListener('scroll', updateScollY)
    window.addEventListener('resize', () => updateResponsive())
    updateResponsive()
  })

  return {
    width,
    height,
    scrollY,
    scrollToggle,
    statusBreakpoint,
  }

}
