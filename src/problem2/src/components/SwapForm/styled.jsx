import { Button, styled, TextField } from "@mui/material";

export const StyledTextField = styled(TextField)({
  ".MuiInputBase-root": {
    backgroundColor: "#121619",
    height: "52px",
    borderRadius: "12px",
    padding: "14px 16px",
  },
  ".Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#adb5db !important",
  },
  input: {
    color: "#fff",
  },
});

export const StyledButton = styled(Button)({
  backgroundColor: "#8632fb !important",
  height: "48px",
  padding: "0 20px",
  borderRadius: "12px",
  gap: "8px",
});