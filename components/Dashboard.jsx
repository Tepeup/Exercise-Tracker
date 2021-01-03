import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import SignIn from "./SignIn";
import firebase from "firebase/app";
import "firebase/firestore";
import Nav from "./Nav";

export default function Dashboard(props) {
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
        <Nav />

        {
          <div className="cal-year">
            {monthsArray.map((num, i) => (
              <Calendar
                month={num}
                color={workoutColor}
                index={i}
                user={props.user}
                key={i}
              />
            ))}
          </div>
        }
      </div>
    </div>
  );
}
