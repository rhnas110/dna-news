import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { Loading } from "@/components/layouts/news/loading";
import { TopHeadlinesCard } from "@/components/layouts/news/card";
import { Button, ButtonToTop } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import useLocalStorage from "@/hooks/useLocalStorage";
import { topHeadlinesURL } from "@/vendor/api/newsapi";

export const NewsHeadline = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [newsClicked, setNewsClicked] = useLocalStorage("news", []);

  const url_api = topHeadlinesURL("us");

  const fetchNews = useCallback(async () => {
    try {
      const response = await (await axios.get(url_api)).data;

      if (response?.status === "ok") {
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
          if (newsClicked?.includes(article.title)) {
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
      if (response?.status === "ok") {
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
          if (newsClicked?.includes(article.title)) {
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
                    setNewsClicked(data);
                  }}
                >
                  <TopHeadlinesCard news={news} />
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
            <ButtonToTop />
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
