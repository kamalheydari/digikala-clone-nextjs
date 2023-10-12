import { useEffect, useState } from 'react'

import { SelectBox } from 'components'

import { useGetCategoriesQuery } from 'services'
import type { SelectedCategories } from 'pages/admin/products'
import { ICategory } from 'types'

interface Props {
  selectedCategories: SelectedCategories
  setSelectedCategories: React.Dispatch<
    React.SetStateAction<SelectedCategories>
  >
}

const SelectCategories: React.FC<Props> = (props) => {
  //? Props
  const { selectedCategories, setSelectedCategories } = props

  //? Get Categories Query
  const { categories } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      categories: data?.categories,
    }),
  })

  //? States
  const [levelOneCategories, setLevelOneCategories] = useState<ICategory[]>(
    [] as ICategory[]
  )

  const [levelTwoCategories, setLevelTwoCategories] = useState<ICategory[]>(
    [] as ICategory[]
  )

  const [levelThreeCategories, setlevelThreeCategories] = useState<ICategory[]>(
    [] as ICategory[]
  )

  //? Re-Renders
  useEffect(() => {
    if (categories && selectedCategories.levelOne?._id)
      setLevelTwoCategories(
        categories?.filter(
          (cat) => cat.parent === selectedCategories.levelOne?._id
        )
      )

    if (categories && selectedCategories.levelTwo?._id)
      setlevelThreeCategories(
        categories.filter(
          (cat) => cat.parent === selectedCategories.levelTwo?._id
        )
      )
  }, [categories, selectedCategories])

  useEffect(() => {
    if (categories)
      setLevelOneCategories(categories.filter((cat) => cat.level === 1))
  }, [categories])

  //? Handlers
  const handleLevelOneChange = (category: ICategory): void =>
    setSelectedCategories({
      levelOne: category,
      levelTwo: {} as ICategory,
      levelThree: {} as ICategory,
    })

  const handleLevelTwoChange = (category: ICategory): void =>
    setSelectedCategories({
      ...selectedCategories,
      levelTwo: category,
      levelThree: {} as ICategory,
    })

  const handleLevelThreeChange = (category: ICategory): void =>
    setSelectedCategories({
      ...selectedCategories,
      levelThree: category,
    })

  //? Render(s)
  return (
    <div className='flex flex-wrap justify-evenly gap-y-6'>
      <SelectBox
        value={selectedCategories.levelOne}
        list={levelOneCategories}
        onChange={handleLevelOneChange}
        placeholder='دسته بندی سطح اول'
      />

      <SelectBox
        value={selectedCategories.levelTwo}
        list={levelTwoCategories}
        onChange={handleLevelTwoChange}
        placeholder='دسته بندی سطح دوم'
      />

      <SelectBox
        value={selectedCategories.levelThree}
        list={levelThreeCategories}
        onChange={handleLevelThreeChange}
        placeholder='دسته بندی سطح سوم'
      />
    </div>
  )
}

export default SelectCategories
