import { BackButton } from "components";

export default function NewProduct() {
  return (
    <>
      <BackButton backRoute='/admin'>محصول جدید</BackButton>
      <div className='section-divide-y' />

      <div className='py-20'></div>
    </>
  );
}

NewProduct.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
