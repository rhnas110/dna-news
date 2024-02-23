import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { GoMoveToTop } from "react-icons/go";

import { SearchNewsContext } from "@/context/SearchNewsContext";

import { Loading } from "@/components/layouts/news/loading";
import { Card } from "@/components/layouts/news/card";
import { Button } from "@/components/ui/button";

import { cn, scrollTo } from "@/lib/utils";
import useLocalStorage from "@/hooks/useLocalStorage";

export const News = () => {
  const { query } = useContext(SearchNewsContext);
  const [news, setNews] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [newsClicked, _] = useLocalStorage("news", []);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const url_api = query
    ? `https://newsapi.org/v2/everything?q=${query}&apiKey=${
        import.meta.env.VITE_NEWS_API_KEY
      }`
    : `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${
        import.meta.env.VITE_NEWS_API_KEY
      }`;

  const fetchNews = useCallback(async () => {
    try {
      const response = await (await axios.get(url_api)).data;

      if (response.status === "ok") {
        setTotalResults(response.totalResults);
        const result = response.articles.map((article, index) => {
          const data = {
            id: uuidv4(),
            title: article?.title,
            description: article?.description,
            name: article?.source?.name,
            author: article?.author,
            url: article?.url,
            image: article?.urlToImage,
            publishedAt: article?.publishedAt,
          };
          if (newsClicked.includes(article.title)) {
            data.clicked = true;
          }
          if (index === 0)
            return {
              ...data,
              className:
                "md:col-span-2 md:row-span-2 w-full h-[500px] rounded p-1 shadow-md bg-stone-700",
              withDesc: true,
              isFullTitle: true,
            };
          else if (index === 1)
            return {
              ...data,
              className:
                "md:col-start-3 w-full h-[300px] md:h-[250px] rounded p-1 shadow-md bg-stone-800",
            };
          else if (index === 2)
            return {
              ...data,
              className:
                "md:col-start-4 w-full h-[300px] md:h-[250px] rounded p-1 shadow-md bg-stone-800",
            };
          else if (index === 3)
            return {
              ...data,
              className:
                "md:col-start-3 md:row-start-2 w-full h-[300px] md:h-[250px] rounded p-1 shadow-md bg-stone-800",
            };
          else if (index === 4)
            return {
              ...data,
              className:
                "md:col-start-4 md:row-start-2 w-full h-[300px] md:h-[250px] rounded p-1 shadow-md bg-stone-800",
            };
          else if (index === 5 || index === 6)
            return {
              ...data,
              className:
                "md:row-start-3 w-full h-[300px] md:h-[250px] rounded p-1 shadow-md bg-stone-800",
            };
          else if (index === 7)
            return {
              ...data,
              className:
                "md:col-start-1 md:row-start-4 w-full h-[300px] md:h-[250px] rounded p-1 shadow-md bg-stone-800",
            };
          else if (index === 8)
            return {
              ...data,
              className:
                "md:col-span-2 md:row-span-2 md:col-start-3 md:row-start-3 w-full h-[500px] rounded p-1 shadow-md bg-stone-700",
              withDesc: true,
              isFullTitle: true,
            };
          else
            return {
              ...data,
              className:
                "w-full h-[300px] md:h-[250px] rounded p-1 shadow-md bg-stone-800",
            };
        });
        setNews(result);

        // back to default
        setPage(1);
        setHasMore(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, [url_api, newsClicked]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const fetchMoreNews = useCallback(async () => {
    try {
      const response = await (
        await axios.get(url_api + `&page=${page + 1}`)
      ).data;
      if (response.status === "ok") {
        const result = response.articles.map((article) => {
          const data = {
            id: uuidv4(),
            title: article?.title,
            description: article?.description,
            name: article?.source?.name,
            author: article?.author,
            url: article?.url,
            image: article?.urlToImage,
            publishedAt: article?.publishedAt,
          };
          if (newsClicked.includes(article.title)) {
            data.clicked = true;
          }

          return {
            ...data,
            className:
              "w-full h-[300px] md:h-[250px] rounded p-1 shadow-md bg-stone-800",
          };
        });
        setNews((prevNews) => [...prevNews, ...result]);
        setPage((prevPage) => prevPage + 1);
        if (response?.totalResults > news?.length + result?.length) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [newsClicked, url_api, page, news?.length]);
  return (
    <>
      {news?.length ? (
        <>
          {!!query && (
            <div className="my-8 text-gray-300">
              <p className="text-lg md:text-4xl">
                Search results for:{" "}
                <span className="font-bold text-gray-200">{query}</span>
              </p>

              <hr className="my-4 h-0.5 border-t-0 bg-transparent bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 opacity-25 rounded" />

              <p className="md:text-lg">
                Displaying{" "}
                <span className="font-bold text-gray-200">
                  {totalResults} results
                </span>{" "}
                that match your search.
              </p>
            </div>
          )}
          <div className="grid md:grid-cols-4 md:grid-rows-5 gap-4 place-items-center">
            {news?.map((news) => {
              return (
                <div
                  className={cn(
                    "w-[240px] h-[360px] inline-block relative p-2",
                    news.className
                  )}
                  key={news?.id}
                  onClick={() => {
                    const data = [news.title];

                    let retString = localStorage.getItem("news");
                    let retArray = JSON.parse(retString);
                    retArray.forEach((item) => {
                      if (!data.includes(item)) data.push(item);
                    });

                    localStorage.setItem("news", JSON.stringify(data));
                  }}
                >
                  <Card news={news} />
                </div>
              );
            })}
          </div>
          <div className="text-center p-2 my-8 relative">
            <Button
              className="bg-rose-600 hover:bg-rose-700"
              onClick={() => fetchMoreNews()}
              disabled={!hasMore}
            >
              More
            </Button>
            <Button
              className="w-12 h-12 absolute top-1 right-0 rounded-full bg-rose-600 hover:bg-rose-700 shadow-lg"
              onClick={() => scrollTo(0, 0)}
            >
              <GoMoveToTop size={25} />
            </Button>
          </div>
        </>
      ) : (
        <div className="grid md:grid-cols-4 md:grid-rows-5 gap-4 animate-pulse">
          <Loading />
        </div>
      )}
    </>
  );
};
