import { Agreement } from "@/components/Agreement/Agreement";
import { render, screen } from "@testing-library/react";

describe("Agreement コンポーネントのテスト", () => {
  test("初期状態でチェックボックスにチェックが入っていない", () => {
    /* Arrange */
    render(<Agreement />);

    /* Assert */
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });
});
