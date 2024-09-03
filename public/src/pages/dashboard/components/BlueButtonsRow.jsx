import { Box } from "@mui/system";
import BlueButton from "./BlueButton";

export default function BlueButtonsRow({
  showUndoIcon = false,
  sendSearchClick,
  exportPositiveonClick,
  exportNegativeonClick,
  exportBoth,
  undoClick,
  allowedToSend
}) { 
  return (
    <>
      <Box
        sx={{
          paddingX: 0,
          paddingY: 4,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
       {sendSearchClick && <BlueButton
          sx={{mx: 0}}
          active={allowedToSend}
          onClick={sendSearchClick}
          text={"SEND TO SEARCH VOLUME"}
        ></BlueButton>}
        <BlueButton
          sx={{mx: 0}}
          onClick={exportPositiveonClick}
          text={"EXPORT POSITIVE"}
          // Add margin between buttons
        ></BlueButton>
        <BlueButton
          sx={{mx: 0}}
          onClick={exportNegativeonClick}
          text={"EXPORT NEGATIVE"}
          // Add margin between buttons
        ></BlueButton>
        <BlueButton
          sx={{mx: 0}}
          onClick={exportBoth}
          text={"EXPORT BOTH COLUMNS"}
          // Add margin between buttons
        ></BlueButton>
        <BlueButton sx={{mx: 0}} onClick={undoClick} showUndoIcon={showUndoIcon} text={"UNDO"}></BlueButton>
      </Box>
    </>
  );
}
