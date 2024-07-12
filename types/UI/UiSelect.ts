export type UiSelectData = (_globalData & { image?: string })

export type UiSelectOptions = {
  label?: string,
  placeholder?: string,
  errorMessage?: string,
  customRequired?: boolean,
  done?: boolean,
  error?: boolean,
  disabled?: boolean,
  clearable?: boolean,
  disabledList?: UiSelectData[],
} & (
  {
    multiple: true,
    collapseTags?: boolean,
    multipleLimit?: number,
    checkedList?: UiSelectData[],
  }
  |
  {
    multiple?: undefined,
    collapseTags?: never,
    multipleLimit?: never,
    checkedList?: UiSelectData,
  }
)
