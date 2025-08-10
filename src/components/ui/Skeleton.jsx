import React from "react";
import "./Skeleton.css";

const Skeleton = ({ width, height, borderRadius, backgroundColor }) => {
  return (
    <div
      className="skeleton"
      style={{
        width,
        height,
        borderRadius,

      }}
    ></div>
  );
};

export default Skeleton;
