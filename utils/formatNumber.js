export default function formatNumber(n) {
  let newNumber = n.toString()

  return newNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
