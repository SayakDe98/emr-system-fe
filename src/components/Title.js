import React from "react";

const Title = ({
  top = "120px",
  left = "800px",
  titleName = "Title",
  fontSize = "45pt",
}) => {
  return (
    <div style={{ position: "absolute", top, left }}>
      <h1 style={{ fontSize }}>{titleName}</h1>
    </div>
  );
};

export default Title;
