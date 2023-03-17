import { useGetCategoriesQuery } from 'services'
import { useEffect, useState } from 'react'

export default function useCategory({ parent, catID } = {}) {
  const [categories, setCategories] = useState([])
  const [childCategories, setChildCategories] = useState([])
  const [selectedCategory, setselectedCategory] = useState({})

  const { data, isLoading } = useGetCategoriesQuery()

  useEffect(() => {
    if (data && data.categories.length > 0) {
      setCategories(data.categories)
      if (parent) {
        if (parent === 'main')
          setChildCategories(
            data.categories.filter((cat) => cat.parent === undefined)
          )
        else
          setChildCategories(
            data.categories.filter((cat) => cat.parent === parent)
          )
      }

      if (catID) {
        if (catID == 'main')
          setselectedCategory(
            data.categories.find((cat) => cat.parent === undefined)
          )
        else
          setselectedCategory(data.categories.find((cat) => cat._id === catID))
      }
    }
  }, [data, parent, catID])

  return {
    categories,
    childCategories,
    isLoading,
    selectedCategory,
  }
}
