import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AccountForm } from "./AccountForm";

describe("AccountForm コンポーネントのテスト", () => {
  const user = userEvent.setup();

  test("formのアクセシブルネームは、見出しを引用している", () => {
    /* Arrange */
    render(<AccountForm />);

    /* Assert */
    expect(
      screen.getByRole("form", {
        name: "新規アカウント登録",
      }),
    ).toBeInTheDocument();
  });

  test("初期状態では「サインアップ」ボタンは非活性", () => {
    /* Arrange */
    render(<AccountForm />);

    /* Assert */
    expect(
      screen.getByRole("button", {
        name: "サインアップ",
      }),
    ).toBeDisabled();
  });

  test("「利用規約の同意」チェックボックスを押下すると「サインアップ」ボタンが活性化", async () => {
    /* Arrange */
    render(<AccountForm />);

    /* Act */
    await user.click(screen.getByRole("checkbox"));

    /* Assert */
    expect(
      screen.getByRole("button", {
        name: "サインアップ",
      }),
    ).toBeEnabled();
  });
});
