export type UICounterData = {
  count: string | number,
  select?: UISelectData[],
}

export type UICounterOptions = {
  label?: string,
  customRequired?: boolean,
  min?: number,
  max?: number,
  step?: number,
  precision?: number,
  stepStrictly?: boolean,
  disabled?: boolean,
  checkedSelect?: UISelectData
}
