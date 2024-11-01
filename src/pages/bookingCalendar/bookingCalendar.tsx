import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diff = day === 0 ? -6 : 1 - day; 
  startOfWeek.setDate(startOfWeek.getDate() + diff);

  const weekDates = Array.from({ length: 7 }, (_, index) => {
    const nextDate = new Date(startOfWeek);
    nextDate.setDate(startOfWeek.getDate() + index);
    return nextDate;
  });

  return weekDates;
};

const daysOfWeek: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function BookingCalendar(): JSX.Element {
  const { id, packageId } = useParams<{ id: string; packageId: string }>();
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [bookedSlots, setBookedSlots] = useState<Slot[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [readerInfo, setReaderInfo] = useState<{ name: string; experience: string; imgUrl: string; likes: number; ratings: number } | null>(null);

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

    const fetchReaderInfo = async () => {
      try {
        const response = await api.get(`Account/detail-info/${id}`);
        const { name, experience, imgUrl, likes, ratings } = response.data;
        setReaderInfo({ name, experience, imgUrl, likes, ratings });
      } catch (error) {
        console.error("Error fetching reader info:", error);
      }
    };

    fetchBookedSlots();
    fetchReaderInfo();
  }, [currentDate, id]);

  const handleSlotClick = (day: string, hour: string): void => {
    setSelectedSlot({ day, hour });
  };

  const getSlotClass = (day: string, hour: string): string => {
    if (bookedSlots.some((slot) => slot.day === day && slot.hour === hour)) {
      return "booked"; 
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
        const response = await api.post("Order/order-detail/add-to-cart", {
          day: selectedSlot.day,
          hour: selectedSlot.hour,
          packageId: packageId, 
          scheduleReaderId: id, 
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
      {readerInfo && (
        <div className="profile-details">
          <img src={readerInfo.imgUrl} className="profile-image" alt="Profile" />
          <h1 className="profile-name">{readerInfo.name}</h1>
          <p className="profile-likes">Lượt yêu thích: {readerInfo.likes}</p>
          <p className="profile-ratings">
            <span className="ratings-text">Lượt đánh giá: {readerInfo.ratings}</span>
          </p>
          <p className="profile-expertise">Chuyên môn: {readerInfo.experience}</p>
        </div>
      )}

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
