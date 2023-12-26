import type { Article, ArticleInput } from "../types";

import { fetcher } from "@/lib";

// 記事を作成
export const postMyArticle = async (input: ArticleInput) => {
  return await fetcher<Article>("articles", "POST", input);
};
