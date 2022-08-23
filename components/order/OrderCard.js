import Image from "next/image";
import Link from "next/link";

import moment from "moment-jalaali";

import { Icons } from "components";

import { formatNumber } from "utils/formatNumber";
import { usePatchDataMutation } from "app/slices/fetchApi.slice";
import { useEffect } from "react";
import { showAlert } from "app/slices/alert.slice";
import { useDispatch, useSelector } from "react-redux";

export default function OrderCard({ order, singleOrder }) {
  const dispatch = useDispatch();

  //? Store
  const { token } = useSelector((state) => state.user);

  //? Patch Query
  const [
    patchData,
    { data, isSuccess, isError, error },
  ] = usePatchDataMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        showAlert({
          status: "success",
          title: data.msg,
        })
      );
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      dispatch(
        showAlert({
          status: "error",
          title: error?.data.err,
        })
      );
    }
  }, [isError]);

  //? Handlers
  const handleChangeToDelivered = () => {
    patchData({
      url: `/api/order/${order._id}`,
      token,
      body: { paid: true, delivered: true },
    });
  };
  const handleChangeToInProccess = () => {
    patchData({
      url: `/api/order/${order._id}`,
      token,
      body: { paid: false, delivered: false },
    });
  };

  return (
    <div className='py-4 space-y-3 border-b border-gray-200 lg:border lg:rounded-lg '>
      <div className='flex items-center justify-between lg:px-3'>
        <div className='flex items-center gap-x-2 '>
          {order.delivered ? (
            <Icons.Check className='p-0.5 w-6 h-6 bg-lime-500 text-white rounded-full' />
          ) : (
            <Icons.Clock2 className='p-0.5 w-6 h-6 bg-amber-500 text-white rounded-full' />
          )}
          <span className='text-sm text-black'>
            {order.delivered ? "تحویل شده" : "در حال پردازش"}
          </span>
        </div>
        {/* <Icons.ArrowLeft className='icon w-7 h-7' /> */}
        {order.delivered && (
          <span className='farsi-digits'>
            {moment(order.updatedAt).format("jYYYY/jM/jD")}
          </span>
        )}
        {singleOrder && (
          <div className='relative h-fit px-1.5 group self-end'>
            <Icons.More className='cursor-pointer icon' />
            <div className='absolute left-0 z-10 hidden px-4 py-3 bg-white rounded shadow-3xl top-5 group-hover:flex'>
              <div className='space-y-4'>
                <button
                  type='button'
                  className='flex items-center w-48 gap-x-3 lg:w-56'
                  onClick={handleChangeToDelivered}
                  disabled={order.delivered}
                >
                  <Icons.Check className='text-white rounded-full p-0.5 icon bg-green-500 ' />
                  <span className='block'>تغییر وضعیت به تحویل شده</span>
                </button>
                <button
                  type='button'
                  className='flex items-center w-48 gap-x-3 lg:w-56'
                  onClick={handleChangeToInProccess}
                  disabled={!order.delivered}
                >
                  <Icons.Clock2 className='text-white rounded-full p-0.5 icon bg-amber-500 ' />
                  <span className='block'>تغییر وضعیت به در حال پردازش</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='flex flex-wrap justify-between lg:px-3'>
        <div>
          <span>کد سفارش</span>
          <span className='mr-2 text-sm text-black'>{order._id}</span>
        </div>
        <div className='flex items-center gap-x-1'>
          <span className='text-black farsi-digits'>
            {formatNumber(order.totalPrice - order.totalDiscount)}
          </span>
          <div className='relative w-6 h-6'>
            <Image src='/icons/toman.svg' layout='fill' />
          </div>
        </div>
      </div>
      <div className='flex py-5 gap-x-5 lg:border-t lg:border-gray-200 lg:px-3'>
        {order.cart.map((cartItem, index) => (
          <Link href={`/products/${cartItem.productID}`} key={index}>
            <a>
              <div className='relative w-16 h-16 '>
                <Image src={cartItem.img.url} layout='fill' />
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
