"use client";

import React from "react";
import Star from "./Star";

const StarRating = ({
  rating,
  totalRatings,
}: {
  rating: number;
  totalRatings: number;
}) => {
  const totalStars = 5;
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  return (
    <div className="flex flex-col w-full place-self-end items-center text-lg ">
      <div className="flex flex-col">
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
        <span className="text-sm">{`(${totalRatings})`}</span>
      </div>
    </div>
  );
};

export default StarRating;
