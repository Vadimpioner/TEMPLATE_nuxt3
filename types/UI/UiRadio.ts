export type UiRadioData = _globalData & {
  list?: _globalData[]
}

export type UiRadioOptions = {
  label?: string,
  error?: boolean,
  noToggle?: boolean,
  customRequired?: boolean,
  checked?: _globalData,
  checkedChild?: _globalData,
  disabledList?: _globalData[],
  disabledChildList?: _globalData[],
}

export type UiRadioView = 'tab' | 'circle' | 'group'
