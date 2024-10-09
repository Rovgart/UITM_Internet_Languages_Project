import { Button } from "@mui/material";
import React from "react";

type Props = {};

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
      disabled={isPending}
    >
      Mark as Read
    </Button>
  );
};

export default MarkAsReadButton;
