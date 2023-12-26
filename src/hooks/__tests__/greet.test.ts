import * as Fetcher from "@/features/profile";
import { useGreet } from "@/hooks/useGreet";

jest.mock("@/features/profile");

describe("greet 関数のテスト", () => {
  test("ユーザー名を設定していない際, anonymous user となること", async () => {
    /* Arrange */
    jest.spyOn(Fetcher, "getMyProfile").mockResolvedValueOnce({
      id: "0001",
      email: "test@example.com",
    });
    const { getGreet } = useGreet();

    /* Act */
    const greet = await getGreet();

    /* Assert */
    expect(greet).toBe("Hello, anonymous user!");
  });

  test("ユーザー名が設定されている場合", async () => {
    /* Arrange */
    jest.spyOn(Fetcher, "getMyProfile").mockResolvedValueOnce({
      id: "0001",
      email: "test@example.com",
      name: "テストユーザー",
    });
    const { getGreet } = useGreet();

    /* Act */
    const greet = await getGreet();

    /* Assert */
    expect(greet).toBe("Hello, テストユーザー");
  });

  test("フェッチに失敗した場合: try-catch を使用", async () => {
    /* Arrange */
    // 必ず1回 Assertion が実行されるようになる
    // これをしないと try 句のみの実行で失敗となってしまう
    expect.assertions(1);
    // Error オブジェクトを返すようにモック化
    jest
      .spyOn(Fetcher, "getMyProfile")
      .mockRejectedValueOnce(new Error("internal server error"));
    const { getGreet } = useGreet();

    try {
      /* Act */
      await getGreet();
    } catch (error) {
      /* Assert */
      expect(error).toMatchObject(new Error("internal server error"));
    }
  });

  test("フェッチに失敗した場合: try-catch を使用せずに", async () => {
    /* Arrange */
    jest
      .spyOn(Fetcher, "getMyProfile")
      .mockRejectedValueOnce(new Error("internal server error"));
    const { getGreet } = useGreet();

    /* Assert */
    expect(getGreet()).rejects.toMatchObject(
      new Error("internal server error"),
    );
  });
});

describe("greetByTime 関数のテスト", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  test("8時に「おはよう」と返されること", () => {
    /* Arrange */
    jest.setSystemTime(new Date(2024, 1, 1, 8, 0, 0));
    const { greetByTime } = useGreet();

    /* Act */
    const greet = greetByTime();

    /* Assert */
    expect(greet).toBe("おはよう");
  });

  test("14時に「こんにちは」と返されること", () => {
    /* Arrange */
    jest.setSystemTime(new Date(2024, 1, 1, 14, 0, 0));
    const { greetByTime } = useGreet();

    /* Act */
    const greet = greetByTime();

    /* Assert */
    expect(greet).toBe("こんにちは");
  });

  test("21時に「こんばんは」と返されること", () => {
    /* Arrange */
    jest.setSystemTime(new Date(2024, 1, 1, 21, 0, 0));
    const { greetByTime } = useGreet();

    /* Act */
    const greet = greetByTime();

    /* Assert */
    expect(greet).toBe("こんばんは");
  });
});
