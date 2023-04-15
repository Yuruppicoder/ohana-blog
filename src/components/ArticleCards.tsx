"use client";
import ArticleCard from "@/components/ArticleCard";

function daysSinceCreation(createdAt) {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();

  // 時間の差をミリ秒で計算
  const timeDifference = currentDate - createdDate;

  // 1日は 1000ミリ秒 × 60秒 × 60分 × 24時間
  const oneDayInMilliseconds = 1000 * 60 * 60 * 24;

  // 日数に変換し、小数点以下を切り捨て
  const daysSince = Math.floor(timeDifference / oneDayInMilliseconds);

  if (daysSince >= 6) {
    return `${createdDate.getFullYear()} 年 ${
      createdDate.getMonth() + 1
    } 月 ${createdDate.getDate()} 日`;
  }

  return `${daysSince} 日前`;
}

const ArticleCards = ({ posts }) => {
  return (
    <div className="mb-8 mt-8 w-full max-w-6xl px-5 flex-wrap flex mx-auto">
      {posts.map((post) => {
        const publishedDay = daysSinceCreation(post._createdAt);
        return (
          <ArticleCard
            key={post._id}
            mainImage={post.mainImageUrl}
            authorImage={post.author.image.asset.url}
            slug={post.slug.current}
            title={post.title}
            author={post.author.name}
            publishedAt={publishedDay}
          />
        );
      })}
    </div>
  );
};

export default ArticleCards;
