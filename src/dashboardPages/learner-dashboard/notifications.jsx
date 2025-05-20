"use client"

/* eslint-disable no-unused-vars */
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Notifcation from "../../../public/notfication.svg"
import { HiDotsHorizontal } from "react-icons/hi"

const NotificationPage = () => {
  const navigate = useNavigate()

  const [notifications, setNotifications] = useState([
    {
      id: 2,
      title: "Course",
      description: "Phase 1",
      date: "Progress",
      progress: 45,
      type: "course",
      phase: 1,
      image: Notifcation,
      link: "/learner-dashboard/courses",
    },
    {
      id: 3,
      title: "Course",
      description: "Phase 1",
      date: "Progress",
      progress: 60,
      type: "course",
      phase: 2,
      image: Notifcation,
      link: "/learner-dashboard/courses",
    },
    {
      id: 4,
      title: "Course Assignment Due",
      description: "Complete your assignment for Phase 3",
      date: "Progress",
      progress: 75,
      type: "course",
      phase: 3,
      image: Notifcation,
      link: "/learner-dashboard/assignments",
      isAssignment: true,
    },
    {
      id: 5,
      title: "Course Quiz Available",
      description: "Take your quiz for Phase 4",
      date: "Progress",
      progress: 90,
      type: "course",
      phase: 4,
      image: Notifcation,
      link: "/learner-dashboard/assignments",
      isQuiz: true,
    },
  ])

  const handleNotificationClick = (notification) => {
    // Navigate to the appropriate section based on notification type
    if (notification.link) {
      navigate(notification.link)
    }
  }

  const getButtonText = (notification) => {
    if (notification.type === "document") return "Documents"
    if (notification.isAssignment) return "Go to Assignment"
    if (notification.isQuiz) return "Take Quiz"
    return "Continue Course"
  }

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-5xl mr-auto p-2">
        <h1 className="text-2xl poppins-thin_600 mb-6">Notification</h1>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex flex-col md:flex-row md:items-center p-4 rounded-xl bg-[#F9F9F9]"
            >
              <div className="flex items-start md:items-center flex-1">
                <div className="rounded overflow-hidden flex-shrink-0">
                  <img src={notification.image || "/placeholder.svg"} alt="" className="object-cover h-full w-full" />
                </div>

                <div className="ml-4 flex-1">
                  {notification.subtitle && (
                    <p className="text-md poppins-thin_600 text-gray-500">{notification.subtitle}</p>
                  )}
                  <p className="font-medium text-black">{notification.title}</p>

                  {notification.description && <p className="text-sm text-gray-500">{notification.description}</p>}

                  {notification.date && <p className="text-sm text-gray-500 mt-1">Deadline : {notification.date}</p>}

                  {notification.type === "course" && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 mb-1">Progress</p>
                      <div className="flex items-center">
                        <div className="relative w-full md:w-42 bg-gray-200 rounded-full h-1">
                          <div
                            className="bg-[#0B5D3A] h-1 rounded-full"
                            style={{ width: `${notification.progress}%` }}
                          ></div>
                          <div
                            className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-[#0B5D3A] rounded-full border-2 border-white"
                            style={{ left: `calc(${notification.progress}% - 6px)` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400 ml-2">{notification.progress}%</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center md:flex-col md:items-end md:space-y-8 mt-4 md:mt-0">
                <button className="md:ml-4 md:block hidden">
                  <HiDotsHorizontal className="" size={25} />
                </button>
                <button
                  onClick={() => handleNotificationClick(notification)}
                  className="bg-[#1E1E1F] poppins-thin text-white text-sm cursor-pointer px-4 py-1.5 rounded-xl w-56 md:w-auto"
                >
                  {getButtonText(notification)}
                </button>
                <button className="md:ml-4 md:hidden block">
                  <HiDotsHorizontal className="" size={25} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NotificationPage
