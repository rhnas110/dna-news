import { createContext, useState } from "react";

export const SearchNewsContext = createContext();

export const SearchNewsProvider = ({ children }) => {
  const [query, setQuery] = useState("");

  function handleQuery(data) {
    setQuery(data);
  }
  return (
    <SearchNewsContext.Provider value={{ query, handleQuery }}>
      {children}
    </SearchNewsContext.Provider>
  );
};
