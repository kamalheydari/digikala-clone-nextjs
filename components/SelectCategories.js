import { useEffect, useState } from 'react'
import { useGetCategoriesQuery } from 'app/api/categoryApi'

export default function SelectCategories({ show, setSelectedCategories }) {
  const [categories, setCategories] = useState([])

  const [lvlOneCategories, setLvlOneCategories] = useState([])
  const [lvlTwoCategories, setLvlTwoCategories] = useState([])
  const [lvlThreeCategories, setlvlThreeCategories] = useState([])

  const [lvlOneCategory, setLvlOneCategory] = useState({})
  const [lvlTwoCategory, setLvlTwoCategory] = useState({})
  const [lvlThreeCategory, setLvlThreeCategory] = useState({})

  const { data } = useGetCategoriesQuery()

  useEffect(() => {
    setSelectedCategories({ lvlOneCategory, lvlTwoCategory, lvlThreeCategory })
  }, [lvlOneCategory, lvlTwoCategory, lvlThreeCategory])

  useEffect(() => {
    if (data && data.categories.length) {
      setCategories(data.categories)
      setLvlOneCategories(data.categories.filter((cat) => cat.parent === '/'))
    }
  }, [data])

  useEffect(() => {
    setLvlTwoCategories(
      categories.filter(
        (category) => category.parent === lvlOneCategory.category
      )
    )
  }, [lvlOneCategory])

  useEffect(() => {
    setlvlThreeCategories(
      categories.filter(
        (category) => category.parent === '/' + lvlTwoCategory.slug
      )
    )
  }, [lvlTwoCategory])

  const handleChangeCategory = (e) => {
    if (e.target.name === 'lvlOneCategory') {
      setLvlOneCategory(
        lvlOneCategories.find((cat) => cat._id === e.target.value)
      )
      setLvlTwoCategory({})
      setLvlThreeCategory({})
    }

    if (e.target.name === 'lvlTwoCategory') {
      setLvlTwoCategory(
        lvlTwoCategories.find((cat) => cat._id === e.target.value)
      )
      setLvlThreeCategory({})
    }

    if (e.target.name === 'lvlThreeCategory') {
      setLvlThreeCategory(
        lvlThreeCategories.find((cat) => cat._id === e.target.value)
      )
    }
  }

  const Select = ({ title, data, name, handleChange, value }) => {
    return (
      <div className='flex flex-col items-start justify-between gap-y-2'>
        <label htmlFor='lvlOneCategory'>{title}</label>
        <select
          className='border-2 rounded-sm py-0.5 px-3 outline-none w-56 text-gray-800'
          name={name}
          id={name}
          onChange={handleChange}
          value={value}
        >
          <option value='0' selected disabled></option>
          {data.length &&
            data.map((item, index) => (
              <option key={index} value={item._id} className='text-gray-700'>
                {item.name}
              </option>
            ))}
        </select>
      </div>
    )
  }

  return (
    data &&
    categories?.length > 0 && (
      <div className='py-3 mx-auto space-y-8 w-fit flex-wrap md:w-full md:py-0 md:flex md:items-baseline md:justify-center md:gap-5'>
        {show.includes('lvlOne') && (
          <Select
            title='دسته‌بندی سطح اول'
            data={lvlOneCategories}
            name='lvlOneCategory'
            value={lvlOneCategory?._id}
            handleChange={handleChangeCategory}
          />
        )}
        {show.includes('lvlTwo') && (
          <Select
            title='دسته‌بندی سطح دوم'
            data={lvlTwoCategories}
            name='lvlTwoCategory'
            value={lvlTwoCategory?._id}
            handleChange={handleChangeCategory}
          />
        )}

        {show.includes('lvlThree') && (
          <Select
            title='دسته‌بندی سطح سوم'
            data={lvlThreeCategories}
            name='lvlThreeCategory'
            value={lvlThreeCategory?._id}
            handleChange={handleChangeCategory}
          />
        )}
      </div>
    )
  )
}
