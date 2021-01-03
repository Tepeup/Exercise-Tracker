import React, { useState, useEffect } from "react";
import calendar from "calendar-js";
import moment from "moment";
import firebase from "firebase/app";
import "firebase/firestore";

export default function Calendar(props) {
  let arrayToObjectArray = calendar()
    .of(moment().year(), props.month)
    .calendar.map((e) =>
      e.map((ex) => ({
        date: ex,
        month: props.month,
        colorCode: "#757575",
      }))
    );

  const todaysMonth = moment().month();
  const todaysDate = moment().date();
  const monthStringName = moment().month(props.month).format("MMMM");

  //Hooks
  const [cellInfo, setCellInfo] = useState(arrayToObjectArray);
  const [calendarData, setCalendarData] = useState(cellInfo);

  useEffect(() => {
    const firestore = firebase.firestore();
    firestore
      .collection("Charts")
      .doc(`${props.user.id}`)
      .collection("Months")
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

  function dateFromDay(day, month) {
    var date = new Date(moment().year(), month); // initialize a date in `year-01-01`
    return new Date(date.setDate(day)); // add the number of days
  }

  let handleCellClick = async (el) => {
    if (el.target.className.includes("active")) {
      let copyGrid = [...calendarData];
      const cellNumber = Number(el.target.id);
      const xIndex = el.target.parentElement.getAttribute("data-index");
      const yIndex = el.target.getAttribute("data-index");
      let mutatedOject = copyGrid[xIndex][yIndex];

      copyGrid[xIndex][yIndex] = { ...mutatedOject, colorCode: props.color };

      await firebase
        .firestore()
        .collection("Charts")
        .doc(`${props.user.id}`)
        .collection(`Months`)
        .doc(`${monthStringName}`)
        .set({ chartData: `${JSON.stringify(copyGrid)}` })
        .catch((error) => {
          alert(`Error`, error);
        });

      setCalendarData(copyGrid);
    }
  };

  return (
    <div className="cal-month" data-index={props.num}>
      <span className="month-title">{monthStringName}</span>

      {calendarData &&
        calendarData.map((e, i) => (
          <div key={i} data-index={i} className="cal-week">
            {e.map((x, i) => (
              <div
                key={i}
                data-index={i}
                id={x.date}
                className={`cal-day ${x.date == 0 ? "hidden" : ""} ${
                  x.date === todaysDate && props.month === todaysMonth
                    ? "active"
                    : ""
                }`}
                style={{ backgroundColor: x.colorCode }}
                onClick={handleCellClick}
              >
                {x.date}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
