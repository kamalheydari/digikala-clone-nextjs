import { useGetDataQuery } from "app/slices/fetchApi.slice";
import { BigLoading, Buttons, ReveiwCard } from "components";
import { useRouter } from "next/router";

export default function SingleComment() {
  const router = useRouter();

  const { data, isLoading } = useGetDataQuery({
    url: `/api/reviews/${router.query.id}`,
  });


  return (
    <div>
      <Buttons.Back backRoute='/admin/comments'>دیدگاه</Buttons.Back>
      <div className='section-divide-y' />

      {isLoading ? (
        <div className='px-3 py-20'>
          <BigLoading />
        </div>
      ) : data?.review ? (
        <div className='py-3 px-3 lg:px-8 max-w-5xl mx-auto'>
             <ReveiwCard singleComment item={data?.review} />
        </div>
      ) : (
        <div className='py-3 px-4 space-y-3 '>
          <p className='text-center'>این نظر ثبت نشده است</p>
        </div>
      )}
    </div>
  );
}

SingleComment.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
