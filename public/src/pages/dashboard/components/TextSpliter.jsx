import React from "react";
import { Typography } from "@mui/material";
import { useKeywordContext } from "./KeywordContext";

const TextSpliter = ({ text, title }) => {
  const {
    keyword,
    setKeyword,
    hoveredKeyword,
    setHoveredKeyword,
    category,
    setCategory,
  } = useKeywordContext();
  const wordsArray = text.split(/\W+/);
  const handleClick = (word) => {
    setKeyword(word);
  };
  const handleMouseOver = (word) => {
    setCategory(title);
    setHoveredKeyword(word);
  };
  const handleMouseOut = () => {
    setHoveredKeyword("");
  };
  return (
    <div>
      {wordsArray.map((word, index) => (
        <Typography
          key={index}
          variant="h6"
          color={"#9D9D9D"}
          onClick={() => handleClick(word)}
          onMouseOver={() => handleMouseOver(word)}
          onMouseOut={handleMouseOut}
          component="span"
          sx={[
            {
              marginRight: 1,
            },
            word === hoveredKeyword &&
              title.toLowerCase().includes(category.toLowerCase()) && {
                fontWeight: "500",
                cursor: "pointer",
                color: "#0000ff",
              },
          ]}
        >
          {word}
        </Typography>
      ))}
    </div>
  );
};

export default TextSpliter;
