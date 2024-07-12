export type UiCounterData = {
  count: string | number,
  select?: UiSelectData[],
}

export type UiCounterOptions = {
  label?: string,
  customRequired?: boolean,
  min?: number,
  max?: number,
  step?: number,
  precision?: number,
  stepStrictly?: boolean,
  disabled?: boolean,
  checkedSelect?: UiSelectData
}
