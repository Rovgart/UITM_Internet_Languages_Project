"use client";

import React from "react";
import Star from "./Star";

type Props = {};

const StarRating = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  return (
    <div className="flex flex-col items-center text-5xl">
      <div className="flex">
        {[...Array(totalStars)].map((_, index) => (
          <Star
            key={index}
            filled={index < filledStars}
            half={index === filledStars && hasHalfStar}
          ></Star>
        ))}
      </div>
      <span>{rating}</span>
    </div>
  );
};

export default StarRating;
