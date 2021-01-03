import React, { useState } from "react";
import Calendar from "./Calendar";

export default function Dashboard() {
  //Hooks
  const [workoutColor, setWorkoutColor] = useState("#fffe01");
  const [selectedColor, setSelectedColor] = useState(0);

  //Unchanging Arrays
  const monthsArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const colorPalette = ["#fffe01", "#ff8606", "#e83b36", "#600538"];

  let handleColorSelection = (el) => {
    const colorBackground = el.target.style.backgroundColor;
    setWorkoutColor(colorBackground);
    setSelectedColor(el.target.id);
  };

  return (
    <div className="dashboard">
      <div className="dashboard__body">
        <div className="color-selection">
          {colorPalette.map((e, index) => (
            <div
              className={`color-block ${
                selectedColor == index ? "selected" : ""
              }`}
              onClick={handleColorSelection}
              style={{ backgroundColor: e }}
              id={index}
              key={e}
            ></div>
          ))}
        </div>

        <div className="cal-year">
          {monthsArray.map((num, i) => (
            <Calendar month={num} color={workoutColor} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
