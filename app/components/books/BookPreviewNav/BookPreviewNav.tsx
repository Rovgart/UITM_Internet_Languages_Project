import React from "react";

const BookPreviewNav = () => {
  return (
    <nav className="flex justify-around p-4 col-[2/3]">
      <ul className="flex  items-center uppercase gap-4 justify-center text-robin_egg_blue-100">
        <li>info</li>
        <li>reviews</li>
        <li>Similiar books</li>
      </ul>
      <picture className="size-[50px] rounded-full border border-robin_egg_blue-100">
        <img className="" src="" alt="" />
      </picture>
    </nav>
  );
};

export default BookPreviewNav;
