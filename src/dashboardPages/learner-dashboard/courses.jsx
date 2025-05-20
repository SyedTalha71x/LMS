"use client"

/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react"
import { Search, MoreHorizontal, Bell, X, Edit } from "lucide-react"
import CalenderImage from "../../../public/Frame 31.svg"
import { FiUsers } from "react-icons/fi"
import Frame31 from "../../../public/Frame 31.svg"
import CourseImage from "../../../public/course_image.svg"

export default function Courses() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Fundamental I",
      color: "bg-lavender",
      rating: "4.5",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      category: ["Beginner", "Chemistry", "Inorganic"],
      duration: "20 hours",
      courseCode: "CHEM101",
      price: "Free",
      link: "https://example.com",
      progress: 40,
    },
    {
      id: 2,
      title: "Advanced Chemistry",
      color: "bg-peach",
      rating: "4.8",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: ["Advanced", "Chemistry", "Organic"],
      duration: "30 hours",
      courseCode: "CHEM201",
      price: "Free",
      link: "https://example.com",
      progress: 65,
    },
    {
      id: 3,
      title: "Biology Basics",
      color: "bg-mint",
      rating: "4.2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: ["Beginner", "Biology"],
      duration: "15 hours",
      courseCode: "BIO101",
      price: "Free",
      link: "https://example.com",
      progress: 20,
    },
    {
      id: 4,
      title: "Physics I",
      color: "bg-salmon",
      rating: "4.7",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: ["Intermediate", "Physics"],
      duration: "25 hours",
      courseCode: "PHY101",
      price: "Free",
      link: "https://example.com",
      progress: 50,
    },
    {
      id: 5,
      title: "Mathematics",
      color: "bg-lavender",
      rating: "4.6",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      category: ["Beginner", "Math"],
      duration: "22 hours",
      courseCode: "MATH101",
      price: "Free",
      link: "https://example.com",
      progress: 30,
    },
    {
      id: 6,
      title: "Computer Science",
      color: "bg-peach",
      rating: "4.9",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      category: ["Advanced", "CS"],
      duration: "40 hours",
      courseCode: "CS101",
      price: "Free",
      link: "https://example.com",
      progress: 75,
    },
    {
      id: 7,
      title: "Art History",
      color: "bg-mint",
      rating: "4.3",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      category: ["Beginner", "Art"],
      duration: "18 hours",
      courseCode: "ART101",
      price: "Free",
      link: "https://example.com",
      progress: 15,
    },
    {
      id: 8,
      title: "Economics",
      color: "bg-salmon",
      rating: "4.4",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      category: ["Intermediate", "Economics"],
      duration: "28 hours",
      courseCode: "ECON101",
      price: "Free",
      link: "https://example.com",
      progress: 60,
    },
  ])

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
  ])

  // Add state to control notification sidebar visibility on mobile
  const [showMobileNotifications, setShowMobileNotifications] = useState(false)

  // Toggle notification sidebar on mobile
  const toggleMobileNotifications = () => {
    setShowMobileNotifications(!showMobileNotifications)
  }

  // State for course modal
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showModal, setShowModal] = useState(false)

  // State to manage open dropdown
  const [openDropdownId, setOpenDropdownId] = useState(null)

  // Open course modal
  const openCourseModal = (course) => {
    setSelectedCourse(course)
    setShowModal(true)
    // Close any open dropdowns when opening modal
    setOpenDropdownId(null)
  }

  // Close course modal
  const closeCourseModal = () => {
    setShowModal(false)
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto md:p-4 p-2">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Courses Section */}
          <div className="w-full lg:w-2/3">
            <div className="flex md:items-center items-start md:flex-row flex-col gap-4 justify-between mb-4">
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
                <CourseCard key={course.id} course={course} onViewDetails={openCourseModal} />
              ))}
            </div>
          </div>

          {/* Notification Sidebar - Desktop (always visible on large screens) */}
          <div className="w-full lg:w-1/3 hidden lg:block">
            <h2 className="text-2xl poppins-thin_600 mb-2">Notification</h2>
            <p className="text-sm text-gray-500 mb-4">
              Stay updated with course announcements, deadlines, and instructor messages.
            </p>
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </div>
          </div>

          {/* Mobile Notification Sidebar - Shown as overlay when bell is clicked */}
          <div
            className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-500 ${
              showMobileNotifications ? "opacity-100" : "opacity-0 pointer-events-none"
            } lg:hidden`}
          >
            <div
              className={`absolute right-0 top-0 h-full w-4/5 bg-white p-4 overflow-y-auto transition-transform duration-500 ${
                showMobileNotifications ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl poppins-thin_600">Notification</h2>
                <button onClick={toggleMobileNotifications} className="p-1 rounded-full hover:bg-gray-100">
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Stay updated with course announcements, deadlines, and instructor messages.
              </p>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Details Modal */}
      {showModal && selectedCourse && <CourseModal course={selectedCourse} onClose={closeCourseModal} />}
    </div>
  )
}

