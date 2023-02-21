import { AddressForm } from "components";

import useDisclosure from "hooks/useDisclosure";

export const withAddressModal = (Component) => {
  return (props) => {
    //? Assets
    const [isShowAddressModal, addressModalHandlers] = useDisclosure();

    return (
      <>
        <Component
          openAddressModal={() => addressModalHandlers.open()}
          {...props}
        />
        <AddressForm
          isShow={isShowAddressModal}
          onClose={addressModalHandlers.close}
        />
      </>
    );
  };
};
