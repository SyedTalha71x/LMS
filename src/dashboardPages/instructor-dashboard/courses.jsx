/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react"
import { Search, MoreVertical, Bell, X, Edit, ChevronRight } from "lucide-react"
import CalenderImage from "../../../public/Frame 31.svg"
import { FiUsers } from "react-icons/fi"
import Image23 from "../../../public/Frame 31.svg"
import Frame31 from "../../../public/Frame 31.svg"
import CourseImage from "../../../public/course_image.svg"

export default function Courses() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [profileImage, setProfileImage] = useState(Image23)
  const [showSidebar, setShowSidebar] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [courseToEdit, setCourseToEdit] = useState(null)
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Fundamental 1",
      color: "bg-lavender",
      instructor: "Dr. Smith",
      courseCode: "FND101",
      duration: "3 months",
      level: "Beginner",
      seats: "25/30",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      progress: 40,
      category: ["Beginner", "Intermediate", "Advanced"],
    },
    {
      id: 2,
      title: "Advanced Programming",
      color: "bg-peach",
      instructor: "Dr. Johnson",
      courseCode: "AP202",
      duration: "4 months",
      level: "Advanced",
      seats: "18/20",
      description: "Advanced programming concepts and techniques for experienced developers.",
      progress: 65,
      category: ["Advanced"],
    },
    {
      id: 3,
      title: "Data Science Basics",
      color: "bg-mint",
      instructor: "Prof. Williams",
      courseCode: "DS101",
      duration: "3 months",
      level: "Intermediate",
      seats: "30/35",
      description: "Introduction to data science principles and methodologies.",
      progress: 25,
      category: ["Beginner", "Intermediate"],
    },
    {
      id: 4,
      title: "Web Development",
      color: "bg-salmon",
      instructor: "Dr. Brown",
      courseCode: "WD303",
      duration: "5 months",
      level: "Intermediate",
      seats: "22/25",
      description: "Comprehensive web development course covering frontend and backend technologies.",
      progress: 80,
      category: ["Intermediate", "Advanced"],
    },
    {
      id: 5,
      title: "Machine Learning",
      color: "bg-lavender",
      instructor: "Dr. Miller",
      courseCode: "ML404",
      duration: "6 months",
      level: "Advanced",
      seats: "15/20",
      description: "Advanced machine learning algorithms and practical applications.",
      progress: 50,
      category: ["Advanced"],
    },
    {
      id: 6,
      title: "UI/UX Design",
      color: "bg-peach",
      instructor: "Prof. Davis",
      courseCode: "UID202",
      duration: "3 months",
      level: "Beginner",
      seats: "28/30",
      description: "Principles of user interface and user experience design.",
      progress: 35,
      category: ["Beginner", "Intermediate"],
    },
    {
      id: 7,
      title: "Mobile App Development",
      color: "bg-mint",
      instructor: "Dr. Wilson",
      courseCode: "MAD303",
      duration: "4 months",
      level: "Intermediate",
      seats: "20/25",
      description: "Comprehensive mobile application development for iOS and Android.",
      progress: 60,
      category: ["Intermediate", "Advanced"],
    },
    {
      id: 8,
      title: "Cybersecurity Fundamentals",
      color: "bg-salmon",
      instructor: "Prof. Taylor",
      courseCode: "CF101",
      duration: "3 months",
      level: "Beginner",
      seats: "32/35",
      description: "Introduction to cybersecurity principles and best practices.",
      progress: 45,
      category: ["Beginner"],
    },
  ])

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      name: "Dr. Smith",
      time: "Now",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      name: "Dr. Smith",
      time: "Now",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ])

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setProfileImage(imageUrl)
    }
  }

  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal)
  }

  const openDetailsModal = (course) => {
    setSelectedCourse(course)
    setShowDetailsModal(true)
  }

  const closeDetailsModal = () => {
    setShowDetailsModal(false)
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const handleEditCourse = (course) => {
    setCourseToEdit(course)
    setIsEditMode(true)
    setShowCreateModal(true)
  }

  const handleDeleteCourse = (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((course) => course.id !== courseId))
    }
  }

  const handleCreateOrUpdateCourse = (formData) => {
    if (isEditMode && courseToEdit) {
      // Update existing course
      setCourses(courses.map((course) => (course.id === courseToEdit.id ? { ...course, ...formData } : course)))
      setCourseToEdit(null)
      setIsEditMode(false)
    } else {
      // Create new course
      const newCourse = {
        id: courses.length + 1,
        ...formData,
        progress: 0,
        color: getRandomColor(),
      }
      setCourses([...courses, newCourse])
    }
    setShowCreateModal(false)
  }

  const getRandomColor = () => {
    const colors = ["bg-lavender", "bg-peach", "bg-mint", "bg-salmon"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    <div className="flex rounded-3xl text-black min-h-screen overflow-hidden">
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
                {/* Bell Icon for Mobile - Toggle sidebar on small screens */}
                <button
                  onClick={toggleSidebar}
                  className="lg:hidden p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                  aria-label="Toggle notifications"
                >
                  <Bell className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:p-4 p-0 md:grid-cols-2 gap-4">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onViewDetails={() => openDetailsModal(course)}
                  onEdit={() => handleEditCourse(course)}
                  onDelete={() => handleDeleteCourse(course.id)}
                />
              ))}
            </div>
          </div>

          {/* Unified Sidebar for both mobile and desktop */}
          <div
            className={`fixed lg:static top-0 right-0 h-full z-40 w-4/5 lg:w-1/3 bg-white p-4 md:p-6 transform transition-transform duration-500 ease-in-out ${
              showSidebar ? "translate-x-0" : "translate-x-full lg:translate-x-0"
            }`}
          >
            <div className="flex justify-end items-center mb-4 lg:hidden">
              <button onClick={toggleSidebar} className="p-1">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div>
              <h1 className="text-xl mb-4 poppins-thin_600">Add Entity</h1>
            </div>

            <div className="">
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full md:w-auto py-2 bg-[#0B5D3A] text-sm px-7 text-white rounded-xl mb-6 font-semibold"
              >
                Add Course
              </button>
            </div>
            <div className="">
              <h2 className="text-xl poppins-thin_600 mb-4">Notification</h2>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="pb-4 bg-[#EDEDEDE0] p-3 rounded-md">
                    <div className="flex items-start mb-1">
                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          <span className="h-2 w-2 bg-[#0B5D3A] rounded-full"></span>
                          <div className="text-sm">Title</div>
                          <span className="font-medium">{notification.title}</span>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                    <div>
                      <span className="poppins-thin text-gray-900 text-md">Hi Name!</span>
                    </div>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Overlay for mobile sidebar */}
      {showSidebar && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-30 lg:hidden" onClick={toggleSidebar}></div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => {
              setShowCreateModal(false)
              setIsEditMode(false)
              setCourseToEdit(null)
            }}
          ></div>
          <div className="bg-white rounded-lg w-full max-w-md relative p-7 mx-4 z-10">
            <button
              onClick={() => {
                setShowCreateModal(false)
                setIsEditMode(false)
                setCourseToEdit(null)
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center mb-6">
              <h2 className="text-xl font-semibold mb-4">{isEditMode ? "Edit Course" : "Create New Course"}</h2>
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

            <form
              className="space-y-4 custom-scrollbar overflow-y-auto max-h-[50vh]"
              onSubmit={(e) => {
                e.preventDefault()
                const formData = {
                  title: e.target.title.value,
                  courseName: e.target.courseName.value,
                  description: e.target.description.value,
                  category: [e.target.category.value],
                  courseCode: e.target.courseCode.value,
                  level: e.target.level.value,
                  instructor: "Dr. Smith", // Default value
                  duration: "3 months", // Default value
                  seats: "25/30", // Default value
                }
                handleCreateOrUpdateCourse(formData)
              }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enter your name and title</label>
                <input
                  type="text"
                  name="title"
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  placeholder="Enter title"
                  defaultValue={courseToEdit?.title || ""}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course name</label>
                <input
                  type="text"
                  name="courseName"
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  placeholder="Course name"
                  defaultValue={courseToEdit?.title || ""}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  placeholder="Description"
                  defaultValue={courseToEdit?.description || ""}
                  rows={3}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm appearance-none"
                  defaultValue={courseToEdit?.category?.[0] || ""}
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="ai">Artificial Intelligence</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course code</label>
                <input
                  type="text"
                  name="courseCode"
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  placeholder="Course code"
                  defaultValue={courseToEdit?.courseCode || ""}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                <select
                  name="level"
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm appearance-none"
                  defaultValue={courseToEdit?.level || ""}
                >
                  <option value="" disabled>
                    Select level
                  </option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Add people</label>
                <input
                  type="text"
                  name="people"
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
                  name="link"
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  placeholder="Link"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certificate</label>
                <select className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm appearance-none">
                  <option value="" disabled selected>
                    Certificate options
                  </option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="pt-2 flex flex-col space-y-3">
                <div>
                  <label htmlFor="certificate" className="text-sm">
                    Certificate
                  </label>
                  <button
                    type="button"
                    className="w-full bg-[#1E1E1F] mt-2 text-white text-sm py-2 px-6 rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    Upload picture
                  </button>
                </div>

                <div>
                  <label htmlFor="upload-video" className="text-sm">
                    Upload Video
                  </label>
                  <button
                    type="button"
                    className="w-full bg-[#1E1E1F] mt-2 text-white text-sm py-2 px-6 rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    Upload Video
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0B5D3A] text-white text-sm py-2 px-6 rounded-xl hover:bg-green-700 transition-colors"
                >
                  {isEditMode ? "Update Course" : "Create Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Course Details Modal */}
      {showDetailsModal && selectedCourse && (
        <CourseDetailsModal
          course={selectedCourse}
          onClose={closeDetailsModal}
          handleEditCourse={handleEditCourse}
          handleDeleteCourse={handleDeleteCourse}
        />
      )}
    </div>
  )
}

function CourseCard({ course, onViewDetails, onEdit, onDelete }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdown = (e) => {
    e.stopPropagation()
    setShowDropdown(!showDropdown)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className={`rounded-lg p-4 h-full flex flex-col justify-between ${getColorClass(course.color)}`}>
      <div className="">
        <div className="flex justify-between items-start">
          <div className="bg-white rounded-full p-2 w-14 h-14 flex items-center justify-center">
            <img src={CalenderImage || "/placeholder.svg"} alt="" />
          </div>
          <div className="relative" ref={dropdownRef}>
            <button className="text-gray-700 hover:bg-white/50 rounded-full p-1" onClick={toggleDropdown}>
              <MoreVertical size={20} />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg z-10 py-1 ">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowDropdown(false)
                    onViewDetails()
                  }}
                >
                  <span>View Details</span>
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowDropdown(false)
                    // Call edit function
                    onEdit()
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowDropdown(false)
                    // Call delete function
                    onDelete()
                  }}
                >
                  <X className="mr-2 h-4 w-4" />
                  <span>Delete</span>
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

