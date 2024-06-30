import { Button } from "@mui/material";
import React from "react";
import { useFormStatus } from "react-dom";
import Loader from "../loader/Loader";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  if (pending) {
    return <Loader />;
  }
  return (
    <Button
      variant="contained"
      className="bg-maize-300 w-1/2 sm:w-full hover:bg-maize-200"
      color="primary"
      type="submit"
      disabled={pending}
    >
      Sign In
    </Button>
  );
};

export default SubmitButton;
