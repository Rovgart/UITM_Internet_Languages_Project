"use client";
import { Button } from "@mui/material";
import React from "react";

const SubmitButton = ({ pending }: { pending?: boolean }) => {
  return (
    <Button
      variant="contained"
      className="bg-midnight_green-700  sm:w-full hover:bg-maize-200"
      color="primary"
      type="submit"
      disabled={pending}
    >
      Sign in
    </Button>
  );
};

export default SubmitButton;
