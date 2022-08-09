import { useEffect, useState } from "react";
import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";
import { openModal } from "app/slices/modal.slice";
import { usePatchDataMutation } from "app/slices/fetchApi.slice";

import { Icons } from "components";

export default function ReveiwCard({ item, singleComment }) {
  const dispatch = useDispatch();

  //? Local State
  const [status, setStatus] = useState(item.status);

  //? Store
  const { token } = useSelector((state) => state.user);

  //? Patch Query
  const [patchData] = usePatchDataMutation();

  useEffect(() => {
    patchData({
      url: `/api/reviews/${item._id}`,
      token,
      body: { status },
    });
  }, [status]);

  //? Handlers
  const handleDelete = () => {
    dispatch(
      openModal({
        isShow: true,
        id: item._id,
        type: "confirm-delete-reveiw",
        title: "دیدگاه‌",
      })
    );
  };

  return (
    <div className='flex py-4 space-y-3 border-b border-gray-200 lg:px-2 lg:border gap-x-3 lg:gap-x-8 lg:rounded-lg '>
      {/* image */}
      <div>
        <div className='relative w-16 h-12 lg:w-24 lg:h-20'>
          <Image src={item.product.images[0].url} layout='fill' />
        </div>
        <span
          className={`farsi-digits w-5 h-5 text-center pt-0.5 inline-block rounded-md text-white  mr-10 lg:mr-20 ${
            item.rating <= 2
              ? "bg-red-500"
              : item.rating === 3
              ? "bg-amber-500"
              : "bg-green-500"
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
                  ? "bg-amber-100 "
                  : status === 2
                  ? "bg-green-100 "
                  : "bg-red-100 "
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
                    ? "text-amber-500"
                    : status === 2
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {status === 1
                  ? "در انتظار تایید"
                  : status === 2
                  ? "تایید شده"
                  : "رد شده"}
              </span>
            </div>
            <div className='relative h-fit px-1.5 group self-end'>
              <Icons.More className='cursor-pointer icon' />
              <div className='absolute left-0 hidden px-4 py-3 bg-white rounded shadow-3xl top-5 group-hover:flex'>
                {singleComment ? (
                  <div className='space-y-4'>
                    <button
                      type='button'
                      className='flex items-center w-48 gap-x-3'
                      onClick={() => setStatus(2)}
                    >
                      <Icons.Check className='text-white rounded-full p-0.5 icon bg-green-500 ' />
                      <span className='block'>تغییر وضعیت به تایید شده</span>
                    </button>
                    <button
                      type='button'
                      className='flex items-center w-48 gap-x-3'
                      onClick={() => setStatus(3)}
                    >
                      <Icons.Cross className='text-white rounded-full p-0.5 icon bg-red-500 ' />
                      <span className='block'>تغییر وضعیت به رد شده</span>
                    </button>
                  </div>
                ) : (
                  <button
                    type='button'
                    className='flex items-center gap-x-2 w-36'
                    onClick={handleDelete}
                  >
                    <Icons.Delete className='icon' />
                    <span>حذف دیدگاه‌</span>
                  </button>
                )}
              </div>
            </div>
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
  );
}