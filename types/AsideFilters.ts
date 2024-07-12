export type AsideFiltersData = UiCheckboxOptions & UiRangeOptions & {
  componentName: 'UiCheckbox' | 'UiRange',
  data?: (UiCheckboxData | UiRangeData)[],
  view?: UiCheckboxView
}
