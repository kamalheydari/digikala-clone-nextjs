import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useState } from 'react'

import { useDeleteReviewMutation, useGetReviewsQuery } from 'services'

import {
  Pagination,
  ReveiwCard,
  ShowWrapper,
  EmptyCommentsList,
  ConfirmDeleteModal,
  PageContainer,
  HandleResponse,
  ReveiwSkeleton,
  ProfileLayout,
} from 'components'

import { useDisclosure, useChangeRoute } from 'hooks'

import { useRouter } from 'next/router'

function Reviews() {
  //? Assets
  const { query } = useRouter()
  const changeRoute = useChangeRoute({
    shallow: true,
  })

  //? Modals
  const [isShowConfirmDeleteModal, confirmDeleteModalHandlers] = useDisclosure()

  //? States
  const [deleteInfo, setDeleteInfo] = useState({
    id: '',
  })

  //? Queries
  //*    Delete Review
  const [
    deleteReview,
    {
      isSuccess: isSuccess_delete,
      isError: isError_delete,
      error: error_delete,
      data: data_delete,
      isLoading: isLoading_delete,
    },
  ] = useDeleteReviewMutation()

  //*   Get Reviews
  const { data, isSuccess, isFetching, error, isError, refetch } =
    useGetReviewsQuery({
      page: query?.page || 1,
    })

  //? Handlers
  const deleteReviewHandler = (id) => {
    setDeleteInfo({ id })
    confirmDeleteModalHandlers.open()
  }

  //? Render(s)
  return (
    <>
      <ConfirmDeleteModal
        title='دیدگاه‌'
        deleteFunc={deleteReview}
        isLoading={isLoading_delete}
        isShow={isShowConfirmDeleteModal}
        onClose={confirmDeleteModalHandlers.close}
        deleteInfo={deleteInfo}
        setDeleteInfo={setDeleteInfo}
      />

      {/* Handle Delete Response */}
      {(isSuccess_delete || isError_delete) && (
        <HandleResponse
          isError={isError_delete}
          isSuccess={isSuccess_delete}
          error={error_delete?.data?.err}
          message={data_delete?.msg}
          onSuccess={() => {
            confirmDeleteModalHandlers.close()
            setDeleteInfo({ id: '' })
          }}
          onError={() => {
            confirmDeleteModalHandlers.close()
            setDeleteInfo({ id: '' })
          }}
        />
      )}

      <main id='profileReviews'>
        <Head>
          <title>پروفایل | دیدگاه‌ها</title>
        </Head>
        
        <ProfileLayout>
          <PageContainer title='دیدگاه‌ها'>
            <ShowWrapper
              error={error}
              isError={isError}
              refetch={refetch}
              isFetching={isFetching}
              isSuccess={isSuccess}
              dataLength={data ? data.reviewsLength : 0}
              emptyComponent={<EmptyCommentsList />}
              loadingComponent={<ReveiwSkeleton />}
            >
              <div className='px-4 py-3 space-y-3 '>
                {data?.reviews.map((item) => (
                  <ReveiwCard
                    deleteReviewHandler={deleteReviewHandler}
                    key={item._id}
                    item={item}
                  />
                ))}
              </div>
            </ShowWrapper>

            {data?.reviewsLength > 5 && (
              <div className='py-4 mx-auto lg:max-w-5xl'>
                <Pagination
                  pagination={data.pagination}
                  changeRoute={changeRoute}
                  section='profileReviews'
                  client
                />
              </div>
            )}
          </PageContainer>
        </ProfileLayout>
      </main>
    </>
  )
}

export default dynamic(() => Promise.resolve(Reviews), { ssr: false })
