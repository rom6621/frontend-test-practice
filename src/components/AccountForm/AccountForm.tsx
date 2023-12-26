import { Agreement } from "@/components/Agreement/Agreement";
import { InputAccount } from "@/components/InputAccount";
import { useId, useState } from "react";

export const AccountForm = () => {
  const [checked, setChecked] = useState(false);
  const headingId = useId();

  return (
    <form aria-labelledby={headingId}>
      <h2 id={headingId}>新規アカウント登録</h2>
      <InputAccount />
      <Agreement
        onChange={(event) => setChecked(event.currentTarget.checked)}
      />
      <div>
        <button type="submit" disabled={!checked}>
          サインアップ
        </button>
      </div>
    </form>
  );
};
