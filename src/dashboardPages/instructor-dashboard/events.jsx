/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, Video } from "lucide-react";

export default function Events() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [weekStart, setWeekStart] = useState(new Date());

  // Sample events data
  const events = [
    {
      id: 1,
      title: "Pharmaceutics-I",
      startTime: "10:44 am",
      days: "Mon - Thu",
      color: "bg-purple-500",
      participants: 2,
      startHour: 11,
    },
    {
      id: 2,
      title: "Pharmaceutics-VII",
      startTime: "10:44 am",
      days: "Mon - Thu",
      color: "bg-blue-500",
      participants: 2,
      startHour: 12,
    },
    {
      id: 3,
      title: "Pathology",
      startTime: "10:44 am",
      days: "Mon - Thu",
      color: "bg-pink-500",
      participants: 2,
      startHour: 14,
    },
    {
      id: 4,
      title: "Webinar",
      startTime: "10:44 am",
      days: "Mon - Thu",
      color: "bg-cyan-300",
      participants: 0,
      isZoom: true,
      startHour: 11,
    },
  ];

  // Initialize week start date
  useEffect(() => {
    const date = new Date(currentDate);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    date.setDate(diff);
    setWeekStart(date);
  }, [currentDate]);

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week for first day of month
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Navigate to previous week
  const prevWeek = () => {
    const newDate = new Date(weekStart);
    newDate.setDate(newDate.getDate() - 7);
    setWeekStart(newDate);
  };

  // Navigate to next week
  const nextWeek = () => {
    const newDate = new Date(weekStart);
    newDate.setDate(newDate.getDate() + 7);
    setWeekStart(newDate);
  };

  // Navigate to previous month
  const prevMonth = () => {
    setSelectedMonth((prev) => {
      if (prev === 0) {
        setSelectedYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  // Navigate to next month
  const nextMonth = () => {
    setSelectedMonth((prev) => {
      if (prev === 11) {
        setSelectedYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  // Format date range for week view
  const formatWeekRange = () => {
    const endDate = new Date(weekStart);
    endDate.setDate(endDate.getDate() + 6);

    return `${weekStart.getDate()} - ${endDate.getDate()} ${new Intl.DateTimeFormat(
      "en-US",
      { month: "long" }
    ).format(weekStart)}`;
  };

  // Generate week days
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    return {
      dayName: new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
        date
      ),
      date: date.getDate(),
      fullDate: date,
    };
  });

  // Generate calendar days for month view
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);

    // Adjust for Sunday as 0
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

    const days = [];

    // Add empty cells for days before the first day of month
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push({ day: null, isCurrentMonth: false });
    }

    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        isToday:
          new Date().getDate() === i &&
          new Date().getMonth() === selectedMonth &&
          new Date().getFullYear() === selectedYear,
      });
    }

    return days;
  };

  // Get month name
  const getMonthName = (month) => {
    return new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      new Date(selectedYear, month, 1)
    );
  };

  // Time slots for week view
  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
  ];

  // Check if event should be displayed on a specific day and time
  const shouldDisplayEvent = (event, dayIndex, timeSlot) => {
    // For this example, we'll display events on their specified days and hours
    const hour = Number.parseInt(timeSlot.split(":")[0]);

    // Simple logic to determine if event should be shown
    // In a real app, you'd check actual event dates
    if (event.startHour === hour) {
      if (event.days.includes("Mon") && dayIndex === 0) return true;
      if (event.days.includes("Thu") && dayIndex === 3) return true;
    }

    return false;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4 bg-white rounded-lg">
      {/* Weekly Calendar View */}
      <div className="w-full lg:w-3/4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl poppins-thin_600">Calendar</h2>
        </div>

        <div className="flex justify-between items-center mt-10  mb-2">
          <div className="flex gap-2 items-center">
            <div className="text-sm text-gray-500 poppins-thin">{formatWeekRange()}</div>
            <div className="flex space-x-2">
              <button
                onClick={prevWeek}
                className="p-1 rounded-md bg-[#7D8DA61A]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextWeek}
                className="p-1 rounded-md bg-[#7D8DA61A]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div></div>
          <div className="flex poppins-thin items-center">
            <span className="text-sm text-gray-500 mr-2">
              (GMT +08:00) Public Time
            </span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
        </div>

        <div className="bg-[#F9F9F9] rounded-lg p-4">
          {/* Week days header */}
          <div className="grid grid-cols-7 mb-2">
            {weekDays.map((day, index) => (
              <div key={index} className="text-center  poppins-thin">
                <div className="text-sm font-medium">{day.dayName}</div>
                <div className="text-sm">{day.date}</div>
              </div>
            ))}
          </div>

          {/* Time slots */}
          <div className="relative">
            {timeSlots.map((time, timeIndex) => (
              <div
                key={timeIndex}
                className="grid grid-cols-[60px_1fr] border-t border-gray-200"
              >
                <div className="text-xs text-gray-500 py-4">
                  {time.split(":")[0]}:00
                </div>
                <div className="grid grid-cols-7 relative">
                  {/* Event blocks */}
                  {weekDays.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="h-16 border-l border-gray-200 relative"
                    >
                      {events.map(
                        (event) =>
                          shouldDisplayEvent(event, dayIndex, time) && (
                            <div
                              key={event.id}
                              className={`absolute left-1 right-1 p-2 rounded-lg ${event.color} text-white z-10`}
                              style={{ top: "0px", height: "64px" }}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="text-sm font-medium">
                                    {event.title}
                                  </h4>
                                  <div className="text-xs mt-1">
                                    {event.days}
                                  </div>
                                  <div className="text-xs">
                                    {event.startTime}
                                  </div>
                                </div>
                                {event.isZoom && (
                                  <div className="bg-white bg-opacity-20 p-1 rounded">
                                    <Video className="h-3 w-3 text-white" />
                                  </div>
                                )}
                                {event.participants > 0 && (
                                  <div className="flex -space-x-1">
                                    {Array.from({
                                      length: event.participants,
                                    }).map((_, i) => (
                                      <div
                                        key={i}
                                        className="h-5 w-5 rounded-full bg-gray-300 border-2 border-white"
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Calendar View */}
      <div className="w-full  lg:w-2/6 ">
        <h2 className="text-2xl poppins-thin_600  mb-4">Calendar</h2>

        <div className="bg-[#F9F9F9] p-4 poppins-thin mt-10 rounded-md">
          <div className="flex  justify-between items-center mb-4">
            <h3 className="text-md font-medium">
              {getMonthName(selectedMonth)} {selectedYear}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={prevMonth}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextMonth}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 text-center text-xs uppercase text-gray-500 mb-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {generateCalendarDays().map((day, index) => (
              <div
                key={index}
                className={`h-10 flex items-center justify-center text-sm rounded-full
                ${day.isToday ? "bg-[#0B5D3A] text-white" : ""}
                ${
                  !day.day
                    ? "text-gray-300"
                    : "hover:bg-gray-100 cursor-pointer"
                }
                `}
              >
                {day.day}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
