import type { ICart } from '@/types'

export function exsitItem(
  cartItems: ICart[],
  productID: string,
  color: { id: string; name: string; hashCode: string } | null,
  size: { id: string; size: string } | null
) {
  let result
  if (color) {
    result = cartItems.find((item) => item.productID === productID && item.color?.id === color?.id)
  } else if (size) {
    result = cartItems.find((item) => item.productID === productID && item.size?.id === size?.id)
  } else {
    result = cartItems.find((item) => item.productID === productID)
  }

  return result
}

export function getTotal(items: ICart[], attr: string) {
  const result = items.reduce((total, item) => {
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
