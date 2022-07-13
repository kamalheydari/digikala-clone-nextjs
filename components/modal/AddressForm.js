import { useEffect, useState } from "react";

import { usePatchDataMutation } from "app/slices/fetchApiSlice";
import { updateUser } from "app/slices/authSlice";

import { Loading, CloseModal } from "components";

import cityList from "utils/cityList";
import { provinces } from "utils/constatns";

export default function AddressForm({ title, token, dispatch, closeModal }) {
  //? Local State
  const [cities, setCities] = useState([]);
  const [address, setAddress] = useState({});

  //? Patch Data
  const [patchData, { data, isSuccess, isLoading }] = usePatchDataMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateUser(data.user));
      dispatch(closeModal());
    }
  }, [isSuccess]);

  //? Handlers
  const submitHander = async (e) => {
    e.preventDefault();
    patchData({
      url: "/api/user",
      body: { address },
      token,
    });
  };

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  //? Handle Get Cities
  useEffect(() => {
    setCities(cityList(address?.provinces));
  }, [address?.provinces]);

  return (
    <div className='flex flex-col h-full px-5 py-3 bg-white md:rounded-lg gap-y-5'>
      <div className='flex justify-between py-2 border-b-2 border-gray-200'>
        <h5>{title}</h5>
        <CloseModal />
      </div>
      <p>لطفا اطلاعات موقعیت مکانی خود را وارد کنید.</p>
      <form
        className='flex flex-col justify-between flex-1 gap-y-5'
        onSubmit={submitHander}
      >
        <div className='max-w-xl space-y-16 md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-10 md:items-baseline '>
          <div className='flex flex-col items-start justify-between gap-y-2'>
            <label
              className='text-xs text-gray-700 lg:text-sm md:min-w-max'
              htmlFor='provinces'
            >
              استان
            </label>
            <select
              className='border-2 rounded-sm py-0.5 px-3 outline-none w-56'
              name='provinces'
              id='provinces'
              onChange={handleChange}
              required={true}
            >
              {provinces.map((item, index) => (
                <option value={item[0]} key={index}>
                  {item[0]}
                </option>
              ))}
            </select>
          </div>

          <div className='flex flex-col items-start justify-between gap-y-2'>
            <label
              className='text-xs text-gray-700 lg:text-sm md:min-w-max'
              htmlFor='city'
            >
              شهرستان
            </label>
            <select
              className='border-2 rounded-sm py-0.5 px-3 outline-none w-56'
              name='city'
              id='city'
              onChange={handleChange}
              required={true}
            >
              {cities.map((item, index) => (
                <option value={item[0]} key={index}>
                  {item[0]}
                </option>
              ))}
            </select>
          </div>

          <div className='space-y-3 '>
            <label
              className='text-xs text-gray-700 lg:text-sm md:min-w-max'
              htmlFor='street'
            >
              کوچه و خیابان
            </label>
            <input
              className='input sm:max-w-sm lg:max-w-full '
              type='text'
              name='street'
              id='street'
              onChange={handleChange}
              required={true}
            />
          </div>

          <div className='space-y-3 '>
            <label
              className='text-xs text-gray-700 lg:text-sm md:min-w-max'
              htmlFor='postalCode'
            >
              کد پستی
            </label>
            <input
              className='input sm:max-w-sm lg:max-w-full '
              type='text'
              name='postalCode'
              id='postalCode'
              onChange={handleChange}
              required={true}
            />
          </div>
        </div>

        <div className='py-3 border-t-2 border-gray-200 lg:pb-0 '>
          <button className='modal-btn' type='submit' disabled={isLoading}>
            {isLoading ? <Loading /> : "ثبت اطلاعات"}
          </button>
        </div>
      </form>
    </div>
  );
}
