/* eslint-disable no-unused-vars */
"use client"

import { useState, useMemo } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Video, Filter, Download, CalendarIcon, BookOpen, Bell } from "lucide-react"

const localizer = momentLocalizer(moment)

export default function EnhancedCalendar() {
  const [currentView, setCurrentView] = useState("month")
  const [currentDate, setCurrentDate] = useState(new Date(2024, 8, 20)) // September is month 8 (0-indexed)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCourses, setSelectedCourses] = useState([])
  const [selectedEventTypes, setSelectedEventTypes] = useState([])
  const [showExportMenu, setShowExportMenu] = useState(false)

  const allEvents = [
    {
      id: 1,
      title: "Pharmaceutics-I Assignment Due",
      start: new Date(2024, 8, 20, 23, 59), // Sept 20, 2024
      end: new Date(2024, 8, 20, 23, 59),
      type: "assignment",
      course: "Pharmaceutics-I",
      courseId: 101,
      color: "#EF4444",
      description: "Submit final assignment for Pharmaceutics-I course",
    },
    {
      id: 2,
      title: "Pharmaceutics-VII Course Starts",
      start: new Date(2024, 8, 20, 9, 0), // Sept 20, 2024
      end: new Date(2024, 8, 20, 10, 30),
      type: "course",
      course: "Pharmaceutics-VII",
      courseId: 107,
      color: "#3B82F6",
      description: "First day of Pharmaceutics-VII course",
    },
    {
      id: 3,
      title: "Pathology Live Session",
      start: new Date(2024, 8, 20, 14, 0), // Sept 20, 2024
      end: new Date(2024, 8, 20, 15, 30),
      type: "live_session",
      course: "Pathology",
      courseId: 203,
      color: "#F59E0B",
      description: "Interactive pathology session with Dr. Smith",
      zoomLink: "https://zoom.us/j/123456789",
    },
    {
      id: 4,
      title: "Weekly Webinar: Medical Updates",
      start: new Date(2024, 8, 20, 11, 0), // Sept 20, 2024
      end: new Date(2024, 8, 20, 12, 0),
      type: "webinar",
      course: "General",
      color: "#10B981",
      description: "Latest updates in medical field",
      zoomLink: "https://zoom.us/j/987654321",
    },
    {
      id: 5,
      title: "Reminder: Study Group Meeting",
      start: new Date(2024, 8, 20, 16, 0), // Sept 20, 2024
      end: new Date(2024, 8, 20, 17, 0),
      type: "reminder",
      course: "General",
      color: "#8B5CF6",
      description: "Weekly study group discussion",
    },
    {
      id: 6,
      title: "Pharmaceutics-I Course Ends",
      start: new Date(2024, 8, 21, 17, 0), // Sept 21, 2024
      end: new Date(2024, 8, 21, 17, 0),
      type: "course",
      course: "Pharmaceutics-I",
      courseId: 101,
      color: "#059669",
      description: "Final day of Pharmaceutics-I course",
    },
    {
      id: 7,
      title: "Anatomy Quiz Due",
      start: new Date(2024, 8, 19, 18, 0), // Sept 19, 2024
      end: new Date(2024, 8, 19, 18, 0),
      type: "assignment",
      course: "Anatomy",
      courseId: 102,
      color: "#DC2626",
      description: "Online anatomy quiz submission deadline",
    },
    {
      id: 8,
      title: "Biochemistry Lab Session",
      start: new Date(2024, 8, 22, 10, 0), // Sept 22, 2024
      end: new Date(2024, 8, 22, 12, 0),
      type: "live_session",
      course: "Biochemistry",
      courseId: 204,
      color: "#D97706",
      description: "Hands-on biochemistry laboratory work",
    },
  ]

  const courses = [...new Set(allEvents.map((event) => event.course))]
  const eventTypes = [
    { key: "assignment", label: "Assignments", icon: BookOpen },
    { key: "course", label: "Course Dates", icon: CalendarIcon },
    { key: "live_session", label: "Live Sessions", icon: Video },
    { key: "webinar", label: "Webinars", icon: Video },
    { key: "reminder", label: "Reminders", icon: Bell },
  ]

  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      const courseMatch = selectedCourses.length === 0 || selectedCourses.includes(event.course)
      const typeMatch = selectedEventTypes.length === 0 || selectedEventTypes.includes(event.type)
      return courseMatch && typeMatch
    })
  }, [selectedCourses, selectedEventTypes])

  const EventComponent = ({ event }) => {
    const getEventIcon = (type) => {
      const iconMap = {
        assignment: BookOpen,
        course: CalendarIcon,
        live_session: Video,
        webinar: Video,
        reminder: Bell,
      }
      const Icon = iconMap[type] || CalendarIcon
      return <Icon className="w-3 h-3 mr-1" />
    }

    return (
      <div className="flex items-center text-xs">
        {getEventIcon(event.type)}
        <span className="truncate">{event.title}</span>
      </div>
    )
  }

  const AgendaView = () => {
    const sortedEvents = filteredEvents
      .sort((a, b) => new Date(a.start) - new Date(b.start))
      .filter((event) => new Date(event.start) >= new Date())

    return (
      <div className="bg-white rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {sortedEvents.map((event) => (
            <div key={event.id} className="border-l-4 pl-4 py-2" style={{ borderColor: event.color }}>
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">{event.title}</h4>
                <span className="text-xs text-gray-500">{moment(event.start).format("MMM DD, YYYY HH:mm")}</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">{event.description}</p>
              <div className="flex items-center mt-2 space-x-2">
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">{event.course}</span>
                <span className="text-xs bg-blue-100 px-2 py-1 rounded capitalize">{event.type.replace("_", " ")}</span>
                {event.zoomLink && (
                  <button
                    onClick={() => window.open(event.zoomLink, "_blank")}
                    className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200"
                  >
                    Join Meeting
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const exportToCalendar = (format) => {
    const events = filteredEvents.map((event) => ({
      title: event.title,
      start: event.start,
      end: event.end,
      description: event.description,
      location: event.zoomLink || "",
    }))

    if (format === "google") {
      const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(events[0]?.title || "Event")}&dates=${moment(events[0]?.start).format("YYYYMMDDTHHmmss")}/${moment(events[0]?.end).format("YYYYMMDDTHHmmss")}&details=${encodeURIComponent(events[0]?.description || "")}`
      window.open(googleUrl, "_blank")
    } else if (format === "ics") {
      // Simple ICS generation
      let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Calendar//EN\n"
      events.forEach((event) => {
        icsContent += `BEGIN:VEVENT\n`
        icsContent += `SUMMARY:${event.title}\n`
        icsContent += `DTSTART:${moment(event.start).format("YYYYMMDDTHHmmss")}\n`
        icsContent += `DTEND:${moment(event.end).format("YYYYMMDDTHHmmss")}\n`
        icsContent += `DESCRIPTION:${event.description}\n`
        icsContent += `END:VEVENT\n`
      })
      icsContent += "END:VCALENDAR"

      const blob = new Blob([icsContent], { type: "text/calendar" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "calendar.ics"
      a.click()
    }
    setShowExportMenu(false)
  }

  const handleCourseFilter = (course) => {
    setSelectedCourses((prev) => (prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course]))
  }

  const handleEventTypeFilter = (type) => {
    setSelectedEventTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const clearFilters = () => {
    setSelectedCourses([])
    setSelectedEventTypes([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Events</h1>
            <p className="text-blue-100 mt-1">Manage your academic schedule with ease</p>
          </div>  

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-white/20 backdrop-blur-sm rounded-xl p-1">
              {["month", "week", "day", "agenda"].map((view) => (
                <button
                  key={view}
                  onClick={() => setCurrentView(view)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentView === view
                      ? "bg-white text-blue-600 shadow-md transform scale-105"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`} 
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-sm gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-200 border border-white/20"
            >
              <Filter className="w-4 h-4" />
              Filters
              {(selectedCourses.length > 0 || selectedEventTypes.length > 0) && (
                <span className="bg-yellow-400 text-blue-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {selectedCourses.length + selectedEventTypes.length}
                </span>
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex text-sm items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-200 border border-white/20"
              >
                <Download className="w-4 h-4" />
                Export
              </button>

              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-70 bg-white rounded-xl shadow-xl border border-gray-200 z-10 overflow-hidden">
                  <button
                    onClick={() => exportToCalendar("google")}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-blue-50 text-gray-700 transition-colors"
                  >
                    Export to Google Calendar
                  </button>
                  <button
                    onClick={() => exportToCalendar("ics")}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-blue-50 text-gray-700 transition-colors border-t border-gray-100"
                  >
                    Download ICS File
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="mt-6 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white text-lg">🔍 Filters</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-yellow-200 hover:text-yellow-100 font-medium transition-colors"
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Course Filter */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">📚 Courses</h4>
                <div className="space-y-2">
                  {courses.map((course) => (
                    <label key={course} className="flex items-center group cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(course)}
                        onChange={() => handleCourseFilter(course)}
                        className="mr-3 rounded w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="text-sm text-white/90 group-hover:text-white transition-colors">{course}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Event Type Filter */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">🎯 Event Types</h4>
                <div className="space-y-2">
                  {eventTypes.map(({ key, label, icon: Icon }) => (
                    <label key={key} className="flex items-center group cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedEventTypes.includes(key)}
                        onChange={() => handleEventTypeFilter(key)}
                        className="mr-3 rounded w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                      />
                      <Icon className="w-4 h-4 mr-2 text-white/70 group-hover:text-white transition-colors" />
                      <span className="text-sm text-white/90 group-hover:text-white transition-colors">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="md:p-6 p-2">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {currentView === "agenda" ? (
            <div className="p-6">
              <AgendaView />
            </div>
          ) : (
            <div className="md:p-6 p-3">
              <div style={{ height: "700px" }}>
                <Calendar
                  localizer={localizer}
                  events={filteredEvents}
                  startAccessor="start"
                  endAccessor="end"
                  view={currentView}
                  onView={setCurrentView}
                  date={currentDate}
                  onNavigate={setCurrentDate}
                  components={{
                    event: EventComponent,
                  }}
                  eventPropGetter={(event) => ({
                    style: {
                      backgroundColor: event.color,
                      borderColor: event.color,
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: "500",
                      padding: "4px 8px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    },
                  })}
                  onSelectEvent={(event) => {
                    if (event.zoomLink) {
                      window.open(event.zoomLink, "_blank")
                    }
                  }}
                  popup
                  showMultiDayTimes
                  step={60}
                  timeslots={1}
                  className="custom-calendar"
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 bg-white rounded-2xl shadow-xl border border-gray-200 md:p-6 p-3">
          <h3 className="text-xl font-bold mb-6 text-gray-800">🏷️ Event Types Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {eventTypes.map(({ key, label, icon: Icon }) => {
              const eventColor = allEvents.find((e) => e.type === key)?.color || "#6B7280"
              return (
                <div
                  key={key}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: eventColor }} />
                  <Icon className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-calendar {
          font-family: inherit;
          border-radius: 12px;
          overflow: hidden;
        }
        
        .rbc-calendar {
          background: white;
          border: none;
        }
        
        .rbc-header {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-bottom: 2px solid #e2e8f0;
          padding: 16px 12px;
          font-weight: 600;
          color: #374151;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.5px;
        }
        
        .rbc-today {
          background-color: #dbeafe !important;
          border-radius: 8px;
        }
        
        .rbc-event {
          border-radius: 8px;
          padding: 4px 8px;
          font-size: 12px;
          font-weight: 500;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          border: none !important;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .rbc-event:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        
        .rbc-toolbar {
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 12px;
          padding: 0 4px;
        }
        
        .rbc-toolbar button {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border: 2px solid #e2e8f0;
          padding: 10px 16px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          transition: all 0.2s ease;
        }
        
        .rbc-toolbar button:hover {
          background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
          border-color: #cbd5e1;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .rbc-toolbar button.rbc-active {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          border-color: #2563eb;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        
        .rbc-time-view .rbc-time-gutter {
          background: #f8fafc;
          border-right: 2px solid #e2e8f0;
        }
        
        .rbc-time-view .rbc-time-content {
          border-left: none;
        }
        
        .rbc-timeslot-group {
          border-bottom: 1px solid #f1f5f9;
        }
        
        .rbc-day-slot .rbc-time-slot {
          border-top: 1px solid #f1f5f9;
        }
        
        @media (max-width: 768px) {
          .rbc-toolbar {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
          }
          
          .rbc-toolbar-label {
            text-align: center;
            margin: 12px 0;
            font-size: 18px;
            font-weight: 600;
            color: #374151;
          }
          
          .rbc-btn-group {
            display: flex;
            justify-content: center;
            gap: 8px;
            flex-wrap: wrap;
          }
          
          .rbc-btn-group button {
            flex: 1;
            min-width: 80px;
          }
        }
      `}</style>
    </div>
  )
}
