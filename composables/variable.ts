export function useVariable() {

  const myVariables = [
    'DESKTOP',
    'TABLET',
    'MOBILE',
    'SM',
    'DNO'
  ] as const

  return myVariables.reduce((acc, item) => {

    acc[item] = document ? parseInt(getComputedStyle(document.documentElement).getPropertyValue(`--${item.toLowerCase()}`)) : 0

    return acc

  }, {} as Record<typeof myVariables[number], number>)

}
