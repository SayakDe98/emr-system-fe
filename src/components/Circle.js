import React from "react";
import styles from "./Circle.module.css";

const Circle = ({ bgColor }) => {
  return (
    <span
      className={styles.circle}
      style={{
        background: `${bgColor}`,
        boxShadow: `0 0 8px ${bgColor}`,
      }}
    ></span>
  );
};

export default Circle;
