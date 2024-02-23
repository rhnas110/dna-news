import { Navbar } from "@/components/layouts/navbar";
import { News as NewsLayout } from "@/components/layouts/news";

export const News = () => {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto p-2">
        {/* CONTENT NEWS */}
        <NewsLayout />
      </main>
    </>
  );
};
