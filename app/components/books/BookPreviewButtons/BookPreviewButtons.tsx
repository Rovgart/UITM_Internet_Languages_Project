import { ButtonGroup, Button } from "@mui/material";
import React from "react";

const BookPreviewButtons = () => {
  return (
    <div className="flex items-center  w-full justify-center sm:self-start">
      <ButtonGroup className="flex gap-3">
        <Button variant="contained" color="info">
          Read
        </Button>
        <Button variant="contained" color="info">
          Listen
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default BookPreviewButtons;
