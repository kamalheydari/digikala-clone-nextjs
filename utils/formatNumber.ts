export default function formatNumber(n: number): string {
  if (n) {
    let newNumber = n.toString()

    return newNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return ''
}
