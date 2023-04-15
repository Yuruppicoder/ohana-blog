import ArticleCards from "@/components/ArticleCards";
import { sanityClient } from "@/libs/client";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Ohana 日記',
  description: 'Ohana日記は、毎日の経験や学びを綴った日記を通じて成長を記録するウェブサイトです。日々の生活で得た気づきや知識を共有し、自己向上を目指す場を提供します。',
}

async function fetchPostsByDate(date) {
  const query = `*[_type == "post" && _createdAt match $date]{
    _id,
    title,
    author->{
      name,
      image{
        asset->{
          _id,
          url
        }
      },
    },
    "mainImageUrl": mainImage.asset->url,
    _createdAt,
    slug
  }`;

  const posts = await sanityClient.fetch(query, { date });
  return posts;
}

function getTargetDate(pageParams) {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - pageParams);
  const y = currentDate.getFullYear();
  const m = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  return `${y}-${m}`;
}

async function getPostsData(pageParams) {
  const targetDate = getTargetDate(pageParams);
  const posts = await fetchPostsByDate(targetDate);
  return { posts, top: pageParams === 0 };
}

export default async function Home({ searchParams }) {
  const pageParams = parseInt(searchParams.page, 10) || 0;
  const { posts, top } = await getPostsData(pageParams);

  return (
    <main className="max-w-6xl w-full mx-auto flex flex-col items-center">
      {posts.length > 0 ? (
        <>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-5 p-3 rounded-full border-b-blue-500 border-b-8">
            {`${new Date(posts[0]._createdAt).getFullYear()}年${
              new Date(posts[0]._createdAt).getMonth() + 1
            }月の日記`}
          </h2>
          <ArticleCards posts={posts} />
          <div className="flex mb-8 p-3">
            <Link
              className="px-5 py-3 border mt-8 rounded"
              href={`?page=${pageParams + 1}`}
            >{` 次のページへ → `}</Link>
            {!top && (
              <Link
                className="px-5 py-3 border mt-8 rounded"
                href={`?page=${pageParams - 1}`}
              >{` ← 前のページへ`}</Link>
            )}
          </div>
        </>
      ) : (
        <>
          <h2 className="p-5 text-2xl sm:text-3xl md:text-4xl font-bold w-full text-center">
            日記はありません。
          </h2>
          <Link
            className="px-5 py-3 border mt-8 rounded"
            href={`?page=${pageParams - 1}`}
          >{` ←前のページへ`}</Link>
        </>
      )}
    </main>
  );
}
