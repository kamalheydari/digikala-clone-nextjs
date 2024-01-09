export function formatNumber(n: number): string {
  if (n) {
    const newNumber = n.toString()

    return newNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return ''
}

export function makeSlug(titleStr: string) {
  titleStr = titleStr.replace(/^\s+|\s+$/g, '')
  titleStr = titleStr.toLowerCase()
  // persian support
  titleStr = titleStr
    .replace(/[^a-z0-9_\s-ءاأإآؤئبتثجحخدذرزسشصضطظعغفقكلمنهويةى]#u/, '')
    // Collapse whitespace and replace by -
    .replace(/\s+/g, '-')
    // Replace slashes with spaces
    .replace(/\//g, ' ')
    // Collapse multiple spaces
    .replace(/\s+/g, '-')
    // Collapse dashes
    .replace(/-+/g, '-')

  return titleStr
}

export function truncate(str: string = '', len: number) {
  if (str.length > len && str.length > 0) {
    let newStr = `${str} `
    newStr = str.substring(0, len)
    newStr = str.substring(0, newStr.lastIndexOf(' '))
    newStr = newStr.length > 0 ? newStr : str.substring(0, len)
    return `${newStr}...`
  }
  return str
}
