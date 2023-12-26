export interface Article {
  id: string;
  createdAt: string;
  tags: string[];
  title: string;
  body: string;
}

export interface Articles {
  articles: Article[];
}

export interface ArticleInput {
  tags: string[];
  title: string;
  body: string;
}
