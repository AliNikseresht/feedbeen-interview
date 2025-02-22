import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Link
        className="border border-yellow-500 py-3 px-4 rounded-xl hover:text-yellow-500 duration-200"
        href="/news/page/1"
      >
        Click to see the news
      </Link>
    </div>
  );
}
