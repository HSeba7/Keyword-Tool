import { Box, Card, TextField, Typography ,Button} from "@mui/material";
import MyDropDown from "./MyDropDown";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { isValumeDataSubmit, setOtherInfoValumePayload } from "../../../actions/actions";
export default function MetricComponent() {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState({});

  const getData = (data) => {
    setSearchData({...searchData, ...data});
  }


  useEffect(()=> {
    dispatch(setOtherInfoValumePayload( {language_name: 'English'}));
}, []);


  const searchResult = () => {
    dispatch(setOtherInfoValumePayload(searchData));
    dispatch(isValumeDataSubmit(true))
  }
  return (
    <>
      <Card sx={{ borderRadius: "1rem", boxShadow: 0, marginY: 4 }}>
        <Box
          paddingY={5}
          flexDirection={{ xs: "column", md: "row" }} // Make it column on small screens and row on medium and larger screens
          paddingX={5}
        >
          <Box
            display={"flex"}
            paddingX={3}
            paddingY={3}
            justifyContent="center"
            gap={2}
            sx={{
              color: "#F1F3F6",
              backgroundColor: "#F1F3F6",
              borderRadius: ".7rem",
            }}
          >
              <MyDropDown
                title={"Metric languages"}
                // items={["English", "Arabic", "Poland"]}
                items={["English"]}
                selected={"English"}
                getValue={(e) => getData({language_name: e})}
              ></MyDropDown>

              <MyDropDown
                title={"Metric currencies"}
                // items={["British Pound", "English Pound"]}
                items={["British Pound"]}
                selected={"British Pound"}
                // getValue={(e) => getData({language_name: e})}
              ></MyDropDown>

              <MyDropDown
                title={"Metric network"}
                items={["Google and Search Partner’s"]}
                selected={"Google and Search Partner’s"}
                // getValue={(e) => getData({language_name: e})}
              ></MyDropDown>

              <Button
                variant="contained"
                sx={{
                  bgcolor: "orangered",
                  paddingY: 0,
                  marginTop: 4,
                //   height: "60%",
                  paddingX: 10,
                  borderRadius: "2rem",
                }}
                onClick={searchResult}
              >
                SEARCH
              </Button>
            </Box>
          </Box>
              </Card>
    </>
  );
}
