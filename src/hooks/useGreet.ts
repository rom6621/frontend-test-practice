import { getMyProfile } from "@/features/profile";

export const useGreet = () => {
  // ユーザーに対して挨拶を取得
  const getGreet = async () => {
    const data = await getMyProfile();

    if (!data.name) {
      return "Hello, anonymous user!";
    }

    return `Hello, ${data.name}`;
  };

  // 時間によって変化する挨拶を取得
  const greetByTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "おはよう";
    }
    if (hour < 18) {
      return "こんにちは";
    }
    return "こんばんは";
  };

  return { getGreet, greetByTime };
};
