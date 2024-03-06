import type { InjectionKey } from 'vue'

export const CommonAccordion = Symbol() as InjectionKey<{
  count: number,
  active?: number,
  accordionSimple: boolean
}>
