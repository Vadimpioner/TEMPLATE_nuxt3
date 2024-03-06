export type CommonCounterData = {
  count: string | number,
  select?: CommonSelectData[],
}

export type CommonCounterOptions = {
  label?: string,
  customRequired?: boolean,
  min?: number,
  max?: number,
  step?: number,
  precision?: number,
  stepStrictly?: boolean,
  disabled?: boolean,
  checkedSelect?: CommonSelectData
}
