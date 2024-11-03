import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../config/axios";
import "./bookingCalendar.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Slot {
  id: string;
  day: string;
  hour: string;
}

interface ScheduleSlot {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
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
  const { id, serviceId, readerId } = useParams<{
    id: string;
    serviceId: string;
    readerId: string;
  }>();
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [readerInfo, setReaderInfo] = useState<{
    name: string;
    experience: string;
    imgUrl: string;
    likes: number;
    ratings: number;
  } | null>(null);

  const weekDates: string[] = getCurrentWeekDates(currentDate).map((date) =>
    date.toLocaleDateString()
  );

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      setLoading(true);
      setError(null);
      const startDate = new Date(currentDate);
      startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
      startDate.setHours(8, 0, 0, 0);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      endDate.setHours(23, 0, 0, 0);

      try {
        const response = await api.get<ScheduleSlot[]>(
          `ScheduleReader/schedule-not-booked-of-reader`,
          {
            params: {
              startDate: startDate.toISOString(),
              endDate: endDate.toISOString(),
              readerId,
            },
          }
        );

        const slotsData = response.data;
        const fetchedAvailableSlots = slotsData.map((slot) => ({
          id: slot.id,
          day: new Date(slot.dayOfWeek).toLocaleDateString("en-US", {
            weekday: "short",
          }),
          hour: slot.startTime.slice(0, 5),
        }));
        setAvailableSlots(fetchedAvailableSlots);
      } catch (error) {
        console.error("Error fetching available slots:", error);
        setError("Unable to fetch available slots. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const fetchReaderInfo = async () => {
      try {
        const response = await api.get(`Account/detail-info/${readerId}`);
        const { name, experience, imgUrl, likes, ratings } = response.data;
        setReaderInfo({ name, experience, imgUrl, likes, ratings });
      } catch (error) {
        console.error("Error fetching reader info:", error);
      }
    };

    fetchAvailableSlots();
    fetchReaderInfo();
  }, [currentDate, readerId, id]);

  const handleSlotClick = (day: string, hour: string): void => {
    const slot = availableSlots.find(
      (slot) => slot.day === day && slot.hour === hour
    );
    if (slot) {
      setSelectedSlot(slot);
    }
  };

  const getSlotClass = (day: string, hour: string): string => {
    if (selectedSlot?.day === day && selectedSlot?.hour === hour) {
      return "selected";
    } else if (
      availableSlots.some((slot) => slot.day === day && slot.hour === hour)
    ) {
      return "available";
    }
    return "unavailable";
  };

  const handleNextWeek = (): void => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(nextDate);
  };

  const handlePreviousWeek = (): void => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(prevDate);
  };

  const handleConfirmBooking = async (): Promise<void> => {
    if (selectedSlot) {
      try {
        const response = await api.post("Order/order-detail/add-to-cart", {
          serviceId: serviceId,
          scheduleReaderId: selectedSlot.id,
        });

        if (response.status === 200) {
          toast.success(
            `Booking confirmed for ${selectedSlot.day} at ${selectedSlot.hour}`
          );
          setAvailableSlots((prev) =>
            prev.filter(
              (slot) =>
                !(
                  slot.day === selectedSlot.day &&
                  slot.hour === selectedSlot.hour
                )
            )
          );
          setSelectedSlot(null);
        } else {
          toast.error("Booking failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during booking:", error);
        toast.error("An error occurred while booking. Please try again later.");
      }
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      {readerInfo && (
        <div className="profile-details">
          <img
            src={readerInfo.imgUrl}
            className="profile-image"
            alt="Profile"
          />
          <h1 className="profile-name">{readerInfo.name}</h1>
          <p className="profile-likes">Lượt yêu thích: {readerInfo.likes}</p>
          <p className="profile-ratings">
            <span className="ratings-text">
              Lượt đánh giá: {readerInfo.ratings}
            </span>
          </p>
          <p className="profile-expertise">
            Chuyên môn: {readerInfo.experience}
          </p>
        </div>
      )}

      <div className="booking-calendar">
        <h1>Calendar</h1>

        <div className="date-selector">
          <span className="calendar-title">Lịch</span>
          <button onClick={handlePreviousWeek} className="nav-button">
            &lt;
          </button>
          <span className="calendar-title">
            Tuần của{" "}
            {currentDate.toLocaleDateString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button onClick={handleNextWeek} className="nav-button">
            &gt;
          </button>
        </div>

        {loading && <p>Loading available slots...</p>}
        {error && <p className="error-message">{error}</p>}

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
                  {daysOfWeek.map((day) => {
                    const slotClass = getSlotClass(day, hour);
                    const isSlotAvailable = slotClass === "available";

                    return (
                      <td
                        key={`${day}-${hour}`}
                        className={`time-slot ${slotClass}`}
                        onClick={
                          isSlotAvailable
                            ? () => handleSlotClick(day, hour)
                            : undefined
                        }
                      >
                        {isSlotAvailable && hour}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button onClick={handleConfirmBooking} className="confirm-button">
          Đặt lịch
        </button>
      </div>
    </div>
  );
}

export default BookingCalendar;
