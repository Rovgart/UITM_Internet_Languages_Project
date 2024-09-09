"use client";
import { Button } from "@mui/material";
import React from "react";
import { useFormStatus } from "react-dom";
import Loader from "../loader/Loader";

const SubmitButton = () => {
  // if (pending) {
  //   return <Loader />;
  // }
  return (
    <Button
      variant="contained"
      className="bg-midnight_green-700  sm:w-full hover:bg-maize-200"
      color="primary"
      type="submit"
    >
      Sign in
    </Button>
  );
};

export default SubmitButton;
