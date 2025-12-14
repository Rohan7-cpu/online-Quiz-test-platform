import React from "react";
import {Dialog,DialogTitle,DialogContent,RadioGroup,FormControlLabel,Radio,Button,DialogActions,} from "@mui/material";

export default function SelectQuestionTypeModal({
  open,
  onClose,
  onSelect,
}) {
  const [value, setValue] = React.useState("mcq-single");

  const handleChoose = () => {
    onSelect(value); // sends correct internal value
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select Question Type</DialogTitle>

      <DialogContent>
        <RadioGroup value={value} onChange={(e) => setValue(e.target.value)}>
          <FormControlLabel value="mcq-single" control={<Radio />} label="MCQ (Single Correct)" />

          <FormControlLabel value="mcq-multiple"control={<Radio />}label="MCQ (Multiple Correct)"/>

          <FormControlLabel value="short-answer" control={<Radio />} label="Short Answer (2 words)"/>

          <FormControlLabel value="paragraph" control={<Radio />}label="Description (2–4 sentences)"/>
        </RadioGroup>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleChoose} variant="contained">
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
