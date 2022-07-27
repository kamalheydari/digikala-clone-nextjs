import { resetSelectedCategories } from "app/slices/category.slice";
import { Buttons, SelectCategories } from "components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function DetailsHome() {
  const dispatch = useDispatch();

  //? Reset Category
  useEffect(() => {
    return () => dispatch(resetSelectedCategories());
  }, []);

  return (
    <>
      <Buttons.Back backRoute='/admin'>مشخصات</Buttons.Back>
      <div className='section-divide-y' />
      <div className='flex-1 p-3 mx-auto mb-10 space-y-8 w-fit md:w-full md:grid md:grid-cols-2 md:gap-x-12 md:items-baseline'>
        <SelectCategories detailsHome />
      </div>
    </>
  );
}

DetailsHome.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
