import { Box, Button, Stack } from "@mui/material";
import "./Confirm.css";

const Confirm = ({ onOk, onCancel }) => {
  return (
    <Box className="confirm-modal-container">
      <Box className="confirm-modal-content">
        <Box className="confirm-modal-content-title">Confirm Swap</Box>
        <Stack direction="row" gap={2}>
          <Button variant="contained" onClick={onOk} className="confirm-modal-button">OK</Button>
          <Button variant="outlined" onClick={onCancel} className="confirm-modal-button">Cancel</Button>
        </Stack>
      </Box>
    </Box>
  );
};
export default Confirm;