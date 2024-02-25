import { Navbar } from "@/components/layouts/navbar";
import { NewsHeadline } from "@/components/layouts/news/news-headline";

export const Home = () => {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto p-2">
        <NewsHeadline />
      </main>
    </>
  );
};
