import { BackButton } from "components";

export default function Comments() {
  return (
    <>
    <BackButton backRoute='/admin'>دیدگاه‌ها</BackButton>
    <div className='section-divide-y' />

    <div className='py-20'>
    
    </div>
  </>
  );
}

Comments.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
