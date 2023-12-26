import { getMyArticles, postMyArticle } from "@/features/articles";

export const useArticle = () => {
  // カテゴリーからログインユーザーが投稿した記事のリンクを取得する
  const getMyArticleLinksByCategory = async (category: string) => {
    const data = await getMyArticles();
    const articles = data.articles.filter((article) =>
      article.tags.includes(category),
    );

    if (!articles.length) {
      return null;
    }

    return articles.map((article) => ({
      title: article.title,
      link: `/articles/${article.id}`,
    }));
  };

  return { getMyArticleLinksByCategory, postMyArticle };
};
