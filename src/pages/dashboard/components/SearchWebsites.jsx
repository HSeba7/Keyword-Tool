import React, { useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  Box,
  Card,
  Typography,
  Checkbox,
} from "@mui/material";

import CheckedIcon from "../../../checkbox_icons/checked.png";
import UnCheckedIcon from "../../../checkbox_icons/unchecked.png";

import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationDropDown from "./LocationSelect";
import { blueGrey, grey } from "@mui/material/colors";
import ServiceButton from "./ServiceButton";
import checked from "../../../checkbox_icons/checked.png";
import { fetchKeywordSuggestions } from "../../../helper_functions/axios";
import { setKeywordsData, savePositiveKeywordsData } from "../../../actions/actions";

import { useDispatch } from 'react-redux';
import { setKeywordValumePayload } from "../../../actions/actions";

const SearchWebsites = () => {
  const [selectedService, setSelectedService] = useState("GOOGLE");
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");
  const [checkBox, setChecked] = useState(true);

  const dispatch = useDispatch();

  const setCheckBox = () => {
    setChecked(!checkBox);
  };

  const handleServiceChange = (data) => {
    setSelectedService(data);
  };

  const handleKeywordChange = (event) => {
    setKeywords(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event);
  };

  const search = () => {
    console.log("keyrods: ", keywords, "location", location);
    const post_array = [];
    post_array.push({
      keyword: keywords,
      language_name: "English",
      location_name: location || "United Kingdom",
      include_serp_info: false,
      limit: 1000,
      include_seed_keyword: false,
    });

    fetchKeywordSuggestions(
      "/v3/dataforseo_labs/keyword_suggestions/live",
      post_array
    )
      .then((response) => {
        console.log("resposnse",response)
        const allKeywords = [];
        const keywordsArr= []
        response.forEach((apiResponse) => {
          apiResponse.result.forEach((result) => {
            result.items.forEach((item) => {
              allKeywords.push( {label:item.keyword, isChecked: false});
              keywordsArr.push(item.keyword)
            });
          });
        });

        dispatch(setKeywordValumePayload([...keywordsArr], checkBox))
        dispatch(setKeywordsData(allKeywords, checkBox));
        dispatch(savePositiveKeywordsData(allKeywords, checkBox))
      })
      .catch((error) => {
        console.error(error); // Handle errors
      });
    // Perform the search logic based on the selectedService, keywords, and location
  };

  return (
    <Card sx={{ borderRadius: "1rem", boxShadow: 0, marginTop: 3 }}>
      <Box sx={{ alignItems: "center", gap: 2, paddingTop: 5, paddingX: 5 }}>
        {/* Service Buttons */}
        <Box
          display={"flex"}
          sx={{
            paddingX: 2,
          }}
        >
          <ServiceButton
            selectedService={selectedService}
            service="GOOGLE"
            onClick={() => handleServiceChange("GOOGLE")}
          />
          {/* <ServiceButton
            selectedService={selectedService}
            service="YOUTUBE"
            onClick={() => handleServiceChange("YOUTUBE")}
          />
          <ServiceButton
            selectedService={selectedService}
            service="AMAZON"
            onClick={() => handleServiceChange("AMAZON")}
          />

          <ServiceButton
            selectedService={selectedService}
            service="BING"
            onClick={() => handleServiceChange("BING")}
          />

          <ServiceButton
            selectedService={selectedService}
            service="YANDEX"
            onClick={() => handleServiceChange("YANDEX")}
          />

          <ServiceButton
            selectedService={selectedService}
            service="EBAY"
            onClick={() => handleServiceChange("EBAY")}
          /> */}
        </Box>
        {/* ... Add more buttons for other services */}
        <Box
          display={"flex"}
          sx={{
            color: blueGrey[50],
            borderRadius: "1rem",
            gap: 4,

            backgroundColor: blueGrey[50],
            paddingY: 3,
            paddingX: 2,
          }}
        >
          {/* Search Input */}
          <TextField
            variant="outlined"
            value={keywords}
            fullWidth
            type="search"
            placeholder="Keywords"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& input": {
                  borderColor: "white",
                },
              },
            }}
            onChange={handleKeywordChange}
            InputProps={{
              style: {
                borderRadius: "30px",
                backgroundColor: "white",
                borderColor: "white",
                height: "100%",
                borderWidth: 0
              },
              // notchedOutline: {
              //   borderWidth: "1px",
              //   borderColor: "white !important",
              // },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Location Dropdown */}
          <LocationDropDown
            onLocationChange={handleLocationChange}
          ></LocationDropDown>
          {/* Search Button */}
          <Button
            variant="contained"
            onClick={search}
            sx={{
              bgcolor: "orangered",
              paddingY: 2,
              paddingX: 13,
              borderRadius: "2rem",
            }}
          >
            SEARCH
          </Button>
        </Box>
        <Box display={"flex"} justifyContent="center" alignItems="center">
          <Checkbox
            icon={<img alt="unCheckedIcon" height={30} width={30} src={UnCheckedIcon}></img>}
            checkedIcon={<img alt="checkedIcon" height={30} width={30} src={CheckedIcon}></img>}
            checked={checkBox}
            onClick={() => setChecked(e => !e)}
          />

          <Typography variant="h5" paddingY={3} color={grey[500]}>
            Select this box to apply new suggestions to current list
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default SearchWebsites;
