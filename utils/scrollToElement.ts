export function scrollToElement(el: string) {
  const header = document.querySelector<HTMLElement>('.Header')?.offsetHeight
  const positionElY = document.querySelector(el)?.getBoundingClientRect().top
  if([header, positionElY].every(i => ['number'].includes(typeof i))) {
    const to = positionElY! + window.scrollX
    window.scrollBy(0, to - header!)
  }
}