function CourseDetailsModal({ course, onClose, handleEditCourse, handleDeleteCourse }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black/60" onClick={onClose}></div>
      <div className="bg-white rounded-lg w-full max-w-md relative mx-4 z-10 max-h-[80vh] custom-scrollbar overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer bg-black p-1 text-sm rounded-md text-white z-10"
        >
          <X size={15} />
        </button>

        <div className="p-5">
          <div className="flex items-center justify-between p-6 ">
            <div className="flex items-center gap-3">
              <div className="relative h-16 w-16">
                <img src={Frame31 || "/placeholder.svg"} className="h-full w-full" alt="" />
              </div>
              <h2 className="text-lg font-semibold">{course.title}</h2>
            </div>
            <button
              className="p-2 rounded-md border border-slate-300 cursor-pointer"
              onClick={() => {
                onClose()
                handleEditCourse(course)
              }}
            >
              <Edit size={20} className="" />
            </button>
          </div>

          <div className="w-full h-full rounded-lg">
            <img src={CourseImage || "/placeholder.svg"} alt={course.title} className="w-full h-full object-center" />
          </div>

          <div className="mb-4 mt-4">
            <p className="text-sm text-gray-600">
              {course.description ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">Category</h3>
            <div className="flex flex-wrap gap-2">
              {(course.category || ["Beginner", "Intermediate", "Advanced"]).map((cat, index) => (
                <span key={index} className="px-4 py-2 bg-gray-200 text-gray-700 text-xs rounded-xl">
                  {cat}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 md:text-sm text-xs font-bold">Students Enrolled</span>
                <span className="font-medium text-sm text-gray-700">{course.instructor || "Dr. Smith"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 md:text-sm text-xs font-bold">Course code</span>
                <span className="font-medium text-sm text-gray-700">{course.courseCode || "FND101"}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500 md:text-sm text-xs font-bold">Level</span>
                <span className="font-medium text-sm text-gray-700">{course.level || "Beginner"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 md:text-sm text-xs font-bold">Price</span>
                <span className="font-medium text-sm text-gray-700">{course.seats || "25/30"}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 md:text-sm text-xs font-bold">Link</span>
              <span className="font-medium text-sm text-gray-700">{course.duration || "3 months"}</span>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">Certificate</h3>
            <button className="flex items-center justify-center w-auto text-white poppins-thin_bold py-2 bg-[#1E1E1F] rounded-xl text-xs px-6 cursor-pointer transition-colors">
              View PDF
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assign to</label>
            <select className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm text-gray-500" defaultValue="">
              <option value="" disabled>
                Assign
              </option>
            </select>
          </div>

          <div className="mt-6">
            <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">Progress</h3>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-green-800 font-bold md:text-md text-xs">Success</span>
                <span className="col-span-2 text-gray-400">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div className="bg-[#0B5D3A] h-1 rounded-full" style={{ width: `${course.progress}%` }}></div>
              </div>
            </div>
          </div>

          <div className="mb-2 mt-5">
            <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">Documentation</h3>
            <div className="flex flex-col justify-start items-start gap-2">
              <button className="px-6 py-2 cursor-pointer bg-[#1E1E1F] text-sm text-white rounded-xl transition-colors">
                View PDF
              </button>
              <button
                className="px-6 py-2 cursor-pointer bg-[#C77373] text-sm text-white rounded-xl transition-colors"
                onClick={() => {
                  onClose()
                  handleDeleteCourse(course.id)
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
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
