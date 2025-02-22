import { useInfiniteQuery } from "@tanstack/react-query";

const fetchNews = async ({ pageParam = 1 }) => {
  const res = await fetch(`/api/news?page=${pageParam}`);
  return res.json();
};

const useNewsInfiniteQuery = (initialData?: any, currentPage: number = 1) => {
  return useInfiniteQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
    initialPageParam: currentPage,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    initialData: initialData
      ? { pages: [initialData], pageParams: [currentPage] }
      : undefined,
  });
};

export default useNewsInfiniteQuery;
