export type UICheckboxData = _globalData & {
  count?: number | string,
}

export type UICheckboxOptions = {
  elName?: string,
  label?: string,
  errorMessage?: string,
  trimTo?: number,
  min?: number,
  max?: number,
  done?: boolean,
  error?: boolean,
  disabled?: boolean,
  checked?: boolean,
  checkboxGroup?: boolean,
  customRequired?: boolean,
  selectedCounter?: boolean,
  toggleDeactivate?: boolean,
  toggleVisible?: boolean,
  toggleVisibleStatus?: boolean,
  checkedList?: _globalData[],
  disabledList?: _globalData[],
}

export type UICheckboxView = 'simple' | 'color'
