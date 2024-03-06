import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useSearchParams, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { Card } from "@/components/layouts/news/card";

import useLocalStorage from "@/hooks/useLocalStorage";
import { generateDummyData, popularSearch, scrollTo } from "@/lib/utils";
import { allNewsURL } from "@/vendor/api/newsapi";
import { PAGINATION } from "@/config/pagination.config";

const dummyData = generateDummyData(8);

export const News = () => {
  const [news, setNews] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [newsClicked, setNewsClicked] = useLocalStorage("news", []);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const limit = searchParams.get("limit") || PAGINATION.DEFAULT.limit;
  const page = searchParams.get("page") || PAGINATION.DEFAULT.page;

  const url_api = allNewsURL(q, page, limit);
  const pageCount = Math.ceil(totalResults / limit);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    navigate(`/news?q=${q}&limit=${limit}&page=${selectedPage}`);
    scrollTo(0, 0);
  };

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
      }
    } catch (error) {
      console.log(error);
    }
  }, [url_api, newsClicked, q]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  if (!q) {
    const popular = popularSearch();
    return (
      <div className="text-center">
        <h2 className="opacity-80">Your query is invalid</h2>
        <div className="flex gap-1 justify-center">
          <p className="opacity-80">Try search </p>
          <span
            className="font-semibold underline cursor-pointer"
            onClick={() =>
              navigate(
                `/news?q=${popular}&limit=${PAGINATION.DEFAULT.limit}&page=${PAGINATION.DEFAULT.page}`
              )
            }
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
          <div className="text-center p-2 my-8">
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
              className="flex gap-x-1.5 justify-center items-center"
              pageLinkClassName="bg-rose-600 p-1 sm:p-2 rounded"
              previousClassName="bg-rose-600 p-1 rounded"
              nextClassName="bg-rose-600 p-1 rounded"
              activeClassName="scale-[1.2]"
              forcePage={Number(page - 1)}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-y-4 animate-pulse">
          <div className="my-8">
            <div className="h-8 bg-stone-400 rounded-full max-w-[50%]"></div>
            <hr className="my-4 h-0.5 border-t-0 bg-transparent bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 opacity-25 rounded" />
            <div className="h-4 bg-stone-400 rounded-full max-w-[75%] sm:max-w-[50%]"></div>
          </div>
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
