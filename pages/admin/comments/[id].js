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
        <div className='max-w-5xl px-3 py-3 mx-auto lg:px-8'>
          <ReveiwCard singleComment item={data?.review} />
        </div>
      ) : (
        <div className='px-4 py-3 space-y-3 '>
          <p className='text-center'>این نظر ثبت نشده است</p>
        </div>
      )}
    </div>
  );
}

SingleComment.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
