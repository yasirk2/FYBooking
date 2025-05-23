import MainContext from "../providers/contexts/MainContext";
import "../styles/MainPageStyle.css";
import { useContext, useEffect, useState } from "react";
import useMediaQuery from "../utils/useMediaQuery";

const Schedule = () => {
  const [days, setDays] = useState([]);
  const [months, setMonths] = useState([]);
  const [weekDays, setWeekDays] = useState(0);
  const { selectedDate, setSelectedDate } = useContext(MainContext);
  const isTablet = useMediaQuery("(min-width: 768px)");

  // getCalender handles the calender and weekDays adds or subracts the amount of days is should show
  const getCalendar = (weekDays) => {
    const dayList = [];
    const monthList = [];
    const differentMonths = [];
    for (let i = 0; i < 7; i++) {
      const today = new Date();
      today.setDate(today.getDate() + i + weekDays);
      const dateNumber = today.getDate();
      const dateName = today.toLocaleDateString("en-US", { weekday: "short" });
      const dayFullName = today.toLocaleDateString("en-US", {
        weekday: "long",
      });
      const month = today.toLocaleDateString("en-US", { month: "long" });

      dayList.push({ dayName: dateName, date: dateNumber, dayFullName, month });

      monthList.push(month);
    }

    const sameMonth = monthList.every((month) => month === monthList[0]);

    if (sameMonth) {
      setMonths(monthList[0]);
    } else {
      for (let i = 0; i < monthList.length; i++) {
        if (monthList[i] !== monthList[i + 1]) {
          differentMonths.push(monthList[i].slice(0, 3));
        }
      }
      setMonths(differentMonths);
    }
    sessionStorage.setItem("days", JSON.stringify(dayList));
    setDays(dayList);
  };

  useEffect(() => {
    getCalendar(weekDays);
  }, [weekDays]);

  useEffect(() => {
    if (days.length > 1) {
      setSelectedDate((prev) => ({
        ...prev,
        dayName: days[0].dayName,
        date: days[0].date,
        dayFullName: days[0].dayFullName,
        month: days[0].month,
      }));
    }
  }, [days]);

  // Tag changes from div to button depending on the screensize.
  // this is so that the screenreader does not read som tags that should not be read in som cases
  const Tag = isTablet ? "div" : "button";
  return (
    <div className="upper-main-page">
      <div className="month-div">
        {months.length === 2 ? (
          <div className="dual-months">
            {months.map((month, index) => (
              <h2 className="month-h2" key={index}>
                {month}
              </h2>
            ))}
          </div>
        ) : (
          <h2 className="month-h2">{months}</h2>
        )}
      </div>
      <div className="days-div">
        {days.length > 0 &&
          days.map((day, index) => (
            <Tag
              onClick={() => {
                setSelectedDate((prev) => ({
                  ...prev,
                  dayName: day.dayName,
                  date: day.date,
                  dayFullName: day.dayFullName,
                  month: day.month,
                }));
              }}
              className={`day-date-div ${
                !isTablet && selectedDate.date === day.date
                  ? "selected-date"
                  : ""
              }`}
              key={index}
              aria-label={`select ${day.dayFullName} the ${day.date} in ${day.month} `}
            >
              <p className="day-name-p">{day.dayName}</p>
              <p>{day.date}</p>
            </Tag>
          ))}
      </div>
      <div className="week-div">
        <button
          className="week-btn"
          onClick={() => setWeekDays((days) => days - 7)}
        >
          <img
            src="/Arrowback.svg"
            alt="week arrow back"
            className="arrow-icon"
          />
        </button>
        <button
          style={{ borderBottom: "solid 2px black" }}
          className="week-btn"
          onClick={() => setWeekDays(0)}
        >
          This week
        </button>
        <button
          className="week-btn"
          onClick={() => setWeekDays((days) => days + 7)}
        >
          <img
            src="/Arrowforward.svg"
            alt="week arrow forward"
            className="arrow-icon"
          />
        </button>
      </div>
    </div>
  );
};

export default Schedule;
