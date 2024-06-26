import React, { useState } from "react";
import { TextField, MenuItem, InputAdornment } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box } from "@mui/system";
import LocationIcon from "../../../checkbox_icons/location_icon.png";

const LocationSelect = ({ onLocationChange }) => {
  const [location, setLocation] = useState("United Kingdom");

  const handleChange = (event) => {
    setLocation(event.target.value);
    onLocationChange(event.target.value);
  };

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
        <MenuItem value="United Kingdom">England</MenuItem>
        {/* Add more countries as needed */}
      </TextField>
    </Box>
  );
};

export default LocationSelect;
