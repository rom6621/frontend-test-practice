import type { Articles } from "../types";

import { fetcher } from "@/lib";

// ログインユーザーの記事を取得
export const getMyArticles = async (): Promise<Articles> => {
  return await fetcher<Articles>("articles");
};
