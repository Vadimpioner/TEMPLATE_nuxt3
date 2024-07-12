import type { InputTypeHTMLAttribute, InputHTMLAttributes, HTMLAttributes } from 'vue'

export type UiInputOptions = {
  label?: string,
  placeholder?: HTMLAttributes['placeholder'],
  errorMessage?: string,
  maska?: string,
  type?: InputTypeHTMLAttribute,
  inputmode?: HTMLAttributes['inputmode'],
  autocomplete?: InputHTMLAttributes['autocomplete'],
  autocapitalize?: 'off' | 'on' | 'words' | 'characters',
  enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send',
  setValue?: string,
  toFixed?: number,
  maxlength?: InputHTMLAttributes['maxlength'],
  max?: InputHTMLAttributes['max'],
  min?: InputHTMLAttributes['min'],
  step?: InputHTMLAttributes['step'],
  done?: boolean,
  error?: boolean,
  disabled?: boolean,
  hiddenIndicator?: boolean,
  notVisibleSelection?: boolean,
  required?: boolean,
  spellcheck?: boolean,
  updateAfterFocus?: boolean,
  customRequired?: boolean,
  replaceValue?: RegExp,
} & (
  {
    tooltipContent: string,
    label: string | undefined
  }
  |
  {
    tooltipContent?: never,
  }
)
