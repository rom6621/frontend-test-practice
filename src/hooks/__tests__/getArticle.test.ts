import * as Fetcher from "@/features/articles";
import { getMyArticleData } from "@/test/fixture";
import { HttpError } from "../../errors/HttpError";
import { useArticle } from "../useArticle";

jest.mock("@/features/articles");

const mockGetArticles = (status = 200) => {
  if (status > 299) {
    return jest.spyOn(Fetcher, "getMyArticles").mockRejectedValueOnce(
      new HttpError({
        status,
        statusText: "error",
        url: "",
      }),
    );
  }
  return jest
    .spyOn(Fetcher, "getMyArticles")
    .mockResolvedValueOnce(getMyArticleData);
};

describe("記事を取得するテスト", () => {
  test("指定したタグを持つ記事が一件もない場合, nullが返る", async () => {
    /* Arrange */
    mockGetArticles();
    const { getMyArticleLinksByCategory } = useArticle();

    /* Act */
    const data = await getMyArticleLinksByCategory("playwright");

    /* Assert */
    expect(data).toBeNull();
  });

  test("指定したタグを持つ記事が一件以上ある場合, リンク一覧が返る", async () => {
    /* Arrange */
    mockGetArticles();
    const { getMyArticleLinksByCategory } = useArticle();

    /* Act */
    const data = await getMyArticleLinksByCategory("testing");

    /* Assert */
    expect(data).toMatchObject([
      {
        title: "TypeScript を使ったテストの書き方",
        link: "/articles/howto-testing-with-typescript",
      },
      {
        title: "Jest ではじめる React のコンポーネントテスト",
        link: "/articles/react-component-testing-with-jest",
      },
    ]);
  });

  test("データ取得に失敗した場合, rejectされる", async () => {
    /* Arrange */
    mockGetArticles(500);
    const { getMyArticleLinksByCategory } = useArticle();
    const httpError = new HttpError({
      status: 500,
      statusText: "error",
      url: "",
    });

    /* Act */
    await getMyArticleLinksByCategory("testing").catch((error) => {
      /* Assert */
      expect(error).toMatchObject(httpError);
    });
  });
});
