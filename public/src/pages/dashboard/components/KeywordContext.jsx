import React, { createContext, useContext, useState } from "react";

const KeywordContext = createContext();

export const KeywordContextProvider = ({ children }) => {
  const [keyword, setKeyword] = useState("");
  const [hoveredKeyword, setHoveredKeyword] = useState("");
  const [category, setCategory] = useState("positive");
  return (
    <KeywordContext.Provider
      value={{ keyword, setKeyword, hoveredKeyword, setHoveredKeyword, category, setCategory }}
    >
      {children}
    </KeywordContext.Provider>
  );
};

export const useKeywordContext = () => {
  return useContext(KeywordContext);
};
