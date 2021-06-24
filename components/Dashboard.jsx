import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import SignIn from "./SignIn";
import firebase from "firebase/app";
import "firebase/firestore";
import Nav from "./Nav";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    position: "fixed",
    bottom: 0,

    backgroundColor: "#21262b",
    "& .MuiBottomNavigationAction-root": {
      color: "#FFF",
      maxWidth: "calc(800px / 3)",
    },
    "& .MuiBottomNavigationAction-root.Mui-selected": {
      color: "#0070f3",
    },
  },
});

export default function Dashboard(props) {
  // Hardcoded Arrays
  const monthsArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  // Hooks
  const [workoutColor, setWorkoutColor] = useState("#ff8606");
  // const [selectedColor, setSelectedColor] = useState(2);
  const [miniView, setMiniView] = useState(false);

  // let handleColorSelection = (el) => {
  //   const colorBackground = el.target.style.backgroundColor;
  //   setWorkoutColor(colorBackground);
  //   setSelectedColor(el.target.id);
  // };

  let handleMiniClick = () => {
    setMiniView(!miniView);
  };

  const classes = useStyles();
  const [value, setValue] = React.useState("recents");

  return (
    <div className="dashboard">
      <div className="dashboard__body">
        <Nav user={props.user} miniClick={handleMiniClick} mini={miniView} />
        {/* <ColorPalette
          colorSelection={handleColorSelection}
          color={selectedColor}
        /> */}

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
        {/* 
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation> */}
      </div>
    </div>
  );
}
