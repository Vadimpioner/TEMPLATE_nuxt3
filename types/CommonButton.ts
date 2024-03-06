export type CommonButtonOptions = {
  disabled?: boolean,
  loading?: boolean,
  error?: boolean,
  fullSM?: boolean,
  skeleton?: boolean,
  pointerNone?: boolean,
} & (
  {
    to: string,
    target?: '_blank' | '_self' | '_parent' | '_top'
  }
  |
  {
    to?: undefined,
    target?: never
  }
)
