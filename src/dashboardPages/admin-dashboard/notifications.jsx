import { useState, useEffect } from "react"
import Notifcation from "../../../public/Frame 17140.svg"
import { HiDotsHorizontal } from "react-icons/hi"
import { X, Bell } from "lucide-react"

const NotificationPage = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [archivedNotifications, setArchivedNotifications] = useState([])

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Slider Revolution Course",
      description: "Description",
      purchaser: "Michael Just Purchased",
      progress: 0,
      type: "document",
      phase: null,
      image: Notifcation,
      timeAgo: "3 Minutes Ago",
      isRead: false,
      isArchived: false,
    },
    {
      id: 2,
      title: "Slider Revolution Course",
      description: "Description",
      purchaser: "Michael Just Purchased",
      progress: 45,
      type: "course",
      phase: 1,
      image: Notifcation,
      timeAgo: "3 Minutes Ago",
      isRead: false,
      isArchived: false,
    },
    {
      id: 3,
      title: "Slider Revolution Course",
      description: "Description",
      purchaser: "Michael Just Purchased",
      progress: 60,
      type: "course",
      phase: 2,
      image: Notifcation,
      timeAgo: "3 Minutes Ago",
      isRead: true,
      isArchived: false,
    },
    {
      id: 4,
      title: "Slider Revolution Course",
      description: "Description",
      purchaser: "Michael Just Purchased",
      progress: 75,
      type: "course",
      phase: 3,
      image: Notifcation,
      timeAgo: "3 Minutes Ago",
      isRead: false,
      isArchived: false,
    },
    {
      id: 5,
      title: "Slider Revolution Course",
      description: "Description",
      purchaser: "Michael Just Purchased",
      progress: 90,
      type: "course",
      phase: 4,
      image: Notifcation,
      timeAgo: "3 Minutes Ago",
      isRead: false,
      isArchived: false,
    },
  ])

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkScreenSize()

    // Add event listener to close dropdown menus when clicking outside
    const handleClickOutside = (event) => {
      const dropdowns = document.querySelectorAll(".notification-dropdown:not(.hidden)")
      dropdowns.forEach((dropdown) => {
        if (!dropdown.contains(event.target) && !dropdown.previousElementSibling.contains(event.target)) {
          dropdown.classList.add("hidden")
        }
      })
    }

    document.addEventListener("mousedown", handleClickOutside)

    // Add event listener
    window.addEventListener("resize", checkScreenSize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkScreenSize)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal)
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  // Function to mark notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
    // Close all dropdowns
    document.querySelectorAll(".notification-dropdown").forEach((dropdown) => {
      dropdown.classList.add("hidden")
    })
  }

  // Function to delete notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
    // Close all dropdowns
    document.querySelectorAll(".notification-dropdown").forEach((dropdown) => {
      dropdown.classList.add("hidden")
    })
  }

  // Function to archive notification
  const archiveNotification = (id) => {
    const notificationToArchive = notifications.find((notification) => notification.id === id)
    if (notificationToArchive) {
      // Add to archived list
      setArchivedNotifications([...archivedNotifications, { ...notificationToArchive, isArchived: true }])
      // Remove from main list
      setNotifications(notifications.filter((notification) => notification.id !== id))
    }
    // Close all dropdowns
    document.querySelectorAll(".notification-dropdown").forEach((dropdown) => {
      dropdown.classList.add("hidden")
    })
  }

  // Function to view notification details
  const viewDetails = (notification) => {
    setSelectedNotification(notification)
    setShowDetailsModal(true)
    // Mark as read when viewing details
    markAsRead(notification.id)
    // Close all dropdowns
    document.querySelectorAll(".notification-dropdown").forEach((dropdown) => {
      dropdown.classList.add("hidden")
    })
  }

  return (
    <div className="flex rounded-3xl text-black min-h-screen overflow-hidden">
      <div className="w-full max-w-4xl mr-auto p-2">
        <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center items-start mb-6">
          <h1 className="text-2xl poppins-thin_600">Notification</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="px-4 py-2 pl-8 bg-gray-100 rounded-full text-sm md:w-64 w-full"
              />
              <svg
                className="absolute left-2 top-2.5 text-gray-400"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
              >
                <Bell size={18} />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex flex-col sm:flex-row items-center sm:items-start bg-[#F9F9F9] rounded-lg p-3 shadow-sm ${
                notification.isRead ? "opacity-75" : "border-l-4 border-[#0B5D3A]"
              }`}
            >
              {/* Image section */}
              <div className="flex-shrink-0 mb-2 sm:mb-0 sm:mr-3">
                <div className="rounded-lg bg-blue-200 overflow-hidden ">
                  <img src={notification.image || "/placeholder.svg"} alt="" className="object-cover h-full w-full" />
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left mt-3">
                <div className="text-sm poppins-thin_500 text-gray-400">{notification.purchaser}</div>
                <div className="poppins-thin_500 text-[#0B5D3A]">{notification.title}</div>
                <div className="text-sm poppins-thin_500 text-gray-400">{notification.description}</div>
              </div>

              <div className="flex flex-row sm:flex-col justify-start w-full sm:w-auto sm:ml-2 mt-6 gap-4 sm:mt-0 items-center sm:items-end">
                <div className="relative">
                  <button
                    className="md:mt-4 mt-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Close all other dropdowns first
                      document.querySelectorAll(".notification-dropdown").forEach((dropdown) => {
                        dropdown.classList.add("hidden")
                      })
                      // Toggle this dropdown
                      const menu = e.currentTarget.nextElementSibling
                      menu.classList.toggle("hidden")
                    }}
                  >
                    <HiDotsHorizontal size={20} />
                  </button>
                  <div className="notification-dropdown hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1">
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {notification.isRead ? "Mark as Unread" : "Mark as Read"}
                    </button>
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => archiveNotification(notification.id)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Archive
                    </button>
                    <button
                      onClick={() => viewDetails(notification)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      View Details
                    </button>
                  </div>
                </div>
                <div className="text-sm poppins-thin_500 text-gray-400">{notification.timeAgo || "3 Minutes Ago"}</div>
              </div>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No notifications to display</p>
            </div>
          )}
        </div>
      </div>

      {showSidebar && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 md:hidden" onClick={toggleSidebar}></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 right-0 h-full z-40 w-80 bg-white p-4 md:p-6 transform transition-transform duration-500 ease-in-out ${
          showSidebar ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex justify-end items-center mb-4 md:hidden">
          <button onClick={toggleSidebar} className="p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div>
          <h1 className="font-bold mb-4">Add Entity</h1>
        </div>

        <div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full md:w-auto py-2 bg-[#0B5D3A] text-sm px-7 text-white rounded-xl mb-6"
          >
            Send Notifications
          </button>
        </div>

        {/* Archived Notifications Section */}
        {archivedNotifications.length > 0 && (
          <div className="mt-8">
            <h2 className="font-semibold mb-3">Archived Notifications</h2>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {archivedNotifications.map((notification) => (
                <div key={notification.id} className="p-2 bg-gray-100 rounded text-sm">
                  <div className="font-medium">{notification.title}</div>
                  <div className="text-xs text-gray-500">{notification.timeAgo}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black/60" onClick={toggleCreateModal}></div>
          <div className="bg-white rounded-lg w-full max-w-md relative p-10 mx-4 z-10">
            <button
              onClick={toggleCreateModal}
              className="absolute top-3 right-3 cursor-pointer bg-black p-1 text-sm rounded-md text-white z-10"
            >
              <X size={15} />
            </button>

            <div className="flex flex-col mb-6 mt-6">
              <form className="space-y-4 custom-scrollbar overflow-y-auto max-h-[60vh]">
                <div className="mt-8">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                    placeholder="title"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reciever</label>
                  <select
                    className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm text-gray-500"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="all">All Users</option>
                    <option value="students">Students</option>
                    <option value="instructors">Instructors</option>
                    <option value="admins">Administrators</option>
                    <option value="specific">Specific User</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                  <input
                    type="date"
                    className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                    placeholder="Select date"
                  />
                </div>

                <div className="pt-2 flex flex-col space-y-3">
                  <div>
                    <label htmlFor="upload" className="text-sm">
                      Upload{" "}
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
                      Upload
                    </label>
                    <button
                      type="button"
                      className="w-full bg-[#1E1E1F] mt-2 text-white text-sm py-2 px-6 rounded-xl hover:bg-gray-800 transition-colors"
                    >
                      Upload Documents
                    </button>
                  </div>

                  <button
                    type="button"
                    className="w-full bg-[#0B5D3A] text-white text-sm py-2 px-6 rounded-xl hover:bg-green-700 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Notification Details Modal */}
      {showDetailsModal && selectedNotification && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black/60" onClick={() => setShowDetailsModal(false)}></div>
          <div className="bg-white rounded-lg w-full max-w-md relative p-6 mx-4 z-10">
            <button
              onClick={() => setShowDetailsModal(false)}
              className="absolute top-3 right-3 cursor-pointer bg-black p-1 text-sm rounded-md text-white z-10"
            >
              <X size={15} />
            </button>

            <div className="flex flex-col mb-6 mt-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-lg bg-blue-200 overflow-hidden">
                  <img
                    src={selectedNotification.image || "/placeholder.svg"}
                    alt=""
                    className="object-cover h-full w-full"
                  />
                </div>
              </div>

              <h2 className="text-xl font-semibold text-center text-[#0B5D3A] mb-4">{selectedNotification.title}</h2>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="text-sm text-gray-500 mb-2">From: System</div>
                <div className="text-sm text-gray-500 mb-2">To: {selectedNotification.purchaser.split(" ")[0]}</div>
                <div className="text-sm text-gray-500 mb-2">Sent: {selectedNotification.timeAgo}</div>
                <div className="text-sm text-gray-500">Type: {selectedNotification.type}</div>
              </div>

              <div className="mb-4">
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-sm text-gray-700">
                  {selectedNotification.description || "No detailed description available."}
                </p>
              </div>

              {selectedNotification.type === "course" && (
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Course Progress</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-[#0B5D3A] h-2.5 rounded-full"
                      style={{ width: `${selectedNotification.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs text-gray-500 mt-1">{selectedNotification.progress}% complete</div>
                </div>
              )}

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => {
                    deleteNotification(selectedNotification.id)
                    setShowDetailsModal(false)
                  }}
                  className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    archiveNotification(selectedNotification.id)
                    setShowDetailsModal(false)
                  }}
                  className="px-4 py-2 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Archive
                </button>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 bg-[#0B5D3A] text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationPage
