import type { ICart } from 'types'

export default function getTotal(items: ICart[], attr: string) {
  let result = items.reduce((total, item) => {
    if (attr === 'price') {
      total += item.quantity * item.price
    } else if (attr === 'quantity') {
      total += item.quantity
    } else if (attr === 'discount') {
      total += (item.quantity * (item.discount * item.price)) / 100
    }
    return total
  }, 0)

  return result
}
