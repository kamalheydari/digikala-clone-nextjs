import Head from "next/head";
import { useEffect } from "react";

import { resetSelectedCategories } from "app/slices/category.slice";
import { useDispatch } from "react-redux";

import { Buttons, SelectCategories } from "components";

export default function DetailsHome() {
  const dispatch = useDispatch();

  //? Reset Category
  useEffect(() => {
    return () => dispatch(resetSelectedCategories());
  }, []);

  return (
    <main>
      <Head>
        <title>مدیریت | مشخصات</title>
      </Head>

      <Buttons.Back backRoute='/admin'>مشخصات</Buttons.Back>
      <div className='section-divide-y' />
      <section className='flex-1 p-3 mx-auto mb-10 space-y-8 w-fit md:w-full md:grid md:grid-cols-2 md:gap-x-12 md:items-baseline'>
        <SelectCategories detailsHome />
      </section>
    </main>
  );
}

DetailsHome.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
