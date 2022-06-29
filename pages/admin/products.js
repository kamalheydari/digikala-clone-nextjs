import { Buttons } from "components";

export default function Products() {
  return (
    <>
      <Buttons.Back backRoute='/admin'>محصولات</Buttons.Back>
      <div className='section-divide-y' />

      <div className='py-20'></div>
    </>
  );
}

Products.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
