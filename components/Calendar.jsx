import React, { useState } from "react";
import calendar from "calendar-js";
import moment from "moment";

export default function Calendar(props) {
  let exp = calendar()
    .of(moment().year(), props.month)
    .calendar.map((e) =>
      e.map((ex, i) => ({
        date: ex,
        month: props.month,
        colorCode: "#757575",
      }))
    );

  const todaysMonth = moment().month();
  const todaysDate = moment().date();

  //Hooks
  const [cellInfo, setCellInfo] = useState(exp);

  function dateFromDay(day, month) {
    var date = new Date(moment().year(), month); // initialize a date in `year-01-01`
    return new Date(date.setDate(day)); // add the number of days
  }

  let handleCellClick = (el) => {
    if (el.target.className.includes("active")) {
      let copyGrid = [...cellInfo];
      const cellNumber = Number(el.target.id);
      const xIndex = el.target.parentElement.getAttribute("data-index");
      const yIndex = el.target.getAttribute("data-index");
      let mutatedOject = copyGrid[xIndex][yIndex];

      copyGrid[xIndex][yIndex] = { ...mutatedOject, colorCode: props.color };

      setCellInfo(copyGrid);
    }
  };

  return (
    <div className="cal-month" data-index={props.num}>
      <span>{moment().month(props.month).format("MMMM")}</span>
      {cellInfo.map((e, i) => (
        <div key={i} data-index={i} className="cal-week">
          {e.map((x, i) => (
            <div
              key={i}
              data-index={i}
              id={x.date}
              className={`cal-day ${x.date == 0 ? "hidden" : ""} ${
                x.date == todaysDate && props.month == todaysMonth
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
