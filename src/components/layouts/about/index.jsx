import about from "@/assets/about/about.png";

export const About = () => {
  return (
    <div className="sm:flex items-center max-w-screen-xl">
      <div className="sm:w-1/2 p-4 flex justify-center">
        <img
          src={about}
          loading="lazy"
          className="object-center object-cover scale-x-[-1] w-8/12"
        />
      </div>
      <div className="sm:w-1/2 p-4">
        <span className="text-gray-500 border-b-2 border-rose-600 font-semibold text-lg">
          About us
        </span>
        <h2 className="my-4 font-bold text-3xl sm:text-4xl">
          About <span className="text-rose-600">DNA News</span>
        </h2>
        <p className="text-gray-300">
          DNA News is a comprehensive web application that offers up-to-date
          news from across the globe. Whether it&#39;s politics, business,
          technology, or entertainment, DNA News covers it all, ensuring that
          users are well-informed about the world around them.
        </p>
      </div>
    </div>
  );
};
