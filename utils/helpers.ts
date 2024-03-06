import moment from 'moment'

export function helpChunk<T>(array: T[], count: number) {
  const results: T[][] = []
  const arrayCopy = [...array]

  while(arrayCopy.length) {
    results.push(arrayCopy.splice(0, count))
  }

  return results
}

export function helpSplit<T>(array: T[], count: number) {
  const childInObj = Math.ceil(array.length / count)

  return array.reduce((accumulate: Record<string, T>[], item, index) => {
    if(index % childInObj == 0) accumulate.push({})
    accumulate[accumulate.length - 1][index] = item

    return accumulate
  }, [])
}

export function helpTel(phone: string) {
  return `tel: ${phone.replace(/[\(\)-\s]/g,'')}`
}

export function helpDatePublication(date: string) {
  const oldDate = moment(date).format('DD.MM.YYYY')
  switch (oldDate) {
    case moment().format('DD.MM.YYYY'):
      return `Сегодня в ${moment(date).format('HH:mm')}`
    case moment().subtract(1, 'days').format('DD.MM.YYYY'):
      return `Вчера в ${moment(date).format('HH:mm')}`
    case moment().subtract(2, 'days').format('DD.MM.YYYY'):
      return `2 дня назад`
    case moment().subtract(3, 'days').format('DD.MM.YYYY'):
      return `3 дня назад`
    case moment().subtract(4, 'days').format('DD.MM.YYYY'):
      return `4 дня назад`
    case moment().subtract(5, 'days').format('DD.MM.YYYY'):
      return `5 дней назад`
    case moment().subtract(6, 'days').format('DD.MM.YYYY'):
      return `6 дней назад`
    default:
      return moment(date).format('DD.MM.YYYY')
  }
}
