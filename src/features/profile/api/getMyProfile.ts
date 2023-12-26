import type { Profile } from "../types";

import { fetcher } from "@/lib";

// ログインユーザーのプロフィールを取得する関数
export const getMyProfile = async (): Promise<Profile> => {
  return await fetcher<Profile>("me");
};
