import { Main } from "@/components/layouts";
import { Navbar } from "@/components/layouts/navbar";
import { NewsHeadline } from "@/components/layouts/news/news-headline";

export const Home = () => {
  return (
    <>
      <Navbar />
      <Main>
        <NewsHeadline />
      </Main>
    </>
  );
};
