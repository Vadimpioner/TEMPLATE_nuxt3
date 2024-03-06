export type CommonRatioData = _globalData & {
  list?: _globalData[]
}

export type CommonRatioOptions = {
  label?: string,
  error?: boolean,
  noToggle?: boolean,
  customRequired?: boolean,
  checked?: _globalData,
  checkedChild?: _globalData,
  disabledList?: _globalData[],
  disabledChildList?: _globalData[],
}

export type CommonRatioView = 'tab' | 'circle' | 'group'
