import {
  clickSubmit,
  inputContactNumber,
  inputDeliveryAddress,
} from "@/test/utils";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddressForm } from "./AddressForm";
import { deliveryAddresses } from "./fixtures";

describe("AccountForm コンポーネントのテスト", () => {
  const user = userEvent.setup();

  const mockHandleSubmit = async () => {
    const mockFn = jest.fn();
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const data: { [k: string]: unknown } = {};
      for (const [key, value] of formData) {
        data[key] = value;
      }
      mockFn(data);
    };
    return [mockFn, onSubmit] as const;
  };

  describe("過去のお届け先がない場合", () => {
    test("お届け先入力欄がある", () => {
      /* Arrange */
      render(<AddressForm />);

      /* Assert */
      expect(
        screen.getByRole("group", {
          name: "連絡先",
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("group", {
          name: "お届け先",
        }),
      ).toBeInTheDocument();
    });

    test("入力, 送信すると入力内容が送信される", async () => {
      /* Arrange */
      const [mockFn, onSubmit] = await mockHandleSubmit();
      render(<AddressForm onSubmit={onSubmit} />);

      /* Act */
      const contactNumber = await inputContactNumber();
      const deliveryAddress = await inputDeliveryAddress();
      await clickSubmit();

      /* Assert */
      expect(mockFn).toHaveBeenCalledWith(
        expect.objectContaining({
          ...contactNumber,
          ...deliveryAddress,
        }),
      );
    });
  });

  describe("過去のお届け先がある場合", () => {
    test("設問に答えるまで、お届け先を選べない", () => {
      /* Arrange */
      render(<AddressForm deliveryAddresses={deliveryAddresses} />);

      /* Assert */
      expect(
        screen.getByRole("group", {
          name: "新しいお届け先を登録しますか？",
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("group", {
          name: "過去のお届け先",
        }),
      ).toBeDisabled();
    });
  });

  test("「いいえ」を選択後、お届け先が活性化する", async () => {
    /* Arrange */
    render(<AddressForm deliveryAddresses={deliveryAddresses} />);

    /* Act */
    await user.click(screen.getByLabelText("いいえ"));

    /* Assert */
    expect(
      screen.getByRole("group", {
        name: "過去のお届け先",
      }),
    ).toBeEnabled();
  });

  test("「いいえ」を選択後、入力・送信されると、入力内容が送信される", async () => {
    /* Arrange */
    const [mockFn, onSubmit] = await mockHandleSubmit();
    render(
      <AddressForm deliveryAddresses={deliveryAddresses} onSubmit={onSubmit} />,
    );

    /* Act */
    await user.click(screen.getByLabelText("いいえ"));
    const contactNumber = await inputContactNumber();
    await clickSubmit();

    /* Assert */
    expect(mockFn).toHaveBeenCalledWith(expect.objectContaining(contactNumber));
  });

  test("「はい」を選択後、「新しいお届け先」フォームが表示される", async () => {
    /* Arrange */
    render(<AddressForm deliveryAddresses={deliveryAddresses} />);

    /* Act */
    await user.click(screen.getByLabelText("はい"));

    /* Assert */
    expect(
      screen.getByRole("group", {
        name: "新しいお届け先",
      }),
    ).toBeInTheDocument();
  });

  test("「はい」を選択後、入力・送信されると、入力内容が送信される", async () => {
    /* Arrange */
    const [mockFn, onSubmit] = await mockHandleSubmit();
    render(
      <AddressForm deliveryAddresses={deliveryAddresses} onSubmit={onSubmit} />,
    );

    /* Act */
    await user.click(screen.getByLabelText("はい"));
    const contactNumber = await inputContactNumber();
    const deliveryAddress = await inputDeliveryAddress();
    await clickSubmit();

    /* Assert */
    expect(mockFn).toHaveBeenCalledWith(
      expect.objectContaining({
        ...contactNumber,
        ...deliveryAddress,
      }),
    );
  });
});
