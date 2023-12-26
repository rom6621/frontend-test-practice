import { AddressForm } from "@/components/AddressForm";
import { ValidationError } from "@/errors";
import { postMyAddress } from "@/features/addresses";
import { checkPhoneNumber } from "@/lib";
import { useState } from "react";

export const RegisterAddress = () => {
  const [postResult, setPostResult] = useState("");
  // const { handleSubmit } = useForm();
  const handleSubmit = (callback: (values: any) => Promise<void> | void) => {
    return (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const values: { [k: string]: unknown } = {};
      for (const [key, value] of formData) {
        values[key] = value;
      }
      return callback(values);
    };
  };

  return (
    <div>
      <AddressForm
        onSubmit={handleSubmit(async (values) => {
          try {
            checkPhoneNumber(values.phoneNumber);
            await postMyAddress(values);
            setPostResult("登録しました");
          } catch (error) {
            if (error instanceof ValidationError) {
              setPostResult("不正な入力値が含まれています");
              return;
            }
            setPostResult("不明なエラーが発生しました");
          }
        })}
      />
      {postResult && <p>{postResult}</p>}
    </div>
  );
};
