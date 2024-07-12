import type { TextareaHTMLAttributes } from 'vue'

export type UiTextareaOptions = {
  label?: string,
  placeholder?: TextareaHTMLAttributes['placeholder'],
  errorMessage?: string,
  setValue?: string,
  maxlength?: TextareaHTMLAttributes['maxlength'],
  autocapitalize?: 'off' | 'on' | 'words' | 'characters',
  error?: boolean,
  done?: boolean,
  required?: boolean,
  spellcheck?: boolean,
  customRequired?: boolean,
}
