/* eslint-disable no-unused-vars */
import { useState } from "react";
import Notifcation from "../../../public/notfication.svg";
import { HiDotsHorizontal } from "react-icons/hi";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Title",
      description: "Description",
      date: "10-12-2020",
      progress: 0,
      type: "document",
      phase: null,
      image: Notifcation,
    },
    {
      id: 2,
      title: "Course",
      description: "Phase 1",
      date: "Progress",
      progress: 45,
      type: "course",
      phase: 1,
      image: Notifcation,
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
    },
    {
      id: 4,
      title: "Course",
      description: "Phase 1",
      date: "Progress",
      progress: 75,
      type: "course",
      phase: 3,
      image: Notifcation,
    },
    {
      id: 5,
      title: "Course",
      description: "Phase 1",
      date: "Progress",
      progress: 90,
      type: "course",
      phase: 4,
      image: Notifcation,
    },
  ]);

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
                  <img src={notification.image} alt="" className="object-cover h-full w-full" />
                </div>

                <div className="ml-4 flex-1">
                  {notification.subtitle && <p className="text-md poppins-thin_600 text-gray-500">{notification.subtitle}</p>}
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
                  <HiDotsHorizontal className="" size={25}/>
                </button>
                <button className="bg-[#1E1E1F] poppins-thin text-white text-sm cursor-pointer px-4 py-1.5 rounded-xl w-56 md:w-auto">
                  {notification.type === "document" ? "Documents" : "Continue"}
                </button>
                <button className="md:ml-4 md:hidden block">
                  <HiDotsHorizontal className="" size={25}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;