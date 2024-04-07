export type UISelectData = (_globalData & { image?: string })

export type UISelectOptions = {
  label?: string,
  placeholder?: string,
  errorMessage?: string,
  customRequired?: boolean,
  done?: boolean,
  error?: boolean,
  disabled?: boolean,
  clearable?: boolean,
  disabledList?: UISelectData[],
} & (
  {
    multiple: true,
    collapseTags?: boolean,
    multipleLimit?: number,
    checkedList?: UISelectData[],
  }
  |
  {
    multiple?: undefined,
    collapseTags?: never,
    multipleLimit?: never,
    checkedList?: UISelectData,
  }
)
