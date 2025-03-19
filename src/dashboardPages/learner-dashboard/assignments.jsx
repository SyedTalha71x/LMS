import { useState, useEffect } from "react"
import { Search, Bell, ChevronRight, X } from "lucide-react"

export default function Assignments() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if screen is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Close notification panel when screen becomes large
  useEffect(() => {
    if (!isMobile) {
      setIsNotificationOpen(false)
    }
  }, [isMobile])

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen)
  }

  const assignments = [
    {
      id: 1,
      title: "Assignment",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      status: "Pending",
    },
    {
      id: 2,
      title: "Assignment",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      status: "Submitted",
    },
  ]

  const quizzes = [
    {
      id: 1,
      title: "Quiz 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      status: "Passed",
    },
    {
      id: 2,
      title: "Quiz 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      status: "Failed",
    },
  ]

  const notifications = [
    {
      id: 1,
      title: "Title",
      time: "now",
      message:
        "Hi Name! Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna porttitor",
    },
    {
      id: 2,
      title: "Assignment Graded",
      time: "2h ago",
      message: "Your assignment has been graded. You received 85/100.",
    },
    {
      id: 3,
      title: "Quiz Reminder",
      time: "1d ago",
      message: "Don't forget about your upcoming quiz on Friday.",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-green-100 text-green-800"
      case "Submitted":
        return "bg-green-100 text-green-800"
      case "Passed":
        return "bg-green-100 text-green-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col min-h-screen ">
      {/* Overlay for mobile when notification panel is open */}
      {isNotificationOpen && isMobile && (
        <div className="fixed inset-0 bg-black/50 z-20" onClick={() => setIsNotificationOpen(false)} />
      )}

      <header className=" p-4 ">
        <div className="  flex items-center justify-between">
          <h1 className="text-2xl poppins-thin_600">Assignment</h1>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100 w-full md:w-64 focus:outline-none"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>

            {isMobile ? (
              <button
                onClick={toggleNotification}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Toggle notifications"
              >
                <Bell className="h-5 w-5 text-gray-600" />
              </button>
            ) : (
              <div className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <main className={`flex-1 p-6 overflow-y-auto ${isNotificationOpen && isMobile ? "hidden" : "block"}`}>
          <div className="container mx-auto">
            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4">Assignment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="bg-[#F9F9F9] p-6 rounded-lg">
                    <h3 className="font-semibold mb-2">{assignment.title}</h3>
                    <p className="text-gray-600 mb-4">{assignment.description}</p>
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}
                      >
                        {assignment.status}
                      </span>
                      <button className="flex items-center text-gray-500 text-sm font-medium hover:text-gray-700">
                        DETAILS <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quizzes Section */}
            <section>
              <h2 className="text-xl font-bold mb-4">Quizzes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizzes.map((quiz) => (
                  <div key={quiz.id} className="bg-[#F9F9F9] p-6 rounded-lg">
                    <h3 className="font-semibold mb-2">{quiz.title}</h3>
                    <p className="text-gray-600 mb-4">{quiz.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(quiz.status)}`}>
                        {quiz.status}
                      </span>
                      <button className="flex items-center text-gray-500 text-sm font-medium hover:text-gray-700">
                        DETAILS <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>

        {/* Notification Sidebar */}
        <aside
          className={`
            ${isMobile ? "fixed inset-y-0 right-0 z-30 w-80 transform transition-transform duration-300 ease-in-out" : "w-80 border-l border-gray-200"}
            ${isNotificationOpen || !isMobile ? "translate-x-0" : "translate-x-full"}
            bg-white overflow-y-auto
          `}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Notification</h2>
              {isMobile && (
                <button onClick={() => setIsNotificationOpen(false)} className="p-1 rounded-full hover:bg-gray-100">
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="border-b border-gray-100 pb-4 last:border-0">
                  <div className="flex items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                        <span className="font-medium">{notification.title}</span>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

