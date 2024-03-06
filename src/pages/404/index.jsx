import notfound from "@/assets/404.png";
import { Button } from "@/components/ui/button";

export const NotFound = () => {
  return (
    <main className="flex flex-col items-center justify-center w-full px-2 h-dvh">
      <div className="flex justify-center md:w-1/2">
        <img
          src={notfound}
          alt="notfound"
          loading="lazy"
          className="object-cover object-center w-8/12 md:w-1/2"
        />
      </div>
      <a href="/" className="my-4">
        <Button className="bg-rose-600 hover:bg-rose-700">Home</Button>
      </a>
    </main>
  );
};
