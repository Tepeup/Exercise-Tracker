import React from "react";

export default function ColorPalette(props) {
  // Hard coded color palette may change in future to allow customization
  const colorPalette = ["#556171", "#ede900", "#ff8606", "#e83b36", "#600538"];

  return (
    <div className="color-selection">
      {colorPalette.map((el, index) => (
        <div
          className={`color-block ${props.color == index ? "selected" : ""}`}
          onClick={props.colorSelection}
          style={{ backgroundColor: el }}
          id={index}
          key={el}
        ></div>
      ))}
    </div>
  );
}
