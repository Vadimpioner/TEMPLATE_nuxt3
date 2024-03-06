export function scrollTop(Y = 0, animate: ScrollBehavior = 'smooth') {
  window.scrollTo({
    top: Y,
    behavior: animate,
  })
}
