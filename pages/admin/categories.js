import { BackButton } from "components";

export default function Categories() {
  return (
    <>
      <BackButton backRoute='/admin'>دسته بندی ها</BackButton>
      <div className='section-divide-y' />

      <div className='py-20 '>
      
      </div>
    </>
  );
}

Categories.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
