import React from "react";

const Bar = ({ width, color, height = 5 }) => {
  return (
    // <div
    //   style={{
    //     display: "flex",
    //   }}
    // >
    <div
      style={{
        width: `${width}`,
        backgroundColor: `${color}`,
        height: `${height}px`,
        borderRadius: "25px",
      }}
    ></div>
    // </div>
  );
};

export default Bar;
