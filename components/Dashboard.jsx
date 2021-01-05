import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import SignIn from "./SignIn";
import firebase from "firebase/app";
import "firebase/firestore";
import Nav from "./Nav";
import ColorPalette from "./ColorPalette";

export default function Dashboard(props) {
  // Hardcoded Arrays
  const monthsArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const colorPalette = ["#556171", "#ede900", "#ff8606", "#e83b36", "#600538"];

  // Hooks
  const [workoutColor, setWorkoutColor] = useState("#fffe01");
  const [selectedColor, setSelectedColor] = useState(0);
  const [miniView, setMiniView] = useState(false);

  let handleColorSelection = (el) => {
    const colorBackground = el.target.style.backgroundColor;
    setWorkoutColor(colorBackground);
    setSelectedColor(el.target.id);
  };

  let handleMiniClick = () => {
    setMiniView(!miniView);
  };

  return (
    <div className="dashboard">
      <div className="dashboard__body">
        <Nav user={props.user} miniClick={handleMiniClick} mini={miniView} />
        <ColorPalette
          colorSelection={handleColorSelection}
          color={selectedColor}
        />

        <div className={`cal-year ${miniView && "cal-year-mini"}`}>
          {monthsArray.map((num, i) => (
            <Calendar
              month={num}
              color={workoutColor}
              index={i}
              user={props.user}
              key={i}
              mini={miniView}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
