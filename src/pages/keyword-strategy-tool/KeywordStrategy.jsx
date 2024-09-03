import React, { useEffect, useState } from "react";
import { 
  TextField, 
  Box, 
  Typography, 
  Paper
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
 
import BlueButton from "../dashboard/components/BlueButton";
import DropDownButtonFilter from "../dashboard/components/DropDownButtonFilter";
import { Cancel  } from "@mui/icons-material";
import KeywordStrategyManager from "./KeywordStrategyManager";
import DashboardTextCard from "../dashboard/components/DashboardTextCard";
import { useSelector } from "react-redux";
import { WORDS_LIMIT } from "../../helper_functions/consts";


const SHADOW = '0px 10px 40px 2px rgba(0,0,0,0.05)';

const KeywordStrategy = () => { 
  const keywordValumeData = useSelector((state) => state?.valumeReducerData?.keywordValumeData);
  const [keyword, setKeyword] = useState("");
  const [keywordCollection, setKeywordCollection] = useState([]); 
  const [allowedToSend, setAllowedToSend] = useState(true);
  const [tempFilter, setTempFilter] = useState("");
  const [filter, setFilter] = useState("");
 
useEffect(() => {
    const arr = keyword.split(/\n/g); 

    const collection = arr.map((key) => { 
        return  {label: key, visible: !!key.match(filter), isChecked: false};
    }).filter(x => x.label.length > 0)

    setAllowedToSend(collection.length + keywordValumeData.length  <= WORDS_LIMIT)
 
    setKeywordCollection(collection)
}, [keyword, filter])


  const handleKeywordChange = (event) => { 
    setKeyword(event.target.value);
  };


  const removeKeyword = (word) => { 
    const exp  = new RegExp(`^${word}$(\n)?`, 'gm')
    const newStr = keyword.replace(exp, ''); 
    setKeyword(newStr);
  }

  
  return ( 
    <>
        <Box sx={{ alignItems: "center", gap: 2 }}> 
            <DashboardTextCard></DashboardTextCard>
        </Box>

        <Box sx={{ alignItems: "center", gap: 2, pt: 5 }}> 
            <Paper 
            sx={{
                p: 4,
                borderRadius: '23px',
                boxShadow: SHADOW
            }}
            >
            <Typography  variant="h5" fontWeight={"bold"} sx={{pb: 1}} align="left">
                ADVANCED KEYWORD FILTERING
            </Typography>
            <TextField  
                error={keywordValumeData.length + keywordCollection.length >= WORDS_LIMIT} 
                helperText={  (keywordValumeData.length + keywordCollection.length   >= WORDS_LIMIT ? `The limit of ${WORDS_LIMIT} keywords has been reached` : '')}
                sx={{border: 'unset',
                    "textarea": {
                        minHeight: '1em', 
                        p: 1, 
                    }
                }}
                maxRows={8}
                fullWidth 
                multiline
                id="standard-basic" 
                placeholder="Keyword" 
                variant="standard" 
                value={keyword}
                onChange={handleKeywordChange}
            /> 
            
            <Box 
                sx={{mb: 2, mt: 2, justifyContent:'flex-start', display: 'flex', flexWrap: 'wrap', maxHeight: 200, overflowY: 'auto'}} 
            >
            {keywordCollection?.map((key, index) => { 
                if(key.label.length){
                    return  <BlueButton sx={{textTransform: 'none', py: 1, pl: 2, pr:4, mb: 2}} key={key + index} onClick={() => removeKeyword(key.label)} text={
                    <>
                    {key.label}
                    <Cancel sx={{marginLeft: 'auto', display: 'inline-block', position: 'absolute', right: 10, width: 15, }} />
                    </>}/>
                }
            })}
            </Box>
            </Paper>
        </Box> 

        <Box sx={{display: 'flex', justifyContent: 'center', pt: 5}}>
            <Paper fullwidth sx={{  p: 4,  borderRadius: '23px', width: '100%', boxShadow: SHADOW}}>
                <Box display={"flex"} justifyContent="center" gap={3} paddingX={2} sx={{backgroundColor:blueGrey[50],paddingY:2,marginX:17,marginY:1,borderRadius:'.5rem'}}>
                <TextField 
                    fullWidth
                    variant="outlined" 
                    type="search"
                    placeholder="Filter your keyword here by typing or choosing one of the generated filter on the right"
                    sx={{
                        "& .MuiOutlinedInput-root": {
                        "& input": {
                            borderColor: "white",
                            height: "100%"
                        },
                        },
                    }}
                    onChange={(e) => {
                        setTempFilter(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setFilter(tempFilter);
                            setTempFilter("");
                        }
                    }}
                    InputProps={{
                        style: {
                        borderRadius: "30px",
                        backgroundColor: "white",
                        borderColor: "white",
                        height: "100%",
                        borderWidth: 0
                        }, 
                    }}
                />

                    <DropDownButtonFilter keywords={keywordCollection} filter={setFilter}></DropDownButtonFilter>
                </Box> 
            </Paper>
        </Box>

        <Box sx={{ alignItems: "center", gap: 2}}> 
            <KeywordStrategyManager allowedToSend={allowedToSend} filter={filter} setFilter={setFilter} keywords={keywordCollection}  /> 
        </Box> 
    </>
  );
};

export default KeywordStrategy;
