import type { ICart } from 'types'

export default function exsitItem(
  cartItems: ICart[],
  productID: string,
  color: { id: string; name: string; hashCode: string } | null,
  size: { id: string; size: string } | null
) {
  let result 
  if (color) {
    result = cartItems.find(
      (item) => item.productID === productID && item.color?.id === color?.id
    )
  } else if (size) {
    result = cartItems.find(
      (item) => item.productID === productID && item.size?.id === size?.id
    )
  } else {
    result = cartItems.find((item) => item.productID === productID)
  }

  return result
}
