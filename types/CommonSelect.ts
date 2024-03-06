export type CommonSelectData = (_globalData & { image?: string })

export type CommonSelectOptions = {
  label?: string,
  placeholder?: string,
  errorMessage?: string,
  customRequired?: boolean,
  done?: boolean,
  error?: boolean,
  disabled?: boolean,
  clearable?: boolean,
  disabledList?: CommonSelectData[],
} & (
  {
    multiple: true,
    collapseTags?: boolean,
    multipleLimit?: number,
    checkedList?: CommonSelectData[],
  }
  |
  {
    multiple?: undefined,
    collapseTags?: never,
    multipleLimit?: never,
    checkedList?: CommonSelectData,
  }
)
