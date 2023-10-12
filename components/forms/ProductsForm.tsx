import { useEffect, useState } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'

import { useGetDetailsQuery } from 'services'

import { Tab } from '@headlessui/react'
import {
  AddColors,
  SelectCategories,
  AddSizes,
  Button,
  TextField,
  ImageList,
  TextArea,
  DisplayError,
  TableContainer,
} from 'components'

import type { IProduct, ICategory, IProductForm } from 'types'
import { yupResolver } from '@hookform/resolvers/yup'
import { productSchema } from 'utils'

interface CreateProductFormProps {
  mode: 'create'
  createHandler: (data: IProductForm) => void
  updateHandler?: never
  isLoadingCreate: boolean
  selectedProduct?: never
  isLoadingUpdate?: never
}

interface EditProductFormProps {
  mode: 'edit'
  createHandler?: never
  updateHandler: (data: IProductForm) => void
  selectedProduct: IProduct
  isLoadingCreate?: never
  isLoadingUpdate: boolean
}

type Props = CreateProductFormProps | EditProductFormProps

export interface SelectedCategories {
  levelOne?: ICategory
  levelTwo?: ICategory
  levelThree?: ICategory
}

const tabListNames = {
  create: [
    { id: 0, names: ['description', 'title'], title: 'عنوان | معرفی' },
    { id: 1, names: ['images'], title: 'تصاویر' },
    { id: 2, names: ['price', 'discount', 'inStock'], title: 'قیمت' },
    { id: 3, names: ['category_levels'], title: 'دسته‌بندی' },
    { id: 4, names: ['sizes', 'colors'], title: 'زیر محصول' },
    { id: 5, names: ['info'], title: 'ویژگی‌ها' },
    { id: 6, names: ['specification'], title: 'مشخصات' },
  ],
  edit: [
    { id: 0, names: ['description', 'title'], title: 'عنوان | معرفی' },
    { id: 1, names: ['images'], title: 'تصاویر' },
    { id: 2, names: ['price', 'discount', 'inStock'], title: 'قیمت' },
    { id: 4, names: ['sizes', 'colors'], title: 'زیر محصول' },
    { id: 5, names: ['info'], title: 'ویژگی‌ها' },
    { id: 6, names: ['specification'], title: 'مشخصات' },
  ],
}

const initialSelectedCategories = {
  levelOne: {} as ICategory,
  levelTwo: {} as ICategory,
  levelThree: {} as ICategory,
}

