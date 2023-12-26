import { fetcher } from "@/lib";
import type { Result } from "../types";

// 住所を作成
export const postMyAddress = async (input: unknown) => {
  return await fetcher<Result>("addresses", "POST", input);
};
