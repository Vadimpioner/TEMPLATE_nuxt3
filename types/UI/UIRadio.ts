export type UIRadioData = _globalData & {
  list?: _globalData[]
}

export type UIRadioOptions = {
  label?: string,
  error?: boolean,
  noToggle?: boolean,
  customRequired?: boolean,
  checked?: _globalData,
  checkedChild?: _globalData,
  disabledList?: _globalData[],
  disabledChildList?: _globalData[],
}

export type UIRadioView = 'tab' | 'circle' | 'group'
