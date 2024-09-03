import React, { useEffect, useState,  } from "react";
import BlueButtonsRow from "../dashboard/components/BlueButtonsRow.jsx";
import KeywordsTable from "./KeywordsTable.jsx";
import { saveAs } from "file-saver";
import { Box } from "@mui/system";
import * as XLSX from "xlsx"; 
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {  setKeywordValumePayload } from '../../actions/actions.js'


const KeywordStrategyManager = ({allowedToSend, keywords, setFilter, filter} = {keywords: [], filter: '', }) => {  
  const [positiveKeywords, setPositiveKeywords] = useState(keywords);
  const [negativeKeywords, setNegativeKeywords] = useState([]);
  const [actionStack, setActionStack] = useState([]);
  const [hoveredKeyword, setHoveredKeyword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => { 
    setPositiveKeywords(keywords.filter(keyword => {
      return negativeKeywords.find(negativeKeyword => negativeKeyword.label === keyword.label) === undefined
    }))

    setNegativeKeywords(keywords.filter(keyword => {
      return negativeKeywords.find(negativeKeyword => negativeKeyword.label === keyword.label) !== undefined
    }))
  }, [keywords])

  const recordAction = () => {
    setActionStack((prevStack) => [
      ...prevStack,
      {
        positiveKeywords: [...positiveKeywords],
        negativeKeywords: [...negativeKeywords],
      },
    ]);
  };

  const moveKeyword = (sourceSetKeywords, targetSetKeywords, name) => {
    recordAction(); // Record state before making changes

    // Find keyword in either list
    const keywordToMove = positiveKeywords
      .concat(negativeKeywords)
      .find((kw) => kw.label === name);
    if (!keywordToMove) return;

    // Update both lists
    setPositiveKeywords((prev) => prev.filter((kw) => kw.label !== name));
    setNegativeKeywords((prev) => prev.filter((kw) => kw.label !== name));

    // Add the keyword to the target list
    if (sourceSetKeywords === setPositiveKeywords) {
      setNegativeKeywords((prev) => [
        ...prev,
        { ...keywordToMove, isChecked: false },
      ]);
    } else {
      setPositiveKeywords((prev) => [
        ...prev,
        { ...keywordToMove, isChecked: false },
      ]);
    }
  };

  const undoLastAction = () => {
    if (actionStack.length === 0) return;

    const lastAction = actionStack[actionStack.length - 1];
    setPositiveKeywords(lastAction.positiveKeywords);
    setNegativeKeywords(lastAction.negativeKeywords);

    // Remove the last action from the stack
    setActionStack((prevStack) => prevStack.slice(0, -1));
  };

 

  const exportPositiveClick = () => { 
    const worksheet = XLSX.utils.json_to_sheet([]); 
    // Extract only the labels of positive keywords
    const positiveLabels = positiveKeywords.map((keyword) => ({
      // id: ++i, // Increment i and assign as ID
      label: keyword.label,
    }));
    // Export labels as CSV
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [["Positive Keywords"]],
      { origin: "A1" }
    );

    const headerStyle = {
      font: { bold: true, sz: 14 },
    };
    worksheet["A1"].s = headerStyle; 

    // Add data starting from the second row
    positiveLabels.forEach((keyword, index) => {
      XLSX.utils.sheet_add_aoa(worksheet, [[keyword.label]], {
        origin: `A${index + 2}`,
      });
    });

    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Keywords");
    
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Create a Blob and download
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(blob, "positive_keywords.xlsx");
  };
  
  const exportNegativeClick = () => {
    const worksheet = XLSX.utils.json_to_sheet([]); 

    const negativeLabels = negativeKeywords.map((keyword) => ({
      // id: ++i, // Increment i and assign as ID
      label: keyword.label,
    }));
 
    // Export labels as xlx
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [["Negative Keywords"]],
      { origin: "A1" }
    );

    const headerStyle = {
      font: { bold: true, sz: 14 },
    };
    worksheet["A1"].s = headerStyle; 

    // Add data starting from the second row
    negativeLabels.forEach((keyword, index) => {
      XLSX.utils.sheet_add_aoa(worksheet, [[keyword.label]], {
        origin: `A${index + 2}`,
      });
    });

    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Keywords");
    
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Create a Blob and download
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(blob, "negative_keywords.xlsx");
  };

  const exportBothColumnsClick = () => { 
    const worksheet = XLSX.utils.json_to_sheet([]);

    // Set headers
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [["Positive Keywords", "Negative Keywords"]],
      { origin: "A1" }
    );
    

    // Style headers - bold and larger font
    const headerStyle = {
      font: { bold: true, sz: 14 },
    };
    worksheet["A1"].s = headerStyle;
    worksheet["B1"].s = headerStyle;

    // Add data starting from the second row
    positiveKeywords.forEach((keyword, index) => {
      XLSX.utils.sheet_add_aoa(worksheet, [[keyword.label]], {
        origin: `A${index + 2}`,
      });
    });

    negativeKeywords.forEach((keyword, index) => {
      XLSX.utils.sheet_add_aoa(worksheet, [[keyword.label]], {
        origin: `B${index + 2}`,
      });
    });

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Keywords");

    // Generate a buffer
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Create a Blob and download
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(blob, "keywords.xlsx");
  }; 

  const handleClick = () => {
    // const data = 'Some data';
    // dispatch(setData(data));
    if(allowedToSend){
      dispatch(setKeywordValumePayload(keywords.map(keyword => {if(keyword.label.length) return keyword.label})))
      navigate('/pageTwo')
    }
  };

  return (
    <div>
      <BlueButtonsRow
        undoClick={undoLastAction}
        exportPositiveonClick={exportPositiveClick}
        exportNegativeonClick={exportNegativeClick}
        exportBoth={exportBothColumnsClick} 
        sendSearchClick={handleClick}
	      showUndoIcon={actionStack.length > 0}
        allowedToSend={allowedToSend}
      />
      <Box display={"flex"} gap={2} sx={{pb: 5}}>
        <KeywordsTable
          filter={filter}
          setFilter={setFilter}
          hoveredKeyword={hoveredKeyword}
          setHoveredKeyword={setHoveredKeyword}
          keywords={positiveKeywords}
          onCheckboxChange={(name) =>
            moveKeyword(setPositiveKeywords, setNegativeKeywords, name)
          }
          setKeywords={setPositiveKeywords}
          title="Positive Keywords"
        />
        <KeywordsTable
          filter={filter}
          setFilter={setFilter}
          hoveredKeyword={hoveredKeyword}
          setHoveredKeyword={setHoveredKeyword}
          keywords={negativeKeywords}
          setKeywords={setNegativeKeywords}
          onCheckboxChange={(name) =>
            moveKeyword(setNegativeKeywords, setPositiveKeywords, name)
          }
          title="Negative Keywords"
        />
      </Box>
    </div>
  );
};

export default KeywordStrategyManager;
