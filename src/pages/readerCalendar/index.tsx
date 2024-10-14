// src/Scheduler.tsx
import React, { useState, useEffect, useCallback } from "react";
import {
  startOfToday,
  startOfWeek,
  addDays,
  format,
  isBefore,
  isSameDay,
} from "date-fns";
import "./index.scss";
import { toast } from "react-toastify"; // Chỉ import toast
import api from "../../config/axios";

interface TimeSlot {
  hour: number;
  selected: boolean;
  disabled: boolean;
}

interface Day {
  date: Date;
  slots: TimeSlot[];
  isPast: boolean;
}

interface SelectedSlot {
  date: string;
  hour: number;
}
interface DisabledSlot {
  dayOfWeek: string; // Định dạng ngày (ví dụ: "Monday", "Tuesday", ...)
  startTime: string; // Thời gian bắt đầu (ví dụ: "9:00")
}

const Scheduler: React.FC = () => {
  const [week, setWeek] = useState<Day[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<SelectedSlot[]>([]);
  const [disabledSlots, setDisabledSlots] = useState<DisabledSlot[]>([]);
  const generateCurrentWeek = useCallback(() => {
    const today = startOfToday();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 });
    const weekArray: Day[] = [];
    // console.log(disabledSlots); // Kiểm tra giá trị của disabledSlots
    for (let i = 0; i < 7; i++) {
      const date = addDays(weekStart, i);
      const isPastDay = isBefore(date, today) && !isSameDay(date, today);

      let slots: TimeSlot[] = [];

      if (!isPastDay) {
        slots = Array.from({ length: 14 }, (_, idx) => {
          const hour = 9 + idx;

          const isDisabled = disabledSlots.some(
            (slot) =>
              slot.dayOfWeek === format(date, "eeee") && // Kiểm tra ngày trong disabledSlots
              slot.startTime === `${hour.toString().padStart(2, "0")}:00:00` // Đảm bảo định dạng giờ khớp
          );

          return {
            hour,
            selected: selectedSlots.some(
              (slot) =>
                slot.date === format(date, "yyyy-MM-dd") && slot.hour === hour
            ),
            disabled: isDisabled, // Cập nhật trạng thái disabled cho slot
          };
        });
      }

      weekArray.push({
        date,
        slots,
        isPast: isPastDay,
      });
    }

    setWeek(weekArray); // Cập nhật state week
  }, [disabledSlots, selectedSlots]);
  // Hàm để tải dữ liệu từ localStorage
  const loadSelectedSlots = () => {
    const storedSlots = localStorage.getItem("selectedSlots");
    if (storedSlots) {
      const parsedSlots: SelectedSlot[] = JSON.parse(storedSlots);
      setSelectedSlots(parsedSlots);
      // Cập nhật trạng thái 'selected' trong week
      setWeek((prevWeek) =>
        prevWeek.map((day) => {
          const formattedDate = format(day.date, "yyyy-MM-dd");
          const daySelectedSlots = parsedSlots.filter(
            (slot) => slot.date === formattedDate
          );
          if (daySelectedSlots.length > 0) {
            return {
              ...day,
              slots: day.slots.map((s) =>
                daySelectedSlots.find((slot) => slot.hour === s.hour)
                  ? { ...s, selected: true }
                  : s
              ),
            };
          }
          return day;
        })
      );
    }
  };
  const handleSubmit = async () => {
    if (selectedSlots.length === 0) {
      toast.warn("Vui lòng chọn ít nhất một khung giờ trước khi submit.");
      return;
    }

    // setIsSubmitting(true);

    try {
      // Gửi từng yêu cầu cho từng slot
      for (const slot of selectedSlots) {
        const payload = {
          dayOfWeek: new Date(slot.date).toISOString(), // Định dạng ISO 8601 cho dayOfWeek
          startTime: `${slot.hour.toString().padStart(2, "0")}:00`, // Định dạng giờ cho startTime
          endTime: `${slot.hour.toString().padStart(2, "0")}:59`, // Định dạng giờ cho endTime
          isBooked: false,
        };

        const response = await api.post("/ScheduleReader", payload); // Thay thế bằng endpoint thực tế của bạn

        if (response.status === 200 || response.status === 201) {
          toast.success(
            "Lịch đã được gửi thành công cho khung giờ " + slot.hour + "!"
          );
        } else {
          // Xử lý các mã trạng thái không mong muốn
          toast.error(
            `Có lỗi xảy ra khi gửi lịch cho khung giờ ${slot.hour}: ${response.data.message || "Vui lòng thử lại."}`
          );
        }
      }

      // Reset các khung giờ đã chọn sau khi gửi tất cả
      setSelectedSlots([]);
      setWeek((prevWeek) =>
        prevWeek.map((day) => ({
          ...day,
          slots: day.slots.map((slot) => ({ ...slot, selected: false })),
        }))
      );

      // Xóa dữ liệu trong localStorage
      localStorage.removeItem("selectedSlots");
      await fetchSchedule();
      generateCurrentWeek();
    } catch (error: any) {
      console.error("Error submitting schedule:", error);
      // Kiểm tra nếu error.response tồn tại
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(
          `Có lỗi xảy ra khi gửi lịch: ${error.response.data.message}`
        );
      } else {
        toast.error("Có lỗi xảy ra khi gửi lịch. Vui lòng thử lại.");
      }
    } finally {
      // setIsSubmitting(false);
    }
  };

  // Hàm để lưu dữ liệu vào localStorage
  const saveSelectedSlots = (slots: SelectedSlot[]) => {
    localStorage.setItem("selectedSlots", JSON.stringify(slots));
  };
  const fetchSchedule = async () => {
    const now = new Date();
    const firstDayOfWeek = new Date(
      now.setDate(now.getDate() - now.getDay() + 1)
    ); // Thứ Hai
    const lastDayOfWeek = new Date(
      now.setDate(now.getDate() - now.getDay() + 7)
    ); // Chủ Nhật

    const startDate = firstDayOfWeek.toISOString();
    const endDate = lastDayOfWeek.toISOString();

    try {
      const response = await api.get(
        `ScheduleReader/byDateRangeAndAccount?startDate=${startDate}&endDate=${endDate}`
      );
      const scheduleData = response.data;

      const disabled = scheduleData.map((item: any) => ({
        dayOfWeek: format(new Date(item.dayOfWeek), "eeee"), // Đảm bảo định dạng đúng
        startTime: item.startTime,
      }));
      setDisabledSlots(disabled);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  // Gọi hàm để lấy lịch

  useEffect(() => {
    generateCurrentWeek();
  }, [disabledSlots, selectedSlots]); // Đảm bảo đã thêm disabledSlots vào đây

  useEffect(() => {
    fetchSchedule();
  }, []);

  useEffect(() => {
    if (disabledSlots.length > 0) {
      generateCurrentWeek();
    }
  }, [disabledSlots]);

  useEffect(() => {
    loadSelectedSlots();
  }, []);

  useEffect(() => {
    saveSelectedSlots(selectedSlots);
  }, [selectedSlots]);

  const toggleSlot = (dayIdx: number, slotIdx: number) => {
    const day = week[dayIdx];
    if (day.slots.length === 0) return; // Không có slot để chọn

    const slot = day.slots[slotIdx];
    const slotKey = `${format(day.date, "yyyy-MM-dd")}-${slot.hour}`;

    if (slot.selected) {
      // Nếu đã chọn, bỏ chọn
      const newWeek = [...week];
      newWeek[dayIdx] = {
        ...newWeek[dayIdx],
        slots: [...newWeek[dayIdx].slots],
      };
      newWeek[dayIdx].slots[slotIdx].selected = false;
      setWeek(newWeek);

      setSelectedSlots((prevSelected) =>
        prevSelected.filter(
          (s) =>
            !(s.date === format(day.date, "yyyy-MM-dd") && s.hour === slot.hour)
        )
      );
      toast.info(`Bạn đã bỏ chọn slot: ${slotKey}`);
    } else {
      // Nếu chưa chọn, chọn
      const newWeek = [...week];
      newWeek[dayIdx] = {
        ...newWeek[dayIdx],
        slots: [...newWeek[dayIdx].slots],
      };
      newWeek[dayIdx].slots[slotIdx].selected = true;
      setWeek(newWeek);

      setSelectedSlots((prevSelected) => [
        ...prevSelected,
        {
          date: format(day.date, "yyyy-MM-dd"),
          hour: slot.hour,
        },
      ]);
      toast.success(`Bạn đã chọn slot: ${slotKey}`);
    }
  };

  const removeSelectedSlot = (index: number) => {
    const slotToRemove = selectedSlots[index];
    setSelectedSlots((prevSelected) =>
      prevSelected.filter((_, idx) => idx !== index)
    );

    setWeek((prevWeek) =>
      prevWeek.map((day) => {
        if (format(day.date, "yyyy-MM-dd") === slotToRemove.date) {
          return {
            ...day,
            slots: day.slots.map((s) =>
              s.hour === slotToRemove.hour ? { ...s, selected: false } : s
            ),
          };
        }
        return day;
      })
    );

    toast.info(
      `Bạn đã xóa slot: ${format(new Date(slotToRemove.date), "EEEE dd/MM")}, ${slotToRemove.hour}:00`
    );
  };

  return (
    <div className="scheduler-container">
      <h2>Chọn Lịch Rảnh</h2>
      <div className="week">
        {week.map((day, dayIdx) => (
          <div key={dayIdx} className="day">
            <div className={`day-header ${day.isPast ? "past-day" : ""}`}>
              {format(day.date, "EEEE dd/MM")}
            </div>
            <div className="slots">
              {day.slots.length === 0 ? (
                <div className="no-slots">Không có ca</div>
              ) : (
                day.slots.map((slot, slotIdx) => (
                  <div
                    key={slotIdx}
                    className={`slot ${slot.selected ? "selected" : ""} ${slot.disabled ? "disabled" : ""}`} // Thêm lớp disabled
                    onClick={() =>
                      !slot.disabled && toggleSlot(dayIdx, slotIdx)
                    } // Chỉ cho phép chọn nếu không disabled
                  >
                    {slot.hour}:00 {slot.selected && <span>✔️</span>}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="selected-slots">
        <h3>Các Khung Giờ Đã Chọn:</h3>
        {selectedSlots.length === 0 ? (
          <p>Chưa có khung giờ nào được chọn.</p>
        ) : (
          <ul>
            {selectedSlots.map((slot, idx) => (
              <li key={idx}>
                {format(new Date(slot.date), "EEEE dd/MM")}, {slot.hour}:00
                <button onClick={() => removeSelectedSlot(idx)}>Xóa</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="submit-button-container">
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Scheduler;
