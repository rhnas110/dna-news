import notfound from "@/assets/404.png";
import { Button } from "@/components/ui/button";

export const NotFound = () => {
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center px-2">
      <div className="flex justify-center md:w-1/2">
        <img
          src={notfound}
          alt="notfound"
          loading="lazy"
          className="object-center object-cover w-8/12 md:w-1/2"
        />
      </div>
      <a href="/" className="my-4">
        <Button className="bg-rose-600 hover:bg-rose-700">Home</Button>
      </a>
    </div>
  );
};
