/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ChevronDown, Video } from "lucide-react"
import Image1 from "../../../public/image 50.png"
import Image2 from "../../../public/image 51.png"
import ImageCard from "../../../public/image-card.png"
import EventsImg from '../../../public/events.png'


export default function Events() {
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

  return (
    <div className="flex flex-col gap-8 md:p-4 p-2 bg-white rounded-lg">
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        <div className="w-full lg:w-3/4">
          <div className="flex md:flex-row flex-col justify-between md:items-center gap-3 items-start mb-4">
            <h2 className="text-2xl poppins-thin_600">Events</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  className="block w-full p-2 pl-10 text-sm text-gray-900 outline-none  rounded-xl bg-gray-50"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between flex-col md:flex-row gap-2 md:items-center items-start mt-5 mb-2">
            <div className="flex gap-2 items-center">
              <div className="text-sm text-gray-500 poppins-thin">02 - 08 March</div>
              <div className="flex space-x-2">
                <button onClick={prevWeek} className="p-1 rounded-md bg-[#7D8DA61A]">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button onClick={nextWeek} className="p-1 rounded-md bg-[#7D8DA61A]">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
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
                                  className={`absolute left-1 ${getEventWidth(event)} p-1.5 rounded-lg ${event.color} ${event.textColor} z-10`}
                                  style={{ top: "0px", height: event.isZoom ? "128px" : "64px" }}
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

          <div className="mt-8">
            <h2 className="text-xl poppins-thin_600 mb-4">All event</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#F9F9F9] p-4 rounded-lg flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden">
                  <img
                    src={EventsImg}
                    alt="Clinical Pharmacy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="poppins-thin_500">Clinical Pharmacy-II</h3>
                  <div className="flex items-center mt-1">
                    <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                      <img
                        src={Image1 || "/placeholder.svg"}
                        alt="Jane Copper"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm text-gray-500">Jane Copper</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#F9F9F9] p-4 rounded-lg flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden">
                  <img
                    src={EventsImg}
                    alt="Clinical Pharmacy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="poppins-thin_500">Clinical Pharmacy-II</h3>
                  <div className="flex items-center mt-1">
                    <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                      <img
                        src={Image1 || "/placeholder.svg"}
                        alt="Jane Copper"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm text-gray-500">Jane Copper</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/6">
          <div className="flex flex-col justify-between items-start gap-6 mb-4">
            <h2 className="text-xl poppins-thin_600">Add Entity</h2>
            <div className="">
              <button className="bg-[#0B5D3A] text-white text-sm font-medium py-2 px-4 rounded-xl cursor-pointer">Add event</button>
            </div>
          </div>

          <div className="bg-[#F9F9F9] p-4 poppins-thin rounded-md mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-md font-medium">January 2022</h3>
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
              {[...Array(31)].map((_, index) => {
                const day = index + 1
                const isToday = day === 1 // Just for example
                return (
                  <div
                    key={index}
                    className={`h-8 flex items-center justify-center text-sm rounded-full
                  ${isToday ? "bg-[#0B5D3A] text-white" : ""}
                  ${day > 31 ? "text-gray-300" : "hover:bg-gray-100 cursor-pointer"}
                  `}
                  >
                    {day <= 31 ? day : ""}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
