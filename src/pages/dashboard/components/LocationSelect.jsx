import React, { useEffect,useState } from "react";
import { TextField, MenuItem, InputAdornment } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box } from "@mui/system";
import LocationIcon from "../../../checkbox_icons/location_icon.png";
import { fetchKeywordData } from '../../../helper_functions/axios';

const LocationSelect = ({ onLocationChange }) => {
  const [location, setLocation] = useState("English");
  const [allloc, allLocation] = useState([]);
  const [defloc, defaultLocations] = useState(['English', 'German', 'Polish', 'Dutch', 'French', 'Spanish', 'Italian']);


  const handleChange = async (event) => {
    setLocation(event.target.value);
    
    const selectedValue = event.target.value;
    const selectedLanguageObj = allloc.find(loc => loc.language_name === selectedValue);
    if (selectedLanguageObj) {
      const locData = await fetchKeywordData('/v3/keywords_data/google_ads/locations/'+selectedLanguageObj.language_code, {});
      const firstlocData = locData[0].result.length > 0 ? locData[0].result[0] : [];
      if(firstlocData) {
        onLocationChange({
          location: firstlocData.location_name,
          language: selectedLanguageObj.language_name,
        });
      }
      
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const langData = await fetchKeywordData('/v3/keywords_data/google_ads/languages', {});
        const rseultdata = langData[0].result.length > 0 ? langData[0].result : [];
        const filteredLanguages = rseultdata.filter(loc => defloc.includes(loc.language_name));
        allLocation(filteredLanguages);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  },[]);

  

  return (
    <Box
      sx={{
        minWidth: "35%",
        bgcolor: "white",
        borderRadius: "50px",
        overflow: "hidden",
      }}
    >
      <TextField
        select
        value={location}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ paddingLeft: "10px" }}>
              <img
                src={LocationIcon}
                height={30}
                width={30}
                alt="Location Icon"
              />
            </InputAdornment>
          ),
        }}
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
          borderRadius: "50px !important", // Makes the TextField rounded
          bgcolor: "white", // Sets the background color to white
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent", // Hides the border
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent", // Hides the border on hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent", // Hides the border on focus
          },
          "& .MuiSelect-select": {
            paddingLeft: "10px", // Additional padding for the placeholder/select text
          },
        }}
      >
        {/* Non-pressable default item */}
        {/* <MenuItem sx={{ color: "grey" }} value="select">
          Select Location
        </MenuItem> */}
        {/* Selectable items */}
        {/* <MenuItem value="United States">USA</MenuItem> */}
        {/* <MenuItem value="United Kingdom">England</MenuItem> */}
        {/* Add more countries as needed */}
        {allloc.map(location => (
          <MenuItem key={location.language_code} value={location.language_name}>
            {location.language_name}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default LocationSelect;
