import type { TextareaHTMLAttributes } from 'vue'

export type CommonTextareaOptions = {
  label?: string,
  placeholder?: TextareaHTMLAttributes['placeholder'],
  errorMessage?: string,
  setValue?: string,
  maxlength?: TextareaHTMLAttributes['maxlength'],
  error?: boolean,
  done?: boolean,
  required?: boolean,
  customRequired?: boolean,
}
