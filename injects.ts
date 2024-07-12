import type { InjectionKey } from 'vue'

export const UiAccordion = Symbol() as InjectionKey<{
  count: number,
  active?: number,
  accordionSimple: boolean
}>
