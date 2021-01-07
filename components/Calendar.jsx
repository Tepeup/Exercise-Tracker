import React, { useState, useEffect } from "react";
import calendar from "calendar-js";
import moment from "moment";
import firebase from "firebase/app";
import "firebase/firestore";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Calendar(props) {
  // Converting the calendar array form calendar-js to an array of objects with relevant info
  let arrayToObjectArray = calendar()
    .of(moment().year(), props.month)
    .calendar.map((el) =>
      el.map((el) => ({
        date: el,
        month: props.month,
        colorCode: "#556171",
      }))
    );

  // date variables used throughout
  const todaysMonth = moment().month();
  const todaysDate = moment().date();
  const todaysYear = moment().year();
  const monthStringName = moment().month(props.month).format("MMMM");

  // Hooks
  const [cellInfo, setCellInfo] = useState(arrayToObjectArray);
  const [calendarData, setCalendarData] = useState(cellInfo);

  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const attempt = calendarData
    .map((x) =>
      x.map((e) =>
        e.colorCode == "#556171" || e.colorCode == "rgb(85, 97, 113)" ? 0 : 1
      )
    )
    .map((x) => x.reduce(reducer))
    .reduce(reducer);

  console.log(props.month, attempt);

  // Get users month data from Firebase
  useEffect(() => {
    const firestore = firebase.firestore();
    firestore
      .collection("Charts")
      .doc(`${props.user.id}`)
      .collection(`${todaysYear}`)
      .doc(`${monthStringName}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setCalendarData(JSON.parse(snapshot.data().chartData));
        } else {
          return;
        }
      });
  }, []);

  // might use in future
  // function dateFromDay(day, month) {
  //   var date = new Date(moment().year(), month); // initialize a date in `year-01-01`
  //   return new Date(date.setDate(day)); // add the number of days
  // }

  let handleCellClick = async (el) => {
    if (el.target.className.includes("active")) {
      let copyGrid = [...calendarData];

      // might use in future
      // const cellNumber = Number(el.target.id);

      const xIndex = el.target.parentElement.getAttribute("data-index");
      const yIndex = el.target.getAttribute("data-index");
      let mutatedOject = copyGrid[xIndex][yIndex];

      copyGrid[xIndex][yIndex] = { ...mutatedOject, colorCode: props.color };

      await firebase
        .firestore()
        .collection("Charts")
        .doc(`${props.user.id}`)
        .collection(`${todaysYear}`)
        .doc(`${monthStringName}`)
        .set({ chartData: `${JSON.stringify(copyGrid)}` })
        .catch((error) => {
          alert(`Error`, error);
        });

      setCalendarData(copyGrid);
    }
  };

  return (
    <div
      className={`cal-month-container ${
        props.mini && "cal-month-container-mini"
      }`}
    >
      <span className={`month-title ${props.mini && "month-title-mini"}`}>
        {`${monthStringName} ${todaysYear}  `}
        <FontAwesomeIcon
          id={attempt > 4 ? null : "incomplete"}
          icon={faStar}
          title={"One Star Achievement"}
          color={"#ede900"}
        />{" "}
        <FontAwesomeIcon
          id={attempt > 9 ? null : "incomplete"}
          icon={faStar}
          title={"Two Star Achievement"}
          color={"#ede900"}
        />{" "}
        <FontAwesomeIcon
          id={attempt > 19 ? null : "incomplete"}
          icon={faStar}
          title={"Three Star Achievement"}
          color={"#ede900"}
        />
      </span>
      <div
        className={`cal-month ${props.mini && "cal-month-mini"}`}
        data-index={props.num}
      >
        {calendarData &&
          calendarData.map((e, i) => (
            <div
              key={i}
              data-index={i}
              className={`cal-week ${props.mini && "cal-week-mini"}`}
            >
              {e.map((x, i) => (
                <div
                  key={i}
                  data-index={i}
                  id={x.date}
                  className={`cal-day ${x.date == 0 ? "hidden" : ""} ${
                    x.date === todaysDate && props.month === todaysMonth
                      ? "active"
                      : ""
                  }
                  ${props.mini && "cal-day-mini"}`}
                  style={{ backgroundColor: x.colorCode }}
                  onClick={handleCellClick}
                >
                  {x.date}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
