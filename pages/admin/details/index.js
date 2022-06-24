import { BackButton, SelectCategories } from "components";

export default function DetailsHome() {
  return (
    <>
      <BackButton backRoute='/admin'>مشخصات</BackButton>
      <div className='section-divide-y' />
      <div className='flex-1 p-3 max-w-xl mb-10 space-y-8 md:grid md:grid-cols-2 md:gap-x-12 md:items-baseline'>
        <SelectCategories detailsHome />
      </div>
    </>
  );
}

DetailsHome.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
