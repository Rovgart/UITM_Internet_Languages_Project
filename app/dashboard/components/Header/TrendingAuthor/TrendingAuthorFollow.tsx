import React from "react";
import FollowButton from "../../Buttons/FollowButton";

const TrendingAuthorFollow = ({ authorName }: { authorName: string }) => {
  return (
    <div className="flex items-center justify-between gap-4  p-3">
      <h1>{authorName}</h1>
      <FollowButton />
    </div>
  );
};

export default TrendingAuthorFollow;
