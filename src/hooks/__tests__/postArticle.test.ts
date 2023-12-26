import { HttpError } from "@/errors";
import * as Fetcher from "@/features/articles";
import type { ArticleInput } from "@/features/articles";
import { useArticle } from "@/hooks/useArticle";
import { checkLength } from "@/lib";
import { postMyArticleData } from "@/test/fixture";

jest.mock("@/features/articles");

const mockPostArticle = (input: ArticleInput, status = 200) => {
  if (status > 299) {
    return jest.spyOn(Fetcher, "postMyArticle").mockRejectedValueOnce(
      new HttpError({
        status,
        statusText: "error",
        url: "",
      }),
    );
  }

  try {
    checkLength(input.title);
    checkLength(input.body);
    return jest.spyOn(Fetcher, "postMyArticle").mockResolvedValueOnce({
      ...postMyArticleData,
      ...input,
    });
  } catch (error) {
    return jest.spyOn(Fetcher, "postMyArticle").mockRejectedValueOnce(
      new HttpError({
        status,
        statusText: "error",
        url: "",
      }),
    );
  }
};

const inputFactory = (input?: Partial<ArticleInput>): ArticleInput => {
  return {
    tags: ["testing"],
    title: "TypeScriptを使ったテストの書き方",
    body: "テストを書くとき、TypeScriptを使うことで、テストの保守性が向上します。",
    ...input,
  };
};

describe("記事を作成するテスト", () => {
  test("バリデーションに成功した場合, 成功レスポンスが返る", async () => {
    /* Arrange */
    const input = inputFactory();
    const mock = mockPostArticle(input);
    const { postMyArticle } = useArticle();

    /* Act */
    const data = await postMyArticle(input);

    /* Assert */
    // レスポンスに入力内容が含まれるかを検証
    expect(data).toMatchObject(expect.objectContaining(input));
    // モック関数が呼び出されたかを検証
    expect(mock).toHaveBeenCalled();
  });
});
