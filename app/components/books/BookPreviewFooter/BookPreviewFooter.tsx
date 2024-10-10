import React from "react";
import { CiTwitter } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { MdEmail } from "react-icons/md";

const BookPreviewFooter = () => {
  return (
    <footer className="w-screen min-h-32  flex items-center justify-end pr-2 gap-4">
      <MdEmail size={"3rem"} />
      <CiTwitter size={"3rem"} />
      <CiInstagram size={"3rem"} />
    </footer>
  );
};

export default BookPreviewFooter;
