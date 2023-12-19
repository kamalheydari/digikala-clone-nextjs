export default interface ICart {
  itemID: string
  productID: string
  name: string
  slug: string
  price: number
  discount: number
  inStock: number
  sold: number
  color: { id: string; name: string; hashCode: string } | null
  size: { id: string; size: string } | null
  img: {
    url: string
    placeholder: string
  }
  quantity: number
}
