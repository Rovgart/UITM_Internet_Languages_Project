import React from "react";
import Chip from "@mui/material/Chip";

function CategoryChipList({ categories }: { categories: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories?.map((category, index) => (
        <Chip color="primary" size="medium" label={category} key={index}></Chip>
      ))}
    </div>
  );
}

export default CategoryChipList;
