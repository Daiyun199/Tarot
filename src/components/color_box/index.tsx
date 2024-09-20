import React from "react";

interface ColorBoxProps {
  color: string;
}

const ColorBox: React.FC<ColorBoxProps> = ({ color }) => {
  return (
    <div
      style={{
        width: "40%",
        height: "50px",
        backgroundColor: color,
        border: "1px solid #ccc",
        borderRadius: "4px",
        margin: "10px 0",
      }}
    ></div>
  );
};

export default ColorBox;
