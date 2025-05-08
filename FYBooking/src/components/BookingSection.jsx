import { useContext, useEffect, useState } from "react";
import "../styles/MainPageStyle.css";
import MainContext from "../providers/contexts/MainContext";

const BookingSection = () => {
  const { selectedDate, setSelectedDateTime, setDateModuleVisibility } =
    useContext(MainContext);
  const [timeSlots, setTimeSlots] = useState(null);
  const startTime = "08:00";
  const endTime = "16:00";
  const intervall = 60;

  //   generates timeSlots.
  const generateIntervall = (startTime, endTime, intervall) => {
    const timeSlot = [];

    // Splits the hours and minutes and converts the strings to numbers
    const [startHour, startMin] = startTime.split(":").map(Number);
    const [endHour, endMin] = endTime.split(":").map(Number);

    // The variables contains the total minutes from midnight/amount total time in minutes
    const startTotalMinutes = startHour * 60 + startMin;
    const endTotalMinutes = endHour * 60 + endMin + intervall;

    //uses starttime, endtime and intervall to generate the right amount of timeslots
    for (
      let minutes = startTotalMinutes;
      minutes <= endTotalMinutes;
      minutes += intervall
    ) {
      const hour = Math.floor(minutes / 60);
      const min = minutes % 60;

      const formattedTimeSlots = `${hour.toString().padStart(2, "0")}:${min
        .toString()
        .padStart(2, "0")}`;

      timeSlot.push(formattedTimeSlots);
    }

    setTimeSlots([
      {
        date: selectedDate.date,
        dayFullName: selectedDate.dayFullName,
        dayName: selectedDate.dayName,
        month: selectedDate.month,
      },
      timeSlot,
    ]);
  };

  useEffect(() => {
    generateIntervall(startTime, endTime, intervall);
  }, [selectedDate]);

  return (
    <div className="lower-main-page">
      {timeSlots !== null &&
        timeSlots[1].map((timeSlot, index) => {
          const endTime = timeSlots[1][index + 1];
          if (index === timeSlots[1].length - 1) {
            return null;
          }
          return (
            <div
              onClick={() => {
                setSelectedDateTime((prev) => ({
                  ...prev,
                  date: selectedDate.date,
                  dayFullName: selectedDate.dayFullName,
                  dayName: selectedDate.dayName,
                  month: selectedDate.month,
                  startTime: timeSlot,
                  endTime: endTime,
                }));
                setDateModuleVisibility(true);
              }}
              className="booking-slot"
              key={index}
            >
              <p>{timeSlot}</p>
            </div>
          );
        })}
    </div>
  );
};

export default BookingSection;
