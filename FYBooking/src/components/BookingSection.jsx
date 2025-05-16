import { useContext, useEffect, useState } from "react";
import "../styles/MainPageStyle.css";
import MainContext from "../providers/contexts/MainContext";
import { getSelectedItems } from "../data/db";

const BookingSection = () => {
  const { selectedDate, setDateModuleVisibility, updateBookings, setIsBooked } =
    useContext(MainContext);
  const [selectedRoom] = useState(() => {
    const stored = sessionStorage.getItem("selectedRoom");
    try {
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [timeSlots, setTimeSlots] = useState(null);
  const startTime = selectedRoom.start_time;
  const endTime = selectedRoom.end_time;
  const intervall = Number(selectedRoom.slot_duration);
  const [bookings, setBookings] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [days, setDays] = useState(JSON.parse(sessionStorage.getItem("days")));

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
    setBookings(getSelectedItems("bookings"));
  }, [selectedDate, updateBookings]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log(windowWidth);
    console.log(JSON.parse(sessionStorage.getItem("days")));
  }, [windowWidth]);

  return (
    <div className="lower-main-page">
      {windowWidth > 768 ? (
        <div className="lower-main-page-tablet">
          {timeSlots !== null &&
            timeSlots[1].map((timeSlot, index) => {
              const endTime = timeSlots[1][index + 1];
              if (index === timeSlots[1].length - 1) {
                return null;
              }
              return (
                <div className="tablet-timeslots" key={index}>
                  <div className="tablet-timeslot-p-div">
                    <p>{timeSlot}</p>
                  </div>
                  <div className="tablet-timeslots-days-outer-div">
                    {days.length > 1 &&
                      days.map((day, index) => (
                        <div
                          className="tablet-timeslots-days"
                          key={index}
                        ></div>
                      ))}
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        timeSlots !== null &&
        timeSlots[1].map((timeSlot, index) => {
          const endTime = timeSlots[1][index + 1];
          if (index === timeSlots[1].length - 1) {
            return null;
          }
          const checkBookings = bookings.some(
            (booking) =>
              booking.room_id === selectedRoom.room_id &&
              booking.dayName === selectedDate.dayName &&
              booking.date === selectedDate.date &&
              booking.month === selectedDate.month &&
              booking.start_time === timeSlot
          );

          return (
            <div
              onClick={() => {
                sessionStorage.setItem(
                  "setSelectedDateTime",
                  JSON.stringify({
                    date: selectedDate.date,
                    dayFullName: selectedDate.dayFullName,
                    dayName: selectedDate.dayName,
                    month: selectedDate.month,
                    startTime: timeSlot,
                    endTime: endTime,
                  })
                );
                setIsBooked(checkBookings);
                setDateModuleVisibility(true);
              }}
              className={
                checkBookings ? `booking-slot unavailable` : `booking-slot`
              }
              key={index}
            >
              <p>{timeSlot}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default BookingSection;
