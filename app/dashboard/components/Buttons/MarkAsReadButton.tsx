import { Button } from "@mui/material";
import React from "react";

const MarkAsReadButton = ({
  handleReadClick,
  isPending,
  isSuccess,
}: {
  handleReadClick: () => void;
  isPending?: boolean;
  isSuccess?: boolean;
}) => {
  return (
    <Button
      className="flex self-end"
      variant={`${isSuccess ? "outlined" : "contained"}`}
      size="small"
      onClick={handleReadClick}
      disabled={isPending || isSuccess}
    >
      {isSuccess ? "Read" : "Mark as read"}
    </Button>
  );
};

export default MarkAsReadButton;
