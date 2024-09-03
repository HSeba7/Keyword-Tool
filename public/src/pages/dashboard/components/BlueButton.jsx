import { Box, Button } from "@mui/material";
import undoIcon from "../../../checkbox_icons/undo.png";

export default function BlueButton({ active = true, text, onClick, showUndoIcon = false, sx = {} }) {
  return (
    <>
      {text === "UNDO" ? (
        <Button
          variant="contained"
          disabled={!active}
          onClick={onClick}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent:"center",
            marginX: 1,
            bgcolor: "#0D4BC1",
            color: "white",
            paddingX: 5,
            paddingY: 1,
            borderRadius: "2rem",
            ...sx
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              width: "100%",
            }}
          >
            {text}
            {/* {text === "UNDO" && showUndoIcon && (
              <img
                style={{ marginLeft: 20, marginBottom: 5, marginRight: 3 }}
                src={undoIcon}
                height={15}
                width={15}
                alt="undoIcon"
              />
            )} */}
          </Box>
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={onClick}
          disabled={!active}
          sx={{
            marginX: 1,
            bgcolor: "#0D4BC1",
            color: "white",
            paddingX: 5,
            paddingY: 1,
            borderRadius: "2rem", 
            ...sx
          }}
        >
          {text}
        </Button>
      )}
    </>
  );
}
