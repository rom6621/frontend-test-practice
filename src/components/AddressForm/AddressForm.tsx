import { ContactNumber } from "@/components/ContactNumber";
import { DeliveryAddress } from "@/components/DeliveryAddress";
import { PastDeliveryAddress } from "@/components/PastDeliveryAddress";
import { RegisterDeliveryAddress } from "@/components/RegisterDeliveryAddress";
import { useId, useState } from "react";

export type AddressOption = React.ComponentProps<"option"> & {
  id: string;
};

interface Props {
  deliveryAddresses?: AddressOption[];
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const AddressForm = ({ deliveryAddresses, onSubmit }: Props) => {
  const [registerNew, setRegisterNew] = useState<boolean | undefined>();
  const headingId = useId();

  return (
    <form onSubmit={onSubmit} aria-labelledby={headingId}>
      <h2 id={headingId}>お届け先の入力</h2>
      <ContactNumber />
      {deliveryAddresses?.length ? (
        <>
          <RegisterDeliveryAddress onChange={setRegisterNew} />
          {registerNew ? (
            <DeliveryAddress title="新しいお届け先" />
          ) : (
            <PastDeliveryAddress
              disabled={registerNew === undefined}
              options={deliveryAddresses}
            />
          )}
        </>
      ) : (
        <DeliveryAddress />
      )}
      <hr />
      <div>
        <button type="submit">注文内容の確認へ進む</button>
      </div>
    </form>
  );
};
