import { render, screen } from "@testing-library/react";
import { ArticleListItem, ItemProps } from "./ArticleListItem";

const item: ItemProps = {
  id: "howto-testing-with-typescript",
  title: "TypeScript を使ったテストの書き方",
  body: "テストを書く時、TypeScript を使うことで、テストの保守性が向上します…",
};

describe("ArticleListItem コンポーネントのテスト", () => {
  test("IDに紐づいたリンクが表示される", () => {
    /* Arrange */
    render(<ArticleListItem {...item} />);

    /* Assert */
    expect(screen.getByRole("link", { name: "もっと見る" })).toHaveAttribute(
      "href",
      "/articles/howto-testing-with-typescript",
    );
  });
});
