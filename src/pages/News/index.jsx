import { Main } from "@/components/layouts";
import { Navbar } from "@/components/layouts/navbar";
import { News as NewsLayout } from "@/components/layouts/news";

export const News = () => {
  return (
    <>
      <Navbar />
      <Main>
        {/* CONTENT NEWS */}
        <NewsLayout />
      </Main>
    </>
  );
};