function CourseCard({ course, onViewDetails }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <div className={`rounded-lg p-4 h-full flex flex-col justify-between ${getColorClass(course.color)}`}>
      <div className="">
        <div className="flex justify-between items-start">
          <div className="bg-white rounded-full p-2 w-14 h-14 flex items-center justify-center">
            <img src={CalenderImage || "/placeholder.svg"} alt="" />
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              className="text-gray-700 p-1 rounded-full hover:bg-white/50 transition-colors"
              onClick={toggleDropdown}
              aria-label="More options"
            >
              <MoreHorizontal size={20} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10 py-1 border border-gray-100">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  onClick={() => {
                    setIsDropdownOpen(false)
                    onViewDetails(course)
                  }}
                >
                  <span>View Details</span>
                  {/* <ChevronRight size={16} className="ml-auto" /> */}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="mt-8 rounded-md">
          <h3 className="text-[#1F1D39] ml-1 text-lg poppins-thin_600">{course.title}</h3>
          <div className="flex items-center justify-center gap-1.5 w-18 rounded-xl p-2 mt-2 text-sm text-black bg-[#FCF9FF]">
            <FiUsers className="font-semibold" />
            <span className="font-semibold">99</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function CourseModal({ course, onClose }) {
  // Prevent clicks inside the modal from closing it
  const handleModalClick = (e) => {
    e.stopPropagation()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div
        className="bg-white rounded-lg w-full relative max-w-lg max-h-[90vh] md:p-3 p-0 custom-scrollbar overflow-y-auto"
        onClick={handleModalClick}
      >
        <div className=" ">
          <div className="flex items-center justify-between p-6 ">
            <div className="flex items-center gap-3">
              <div className="relative h-16 w-16">
                <img src={Frame31 || "/placeholder.svg"} className="h-full w-full" alt="" />
              </div>
              <h2 className="text-lg font-semibold">{course.title}</h2>
            </div>
            {/* <button onClick={onClose} className="p-2 rounded-md border border-slate-300 cursor-pointer">
              <Edit size={20} className="" />
            </button> */}
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white bg-black rounded-md cursor-pointer p-1 "
            aria-label="Close"
          >
            <X size={15} />
          </button>
        </div>

        <div className="w-full h-full p-4  rounded-lg">
          <img src={CourseImage || "/placeholder.svg"} alt={course.title} className="w-full h-full  object-center " />
        </div>

        <div className="px-4 pb-4">
          <p className="text-sm text-gray-600">{course.description}</p>
        </div>

        <div className="px-4 pb-4">
          <h4 className="text-lg text-gray-700 poppins-thin_800 mb-2">Category</h4>
          <div className="flex flex-wrap gap-2">
            {course.category.map((cat, index) => (
              <span key={index} className="px-5 py-2 bg-gray-200 text-gray-800 text-xs rounded-xl">
                {cat}
              </span>
            ))}
          </div>
        </div>

        <div className="px-4 pb-4">
          <h4 className="text-lg text-gray-700 poppins-thin_800 mb-2">Details</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 md:text-sm text-xs font-bold">Duration</span>
              <span className="md:text-sm text-xs text-gray-700">{course.duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 md:text-sm text-xs font-bold">Course code</span>
              <span className="md:text-sm text-xs text-gray-700">{course.courseCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 md:text-sm text-xs font-bold">Price</span>
              <span className="md:text-sm text-xs text-gray-700">{course.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 md:text-sm text-xs font-bold">Link</span>
              <a
                href={course.link}
                className="md:text-sm text-xs text-gray-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                {course.link.replace("https://", "")}
              </a>
            </div>
          </div>
        </div>

        <div className="px-4 pb-4">
          <h4 className="text-lg text-gray-700 poppins-thin_800 mb-2">Course Structure</h4>
          <div className="space-y-3 border rounded-lg p-3 bg-gray-50">
            <div className="flex items-center justify-between p-2 bg-white rounded-md border-l-4 border-l-[#0B5D3A]">
              <div>
                <h5 className="font-medium text-sm">Module 1: Introduction</h5>
                <p className="text-xs text-gray-500">3 lessons • 45 minutes</p>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Completed</span>
            </div>

            <div className="flex items-center justify-between p-2 bg-white rounded-md border-l-4 border-l-[#0B5D3A]">
              <div>
                <h5 className="font-medium text-sm">Module 2: Core Concepts</h5>
                <p className="text-xs text-gray-500">5 lessons • 1.5 hours</p>
              </div>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">In Progress</span>
            </div>

            <div className="flex items-center justify-between p-2 bg-white rounded-md border-l-4 border-l-gray-300">
              <div>
                <h5 className="font-medium text-sm">Module 3: Advanced Topics</h5>
                <p className="text-xs text-gray-500">4 lessons • 2 hours</p>
              </div>
              <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">Locked</span>
            </div>

            <div className="flex items-center justify-between p-2 bg-white rounded-md border-l-4 border-l-gray-300">
              <div>
                <h5 className="font-medium text-sm">Module 4: Final Project</h5>
                <p className="text-xs text-gray-500">2 lessons • 3 hours</p>
              </div>
              <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">Locked</span>
            </div>
          </div>
        </div>

        <div className="px-4 pb-4">
          <h4 className="text-lg text-gray-700 poppins-thin_800 mb-2">Certificate</h4>
          <button className="flex items-center justify-center w-auto text-white poppins-thin_bold  py-2 bg-[#1E1E1F] rounded-xl text-xs px-6 cursor-pointer transition-colors">
            View PDF
          </button>
        </div>

        <div className="px-4 pb-4">
          <h4 className="text-lg text-gray-700 poppins-thin_800 mb-2">Progress</h4>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-600">Success</span>
            <span className="text-sm font-medium">{course.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[#0B5D3A] h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
          </div>
        </div>

        <div className="px-4 pb-6">
          <h4 className="text-lg text-gray-700 poppins-thin_800 mb-2">Documentation</h4>
          <div className="space-y-2">
            <button className="flex items-center justify-center w-auto text-white poppins-thin_bold  py-2 bg-[#1E1E1F] rounded-xl text-xs px-6 cursor-pointer transition-colors">
              View Pdf
            </button>
            <button className="bg-[#C77373] flex items-center justify-center w-auto text-white poppins-thin_bold  py-2 b rounded-xl text-xs px-6 cursor-pointer transition-colors">
              Unsubscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
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
          <div>
            <h4 className="font-medium text-sm">{notification.name}</h4>
            <span className="inline-block text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full mt-1">
              Course Update
            </span>
          </div>
          <span className="text-xs text-gray-500">{notification.time}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
      </div>
    </div>
  )
}

function getColorClass(color) {
  switch (color) {
    case "bg-lavender":
      return "bg-[#E1E2F6]"
    case "bg-peach":
      return "bg-[#F8EFE2]"
    case "bg-mint":
      return "bg-[#EFF7E2]"
    case "bg-salmon":
      return "bg-[#F7E2E2]"
    default:
      return "bg-[#F8EFE2]"
  }
}
