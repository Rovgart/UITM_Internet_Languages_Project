"use client";
import React from "react";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";

const Star = ({ filled, half }: { filled: boolean; half: boolean }) => {
  if (filled) {
    return <FaStar className={`${filled ? "text-yellow-500" : "hidden"}`} />;
  } else if (half) {
    return <FaStarHalf className="text-yellow-500" />;
  }
};

export default Star;
