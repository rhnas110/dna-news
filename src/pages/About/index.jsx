import { Main } from "@/components/layouts";
import { Navbar } from "@/components/layouts/navbar";
import { About as AboutLayout } from "@/components/layouts/about";

export const About = () => {
  return (
    <>
      <Navbar />
      <Main>
        {/* CONTENT ABOUT */}
        <AboutLayout />
      </Main>
    </>
  );
};
