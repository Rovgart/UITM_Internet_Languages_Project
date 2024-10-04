import React from "react";
import Chip from "@mui/material/Chip";

function CategoryChipList({ categories }: { categories: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories?.map((category) => (
        <Chip
          color="primary"
          size="medium"
          label={category}
          key={category}
        ></Chip>
      ))}
    </div>
  );
}

export default CategoryChipList;