const ProductsForm: React.FC<Props> = (props) => {
  //? Props
  const {
    mode,
    createHandler,
    isLoadingCreate,
    isLoadingUpdate,
    updateHandler,
    selectedProduct,
  } = props

  //? States
  const [isDetailsSkip, setIsDetailsSkip] = useState(true)
  const [selectedCategories, setSelectedCategories] =
    useState<SelectedCategories>(initialSelectedCategories)

  //? Form Hook
  const {
    handleSubmit,
    register,
    reset,
    control,
    watch,
    setValue,
    formState: { errors: formErrors },
  } = useForm<IProductForm>({ resolver: yupResolver(productSchema) })

  //? Queries
  //*   Get Details
  const { data: details } = useGetDetailsQuery(
    {
      id: selectedCategories?.levelTwo?._id as string,
    },
    { skip: isDetailsSkip }
  )

  //? Re-Renders
  //*   Select Category To Fetch Details
  useEffect(() => {
    if (selectedCategories?.levelThree?._id) {
      setIsDetailsSkip(false)
    }
  }, [selectedCategories?.levelThree?._id])

  //*   Set Details
  useEffect(() => {
    if (details) {
      setValue('info', details.info)
      setValue('specification', details.specification)
      setValue('optionsType', details.optionsType)
    }
  }, [details])

  //*   Set Product Details On Edit Mode
  useEffect(() => {
    if (selectedProduct && mode === 'edit') {
      const {
        info,
        specification,
        title,
        description,
        colors,
        sizes,
        images,
        price,
        inStock,
        discount,
        optionsType,
      } = selectedProduct
      reset({
        info,
        specification,
        title,
        description,
        colors,
        sizes,
        images,
        price,
        inStock,
        discount,
        optionsType,
      })
    }
  }, [selectedProduct])

  //? Handlers
  const editedCreateHandler: SubmitHandler<IProductForm> = (data) => {
    if (mode === 'create')
      createHandler({
        ...data,
        category: [
          selectedCategories.levelOne!._id,
          selectedCategories.levelTwo!._id,
          selectedCategories.levelThree!._id,
        ],
        category_levels: {
          level_one: selectedCategories.levelOne!._id,
          level_two: selectedCategories.levelTwo!._id,
          Level_three: selectedCategories.levelThree!._id,
        },
      })
  }
  return (
    <section className='p-3 md:px-3 xl:px-8 2xl:px-10'>
      <form
        onSubmit={
          mode === 'create'
            ? handleSubmit(editedCreateHandler)
            : handleSubmit((data) => {
                console.log('update onform')
                updateHandler(data)
              })
        }
        className='space-y-10'
      >
        <Tab.Group>
          <Tab.List className='flex flex-wrap space-x-1 rounded-xl bg-slate-200 p-1 '>
            {tabListNames[mode].map((item) => (
              <Tab
                key={item.id}
                className={({ selected }) =>
                  `tab max-w-max px-3 mx-1
                  ${
                    Object.keys(formErrors).some((errorName) =>
                      item.names.includes(errorName)
                    ) && 'bg-red-300 hover:bg-red-300 text-red-600 '
                  }
                         ${
                           selected
                             ? 'bg-white shadow '
                             : ' hover:text-blue-600 '
                         }
                        `
                }
              >
                {item.title}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <TextField
                label='عنوان'
                name='title'
                control={control}
                errors={formErrors.title}
              />

              <TextArea
                name='description'
                control={control}
                label='معرفی'
                errors={formErrors.description}
              />
            </Tab.Panel>

            <Tab.Panel>
              <ImageList errors={formErrors.images} control={control} />
            </Tab.Panel>

            <Tab.Panel>
              <div className='space-y-4 md:flex md:gap-x-2 md:items-baseline md:justify-evenly'>
                <TextField
                  label='قیمت'
                  name='price'
                  control={control}
                  type='number'
                  inputMode='numeric'
                  errors={formErrors.price}
                />

                <TextField
                  label='موجودی'
                  name='inStock'
                  control={control}
                  type='number'
                  inputMode='numeric'
                  errors={formErrors.inStock}
                />

                <TextField
                  label='تخفیف برحسب درصد'
                  name='discount'
                  control={control}
                  type='number'
                  inputMode='numeric'
                  errors={formErrors.discount}
                />
              </div>
            </Tab.Panel>

            {mode === 'create' && (
              <Tab.Panel>
                <SelectCategories
                  setSelectedCategories={setSelectedCategories}
                  selectedCategories={selectedCategories}
                />
              </Tab.Panel>
            )}

            <Tab.Panel>
              {mode === 'create' && isDetailsSkip ? (
                <div className='text-center text-red-500 py-6 m-3 bg-red-50 rounded-lg'>
                  ابتدا دسته‌بندی را انتخاب کنید
                </div>
              ) : watch('optionsType') === 'colors' ? (
                <>
                  <AddColors control={control} register={register} />
                  {/*  @ts-ignore  */}
                  <DisplayError errors={formErrors.colors} />
                </>
              ) : watch('optionsType') === 'sizes' ? (
                <>
                  <AddSizes control={control} register={register} />
                  {/*  @ts-ignore  */}
                  <DisplayError errors={formErrors.sizes} />
                </>
              ) : watch('optionsType') === 'none' ? (
                <div className='text-center text-red-500 py-6 m-3 bg-red-50 rounded-lg'>
                  بدون زیر محصول
                </div>
              ) : null}
            </Tab.Panel>

            <Tab.Panel>
              {isDetailsSkip && mode === 'create' && (
                <div className='text-center text-red-500 py-6 m-3 bg-red-50 rounded-lg'>
                  ابتدا دسته‌بندی را انتخاب کنید
                </div>
              )}
              {watch('info') && (
                <div className='text-sm space-y-1.5'>
                  <span>ویژگی‌ها</span>
                  <TableContainer tHeads={['نام', 'مقدار']}>
                    {watch('info').map((item, index) => (
                      <tr key={index} className='border-b-2 border-gray-100'>
                        <td className='my-0.5 text-right'>
                          <input
                            type='text'
                            className='text-field__input'
                            {...register(`info.${index}.title`)}
                          />
                          <DisplayError
                            errors={formErrors.info?.[index]?.title}
                          />
                        </td>
                        <td className='p-2'>
                          <textarea
                            rows={3}
                            className='text-field__input'
                            {...register(`info.${index}.value`)}
                          />
                        </td>
                      </tr>
                    ))}
                  </TableContainer>
                </div>
              )}
            </Tab.Panel>
            <Tab.Panel>
              {isDetailsSkip && mode === 'create' && (
                <div className='text-center text-red-500 py-6 m-3 bg-red-50 rounded-lg'>
                  ابتدا دسته‌بندی را انتخاب کنید
                </div>
              )}
              {watch('specification') && (
                <div className='text-sm space-y-1.5'>
                  <span>مشخصات</span>
                  <TableContainer tHeads={['نام', 'مقدار']}>
                    {watch('specification').map((item, index) => (
                      <tr key={index} className='border-b-2 border-gray-100'>
                        <td className='my-0.5 text-right'>
                          <input
                            type='text'
                            className='text-field__input'
                            {...register(`specification.${index}.title`)}
                          />
                          <DisplayError
                            errors={formErrors.specification?.[index]?.title}
                          />
                        </td>
                        <td className='p-2'>
                          <textarea
                            rows={3}
                            className='text-field__input'
                            {...register(`specification.${index}.value`)}
                          />
                        </td>
                      </tr>
                    ))}
                  </TableContainer>
                </div>
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>

        {mode === 'edit' ? (
          <Button
            className='mx-auto bg-amber-500'
            isRounded
            type='submit'
            isLoading={isLoadingUpdate}
          >
            بروزرسانی اطلاعات
          </Button>
        ) : (
          <Button
            className='mx-auto bg-green-500'
            isRounded
            type='submit'
            isLoading={isLoadingCreate}
          >
            ثبت اطلاعات
          </Button>
        )}
      </form>
    </section>
  )
}

export default ProductsForm
