import { Fragment, useState } from 'react'

import { useEditReviewMutation } from '@/services'

import { Menu, Transition } from '@headlessui/react'
import { HandleResponse } from '@/components/shared'
import { ResponsiveImage } from '@/components/ui'
import { Check, Clock, Cross, Delete, Minus, More, Plus } from '@/icons'

import type { IReview } from '@/types'

interface Props {
  item: IReview
  singleComment?: boolean
  deleteReviewHandler?: (id: string) => void
}

const ReveiwCard: React.FC<Props> = (props) => {
  // ? Props
  const { item, singleComment, deleteReviewHandler } = props

  // ? States
  const [status, setStatus] = useState(item.status)

  // ? Edit Review Query
  const [editReview, { data, isSuccess, isError, error }] = useEditReviewMutation()

  // ? Handlers
  const handleChangeStatus = (statusNum: number) => {
    editReview({
      id: item._id,
      body: { status: statusNum },
    })
    setStatus(statusNum)
  }

  // ? Local Components
  const DropdownReview = () => (
    <Menu as="div" className="dropdown">
      <Menu.Button className="dropdown__button">
        <More className="icon" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="dropdown__items">
          {singleComment ? (
            <>
              <Menu.Item>
                <button
                  className="flex w-52 cursor-pointer items-center gap-x-3 px-1.5 py-3 "
                  type="button"
                  onClick={() => handleChangeStatus(2)}
                  disabled={status === 2}
                >
                  <Check className="icon rounded-full bg-green-500 p-0.5 text-white " />
                  <span className="block">تغییر وضعیت به تایید شده</span>
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  className="flex w-52 cursor-pointer items-center gap-x-3 px-1.5 py-3 "
                  type="button"
                  onClick={() => handleChangeStatus(3)}
                  disabled={status === 3}
                >
                  <Cross className="icon rounded-full bg-red-500 p-0.5 text-white " />
                  <span className="block">تغییر وضعیت به رد شده</span>
                </button>
              </Menu.Item>
            </>
          ) : deleteReviewHandler ? (
            <Menu.Item>
              <button
                type="button"
                className="flex w-52 cursor-pointer items-center gap-x-3 px-1.5 py-3 "
                onClick={() => deleteReviewHandler(item._id)}
              >
                <Delete className="icon" />
                <span>حذف دیدگاه‌</span>
              </button>
            </Menu.Item>
          ) : null}
        </Menu.Items>
      </Transition>
    </Menu>
  )

  // ? Render(s)
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
      <div className="flex gap-x-3 space-y-3 border-b border-gray-200 py-4 lg:gap-x-8 lg:rounded-lg lg:border lg:px-2 ">
        {/* image */}
        <div>
          <ResponsiveImage
            dimensions="w-16 h-12 lg:w-24 lg:h-20"
            src={item.product.images[0].url}
            blurDataURL={item.product.images[0].placeholder}
            alt="تصویر محصول"
            imageStyles="object-contain"
          />

          <span
            className={`farsi-digits mr-10 inline-block h-5 w-5 rounded-md pt-0.5 text-center  text-white lg:mr-20 ${
              item.rating <= 2 ? 'bg-red-500' : item.rating === 3 ? 'bg-amber-500' : 'bg-green-500'
            }`}
          >
            {item.rating}
          </span>
        </div>

        <div className="flex-1 ">
          {/* header */}
          <div className="border-b border-gray-100 pb-1 lg:ml-4 lg:flex lg:flex-row-reverse lg:items-center lg:pb-3">
            <div className="flex justify-between">
              <div
                className={`flex w-fit items-center gap-x-2 rounded-md px-1.5 py-0.5 ${
                  status === 1 ? 'bg-amber-100 ' : status === 2 ? 'bg-green-100 ' : 'bg-red-100 '
                } `}
              >
                {status === 1 ? (
                  <Clock className="icon rounded-full bg-amber-500 p-0.5 text-white " />
                ) : status === 2 ? (
                  <Check className="icon rounded-full bg-green-500 p-0.5 text-white " />
                ) : (
                  <Cross className="icon rounded-full bg-red-500 p-0.5 text-white " />
                )}
                <span
                  className={`${status === 1 ? 'text-amber-500' : status === 2 ? 'text-green-500' : 'text-red-500'}`}
                >
                  {status === 1 ? 'در انتظار تایید' : status === 2 ? 'تایید شده' : 'رد شده'}
                </span>
              </div>
              <DropdownReview />
            </div>
            <p className="pt-2 lg:ml-auto">{item.title}</p>
          </div>

          {/* content */}
          <div className="space-y-2 py-4">
            <p>{item.comment}</p>
            <div>
              {item.positivePoints.map((point) => (
                <div className="flex items-center gap-x-1" key={point.id}>
                  <Plus className="icon text-green-400" />
                  <p>{point.title}</p>
                </div>
              ))}
            </div>
            <div>
              {item.negativePoints.map((point) => (
                <div className="flex items-center gap-x-1" key={point.id}>
                  <Minus className="icon text-red-400" />
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
