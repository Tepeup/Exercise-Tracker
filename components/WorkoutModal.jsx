import React from "react";
import Slider from "@material-ui/core/Slider";
import { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBiking,
  faDumbbell,
  faEllipsisH,
  faPeace,
  faRunning,
  faSwimmer,
} from "@fortawesome/free-solid-svg-icons";

const CustomSlider = withStyles({
  root: {
    color: "#FFFFFF",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
  thumb: {
    display: "none",
  },
  mark: {
    display: "none",
  },
  markLabel: {
    color: "#FFFFFF",
  },
})(Slider);

export default function WorkoutModal(props) {
  const marks = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5",
    },
  ];

  const rgbColors = [
    "rgb(85, 97, 113)",
    "rgb(237, 233, 0)",
    "rgb(255, 134, 6)",
    "rgb(232, 59, 54)",
    "rgb(96, 5, 56)",
  ];

  const colorPalette = ["#556171", "#ede900", "#ff8606", "#e83b36", "#600538"];

  let rgbToHex = (el) => {
    if (rgbColors.find((x) => x == el)) {
      const indexIn = rgbColors.findIndex((x) => x == el);
      return colorPalette[indexIn];
    }
    return el;
  };

  const colorPaletteValue =
    colorPalette.findIndex(
      (e) => e == rgbToHex(props.calendar[props.week][props.weekDay].colorCode)
    ) + 1;

  const [value, setValue] = useState(colorPaletteValue || 1);
  const [input, setInput] = useState(
    props.calendar[props.week][props.weekDay].notes || ""
  );
  const [icon, setIcon] = useState(
    props.calendar[props.week][props.weekDay].workout || 1
  );

  let handleChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div
      className="workout-modal"
      style={{ backgroundColor: `${colorPalette[value - 1]}` }}
    >
      <button className="modal-close" onClick={props.close}>
        &#10006;
      </button>

      <div>
        <h1>
          {props.month} {props.day}, {props.year}
        </h1>

        <h4>EXERCISE TYPE</h4>
        <div className="exercise-icons">
          <button
            className={icon == 1 ? "active-button" : null}
            onClick={() => setIcon(1)}
          >
            <FontAwesomeIcon size="5x" icon={faRunning} />
          </button>
          <button
            className={icon == 2 ? "active-button" : null}
            onClick={() => setIcon(2)}
          >
            <FontAwesomeIcon icon={faDumbbell} />
          </button>
          <button
            className={icon == 3 ? "active-button" : null}
            onClick={() => setIcon(3)}
          >
            <FontAwesomeIcon icon={faSwimmer} />
          </button>
          <button
            className={icon == 4 ? "active-button" : null}
            onClick={() => setIcon(4)}
          >
            <FontAwesomeIcon icon={faBiking} />
          </button>
          <button
            className={icon == 5 ? "active-button" : null}
            onClick={() => setIcon(5)}
          >
            <FontAwesomeIcon icon={faEllipsisH} />
          </button>
        </div>
        <h4>INTENSITY</h4>
        <CustomSlider
          valueLabelDisplay="auto"
          aria-label="pretto slider"
          defaultValue={colorPaletteValue || 1}
          onChange={(event, value) => setValue(value)}
          step={1}
          marks={marks}
          min={1}
          max={5}
        />
        <h4>NOTES</h4>
        <form>
          <textarea
            type="text"
            className="modal-input"
            value={input}
            onChange={(event) => handleChange(event)}
            placeholder="Record notes here"
          ></textarea>
        </form>

        {props.calendar[props.week][props.weekDay].notes}

        <button
          className="modal-submit"
          onClick={(day, week) =>
            props.submit(
              props.weekDay,
              props.week,
              colorPalette[value - 1],
              icon,
              input
            )
          }
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
}
