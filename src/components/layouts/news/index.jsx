import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useSearchParams } from "react-router-dom";

import { Card } from "@/components/layouts/news/card";
import { Button, ButtonToTop } from "@/components/ui/button";

import useLocalStorage from "@/hooks/useLocalStorage";
import { generateDummyData, popularSearch } from "@/lib/utils";

const dummyData = generateDummyData(8);

export const News = () => {
  const [news, setNews] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [newsClicked, setNewsClicked] = useLocalStorage("news", []);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");

  const url_api = `https://newsapi.org/v2/everything?q=${q}&apiKey=${
    import.meta.env.VITE_NEWS_API_KEY
  }`;

  const fetchNews = useCallback(async () => {
    try {
      if (!q) return false;
      const response = await (await axios.get(url_api)).data;

      if (response?.status === "ok") {
        setTotalResults(response.totalResults);
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
          };
        });
        setNews(result);

        // back to default
        setPage(1);
        if (response.totalResults > 100) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [url_api, newsClicked, q]);

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

  if (!q) {
    const popular = popularSearch();
    return (
      <div className="text-center">
        <h2 className="opacity-80">Your query is invalid</h2>
        <div className="flex gap-1 justify-center">
          <p className="opacity-80">Try search </p>
          <span
            className="font-semibold underline cursor-pointer"
            onClick={() => setSearchParams(`q=${popular}`)}
          >
            {popular}!
          </span>
        </div>
      </div>
    );
  }
  return (
    <>
      {news?.length ? (
        <>
          {!!q && (
            <div className="my-8 text-gray-300">
              <p className="text-lg md:text-4xl">
                Search results for:{" "}
                <span className="font-bold text-gray-200">{q}</span>
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
          <div className="flex flex-col gap-y-4">
            {news?.map((news) => {
              return (
                <div
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
            <ButtonToTop />
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-y-4 animate-pulse">
          {dummyData.map(({ id }) => {
            return (
              <div
                key={id}
                className="flex sm:flex-row flex-col justify-between gap-x-4 bg-stone-700 rounded sm:pl-2 p-2 sm:p-0 w-full h-60"
              >
                <div className="flex flex-1 gap-x-2 py-2">
                  <div className="w-[30%] md:block hidden">
                    <div className="h-4 w-1/2 bg-stone-300 rounded-full"></div>
                    <div className="mt-4 w-1/2">
                      <div className="h-6 bg-stone-400 rounded-full"></div>
                      <div className="h-2 bg-stone-300 rounded-full mt-2"></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="h-6 bg-stone-400 rounded-full"></div>
                    <div className="h-2 bg-stone-300 rounded-full mt-2 sm:hidden"></div>

                    <div className="sm:block hidden">
                      <div className="h-2 bg-stone-300 rounded-full mt-2"></div>
                      <div className="h-2 bg-stone-300 rounded-full mt-2"></div>
                      <div className="h-2 bg-stone-300 rounded-full mt-2"></div>
                    </div>
                  </div>
                </div>
                <div className="rounded overflow-hidden -order-1 sm:order-none flex justify-center flex-col">
                  <div className="rounded aspect-square w-full sm:w-60 bg-stone-400 mx-auto"></div>
                  <div className="h-2 w-1/3 bg-stone-300 rounded-full mt-2 opacity-80 sm:hidden"></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
