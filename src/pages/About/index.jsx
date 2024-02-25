import { Navbar } from "@/components/layouts/navbar";
import { About as AboutLayout } from "@/components/layouts/about";

export const About = () => {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto p-2">
        {/* CONTENT ABOUT */}
        <AboutLayout />
      </main>
    </>
  );
};
