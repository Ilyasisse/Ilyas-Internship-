import React from "react";
import Skeleton from "../ui/Skeleton"; // adjust path if needed

export default function SkeletonSelectedCollection() {
  return (
    <header>
      <div className="selected-collection">
        <Skeleton width="100%" height="600px" />
      </div>
    </header>
  );
}
