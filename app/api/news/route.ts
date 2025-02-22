export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const pageSize = 20;
  const totalPages = 10;

  const news = Array.from({ length: pageSize }, (_, i) => ({
    id: (page - 1) * pageSize + i + 1,
    title: `News item #${(page - 1) * pageSize + i + 1}`,
    content: `Content of news item #${(page - 1) * pageSize + i + 1}`,
  }));

  return new Response(
    JSON.stringify({
      news,
      nextPage: page < totalPages ? page + 1 : null,
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
