"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import useNewsInfiniteQuery from "@/hooks/useNewsInfiniteQuery";

const NewsList = ({
  initialData,
  currentPage,
}: {
  initialData?: any;
  currentPage: number;
}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } =
    useNewsInfiniteQuery(initialData, currentPage);

  const router = useRouter();
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Router logic for dynamic page navigation
  useEffect(() => {
    if (data?.pages.length && data.pages.length !== currentPage) {
      router.push(`/news/page/${data.pages.length}`, { scroll: false });
    }
  }, [data?.pages.length, currentPage, router]);

  // Infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "100px" }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (isError)
    return (
      <div className="text-red-500 text-center mt-4">Error fetching news</div>
    );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl text-yellow-500 font-bold text-center mb-6">
        Latest News
      </h1>

      <div className="space-y-6">
        {data?.pages.map((page, i) => (
          <div key={i} className="space-y-4">
            {page.news.map((item: any) => (
              <div
                key={item.id}
                className="border border-yellow-500 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold text-yellow-500">
                  {item.title}
                </h2>
                <p className="text-gray-300 mt-2">{item.content}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div ref={observerRef} className="h-10" />

      <noscript>
        <a
          href={`/news/page/${data?.pages.length + 1}`}
          className="block text-center mt-4 text-blue-500 underline"
        >
          Next Page
        </a>
      </noscript>
    </div>
  );
};

export default NewsList;
