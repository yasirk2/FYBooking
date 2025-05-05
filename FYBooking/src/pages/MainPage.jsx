import { useEffect, useState } from "react";

import "../styles/MainPageStyle.css";

const MainPage = () => {
  const [days, setDays] = useState([]);
  const [months, setMonths] = useState([]);
  useEffect(() => {
    const dayList = [];
    const monthList = [];
    const differentMonths = [];
    for (let i = 0; i < 7; i++) {
      const today = new Date();
      today.setDate(today.getDate() + i);
      const dateNumber = today.getDate();
      const dateName = today.toLocaleDateString("en-US", { weekday: "short" });
      const month = today.toLocaleDateString("en-US", { month: "long" });

      dayList.push({ dayName: dateName, date: dateNumber });

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
    setDays(dayList);
  }, []);

  useEffect(() => {
    console.log(months.length);
  }, [months]);
  return (
    <div>
      <div className="month-div">
        {months.length === 2 ? (
          <div className="dual-months">
            {months.map((month, index) => (
              <h3 key={index}>{month}</h3>
            ))}
          </div>
        ) : (
          <h3>{months}</h3>
        )}
      </div>
      <div className="days-div">
        {days.length > 0 &&
          days.map((day, index) => (
            <div className="day-date-div" key={index}>
              <p>{day.dayName}</p>
              <p>{day.date}</p>
            </div>
          ))}
      </div>
      <div className="week-div">Week</div>
    </div>
  );
};

export default MainPage;
