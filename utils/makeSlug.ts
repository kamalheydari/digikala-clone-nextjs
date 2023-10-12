function makeSlug(titleStr: string) {
  titleStr = titleStr.replace(/^\s+|\s+$/g, '')
  titleStr = titleStr.toLowerCase()
  //persian support
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
export default makeSlug
