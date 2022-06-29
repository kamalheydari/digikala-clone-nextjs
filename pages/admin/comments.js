import { Buttons } from "components";

export default function Comments() {
  return (
    <>
    <Buttons.Back backRoute='/admin'>دیدگاه‌ها</Buttons.Back>
    <div className='section-divide-y' />

    <div className='py-20'>
    
    </div>
  </>
  );
}

Comments.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
