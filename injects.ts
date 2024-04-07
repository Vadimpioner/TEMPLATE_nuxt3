import type { InjectionKey } from 'vue'

export const UIAccordion = Symbol() as InjectionKey<{
  count: number,
  active?: number,
  accordionSimple: boolean
}>
