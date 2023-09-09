import React from 'react'

import { AddressModal } from 'components'

import { useAppSelector, useDisclosure } from 'hooks'

import type { WithAddressModalProps } from 'types'

interface Props {
  children: React.ReactNode
}

const WithAddressModal: React.FC<Props> = (props) => {
  const { children } = props

  const [isShowAddressModal, addressModalHandlers] = useDisclosure()

  //? Get UserInfo
  const { userInfo, isLoading } = useAppSelector((state) => state.user)

  const addressModalProps: WithAddressModalProps = {
    openAddressModal: addressModalHandlers.open,
    address: userInfo?.address ?? ({} as WithAddressModalProps['address']),
    isLoading,
    isVerify: !!userInfo,
    isAddress: !!userInfo?.address,
  }

  return (
    <>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement, {
              addressModalProps,
            })
          : child
      )}

      {!userInfo ? null : !isLoading ? (
        <AddressModal
          isShow={isShowAddressModal}
          onClose={addressModalHandlers.close}
          address={
            userInfo?.address ?? ({} as WithAddressModalProps['address'])
          }
        />
      ) : null}
    </>
  )
}

export default WithAddressModal
