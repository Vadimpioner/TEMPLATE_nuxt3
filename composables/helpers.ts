const { DESKTOP, SM } = useVariable()
const { statusBreakpoint } = useResponsive()

export function useHelpers(){

  function validationForm<T extends Partial<_globalFormData>>(ID: string, formD: T, skipKeys?: (keyof T)[]) {

    const { $moment, $throw } = useNuxtApp()
    const { formList, addKeyWithData } = validationFormStore()

    let btnError = ref(false)
    let loading = ref(false)
    let status = ref('')

    const INFO: {
        name: CommonInputOptions,
        phone: CommonInputOptions,
        textarea: CommonInputOptions,
        password: CommonInputOptions,
        passwordRepeat: CommonInputOptions,
        email: CommonInputOptions,
        checkbox: CommonCheckboxOptions,
        checkboxMultiple: CommonCheckboxOptions,
        select: CommonSelectOptions,
        selectMultiple: CommonSelectOptions,
        time: CommonInputOptions,
        date: CommonInputOptions,
        dateTimeLocal: CommonInputOptions,
        file: CommonUploadOptions,
        fileMultiple: CommonUploadOptions,
      } = {
      name: {
        label: 'Имя',
        placeholder: 'Имя',
        errorMessage: `Короткое имя!`,
      },
      phone: {
        label: 'Телефон',
        placeholder: 'Телефон',
        errorMessage: `Короткий номер!`,
      },
      textarea: {
        label: 'Textarea',
        placeholder: 'Textarea',
        errorMessage: 'Короткая запись!',
        maxlength: 20,
      },
      password: {
        label: 'password',
        placeholder: 'password',
      },
      passwordRepeat: {
        label: 'passwordRepeat',
        placeholder: 'passwordRepeat',
      },
      email: {
        label: 'Email',
        placeholder: 'Email',
      },
      checkbox: {
        elName: 'NAME_EL',
        label: 'Checkbox',
      },
      checkboxMultiple: {
        label: 'CheckboxMultiple',
      },
      select: {
        label: 'Селект',
        placeholder: 'Селект',
      },
      selectMultiple: {
        label: 'selectMultiple',
        placeholder: 'selectMultiple',
      },
      time: {
        label: 'Time',
        placeholder: 'Time',
      },
      date: {
        label: 'Date',
        placeholder: 'Date',
      },
      dateTimeLocal: {
        label: 'dateTimeLocal',
        placeholder: 'dateTimeLocal',
      },
      file: {
        label: 'file',
      },
      fileMultiple: {
        label: 'fileMultiple',
      },
    }

    const DEFAULT = {
      GLOBAL: {
        errorMessage: 'Обязательное поле!'
      },

      text: {
        validLength: 10,
        maska: '+### ## ########',
        regExp: (/[^+\d]|(\+)(?=.*\+)/g)
      },
      email: {
        errorMessage: 'Не валидная почта',
      },
      password: {
        errorMessage: 'Слабый пароль!',
        compareWithAnotherKeyIsValErrorMessage: 'Пароли не совпадают!',
        tooltipContent: 'Пароль должен содержать: заглавную букву и цифру',
        regExp: (/^(?=.*[A-Z])(?=.*\d).+/g),
        validLength: 6,
      },
      time: {
        errorMessage: 'Все "--:--" обязательны!'
      },
      date: {
        errorMessage: 'Все поля обязательны!',
        min: $moment('2020-09-21').format('YYYY-MM-DD'),
        max: $moment().format('YYYY-MM-DD'),
        get errorMessageMin() {
          return `Минимальная дата: ${this.min}`
        },
        get errorMessageMax() {
          return `Максимальная дата: ${this.max}`
        }
      },
      file: {
        multipleLimit: 3
      }
    }

    const FORM = reactive(Object.fromEntries(Object.entries(formD).map(([key, val]) => {
      const newKey = key as keyof _globalFormData
      return [
        newKey,
        {
          ...INFO[newKey],
          done: (formList[ID]?.currentData[newKey]?.done) ?? false,
          error: (formList[ID]?.currentData[newKey]?.error) ?? false,
          errorMessage: (formList[ID]?.currentData[newKey]?.errorMessage) ?? '',
          DEFAULT: DEFAULT[val.inheritFrom.type as keyof typeof DEFAULT],
          ...val,
        }
      ]
    }))) as FormMergeType<typeof formD, typeof DEFAULT[keyof typeof DEFAULT]>

    type FormMergeType<T, D> = {
      [K in keyof T]: T[K] & {
        DEFAULT: (D extends any ? (k: D) => void : never) extends ((k: infer I) => void) ? I : never
      }
    }

    addKeyWithData(ID, FORM, formD)

    watchFormField('text', (key, value) => {

      if(value.length >= Number((FORM[key]!.inheritFrom?.optionalData) ?? DEFAULT.text.validLength)) {
        FORM[key]!.done = true
        FORM[key]!.error = false
        FORM[key]!.errorMessage = ''
      } else FORM[key]!.done = false

    })
    watchFormField('email', (key, value) => {

      if((/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(value))) {
        FORM[key]!.done = true
        FORM[key]!.error = false
        FORM[key]!.errorMessage = ''
      } else FORM[key]!.done = false

    })
    watchFormField('password', (key, value) => {

      const findCompareKey = FORM[key]!.inheritFrom.optionalData?.compareWithAnotherKeyIsVal

      if(
        new RegExp((FORM[key]!.inheritFrom.optionalData?.regExp ?? DEFAULT.password.regExp)).test(value)
        &&
        value.length >= (FORM[key]!.inheritFrom.optionalData?.validLength ?? DEFAULT.password.validLength)
        &&
        (!findCompareKey || FORM[findCompareKey]?.val == value)
        ) {
        FORM[key]!.done = true
        FORM[key]!.error = false
        FORM[key]!.errorMessage = ''
      } else FORM[key]!.done = false

    })
    watchFormField('checkbox', (key, value) => {

      if(value) {
        FORM[key]!.error = false
      }

    })
    watchFormField('multiple', (key, value) => {

      if(value.length) {
        FORM[key]!.done = true
        FORM[key]!.error = false
      } else FORM[key]!.done = false

    })
    watchFormField('select', (key, value) => {

      if(Object.keys(value).length) {
        FORM[key]!.done = true
        FORM[key]!.error = false
      } else FORM[key]!.done = false

    })
    watchFormField('time', (key, value) => {

      if(value.length == 5) {
        FORM[key]!.done = true
        FORM[key]!.error = false
        FORM[key]!.errorMessage = ''
      } else FORM[key]!.done = false

    })
    watchFormField('date', (key, value) => {

      if($moment(value).isBetween(FORM[key]!.inheritFrom?.optionalData?.min ?? DEFAULT.date.min, FORM[key]!.inheritFrom?.optionalData?.max ?? DEFAULT.date.max, 'millisecond', '[]')) {
        FORM[key]!.done = true
        FORM[key]!.error = false
        FORM[key]!.errorMessage = ''
      } else FORM[key]!.done = false

    })
    watchFormField('file', (key, value) => {

      if(Array.isArray(value) && value?.length || !Array.isArray(value) && value) {
        FORM[key]!.error = false
      }

    })

    function watchFormField<K extends _globalFormData[keyof _globalFormData]['inheritFrom']['type']>(
      type: K,
      validationFn: (
        key: _globalFormBunch<K>,
        value: _globalFormData[_globalFormBunch<K>]['val']
      ) => void) {

      if(!Object.entries(formD).filter(([key, val]) => val.inheritFrom?.type == type).length) return

      watch(
        () => Object.entries(formD)
          .filter(([key, val]) => val.inheritFrom?.type == type)
          .map(([key, val]) => ({ [key]: val })),
          (elList) => {
            elList.forEach(el => {
              const newKey = Object.keys(el)[0] as Parameters<typeof validationFn>[0]
              const value = FORM[newKey]?.val as Parameters<typeof validationFn>[1]
              validationFn(newKey, value)
            })
          },
        { immediate: true }
      )

    }
    function validFormField<K extends _globalFormData[keyof _globalFormData]['inheritFrom']['type']>(
      type: K,
      checkFn: (
        key: _globalFormBunch<K>,
        value: _globalFormData[_globalFormBunch<K>]['val']
      ) => void) {

      if(!Object.entries(formD).filter(([key, val]) => val.inheritFrom?.type == type).length) return

      Object.entries(formD)
        .filter(([key, val]) => val.inheritFrom?.type == type)
        .map(([key, val]) => ({ [key]: val }))
        .forEach(el => {
          const newKey = Object.keys(el)[0] as Parameters<typeof checkFn>[0]
          const value = FORM[newKey]?.val as Parameters<typeof checkFn>[1]
          if(!skipKeys?.includes(newKey)) checkFn(newKey, value)
        })
    }

    function isValid() {

      let inputOK = 0

      const forCheckCount = Object.keys(formD).length - (new Set(skipKeys).size ?? 0)

      validFormField('text', (key, value) => {

        if(!value.length) {
          FORM[key]!.error = true
          FORM[key]!.errorMessage = DEFAULT.GLOBAL.errorMessage
          } else if(value.length >= 1 && value.length < Number(FORM[key]!.inheritFrom?.optionalData ?? DEFAULT.text.validLength)) {
            FORM[key]!.error = true,
            FORM[key]!.errorMessage = INFO[key].errorMessage!
          } else {
            FORM[key]!.error = false
            inputOK++
        }

      })
      validFormField('email', (key, value) => {

        if(!value.length) {
          FORM[key]!.error = true
          FORM[key]!.errorMessage = DEFAULT.GLOBAL.errorMessage
          } else if(!FORM[key]!.done) {
            FORM[key]!.error = true,
            FORM[key]!.errorMessage = DEFAULT.email.errorMessage!
          } else {
            FORM[key]!.error = false
            inputOK++
        }

      })
      validFormField('password', (key, value) => {

        const findCompareKey = FORM[key]!.inheritFrom.optionalData?.compareWithAnotherKeyIsVal

        if(!value.length) {
          FORM[key]!.error = true
          FORM[key]!.errorMessage = DEFAULT.GLOBAL.errorMessage
          } else if(!FORM[key]!.done) {
            FORM[key]!.error = true,
            FORM[key]!.errorMessage = findCompareKey ? DEFAULT.password.compareWithAnotherKeyIsValErrorMessage : DEFAULT.password.errorMessage!
          } else {
            FORM[key]!.error = false
            inputOK++
        }

      })
      validFormField('checkbox', (key, value) => {

        if(!value) FORM[key]!.error = true
        else {
          FORM[key]!.error = false
          inputOK++
        }

      })
      validFormField('multiple', (key, value) => {

        if(!value.length) {
          FORM[key]!.error = true
          FORM[key]!.errorMessage = DEFAULT.GLOBAL.errorMessage
          } else {
            FORM[key]!.error = false
            inputOK++
        }

      })
      validFormField('select', (key, value) => {

        if(!Object.keys(value).length) {
          FORM[key]!.error = true,
          FORM[key]!.errorMessage = DEFAULT.GLOBAL.errorMessage
          } else {
            FORM[key]!.error = false
            inputOK++
        }

      })
      validFormField('time', (key, value) => {

        if(!value.length) {
          FORM[key]!.error = true,
          FORM[key]!.errorMessage = DEFAULT.time.errorMessage
          } else {
            FORM[key]!.error = false
            inputOK++
        }

      })
      validFormField('date', (key, value) => {

        if(!value.length) {
          FORM[key]!.error = true,
          FORM[key]!.errorMessage = DEFAULT.date.errorMessage
          } else if($moment(value).isBefore(FORM[key]!.inheritFrom?.optionalData?.min ?? DEFAULT.date.min)) {
            DEFAULT.date.min = FORM[key]!.inheritFrom?.optionalData?.min ?? DEFAULT.date.min
            FORM[key]!.error = true
            FORM[key]!.errorMessage = DEFAULT.date.errorMessageMin
          } else if($moment(value).isAfter(FORM[key]!.inheritFrom?.optionalData?.max ?? DEFAULT.date.max)) {
            DEFAULT.date.max = FORM[key]!.inheritFrom?.optionalData?.max ?? DEFAULT.date.max
            FORM[key]!.error = true,
            FORM[key]!.errorMessage = DEFAULT.date.errorMessageMax
          } else {
            FORM[key]!.error = false
            inputOK++
        }

      })
      validFormField('file', (key, value) => {

        if(Array.isArray(value) && !value?.length || !Array.isArray(value) && !value) FORM[key]!.error = true
        else {
          FORM[key]!.error = false
          inputOK++
        }

      })

      if(inputOK != forCheckCount) {
        setTimeout(() => btnError.value = false, 800)
        btnError.value = true
      }

      console.log('inputOK', inputOK);
      console.log('forCheckCount', forCheckCount);
      return inputOK == forCheckCount
    }

    function createFormDate(subject: string, skipKeys?: (keyof T)[]) {

      loading.value = true

      const htmlList: string[] = []
      const fileList: File[] = []
      const formData = new FormData()

      formData.append('subject', subject)

      Object.entries(formD).forEach(([key, { val, inheritFrom }]) => {
        const newKey = key as keyof _globalFormData
        let newVal = (val as _globalData).val ?? val

        if(skipKeys?.includes(newKey)) return

        if(Array.isArray(val)) {
          if(inheritFrom.type == 'file') return fileList.push(...val as File[])
          newVal = val.map((item) => (item as _globalData).val).join(', ')
        }

        if(inheritFrom.type == 'file') return fileList.push(val as File)
        htmlList.push(`<p>${FORM[newKey]!.label}: ${newVal}</p> <br>`)
      })

      formData.append('html', htmlList.join(''))

      fileList.forEach((file) => {
        formData.append('file', file)
      })

      return formData

    }

    function resetForm(
      statusNow: 'error' | 'success' | 'unmounted',
      responseStatus?: string,
      callback?: (
        initialData: Pick<_globalFormData, keyof T extends keyof _globalFormData ? keyof T : never>
      ) => void){

      loading.value = false
      status.value = responseStatus ?? (statusNow == 'error' ? 'Ошибка!' : 'Успешно!')

      if(statusNow == 'unmounted') {
        addKeyWithData(ID, FORM, formD, 'reset')
        $throw('reset')
      }

      setTimeout(() => {

        status.value = ''
        if(statusNow == 'success') {
          addKeyWithData(ID, FORM, formD,'reset')
          $throw('reset')
        }

        if(callback) callback(formList[ID].initialData as Parameters<typeof callback>[0])

      }, 1500)

    }

    return {
      FORM,
      btnError,
      loading,
      status,

      isValid,
      createFormDate,
      resetForm,
    }

  }

  function stopScrollBody(status?: 'reset') {

    const HEADER = document.querySelector<HTMLElement>('.Header')

    if(status == 'reset') {
      document.body.style.pointerEvents = ''
      document.body.style.paddingRight = ''
      document.body.style.overflow = ''
      if(HEADER) HEADER.style.paddingRight = ''
      return
    }

    document.body.style.overflow = 'hidden'
    document.body.style.pointerEvents = 'none'

    if(!statusBreakpoint.value.nowDESKTOP) {
      document.body.style.paddingRight = '12px'
      if(HEADER) HEADER.style.paddingRight = '12px'
    } else if(statusBreakpoint.value.nowDESKTOP && !statusBreakpoint.value.nowSM) {
      document.body.style.paddingRight = `calc(4px + 8 * ((100vw - ${SM + 1}px) / (${DESKTOP} - ${SM + 1})))`
      if(HEADER) HEADER.style.paddingRight = `calc(4px + 8 * ((100vw - ${SM + 1}px) / (${DESKTOP} - ${SM + 1})))`
    }
  }

  function scrollRelative(array: { block: HTMLElement | null; collection: HTMLElement[] }[]) {
    const dataActiveValues = ref(array.reduce((acc: Record<string, string>, { block }) => {
      if(block) acc[block.classList[0]] = ''

      return acc
    }, {}))

    array.forEach(({ block, collection }) => {
      let blockPosition = 0

      if(!block) return

      blockPosition = block.getBoundingClientRect().top + block.offsetHeight

      const updateScrollY = () => {
        let sectionActiveFound = false

        collection.forEach(item => {
          const section = item.getAttribute('data-section')
          if(section && (window.scrollY + blockPosition) >= item.offsetTop && (window.scrollY + blockPosition) <= (item.offsetTop + item.offsetHeight - 1)) {
            block.setAttribute('data-active', section)
            sectionActiveFound = true
            dataActiveValues.value[block.classList[0]] = section
          }
        })

        if(!collection.length || !sectionActiveFound) {
          block.removeAttribute('data-active')
          dataActiveValues.value[block.classList[0]] = ''
        }
      }

      updateScrollY()
      window.addEventListener('scroll', updateScrollY)
    })

    return dataActiveValues
  }

  return {
    stopScrollBody,
    scrollRelative,
    validationForm,
  }

}

