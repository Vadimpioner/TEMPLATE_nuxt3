export type AsideFiltersData = CommonCheckboxOptions & CommonRangeOptions & {
  componentName: 'CommonCheckbox' | 'CommonRange',
  data?: (CommonCheckboxData | CommonRangeData)[],
  view?: CommonCheckboxView
}
