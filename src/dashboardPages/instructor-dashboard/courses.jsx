/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  Search,
  MoreVertical,
  Folder,
  Clock,
  Users,
  MoreHorizontal,
  Bell,
  X,
  Edit,
} from "lucide-react";
import CalenderImage from "../../../public/Frame 31.svg";
import { FiUsers } from "react-icons/fi";
import Image23 from "../../../public/Frame 31.svg";

export default function Courses() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [profileImage, setProfileImage] = useState(Image23);
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

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
  };

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

  // Add state to control notification sidebar visibility on mobile
  const [showMobileNotifications, setShowMobileNotifications] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // Toggle notification sidebar on mobile
  const toggleMobileNotifications = () => {
    setShowMobileNotifications(!showMobileNotifications);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex rounded-3xl text-black min-h-screen overflow-hidden">
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Courses Section */}
          <div className="w-full lg:w-2/3">
            <div className="flex items-center md:flex-row flex-col gap-4 justify-between mb-4">
              <h2 className="text-2xl poppins-thin_600">Courses</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-10 pr-4 py-2 bg-gray-100 outline-none rounded-2xl text-sm w-full md:w-60"
                  />
                </div>
                {/* Bell Icon for Mobile - Only visible on small screens */}
                <button
                  onClick={toggleMobileNotifications}
                  className="lg:hidden p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                  aria-label="Toggle notifications"
                >
                  <Bell className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:p-4 p-0 md:grid-cols-2 gap-4">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>

          {/* Notification Sidebar - Desktop (always visible on large screens) */}
          <div
            className={`fixed md:static top-0 right-0 h-full z-40 w-80 bg-white p-4 md:p-6 transform transition-transform duration-500 ease-in-out ${
              showSidebar
                ? "translate-x-0"
                : "translate-x-full md:translate-x-0"
            }`}
          >
            <div className="flex justify-end items-center mb-4 md:hidden">
              {/* <h2 className="font-medium">Notifications</h2> */}
              <button onClick={toggleSidebar} className="p-1">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div>
              <h1 className="font-bold mb-4">Add Entity</h1>
            </div>

            <div className="">
              {/* <h1 className="poppins-thin_600 text-black mb-6" onClick={toggleModal}>Join Group</h1> */}
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full md:w-auto py-2 bg-[#0B5D3A] text-sm px-7 text-white rounded-xl mb-6 font-semibold"
              >
                Add Course
              </button>
            </div>
            <div className="">
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

          {/* Mobile Notification Sidebar - Shown as overlay when bell is clicked */}
          <div
            className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-500 ${
              showMobileNotifications
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            } lg:hidden`}
          >
            <div
              className={`absolute right-0 top-0 h-full w-4/5 bg-white p-4 overflow-y-auto transition-transform duration-500 ${
                showMobileNotifications ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl poppins-thin_600">Notification</h2>
                <button
                  onClick={toggleMobileNotifications}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
              <div className="space-y-4">
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
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

{showCreateModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="fixed inset-0 bg-black/60" onClick={toggleCreateModal}></div>
    <div className="bg-white rounded-lg w-full max-w-md relative p-7 mx-4 z-10">
      <button onClick={toggleCreateModal} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
        <X size={20} />
      </button>

      <div className="flex flex-col items-center mb-6">
        <div className="relative w-24 h-24 mb-3 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
          <img src={profileImage || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <label
              htmlFor="profile-upload"
              className="cursor-pointer w-full h-full flex items-center justify-center text-white"
            >
              <Edit size={20} />
            </label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="mb-2">
          <label
            htmlFor="profile-upload-btn"
            className="bg-[#1E1E1F] cursor-pointer text-white text-sm py-2 px-7 rounded-xl block"
          >
            Upload picture
          </label>
          <input
            id="profile-upload-btn"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        {profileImage !== Image23 && <p className="text-green-600 text-xs mt-1">New image selected</p>}
      </div>

      <form className="space-y-4 custom-scrollbar overflow-y-auto max-h-[50vh]">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Enter your name and title</label>
          <input
            type="text"
            className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
            placeholder="Enter title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course name</label>
          <input
            type="text"
            className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
            placeholder="Course name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            type="text"
            className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
            placeholder="Description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm appearance-none">
            <option value="" disabled selected>Select category</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course code</label>
          <input
            type="text"
            className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
            placeholder="Course code"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
          <select className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm appearance-none">
            <option value="" disabled selected>Select level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Seats</label>
          <input
            type="text"
            className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
            placeholder="Seats"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Add people</label>
          <input
            type="text"
            className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
            placeholder="Add people"
          />
        </div>
        
        <div className="flex justify-center items-center mt-2">
          <span className="text-sm text-gray-700">Or</span>
        </div>

        <div>
          <input
            type="text"
            className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
            placeholder="Link"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Certificate</label>
          <select className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm appearance-none">
            <option value="" disabled selected>Certificate options</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="pt-2 flex flex-col space-y-3">
          <div>

          <label htmlFor="certificate" className="text-sm">Certificate</label>
          <button
            type="button"
            className="w-full bg-[#1E1E1F] mt-2 text-white text-sm py-2 px-6 rounded-xl hover:bg-gray-800 transition-colors"
            >
            Upload picture
          </button>
            </div>

            <div>

            <label htmlFor="upload-video" className="text-sm">Upload Video</label>
          <button
            type="button"
            className="w-full bg-[#1E1E1F] mt-2 text-white text-sm py-2 px-6 rounded-xl hover:bg-gray-800 transition-colors"
            >
            Upload Video
          </button>
            </div>
          
          <button
            type="button"
            className="w-full bg-[#0B5D3A] text-white text-sm py-2 px-6 rounded-xl hover:bg-green-700 transition-colors"
          >
            Create Course
          </button>
        </div>
      </form>
    </div>
  </div>
)}
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
