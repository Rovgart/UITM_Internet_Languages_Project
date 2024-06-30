import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = ({ size = 120, color = "#123abc" }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <ClipLoader size={size} color={color} />
    </div>
  );
};

export default Loader;
