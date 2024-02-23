import { beautifyDate, minimizeString } from "@/lib/utils";

export const Card = ({ news }) => {
  return (
    <a href={news?.url} target="_blank">
      <div className="w-full h-full rounded p-1 shadow-md">
        <div className="w-full h-[60%] rounded overflow-hidden relative">
          <img
            className="w-full h-full aspect-square bg-primary hover:scale-110 transition-transform duration-500"
            src={news?.image}
            alt={news?.title}
            loading="lazy"
          />
          {news?.clicked && (
            <span className="absolute top-1 right-1 p-1 rounded bg-rose-600/60 font-semibold">
              Sudah Dibaca
            </span>
          )}
        </div>
        <div className="w-full h-[40%] p-0.5 flex flex-col justify-between">
          <div>
            <p className="opacity-80">{news?.name}</p>
            <p className="font-bold text-xl text-rose-600">
              {news?.isFullTitle
                ? news?.title
                : minimizeString(news?.title, 25)}
            </p>
            {news?.withDesc && <p>{minimizeString(news?.description, 500)}</p>}
          </div>
          <div className="flex gap-x-2 text-sm">
            <p className="font-bold">{minimizeString(news?.author, 15)}</p>
            <p className="opacity-80">{beautifyDate(news?.publishedAt)}</p>
          </div>
        </div>
      </div>
    </a>
  );
};
