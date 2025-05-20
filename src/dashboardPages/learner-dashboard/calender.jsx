"use client"

/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ChevronDown, Video } from "lucide-react"
import Image1 from "../../../public/image 50.png"
import Image2 from "../../../public/image 51.png"
import ImageCard from "../../../public/image-card.png"

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth())
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear())
  const [weekStart, setWeekStart] = useState(new Date())

  const events = [
    {
      id: 1,
      title: "Pharmaceutics-I",
      startTime: "10:44 am",
      days: "Mon - Thu",
      color: "bg-[#FFFFFF]",
      textColor: "text-black",
      participants: 2,
      startHour: 11,
      dayIndex: 0,
      courseId: 101,
      courseLink: "/learner-dashboard/courses",
    },
    {
      id: 2,
      title: "Pharmaceutics-VII",
      startTime: "10:44 am",
      days: "Mon - Thu",
      color: "bg-[#0177FB]",
      textColor: "text-white",
      participants: 2,
      startHour: 12,
      dayIndex: 0,
      courseId: 107,
      courseLink: "/learner-dashboard/courses",
    },
    {
      id: 3,
      title: "Pathology",
      startTime: "10:44 am",
      days: "Mon - Thu",
      color: "bg-[#FE6470]",
      textColor: "text-white",
      participants: 2,
      startHour: 14,
      dayIndex: 0,
      courseId: 203,
      courseLink: "/learner-dashboard/courses",
    },
    {
      id: 4,
      title: "Webinar",
      startTime: "10:44 am",
      days: "Mon - Thu",
      color: "bg-[#01D7DF]",
      textColor: "text-black",
      participants: 0,
      isZoom: true,
      startHour: 11,
      dayIndex: 4,
      zoomLink: "https://zoom.us/j/123456789",
    },
  ]

  useEffect(() => {
    const date = new Date(currentDate)
    const day = date.getDay()
    const diff = date.getDate() - day + (day === 0 ? -6 : 1)
    date.setDate(diff)
    setWeekStart(date)
  }, [currentDate])

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  const prevWeek = () => {
    const newDate = new Date(weekStart)
    newDate.setDate(newDate.getDate() - 7)
    setWeekStart(newDate)
  }

  const nextWeek = () => {
    const newDate = new Date(weekStart)
    newDate.setDate(newDate.getDate() + 7)
    setWeekStart(newDate)
  }

  const prevMonth = () => {
    setSelectedMonth((prev) => {
      if (prev === 0) {
        setSelectedYear((y) => y - 1)
        return 11
      }
      return prev - 1
    })
  }

  const nextMonth = () => {
    setSelectedMonth((prev) => {
      if (prev === 11) {
        setSelectedYear((y) => y + 1)
        return 0
      }
      return prev + 1
    })
  }

  const formatWeekRange = () => {
    const endDate = new Date(weekStart)
    endDate.setDate(endDate.getDate() + 6)

    return `${weekStart.getDate()} - ${endDate.getDate()} ${new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      weekStart,
    )}`
  }

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart)
    date.setDate(date.getDate() + i)
    return {
      dayName: new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date),
      date: date.getDate().toString().padStart(2, "0"),
      fullDate: date,
    }
  })

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth)
    const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth)

    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1

    const days = []

    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push({ day: null, isCurrentMonth: false })
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        isToday:
          new Date().getDate() === i &&
          new Date().getMonth() === selectedMonth &&
          new Date().getFullYear() === selectedYear,
      })
    }

    return days
  }

  const getMonthName = (month) => {
    return new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(selectedYear, month, 1))
  }

  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"]

  const shouldDisplayEvent = (event, dayIndex, timeSlot) => {
    const hour = Number.parseInt(timeSlot.split(":")[0])

    if (event.startHour === hour) {
      if (event.dayIndex === dayIndex) {
        return true
      }
    }

    return false
  }

  const getEventWidth = (event) => {
    if (event.isZoom) {
      return "w-[90%]"
    }
    return "w-[calc(400%-8px)]"
  }

  const handleEventClick = (event) => {
    if (event.isZoom && event.zoomLink) {
      // Open Zoom link in a new tab
      window.open(event.zoomLink, "_blank")
    } else if (event.courseLink) {
      // Navigate to course page
      window.location.href = event.courseLink
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 md:p-4 p-2 bg-white rounded-lg">
      <div className="w-full lg:w-3/4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl poppins-thin_600">Calendar</h2>
        </div>

        <div className="flex justify-between flex-col md:flex-row gap-2 md:items-center items-start mt-10 mb-2">
          <div className="flex gap-2 items-center">
            <div className="text-sm text-gray-500 poppins-thin">{formatWeekRange()}</div>
            <div className="flex space-x-2">
              <button onClick={prevWeek} className="p-1 rounded-md bg-[#7D8DA61A]">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={nextWeek} className="p-1 rounded-md bg-[#7D8DA61A]">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div></div>
          <div className="flex poppins-thin items-center">
            <span className="text-sm text-gray-500 mr-2">(GMT +08:00) Public Time</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
        </div>

        {/* Scrollable container for small screens */}
        <div className="overflow-x-auto pb-4">
          <div className="bg-[#F9F9F9] rounded-lg p-4" style={{ minWidth: "768px" }}>
            <div className="grid grid-cols-7 mb-2">
              {weekDays.map((day, index) => (
                <div key={index} className="text-center poppins-thin">
                  <div className="text-sm font-medium">{day.dayName}</div>
                  <div className="text-sm">{day.date}</div>
                </div>
              ))}
            </div>

            <div className="relative">
              {timeSlots.map((time, timeIndex) => (
                <div key={timeIndex} className="grid grid-cols-[60px_1fr] border-t border-gray-200">
                  <div className="text-xs text-gray-500 py-4">{time.split(":")[0]}:00</div>
                  <div className="grid grid-cols-7 relative">
                    {weekDays.map((day, dayIndex) => (
                      <div key={dayIndex} className="h-16 border-l border-gray-200 relative">
                        {events.map(
                          (event) =>
                            shouldDisplayEvent(event, dayIndex, time) && (
                              <div
                                key={event.id}
                                className={`absolute left-1 ${getEventWidth(event)} p-1.5 rounded-lg ${event.color} ${event.textColor} z-10 cursor-pointer hover:opacity-90 transition-opacity`}
                                style={{ top: "0px", height: event.isZoom ? "128px" : "64px" }}
                                onClick={() => handleEventClick(event)}
                              >
                                <div className="flex justify-between items-start">
                                  <div className="flex items-start">
                                    {!event.isZoom && (
                                      <div className="mr-2">
                                        <img
                                          src={ImageCard || "/placeholder.svg"}
                                          alt="Event"
                                          className="h-full w-full rounded-xl object-cover"
                                        />
                                      </div>
                                    )}
                                    <div>
                                      <h4 className="text-sm poppins-thin_500">{event.title}</h4>
                                      <div className="text-xs mt-1 poppins-thin_500">{event.days}</div>
                                      {event.isZoom && (
                                        <div className="text-xs poppins-thin_500">{event.startTime}</div>
                                      )}
                                    </div>
                                  </div>
                                  {event.isZoom && (
                                    <div className="bg-white bg-opacity-70 p-1 rounded">
                                      <Video className="h-3 w-3 text-black" />
                                    </div>
                                  )}
                                  {event.participants > 0 && (
                                    <div className="flex -space-x-1">
                                      <img
                                        src={Image1 || "/placeholder.svg"}
                                        alt="Participant"
                                        className="h-5 w-5 rounded-full border-1 border-white object-cover"
                                      />
                                      <img
                                        src={Image2 || "/placeholder.svg"}
                                        alt="Participant"
                                        className="h-5 w-5 rounded-full border-1 border-white object-cover"
                                      />
                                    </div>
                                  )}
                                </div>
                                {/* <div className="mt-1 text-xs">
                                  {event.isZoom ? (
                                    <span className="bg-white bg-opacity-30 px-2 py-0.5 rounded text-xs">
                                      Join Zoom
                                    </span>
                                  ) : (
                                    <span className="bg-white bg-opacity-30 px-2 py-0.5 rounded text-xs">
                                      View Course
                                    </span>
                                  )}
                                </div> */}
                              </div>
                            ),
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Show scroll indicator on smaller screens */}
        <div className="lg:hidden text-center text-xs text-gray-500 mt-2">
          <span>← Swipe to view more →</span>
        </div>
      </div>

      <div className="w-full lg:w-2/6">
        <h2 className="text-2xl poppins-thin_600 mb-4">Calendar</h2>

        <div className="bg-[#F9F9F9] p-4 poppins-thin mt-10 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-medium">
              {getMonthName(selectedMonth)} {selectedYear}
            </h3>
            <div className="flex space-x-2">
              <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 text-center text-xs uppercase text-gray-500 mb-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {generateCalendarDays().map((day, index) => (
              <div
                key={index}
                className={`h-10 flex items-center justify-center text-sm rounded-full
                ${day.isToday ? "bg-[#0B5D3A] text-white" : ""}
                ${!day.day ? "text-gray-300" : "hover:bg-gray-100 cursor-pointer"}
                `}
              >
                {day.day}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-[#F9F9F9] p-4 rounded-md">
          <h3 className="text-md font-medium mb-3">Legend</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm bg-[#FFFFFF] border border-gray-200"></div>
              <span className="text-sm">Regular Course</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm bg-[#0177FB]"></div>
              <span className="text-sm">Advanced Course</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm bg-[#FE6470]"></div>
              <span className="text-sm">Special Course</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm bg-[#01D7DF]"></div>
              <span className="text-sm">Zoom Meeting</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
