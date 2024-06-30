import { Button, TextField } from "@mui/material";
import React from "react";
type FormProps = {
  action: () => void;
};

const LogForm = () => {
  return (
    <form
      action={async (formData: FormData) => {
        "use server";
      }}
      className="flex flex-col items-center justify-center place-items-center"
    >
      <TextField variant="outlined" type={"email"}></TextField>
      <TextField variant="outlined"></TextField>
      <Button type="submit">Sign In</Button>
    </form>
  );
};

export default LogForm;
