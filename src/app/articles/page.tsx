import { sanityClient } from "@/libs/client";
import ArticleCards from "@/components/ArticleCards";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// クエリで記事を検索するためのサニティGROQクエリ
const searchQuery = `
  *[_type == "post" && (title match $searchQuery || body match $searchQuery || _createdAt match $searchQuery)] {
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
  }
`;

export default async function SearchBar(context) {
  const searchParams = context.searchParams.search || "";

  const result = await sanityClient.fetch(searchQuery, {
    searchQuery: searchParams,
  });
  return (
    <>
      <main className="max-w-6xl w-full mx-auto p-5 flex flex-col items-center">
        <div className="flex items-center space-x-5">
          <h2 className="text-3xl font-bold">Search</h2>
          <FontAwesomeIcon style={{ width: "28px", height: "28px" }} className=" text-blue-600" icon={faSearch} />
        </div>
        <ArticleCards posts={result} />
      </main>
    </>
  );
}
