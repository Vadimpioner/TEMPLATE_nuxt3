export type AsideFiltersData = UICheckboxOptions & UIRangeOptions & {
  componentName: 'UICheckbox' | 'UIRange',
  data?: (UICheckboxData | UIRangeData)[],
  view?: UICheckboxView
}
