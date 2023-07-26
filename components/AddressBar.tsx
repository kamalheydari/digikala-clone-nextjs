import { Icons, Skeleton, WithAddressModal } from 'components'

import type { WithAddressModalProps } from 'types'

interface Props {
  addressModalProps?: WithAddressModalProps | null
}

const BasicAddressBar: React.FC<Props> = ({ addressModalProps }) => {
  //? Props
  const { address, isLoading, isVerify, openAddressModal, isAddress } =
    addressModalProps || {}

  //? Render(s)
  if (!isVerify) {
    return null
  } else if (isLoading) {
    return (
      <Skeleton.Item
        animated='background'
        height='h-5 lg:h-6'
        width='w-3/4 lg:w-1/4'
      />
    )
  } else if (!isAddress) {
    return (
      <button
        type='button'
        onClick={openAddressModal}
        className='flex items-center w-full gap-x-1 lg:w-fit'
      >
        <Icons.Location2 className='icon' />
        <span>لطفا شهر خود را انتخاب کنید</span>

        <Icons.ArrowLeft className='mr-auto icon' />
      </button>
    )
  } else if (isAddress) {
    return (
      <button
        type='button'
        onClick={openAddressModal}
        className='flex items-center w-full gap-x-1 lg:w-fit'
      >
        <Icons.Location2 className='icon' />
        <span>
          ارسال به {address?.province.name}, {address?.city.name}
        </span>
        <Icons.ArrowLeft className='mr-auto icon' />
      </button>
    )
  }
}

export default function AddressBar() {
  return (
    <WithAddressModal>
      <BasicAddressBar />
    </WithAddressModal>
  )
}
