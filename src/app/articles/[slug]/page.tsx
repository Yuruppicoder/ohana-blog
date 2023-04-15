import { sanityClient } from "@/libs/client";
import Image from "next/image";
import BlockContent from "@sanity/block-content-to-react";

interface Post {
  _id: string;
  title: string;
  author: {
    name: string;
    image: {
      asset: {
        _id: string;
        url: string;
      };
    };
  };
  mainImageUrl: string;
  _createdAt: string;
  slug: {
    current: string;
  };
  body: any[]; // 必要に応じて適切な型に変更してください
}

async function getPostsData(slug: string): Promise<Post> {
  const query = `*[_type == "post" && slug.current == $slug][0]{
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
      slug,
      body
    }`;
  const res = await sanityClient.fetch(query, {
    slug: slug,
  });

  return res;
}

function daysSinceCreation(createdAt: string) {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();

  // 時間の差をミリ秒で計算
  const timeDifference = currentDate.getTime() - createdDate.getTime();
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


interface CustomParagraphProps {
  children: React.ReactNode;
}
interface CustomHeadingProps {
  node: {
    style: string;
  };
  children: React.ReactNode;
}
interface CustomQuoteProps {
  children: React.ReactNode;
}
interface CustomListItemProps {
  children: React.ReactNode;
}
interface CustomLinkProps {
  mark: {
    href: string;
  };
  children: React.ReactNode;
}
interface ArticlePageProps {
  params: {
    slug: string;
  };
}
const CustomParagraph: React.FC<CustomParagraphProps> = (props) => (
  <p className="text-base sm:text-lg mb-4">{props.children}</p>
);

const CustomHeading: React.FC<CustomHeadingProps> = (props) => {
  const Tag: any = props.node.style;
  return (
    <Tag className="py-1 sm:py-2 px-2 sm:px-5 border-b-4 sm:border-b-8 border-blue-500 w-fit mx-auto font-bold text-xl sm:text-2xl mb-4 mt-4 sm:mt-8">
      {props.children}
    </Tag>
  );
};

const CustomQuote: React.FC<CustomQuoteProps> = (props) => (
  <blockquote className="border-l-2 sm:border-l-4 border-gray-600 pl-2 sm:pl-4 italic mb-4">
    {props.children}
  </blockquote>
);

const CustomListItem: React.FC<CustomListItemProps> = (props) => (
  <li className="list-disc mb-1 sm:mb-2">{props.children}</li>
);

const CustomLink: React.FC<CustomLinkProps> = (props) => (
  <a
    href={props.mark.href}
    className="text-blue-600 underline hover:text-blue-800"
  >
    {props.children}
  </a>
);


const defaultRenderers = {
  block: (props: { node: any; children: React.ReactNode }) => {
    const style = props.node.style;

    if (style === "normal") {
      return <CustomParagraph>{props.children}</CustomParagraph>;
    }

    if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(style)) {
      return <CustomHeading {...props}>{props.children}</CustomHeading>;
    }

    if (style === "blockquote") {
      return <CustomQuote>{props.children}</CustomQuote>;
    }

    if (style === "li") {
      return <CustomListItem>{props.children}</CustomListItem>;
    }

    // 他のブロックタイプのレンダリングロジックをここに追加

    return <p>{props.children}</p>;
  },
};

const serializers = {
  types: {
    block: defaultRenderers.block,
  },
  marks: {},
};

const ArticlePage = async ({ params: { slug } }) => {
  const post = await getPostsData(slug);
  const publishedDay = daysSinceCreation(post._createdAt);
  return (
    <main className="max-w-5xl w-full mx-auto flex flex-col items-center">
      <article className="mt-8 w-full flex flex-col items-center p-3">
        {/* titleと投稿日の表示 */}
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold w-full p-3">{post.title}</h2>
          <p className="pl-10 w-fit">{publishedDay}</p>
        </div>
        {/* mainImageの表示 */}
        <div className="mt-8 shadow-xl rounded overflow-hidden">
          <Image
            src={post.mainImageUrl}
            width={600}
            height={425}
            quality={100}
            alt=""
          />
        </div>

        {/* 本文の表示 */}
        <div className="p-5 mt-5">
          <BlockContent
            className="flex flex-col"
            blocks={post.body}
            serializers={serializers}
          />
        </div>
      </article>
    </main>
  );
};

export default ArticlePage;
