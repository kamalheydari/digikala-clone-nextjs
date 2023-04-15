import { useEffect, useState } from 'react'

import { SelectBox } from 'components'

import { useGetCategoriesQuery } from 'services'

export default function SelectCategories(props) {
  //? Props
  const { selectedCategories, setSelectedCategories } = props

  //? Get Categories Query
  const { categories } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      categories: data?.categories,
    }),
  })
  
  //? States
  const [levelTwoCategories, setLevelTwoCategories] = useState([])
  const [levelThreeCategories, setlevelThreeCategories] = useState([])

  //? Re-Renders
  useEffect(() => {
    if (categories && selectedCategories.level_one?._id)
      setLevelTwoCategories(
        categories.filter(
          (cat) => cat.parent === selectedCategories.level_one._id
        )
      )

    if (categories && selectedCategories.level_two?._id)
      setlevelThreeCategories(
        categories.filter(
          (cat) => cat.parent === selectedCategories.level_two._id
        )
      )
  }, [categories, selectedCategories])

  //? Handlers
  const handleLevelOneChange = (category) => {
    setSelectedCategories({
      level_one: category,
      level_two: {},
      level_three: {},
    })
  }

  const handleLevelTwoChange = (category) => {
    setSelectedCategories({
      ...selectedCategories,
      level_two: category,
      level_three: {},
    })
  }

  const handleLevelThreeChange = (category) => {
    setSelectedCategories({
      ...selectedCategories,
      level_three: category,
    })
  }

  //? Render(s)
  return (
    <div className='flex flex-wrap justify-evenly gap-y-6'>
      <SelectBox
        name='level_one'
        value={selectedCategories.level_one}
        list={categories?.filter((cat) => cat.level === 1)}
        onChange={handleLevelOneChange}
        placeholder='دسته بندی سطح اول'
      />

      <SelectBox
        name='level_two'
        value={selectedCategories.level_two}
        list={levelTwoCategories}
        onChange={handleLevelTwoChange}
        placeholder='دسته بندی سطح دوم'
      />

      <SelectBox
        name='level_three'
        value={selectedCategories.level_three}
        list={levelThreeCategories}
        onChange={handleLevelThreeChange}
        placeholder='دسته بندی سطح سوم'
      />
    </div>
  )
}
