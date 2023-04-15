// ArticleCard.tsx
import Link from "next/link";
import Image from "next/image";

interface Props {
  title: string;
  author: string;
  publishedAt: string;
  mainImage: string;
  authorImage: string;
  slug: string;
}

const ArticleCard = ({
  title,
  author,
  publishedAt,
  mainImage,
  authorImage,
  slug,
}: Props) => {
  return (
    <div className={`w-full md:w-1/2 lg:w-1/3 p-4`}>
      <Link href={`/articles/${slug}`} className="cursor-pointer">
        <div
          className={`hover:scale-105 hover:shadow-2xl transition-all shadow-lg rounded-lg overflow-hidden border hover:border-2 card-original`}
        >
          <div className="overflow-hidden w-full aspect-video">
            <Image src={mainImage} alt={title} width={670} height={250} />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold h-14 overflow-hidden overflow-ellipsis">
              {title}
            </h3>

            <div className="flex items-center mt-2">
              <Image
                src={authorImage}
                alt={author}
                width={32}
                height={32}
                className=" rounded-full aspect-square object-cover mr-2"
              />
              <p className={`text-sm text-light-original overflow-hidden overflow-ellipsis whitespace-nowrap`}>By: {author}</p>
            </div>
            <p className={`text-xs mt-1 text-lighter-original`}>
              published At : {publishedAt}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
