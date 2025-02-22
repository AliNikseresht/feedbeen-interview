import NewsList from "@/components/ui/NewsList";

const fetchNews = async (page: string) => {
  const res = await fetch(`http://localhost:3000/api/news?page=${page}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
};

export default async function NewsPage({
  params,
}: {
  params: { page: string };
}) {
  const data = await fetchNews(params.page);
  const currentPage = parseInt(params.page, 10);

  return <NewsList initialData={data} currentPage={currentPage} />;
}
