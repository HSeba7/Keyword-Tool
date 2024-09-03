import React, { useState,useEffect } from "react";
import BlueButtonsRow from "./BlueButtonsRow";
import KeywordsTable from "./KeywordsTable";
import { saveAs } from "file-saver";
import { Box } from "@mui/system";
import * as XLSX from "xlsx";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setData, savePositiveKeywordsData, saveNegativeKeyWordsData, setKeywordValumePayload } from '../../../actions/actions.js';
import { useSelector } from 'react-redux';
import { useKeywordContext } from "./KeywordContext";

const KeywordsManager = ({allowedToSend}) => {
	const { keyword, setKeyword, category } = useKeywordContext();
  const initialPositiveKeywords = useSelector((state) => state.positiveKeyWordsReducer);
  const initialNegativeKeywords = useSelector((state) => state.negativeKeyWordsReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [positiveKeywords, setPositiveKeywords] = useState(
    initialPositiveKeywords
  );
  const [negativeKeywords, setNegativeKeywords] = useState(
    initialNegativeKeywords
  );
  const [actionStack, setActionStack] = useState([]);
  useEffect(() => {
    setPositiveKeywords(initialPositiveKeywords)
  }, [initialPositiveKeywords]);

  useEffect(() => {
    setNegativeKeywords(initialNegativeKeywords)
  }, [initialNegativeKeywords]);

  const recordAction = () => {
    setActionStack((prevStack) => [
      ...prevStack,
      {
        positiveKeywords: [...positiveKeywords],
        negativeKeywords: [...negativeKeywords],
      },
    ]);
  };

  const handleClick = () => {
    // const data = 'Some data';
    // dispatch(setData(data));
    
    allowedToSend && navigate('/pageTwo')
  };
  
  const bulkMoveKeyword = () => {
    recordAction();
    if (category.toLowerCase().includes("positive")) {
      const keywordsToMove = positiveKeywords.filter((item) =>
        item.label.toLowerCase().split(/\W+/).includes(keyword.toLowerCase())
      );
      setPositiveKeywords(
        positiveKeywords.filter(
          (item) =>
            !item.label
              .toLowerCase()
              .split(/\W+/)
              .includes(keyword.toLowerCase())
        )
      );
      setNegativeKeywords([...negativeKeywords, ...keywordsToMove]);
    } else {
      const keywordsToMove = negativeKeywords.filter((item) =>
        item.label.toLowerCase().split(/\W+/).includes(keyword.toLowerCase())
      );
      setNegativeKeywords(
        negativeKeywords.filter(
          (item) =>
            !item.label
              .toLowerCase()
              .split(/\W+/)
              .includes(keyword.toLowerCase())
        )
      );
      setPositiveKeywords([...positiveKeywords, ...keywordsToMove]);
    }
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

  // Adjust your export functions and handlers accordingly...
  // Function to export data as CSV
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

 
  useEffect(() => {
    if (keyword.length > 0) {
      bulkMoveKeyword();
      setKeyword("");
    }
  }, [keyword]);

  useEffect(() => {
    dispatch(savePositiveKeywordsData(positiveKeywords))
    const keywordsArr= []
    positiveKeywords.forEach(keyword => {
      keywordsArr.push(keyword.label)
    })
    dispatch(setKeywordValumePayload([...keywordsArr]))
  }, [positiveKeywords])

  useEffect(() => {
    dispatch(saveNegativeKeyWordsData(negativeKeywords))
  }, [negativeKeywords])

  return (
    <div>
      <BlueButtonsRow
        allowedToSend={allowedToSend}
        undoClick={undoLastAction}
        exportPositiveonClick={exportPositiveClick}
        exportNegativeonClick={exportNegativeClick}
        exportBoth={exportBothColumnsClick}
        sendSearchClick={handleClick}
	      showUndoIcon={actionStack.length > 0}
      />
      <Box display={"flex"} gap={2}>
        <KeywordsTable
          keywords={positiveKeywords}
          onCheckboxChange={(name) =>
            moveKeyword(setPositiveKeywords, setNegativeKeywords, name)
          }
          setKeywords={setPositiveKeywords}
          title="Positive Keywords"
        />
        <KeywordsTable
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

export default KeywordsManager;
