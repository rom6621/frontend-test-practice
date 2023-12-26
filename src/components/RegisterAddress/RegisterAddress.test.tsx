import { RegisterAddress } from "@/components/RegisterAddress";
import { mockPostMyAddress } from "@/test/mock";
import {
  clickSubmit,
  inputContactNumber,
  inputDeliveryAddress,
} from "@/test/utils";
import { render, screen } from "@testing-library/react";

jest.mock("@/features/addresses");

describe("RegisterAddress コンポーネントのテスト", () => {
  const fillValuesAndSubmit = async () => {
    const contactNumber = await inputContactNumber();
    const deliveryAddress = await inputDeliveryAddress();
    const submitValues = {
      ...contactNumber,
      ...deliveryAddress,
    };
    await clickSubmit();
    return submitValues;
  };

  const fillInvalidValuesAndSubmit = async () => {
    const contactNumber = await inputContactNumber({
      name: "田中太郎",
      phoneNumber: "aaa-defg-hijkl",
    });
    const deliveryAddress = await inputDeliveryAddress();
    const submitValues = {
      ...contactNumber,
      ...deliveryAddress,
    };
    await clickSubmit();
    return submitValues;
  };

  test("成功時、「登録しました」が表示される", async () => {
    /* Arrange */
    const mockFn = mockPostMyAddress(201);
    render(<RegisterAddress />);

    /* Act */
    const submitValues = await fillValuesAndSubmit();

    /* Assert */
    expect(mockFn).toHaveBeenCalledWith(expect.objectContaining(submitValues));
    expect(screen.getByText("登録しました")).toBeInTheDocument();
  });

  test("失敗時、「登録に失敗しました」が表示される", async () => {
    /* Arrange */
    const mockFn = mockPostMyAddress(500);
    render(<RegisterAddress />);

    /* Act */
    const submitValues = await fillValuesAndSubmit();

    /* Assert */
    expect(mockFn).toHaveBeenCalledWith(expect.objectContaining(submitValues));
    expect(screen.getByText("不明なエラーが発生しました")).toBeInTheDocument();
  });

  test("バリデーションエラー時、「不正な入力値が含まれています」が表示される", async () => {
    /* Arrange */
    render(<RegisterAddress />);

    /* Act */
    await fillInvalidValuesAndSubmit();

    /* Assert */
    expect(
      screen.getByText("不正な入力値が含まれています"),
    ).toBeInTheDocument();
  });
});
