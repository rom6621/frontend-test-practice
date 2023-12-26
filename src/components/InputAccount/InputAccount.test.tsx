import { InputAccount } from "@/components/InputAccount";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("InputAccount コンポーネントのテスト", () => {
  const user = userEvent.setup();

  test("メールアドレス入力欄", async () => {
    /* Arrange */
    render(<InputAccount />);
    const textbox = screen.getByRole("textbox", {
      name: "メールアドレス",
    });
    const value = "taro.tanaka@example.com";

    /* Act */
    await user.type(textbox, value);

    /* Assert */
    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
  });

  test("パスワード入力欄", async () => {
    /* Arrange */
    render(<InputAccount />);
    // type="password" は role を持たないので getByRole では取得できない
    const passwordInput = screen.getByPlaceholderText("8文字以上で入力");
    const value = "abcde1234";

    /* Act */
    await user.type(passwordInput, value);

    /* Assert */
    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
  });
});
