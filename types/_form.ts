type formKey = 'email' | 'name' | 'phone' | 'textarea' | 'password' | 'passwordRepeat' | 'checkbox' | 'checkboxMultiple' | 'select' | 'selectMultiple' | 'time' | 'date' | 'dateTimeLocal' | 'file' | 'fileMultiple'

type formType = 'text' | 'email' | 'password' | 'checkbox' | 'multiple' | 'select' | 'time' | 'date' | 'file'

export type _globalFormData = ({
  [K in Extract<formKey, 'name' | 'textarea' | 'phone'>]: {
    val: string,
    inheritFrom: {
      type: Extract<formType, 'text'>
      optionalData?: number
    }
  } & (K extends 'textarea' ? UITextareaOptions : UIInputOptions)
} & {
  [K in Extract<formKey, 'password' | 'passwordRepeat'>]: {
    val: string,
    inheritFrom: {
      type: Extract<formType, 'password'>,
      optionalData?: {
        regExp?: RegExp,
        validLength?: number,
        compareWithAnotherKeyIsVal?: Extract<formKey, 'password' | 'passwordRepeat'>
      }
    }
  } & UIInputOptions
} & {
  [K in Extract<formKey, 'email'>]: {
    val: string,
    inheritFrom: {
      type: Extract<formType, 'email'>,
      optionalData?: any
    }
  } & UIInputOptions
} & {
  [K in Extract<formKey, 'checkbox'>]: {
    val: boolean,
    inheritFrom: {
      type: Extract<formType, 'checkbox'>,
      optionalData?: any
    }
  } & UICheckboxOptions
} & {
  [K in Extract<formKey, 'checkboxMultiple' | 'selectMultiple'>]: {
    val: K extends 'checkboxMultiple' ? UICheckboxData[] : UISelectData[],
    inheritFrom: {
      type: Extract<formType, 'multiple'>,
      optionalData?: any
    }
  } & (K extends 'checkboxMultiple' ? UICheckboxOptions : UISelectOptions)
} & {
  [K in Extract<formKey, 'select'>]: {
    val: UISelectData,
    inheritFrom: {
      type: Extract<formType, 'select'>,
      optionalData?: any
    }
  } & UISelectOptions
} & {
  [K in Extract<formKey, 'time'>]: {
    val: string,
    inheritFrom: {
      type: Extract<formType, 'time'>,
      optionalData?: any
    }
  } & UIInputOptions
} & {
  [K in Extract<formKey, 'date' | 'dateTimeLocal'>]: {
    val: string,
    inheritFrom: {
      type: Extract<formType, 'date'>,
      optionalData?: {
        min?: string,
        max?: string
      }
    }
  } & UIInputOptions
} & {
  [K in Extract<formKey, 'file' | 'fileMultiple'>]: {
    val: K extends 'file' ? (File | undefined) : File[],
    inheritFrom: {
      type: Extract<formType, 'file'>,
      optionalData?: any
    }
  } & UIUploadOptions
})

export type _globalFormBunch<K extends formType> = {
  [P in keyof _globalFormData]: _globalFormData[P] extends { inheritFrom: { type: K } } ? P : never;
}[keyof _globalFormData]
