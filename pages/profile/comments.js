import { useState, useEffect } from "react";
import Image from "next/image";

import { useSelector } from "react-redux";
import { useGetDataQuery } from "app/slices/fetchApi.slice";

import { BigLoading, Buttons, ReveiwCard } from "components";

export default function Comments() {
  //? Local State
  const [reviews, setReviews] = useState([]);

  //? Store
  const { token } = useSelector((state) => state.user);

  //? Get Query
  const { data, isLoading, isSuccess } = useGetDataQuery({
    url: "/api/reviews",
    token,
  });

  useEffect(() => {
    if (isSuccess) setReviews(data.reviews);
  }, [isSuccess]);

  return (
    <main>
      <Buttons.Back backRoute='/profile'>دیدگاه‌ها</Buttons.Back>
      <div className='section-divide-y' />
      {isLoading ? (
        <section className='px-3 py-20'>
          <BigLoading />
        </section>
      ) : reviews.length === 0 ? (
        <section className='py-20'>
          <div className='relative mx-auto h-52 w-52'>
            <Image src='/icons/order-empty.svg' layout='fill' />
          </div>

          <p className='text-center'>هنوز هیچ نظری ندارید</p>
        </section>
      ) : (
        <section className='px-4 py-3 space-y-3 '>
          {reviews.map((item) => (
            <ReveiwCard key={item._id} item={item} />
          ))}
        </section>
      )}
    </main>
  );
}
Comments.getProfileLayout = function pageLayout(page) {
  return <>{page}</>;
};
