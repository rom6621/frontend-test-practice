import { ArticleList } from "@/components/ArticleList";
import { items } from "@/components/ArticleList/fixture";
import { render, screen, within } from "@testing-library/react";

describe("ArticleList コンポーネントのテスト", () => {
  test("一覧が表示される", () => {
    /* Arrange */
    render(<ArticleList items={items} />);
    const list = screen.getByRole("list");

    /* Assert */
    expect(list).toBeInTheDocument();
  });

  test("itemsの数だけ一覧表示される", () => {
    /* Arrange */
    render(<ArticleList items={items} />);
    const list = screen.getByRole("list");

    /* Assert */
    expect(within(list).getAllByRole("listitem")).toHaveLength(3);
  });

  test("一覧アイテムが空の時, 「投稿記事がありません」が表示される", () => {
    /* Arrange */
    render(<ArticleList items={[]} />);
    // queryByRole にすることで取得できなくてもエラーが発生しない
    const list = screen.queryByRole("list");

    /* Assert */
    expect(list).not.toBeInTheDocument();
    expect(list).toBeNull();
    expect(screen.getByText("投稿記事がありません")).toBeInTheDocument();
  });
});
