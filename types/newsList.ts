export interface NewsItem {
  id: string;
  title: string;
  content: string;
}

export interface NewsPage {
  news: NewsItem[];
}

export interface NewsListProps {
  initialData?: NewsPage[];
  currentPage: number;
}
