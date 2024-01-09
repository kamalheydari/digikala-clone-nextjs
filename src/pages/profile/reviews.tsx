import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useState } from 'react'

import { useDeleteReviewMutation, useGetReviewsQuery } from 'services'

import { useDisclosure } from 'hooks'

import { useRouter } from 'next/router'

import { EmptyCommentsList } from 'components/emptyList'
import { ProfileLayout } from 'components/layouts'
import { ConfirmDeleteModal } from 'components/modals'
import { ReveiwCard } from 'components/review'
import { HandleResponse, DataStateDisplay } from 'components/shared'
import { ReveiwSkeleton } from 'components/skeleton'
import { PageContainer } from 'components/ui'
import { Pagination } from 'components/others'

import type { NextPage } from 'next'

const Reviews: NextPage = () => {
  // ? Assets
  const { query } = useRouter()

  // ? Modals
  const [isShowConfirmDeleteModal, confirmDeleteModalHandlers] = useDisclosure()

  // ? States
  const [deleteInfo, setDeleteInfo] = useState({
    id: '',
  })

  // ? Queries
  //*    Delete Review
  const [
    deleteReview,
    {
      isSuccess: isSuccessDelete,
      isError: isErrorDelete,
      error: errorDelete,
      data: dataDelete,
      isLoading: isLoadingDelete,
    },
  ] = useDeleteReviewMutation()

  //*   Get Reviews
  const { data, ...reviewsQueryProps } = useGetReviewsQuery({
    page: query.page ? +query.page : 1,
  })

  // ? Handlers
  const deleteReviewHandler = (id: string) => {
    setDeleteInfo({ id })
    confirmDeleteModalHandlers.open()
  }

  const onConfirmDelete = () => deleteReview({ id: deleteInfo.id })

  const onCancelDelete = () => {
    setDeleteInfo({ id: '' })
    confirmDeleteModalHandlers.close()
  }

  const onSuccessDelete = () => {
    confirmDeleteModalHandlers.close()
    setDeleteInfo({ id: '' })
  }

  const onErrorDelete = () => {
    confirmDeleteModalHandlers.close()
    setDeleteInfo({ id: '' })
  }

  // ? Render(s)
  return (
    <>
      <ConfirmDeleteModal
        title="دیدگاه‌"
        isLoading={isLoadingDelete}
        isShow={isShowConfirmDeleteModal}
        onClose={confirmDeleteModalHandlers.close}
        onCancel={onCancelDelete}
        onConfirm={onConfirmDelete}
      />

      {/* Handle Delete Response */}
      {(isSuccessDelete || isErrorDelete) && (
        <HandleResponse
          isError={isErrorDelete}
          isSuccess={isSuccessDelete}
          error={errorDelete}
          message={dataDelete?.msg}
          onSuccess={onSuccessDelete}
          onError={onErrorDelete}
        />
      )}

      <main id="profileReviews">
        <Head>
          <title>پروفایل | دیدگاه‌ها</title>
        </Head>

        <ProfileLayout>
          <PageContainer title="دیدگاه‌ها">
            <DataStateDisplay
              {...reviewsQueryProps}
              dataLength={data ? data.reviewsLength : 0}
              emptyComponent={<EmptyCommentsList />}
              loadingComponent={<ReveiwSkeleton />}
            >
              <div className="space-y-3 px-4 py-3 ">
                {data &&
                  data.reviews.map((item) => (
                    <ReveiwCard deleteReviewHandler={deleteReviewHandler} key={item._id} item={item} />
                  ))}
              </div>
            </DataStateDisplay>

            {data && data.reviewsLength > 5 && (
              <div className="mx-auto py-4 lg:max-w-5xl">
                <Pagination pagination={data.pagination} section="profileReviews" client />
              </div>
            )}
          </PageContainer>
        </ProfileLayout>
      </main>
    </>
  )
}

export default dynamic(() => Promise.resolve(Reviews), { ssr: false })
