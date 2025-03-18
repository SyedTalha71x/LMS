/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Search, MoreVertical, Folder, Clock, Users, MoreHorizontal } from "lucide-react";
import CalenderImage from "../../../public/Frame 31.svg";
import { FiUsers } from "react-icons/fi";

export default function Courses() {
  const [courses, setCourses] = useState([
    { id: 1, title: "Title", color: "bg-lavender" },
    { id: 2, title: "Title", color: "bg-peach" },
    { id: 3, title: "Title", color: "bg-mint" },
    { id: 4, title: "Title", color: "bg-salmon" },
    { id: 5, title: "Title", color: "bg-lavender" },
    { id: 6, title: "Title", color: "bg-peach" },
    { id: 7, title: "Title", color: "bg-mint" },
    { id: 8, title: "Title", color: "bg-salmon" },
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      name: "Dr. Smith",
      time: "1 hour ago",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      name: "Dr. Smith",
      time: "2 hours ago",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ]);

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Courses Section */}
          <div className="w-full lg:w-2/3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl poppins-thin_600 ">Courses</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 bg-gray-100 outline-none  rounded-2xl text-sm w-full md:w-60"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 p-4 md:grid-cols-2  gap-4">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/3 ">
            <h2 className="text-2xl poppins-thin_600 mb-4">Notification</h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseCard({ course }) {
  return (
    <div
      className={`rounded-lg p-4 h-full flex flex-col justify-between ${getColorClass(
        course.color
      )}`}
    >
      <div className="">
        <div className="flex justify-between items-start">
          <div className="bg-white rounded-full p-2 w-14 h-14 flex items-center justify-center">
            <img src={CalenderImage} alt="" />
          </div>
          <button className="text-gray-700">
            <MoreHorizontal size={20} />
          </button>
        </div>
        <div className="mt-8 rounded-md">
          <h3 className="text-[#1F1D39] ml-1 text-lg poppins-thin_600">
            {course.title}
          </h3>
          <div className="flex items-center justify-center gap-1.5 w-18 rounded-xl p-2 mt-2 text-sm text-black bg-[#FCF9FF]">
            <FiUsers className="font-semibold" />
            <span className="font-semibold">99</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationItem({ notification }) {
  return (
    <div className="flex gap-3 bg-[#EDEDEDE0] p-4 rounded-xl">
      <div className="flex-shrink-0">
        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
          {notification.name.charAt(0)}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className="font-medium text-sm">{notification.name}</h4>
          <span className="text-xs text-gray-500">{notification.time}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {notification.message}
        </p>
      </div>
    </div>
  );
}

function getColorClass(color) {
  switch (color) {
    case "bg-lavender":
      return "bg-[#E1E2F6]";
    case "bg-peach":
      return "bg-[#F8EFE2]";
    case "bg-mint":
      return "bg-[#EFF7E2]";
    case "bg-salmon":
      return "bg-[#F7E2E2]";
    default:
      return "bg-[#F8EFE2]";
  }
}
