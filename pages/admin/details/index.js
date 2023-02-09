import Head from "next/head";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

import {  PageContainer, SelectCategories } from "components";

export default function DetailsHome() {
  const router = useRouter();

  //? States
  const [selectedCategories, setSelectedCategories] = useState({});

  useEffect(() => {
    if (selectedCategories?.lvlTwoCategory?._id)
      router.push("/admin/details/" + selectedCategories?.lvlTwoCategory._id);
  }, [selectedCategories?.lvlTwoCategory?._id]);

  return (
    <main>
      <Head>
        <title>مدیریت | مشخصات</title>
      </Head>

      <PageContainer title='مشخصات'>
        <section className='flex-1 p-3 mx-auto mb-10 space-y-8 w-fit md:w-full md:grid md:grid-cols-2 md:gap-x-12 md:items-baseline'>
          <SelectCategories
            setSelectedCategories={setSelectedCategories}
            show={["lvlOne", "lvlTwo"]}
          />
        </section>
      </PageContainer>
    </main>
  );
}

DetailsHome.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
