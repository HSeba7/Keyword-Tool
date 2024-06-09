import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import Close from "@mui/icons-material/Close";

import XIcon from "../../../checkbox_icons/blueXIcon.png";
import { saveAs } from "file-saver";
import { useSelector } from "react-redux";

const XTableCell = (props) => <TableCell {...props} />;
const NoStyledTableCell = (props) => (
  <TableCell
    {...props}
 
    style={{
      textAlign: "center",

      //  paddingTop:1,
      //  paddingBottom:1,
      padding: 9,
      alignContent: "center",
      justifyContent: "center",
      alignItems: "center",
      // borderRight: ".5px solid #E4E4E4", // vertical divide
    }}
    // sx={{
    //   borderRadius: '1rem',
    //   border: 1,
    //   borderColor: "#F1F3F6",
    // }}
  />
);

const StyledTableCell = (props) => (
  <TableCell
    {...props}
   
    style={{
      color: "#9D9D9D",
      textAlign:'center',

      // borderTop: ".5px solid #E4E4E4", // horizontal divider
      borderRight: ".5px solid #E4E4E4", // vertical divide
      // padding: 2, // Optional: adjust the padding if needed
      
    }}
  />
);
export default function BasicTable() {

  const getData = useSelector((state) => state?.valumeReducerData?.valumeData);

  const [data, setData] = React.useState(getData || []);

  console.log("getData", data);


  React.useEffect(() => {
    setData(getData)
  }, [getData]);

  const handleDeleteRow = (rowIndex) => {
    const newData = [...data];
    newData.splice(rowIndex, 1);
    setData(newData);
  };
  const handleExport = () => {
    console.log('sds',data);
    // Convert table data to CSV string
    const headers = [
      "Keyword",
      "Volume",
      "Search CPC",
      "Competition",
      ...data[0]?.result[0]?.monthly_searches.map((item)=>item.month + " "+ item.year),
    ];

    const csvRows = [headers.join(",")]; // Add headers first

    // Add row data
    data[0]?.result?.forEach((row) => {
      
    if(row?.monthly_searches && row?.monthly_searches?.length>0){
      const rowData = [
        row?.keyword,
        row?.search_volume,
        row?.cpc,
        row?.competition,
        ...(row?.monthly_searches?.map(d => d.search_volume)),
      ];
      csvRows.push(rowData.join(","));
    }
    });

    // Create blob and save file
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "keyword_data.csv");
  };

  return (
    <Box>
      <Box
        padding={4}
        sx={{
          borderRadius: "1rem",
          color: "white",
          backgroundColor: "white",
        }}
      >
        <TableContainer
          component={Paper}
          elevation={0}
          style={{ boxShadow: "none" }}
          sx={{
            // borderRadius: 2,
            // border: 1,
            borderColor: "#F1F3F6",
          }}
        >
          <Table aria-label="simple table" 
           style={{
            height: data[0]?.result?.length > 30 ? 30 * 70 + 'px' : 'auto',  
            overflowY: data[0]?.result?.length > 30 ? 'scroll' : 'hidden',
            display: data[0]?.result?.length > 0 ? 'block': "table"
        }}
          >
            <TableHead>
              <Box></Box>
              <TableRow
                sx={{
                  justifyContent: "center",
                  textAlign: "center",
                  backgroundColor: "#F1F3F6",
                  "&:first-of-type": {
                    borderTopLeftRadius: "2rem",
                    borderTopRightRadius: "2rem",
                    borderLeft: 0,
                  },
                  "&:last-child td, &:last-child th": {
                    borderBottom: 0,
                    borderRight: 0,
                    borderLeft: 0,
                  },
                  "  th:first-of-type": {
                    borderRight: 0,
                    // border-top-left-radius: 1.5rem;
                    // border-bottom-left-radius: 1.5rem;
                    borderLeft: 0,
                  },
                  "th:last-of-type": {
                    borderLeft: 1,
                  },
                  "&:last-child td, &:last-child th": {
                    borderBottom: 0,
                    // borderRight: 0.5,
                    borderLeft: 1,
                    borderColor: "#E4E4E4",
                    borderRight: 0,
                  },

                  "th:last-of-type": {
                    borderRight: 0,
                    borderRight: 0,
                    borderLeft: 0,
                    borderTopRightRadius: "1.5rem",
                    borderBottomRightRadius: "1.5rem",
                  },
                  "th:first-of-type": {
                    borderRight: 0,
                    borderRight: 0,

                    borderTopLeftRadius: "1.5rem",
                    borderBottomLeftRadius: "1.5rem",
                  },
                }}
              >
                <NoStyledTableCell>Keyword</NoStyledTableCell>
                <NoStyledTableCell align="center">Volume</NoStyledTableCell>
                <NoStyledTableCell align="right">Search CPC</NoStyledTableCell>
                <NoStyledTableCell align="right">Competition</NoStyledTableCell>
                {/* Map through the months for headers */}
                {data[0]?.result[0]?.monthly_searches?.map((d) => (
                  <NoStyledTableCell align="right" key={d?.month}>
                    {d?.month} {d?.year}
                  </NoStyledTableCell>
                ))}
                <XTableCell align="right"></XTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data[0]?.result?.map((row, rowIndex) => (
                <TableRow
                  sx={{
                    borderBottom: 0,
                  }}
                  key={rowIndex}
                >
                  <StyledTableCell component="th" scope="row">
                    {row?.keyword}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.search_volume}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row?.cpc}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row?.competition}
                  </StyledTableCell>
                  {row?.monthly_searches?.map(
                    (searchVolume, index) => (
                      <StyledTableCell align="right" key={index}>
                         {searchVolume?.search_volume}
                      </StyledTableCell>
                    )
                  )}
                  {/* <XTableCell align="right"> */}
                  <IconButton
                    style={{
                      marginTop: 10,
                    }}
                    onClick={() => handleDeleteRow(rowIndex)}
                  >
                    <Box display="flex" alignItems="flex-end">
                      <img
                        height={20}
                        width={20}
                        src={XIcon}
                        alt="close-icon"
                      />
                    </Box>
                  </IconButton>
                  {/* </XTableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>{" "}
      </Box>

      <Box paddingBottom={10} >
        {" "}
        <Button
          variant="contained"
          sx={{
            bgcolor: "#0D4BC1",
            paddingY: 0,
            marginTop: 4,
            paddingY: 1.7,
            //   height: "60%",
            paddingX: 5,
            borderRadius: "2rem",
            marginRight: 5,
          }}
          onClick={handleExport}
        >
          EXPORT
        </Button>
        {/* <Button
          variant="contained"
          sx={{
            bgcolor: "#0D4BC1",
            paddingY: 0,
            marginTop: 4,
            paddingY: 1.7,
            paddingX: 5,
            borderRadius: "2rem",
          }}
        >
          SAVE LIST
        </Button> */}
      </Box>
    </Box>
  );
}
