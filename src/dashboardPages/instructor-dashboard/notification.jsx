/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Notifcation from "../../../public/Frame 17140.svg";
import { HiDotsHorizontal } from "react-icons/hi";
import { ChevronRight, X, Bell } from "lucide-react";

const NotificationPage = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

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
    },
  ]);

  return (
    <div className="flex rounded-3xl text-black min-h-screen overflow-hidden">
      <div className="w-full max-w-4xl mr-auto p-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl poppins-thin_600">Notification</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="px-4 py-2 pl-8 bg-gray-100 rounded-full text-sm w-64"
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
      className="flex flex-col sm:flex-row items-center sm:items-start bg-[#F9F9F9] rounded-lg p-3 shadow-sm"
    >
      {/* Image section */}
      <div className="flex-shrink-0 mb-2 sm:mb-0 sm:mr-3">
        <div className="rounded-lg bg-blue-200 overflow-hidden ">
          <img
            src={notification.image}
            alt=""
            className="object-cover h-full w-full"
          />
        </div>
      </div>

      <div className="flex-1 text-center sm:text-left mt-3">
        <div className="text-sm poppins-thin_500 text-gray-400">
          {notification.purchaser}
        </div>
        <div className="poppins-thin_500 text-[#0B5D3A]">
          {notification.title}
        </div>
        <div className="text-sm poppins-thin_500 text-gray-400">
          {notification.description}
        </div>
      </div>

      <div className="flex flex-row sm:flex-col justify-start w-full sm:w-auto sm:ml-2 mt-6 gap-4 sm:mt-0 items-center sm:items-end">
      
        <button className="md:mt-4 mt-0">
          <HiDotsHorizontal size={20} />
        </button>
        <div className="text-sm poppins-thin_500 text-gray-400">
          {notification.timeAgo || "3 Minutes Ago"}
        </div>
      </div>
    </div>
  ))}
</div>

      </div>

      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
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
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={toggleCreateModal}
          ></div>
          <div className="bg-white rounded-lg w-full max-w-md relative p-10 mx-4 z-10">
            <button
              onClick={toggleCreateModal}
              className="absolute top-3 right-3 cursor-pointer bg-black p-1 text-sm rounded-md text-white z-10"
            >
              <X size={15} />
            </button>

            <div className="flex flex-col  mb-6 mt-6">
              <form className="space-y-4 custom-scrollbar overflow-y-auto max-h-[60vh]">
                <div className="mt-8">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                    placeholder="title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                    placeholder="Description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reciever
                  </label>
                  <select
                    className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm text-gray-500"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select
                    </option>
                  
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deadline
                  </label>
                  <input
                    type="select"
                    className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                    placeholder="Description"
                  />
                </div>

                <div className="pt-2 flex flex-col space-y-3">
                  <div>
                    <label htmlFor="upload " className="text-sm">
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
    </div>
  );
};

export default NotificationPage;
