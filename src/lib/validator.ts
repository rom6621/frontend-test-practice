import { ValidationError } from "@/errors";

// 文字数をバリデーションする
export const checkLength = (value: string) => {
  if (value.length === 0) {
    throw new ValidationError("1文字以上入力してください");
  }
};

// 電話番号をバリデーションする
export const checkPhoneNumber = (value: unknown) => {
  if (typeof value !== "string") {
    throw new ValidationError("string型を使用してください");
  }
  if (!value.match(/^[0-9-]+$/)) {
    throw new ValidationError("形式に誤りがあります");
  }
};
