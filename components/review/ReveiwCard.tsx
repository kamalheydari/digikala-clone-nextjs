import { Fragment, useState } from 'react'

import { useEditReviewMutation } from 'services'

import { HandleResponse, Icons, ResponsiveImage } from 'components'
import { Menu, Transition } from '@headlessui/react'

import type { DataModels } from 'types'

interface Props {
  item: DataModels.IReview
  singleComment?: boolean
  deleteReviewHandler?: (id: string) => void
}

const ReveiwCard: React.FC<Props> = (props) => {
  //? Props
  const { item, singleComment, deleteReviewHandler } = props

  //? States
  const [status, setStatus] = useState(item.status)

  //? Edit Review Query
  const [editReview, { data, isSuccess, isError, error }] =
    useEditReviewMutation()

  //? Handlers
  const handleChangeStatus = (statusNum: number) => {
    editReview({
      id: item._id,
      body: { status: statusNum },
    })
    setStatus(statusNum)
  }

  //? Local Components
  const DropdownReview = () => (
    <Menu as='div' className='dropdown'>
      <Menu.Button className='dropdown__button'>
        <Icons.More className='icon' />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='dropdown__items'>
          {singleComment ? (
            <>
              <Menu.Item>
                <button
                  className='flex items-center w-52 gap-x-3 px-1.5 py-3 cursor-pointer '
                  type='button'
                  onClick={() => handleChangeStatus(2)}
                  disabled={status === 2}
                >
                  <Icons.Check className='text-white rounded-full p-0.5 icon bg-green-500 ' />
                  <span className='block'>تغییر وضعیت به تایید شده</span>
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  className='flex items-center w-52 gap-x-3 px-1.5 py-3 cursor-pointer '
                  type='button'
                  onClick={() => handleChangeStatus(3)}
                  disabled={status === 3}
                >
                  <Icons.Cross className='text-white rounded-full p-0.5 icon bg-red-500 ' />
                  <span className='block'>تغییر وضعیت به رد شده</span>
                </button>
              </Menu.Item>
            </>
          ) : deleteReviewHandler ? (
            <Menu.Item>
              <button
                type='button'
                className='flex items-center w-52 gap-x-3 px-1.5 py-3 cursor-pointer '
                onClick={() => deleteReviewHandler(item._id)}
              >
                <Icons.Delete className='icon' />
                <span>حذف دیدگاه‌</span>
              </button>
            </Menu.Item>
          ) : null}
        </Menu.Items>
      </Transition>
    </Menu>
  )

  //? Render(s)
  return (
    <>
      {/* Handle Edit Review Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error}
          message={data?.msg}
          onError={() => setStatus(item.status)}
        />
      )}
      <div className='flex py-4 space-y-3 border-b border-gray-200 lg:px-2 lg:border gap-x-3 lg:gap-x-8 lg:rounded-lg '>
        {/* image */}
        <div>
          <ResponsiveImage
            dimensions='w-16 h-12 lg:w-24 lg:h-20'
            src={item.product.images[0].url}
            alt='تصویر محصول'
          />

          <span
            className={`farsi-digits w-5 h-5 text-center pt-0.5 inline-block rounded-md text-white  mr-10 lg:mr-20 ${
              item.rating <= 2
                ? 'bg-red-500'
                : item.rating === 3
                ? 'bg-amber-500'
                : 'bg-green-500'
            }`}
          >
            {item.rating}
          </span>
        </div>

        <div className='flex-1 '>
          {/* header */}
          <div className='pb-1 border-b border-gray-100 lg:flex lg:pb-3 lg:flex-row-reverse lg:items-center lg:ml-4'>
            <div className='flex justify-between'>
              <div
                className={`flex w-fit items-center gap-x-2 px-1.5 py-0.5 rounded-md ${
                  status === 1
                    ? 'bg-amber-100 '
                    : status === 2
                    ? 'bg-green-100 '
                    : 'bg-red-100 '
                } `}
              >
                {status === 1 ? (
                  <Icons.Clock className='text-white rounded-full p-0.5 icon bg-amber-500 ' />
                ) : status === 2 ? (
                  <Icons.Check className='text-white rounded-full p-0.5 icon bg-green-500 ' />
                ) : (
                  <Icons.Cross className='text-white rounded-full p-0.5 icon bg-red-500 ' />
                )}
                <span
                  className={`${
                    status === 1
                      ? 'text-amber-500'
                      : status === 2
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {status === 1
                    ? 'در انتظار تایید'
                    : status === 2
                    ? 'تایید شده'
                    : 'رد شده'}
                </span>
              </div>
              <DropdownReview />
            </div>
            <p className='pt-2 lg:ml-auto'>{item.title}</p>
          </div>

          {/* content */}
          <div className='py-4 space-y-2'>
            <p>{item.comment}</p>
            <div>
              {item.positivePoints.map((point) => (
                <div className='flex items-center gap-x-1' key={point.id}>
                  <Icons.Plus className='text-green-400 icon' />
                  <p>{point.title}</p>
                </div>
              ))}
            </div>
            <div>
              {item.negativePoints.map((point) => (
                <div className='flex items-center gap-x-1' key={point.id}>
                  <Icons.Minus className='text-red-400 icon' />
                  <p>{point.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReveiwCard
