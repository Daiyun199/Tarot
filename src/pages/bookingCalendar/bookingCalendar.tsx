import { useEffect, useState } from "react";
import api from "../../config/axios";
import "./bookingCalendar.scss";

interface Slot {
  day: string;
  hour: string;
}

interface ScheduleSlot {
  dayOfWeek: string;  
  startTime: string;  
  endTime: string;   
  isBooked: boolean;
}

const hours: string[] = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

const getCurrentWeekDates = (date: Date): Date[] => {
  const startDate = new Date(date);
  startDate.setDate(startDate.getDate() - startDate.getDay() + 1); 
  return Array.from({ length: 7 }, (_, index) => {
    const newDate = new Date(startDate);
    newDate.setDate(startDate.getDate() + index);
    return newDate;
  });
};

const daysOfWeek: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function BookingCalendar(): JSX.Element {
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [bookedSlots, setBookedSlots] = useState<Slot[]>([]);
  const [upcomingSlots] = useState<Slot[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const weekDates: string[] = getCurrentWeekDates(currentDate).map((date) =>
    date.toLocaleDateString()
  );

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const response = await api.get<ScheduleSlot[]>("ScheduleReader/schedule-not-booked-of-reader");
        const slotsData = response.data;

        const fetchedBookedSlots = slotsData
          .filter((slot) => slot.isBooked)
          .map((slot) => ({
            day: slot.dayOfWeek,
            hour: slot.startTime,
          }));

        setBookedSlots(fetchedBookedSlots);
      } catch (error) {
        console.error("Error fetching booked slots:", error);
      }
    };

    fetchBookedSlots();
  }, [currentDate]);

  const handleSlotClick = (day: string, hour: string): void => {
    setSelectedSlot({ day, hour });
  };

  const getSlotClass = (day: string, hour: string): string => {
    if (bookedSlots.some((slot) => slot.day === day && slot.hour === hour)) {
      return "booked"; 
    } else if (upcomingSlots.some((slot) => slot.day === day && slot.hour === hour)) {
      return "upcoming"; 
    } else if (selectedSlot?.day === day && selectedSlot?.hour === hour) {
      return "selected"; 
    }
    return "";
  };

  const handleNextMonth = (): void => {
    const nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(nextDate);
  };

  const handlePreviousMonth = (): void => {
    const prevDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(prevDate);
  };

  const handleConfirmBooking = async (): Promise<void> => {
    if (selectedSlot) {
      try {
        const response = await api.post("Order/add-to-cart", {
          day: selectedSlot.day,
          hour: selectedSlot.hour,
        });

        if (response.status === 200) {
          alert(`Đặt lịch thành công cho ${selectedSlot.day} vào lúc ${selectedSlot.hour}`);
          setBookedSlots([...bookedSlots, selectedSlot]);
          setSelectedSlot(null);
        } else {
          alert("Đặt lịch thất bại. Vui lòng thử lại.");
        }
      } catch (error) {
        console.error("Error booking slot:", error);
        alert("Đã xảy ra lỗi khi đặt lịch. Vui lòng thử lại sau.");
      }
    }
  };

  return (
    <div className="container">
      <div className="profile-details">
        <img src="https://i.imgur.com/fGigSto.png" className="profile-image" alt="Profile" />
        <h1 className="profile-name">Weiian</h1>
        <p className="profile-likes">Lượt yêu thích: </p>
        <p className="profile-ratings">
          <span className="ratings-text">Lượt đánh giá:</span>
        </p>
        <p className="profile-expertise">Chuyên môn:</p>
      </div>

      <div className="booking-calendar">
        <h1>Calendar</h1>

        <div className="date-selector">
          <span className="calendar-title">Lịch</span>
          <button onClick={handlePreviousMonth} className="nav-button">
            &lt;
          </button>
          <span className="calendar-title">
            {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
          </span>
          <button onClick={handleNextMonth} className="nav-button">
            &gt;
          </button>
        </div>

        <div className="calendar-wrapper" key={currentDate.toISOString()}>
          <table className="calendar-table">
            <thead>
              <tr>
                <th></th>
                {daysOfWeek.map((day, index) => (
                  <th key={day}>
                    {day} <br />
                    {weekDates[index]} 
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map((hour) => (
                <tr key={hour}>
                  <td className="hour-cell">{hour}</td>
                  {daysOfWeek.map((day) => (
                    <td
                      key={`${day}-${hour}`}
                      className={`time-slot ${getSlotClass(day, hour)}`}
                      onClick={() => handleSlotClick(day, hour)}
                    >
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="color-legend-and-booking">
          <div className="color-legend">
            <p>
              <span className="booked-legend"></span> Đã được lên lịch 
            </p>
            <p>
              <span className="upcoming-legend"></span> Sự kiện sắp diễn 
            </p>
            <p>
              <span className="selected-legend"></span> Bạn đang chọn 
            </p>
          </div>

          {selectedSlot && (
            <div className="selection-info">
              <div className="booking-details">
                <p>
                  Đặt lịch của bạn: {selectedSlot.hour} <br /> 
                  Ngày: {selectedSlot.day}, {currentDate.toLocaleDateString()}
                </p>
              </div>
              <button className="confirm-button" onClick={handleConfirmBooking}>
                Xác nhận đặt lịch
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingCalendar;
