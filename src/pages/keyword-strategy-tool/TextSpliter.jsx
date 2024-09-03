import React from "react";
import { Typography } from "@mui/material"; 

const TextSpliter = ({ text  ,hoveredKeyword, setHoveredKeyword, setKeyword }) => {
   
  const wordsArray = text.split(/\W+/);
  const handleClick = (word) => {
    setKeyword(word);
    setHoveredKeyword("");
  };
  const handleMouseOver = (word) => { 
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
            word === hoveredKeyword &&  {
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
