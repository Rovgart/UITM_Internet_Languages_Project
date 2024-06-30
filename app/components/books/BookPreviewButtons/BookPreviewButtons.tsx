import { ButtonGroup, Button } from "@mui/material";
import React from "react";

type Props = {};

const BookPreviewButtons = (props: Props) => {
  return (
    <div className="flex items-center self-center sm:self-start">
      <ButtonGroup className="flex gap-3">
        <Button variant="contained">Read</Button>
        <Button variant="contained">Listen</Button>
      </ButtonGroup>
    </div>
  );
};

export default BookPreviewButtons;
