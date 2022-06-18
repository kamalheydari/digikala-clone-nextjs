import { BackButton } from "components";

export default function Products() {
  return (
    <>
      <BackButton backRoute='/admin'>محصولات</BackButton>
      <div className='section-divide-y' />

      <div className='py-20'></div>
    </>
  );
}

Products.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
