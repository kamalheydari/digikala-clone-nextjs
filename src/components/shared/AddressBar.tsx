import { WithAddressModal } from '@/components/shared'
import { Skeleton } from '@/components/ui'
import { ArrowLeft, Location2 } from '@/icons'

import type { WithAddressModalProps } from '@/types'

interface Props {
  addressModalProps?: WithAddressModalProps | null
}

const BasicAddressBar: React.FC<Props> = ({ addressModalProps }) => {
  // ? Props
  const { address, isLoading, isVerify, openAddressModal, isAddress } = addressModalProps || {}

  // ? Render(s)
  if (isLoading) {
    return <Skeleton.Item animated="background" height="h-5 lg:h-6" width="w-3/4 lg:w-1/4" />
  } else if (!isVerify) {
    return null
  } else if (!isAddress) {
    return (
      <button type="button" onClick={openAddressModal} className="flex w-full items-center gap-x-1 lg:w-fit">
        <Location2 className="icon" />
        <span>لطفا شهر خود را انتخاب کنید</span>

        <ArrowLeft className="icon mr-auto" />
      </button>
    )
  } else if (isAddress) {
    return (
      <button type="button" onClick={openAddressModal} className="flex w-full items-center gap-x-1 lg:w-fit">
        <Location2 className="icon" />
        <span>
          ارسال به {address?.province.name}, {address?.city.name}
        </span>
        <ArrowLeft className="icon mr-auto" />
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
