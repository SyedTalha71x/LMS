import { Search, MoreVertical, X, Bell, ChevronRight } from "lucide-react";
import AvatarGroup from "../../../public/avatar-group.png";
import Image23 from "../../../public/image (23).png";
import { useState } from "react";

export default function ConferencePage() {
  const conferences = [
    {
      id: 1,
      title: "Pharma II catch up",
      time: "10:00 AM",
      members: "10+ member joining",
    },
    {
      id: 2,
      title: "Pharma II catch up",
      time: "10:00 AM",
      members: "10+ member joining",
    },
    {
      id: 3,
      title: "Pharma II catch up",
      time: "10:00 AM",
      members: "10+ member joining",
    },
    {
      id: 4,
      title: "Pharma II catch up",
      time: "10:00 AM",
      members: "10+ member joining",
    },
  ];

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const notifications = [
    {
      id: 1,
      title: "Title",
      time: "now",
      message:
        "Hi Name! Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna porttitor",
    },
  ];

  return (
    <div className="flex rounded-3xl text-black min-h-screen overflow-hidden">
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl poppins-thin_600">Conference</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-100 rounded-2xl text-sm outline-none  py-2 pl-10 pr-4 w-full md:w-64"
            />
          </div>
        </div>

        <div className="space-y-4">
          {conferences.map((conference) => (
            <div
              key={conference.id}
              className="bg-[#F9F9F9] p-4 rounded-xl pb-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-amber-800 flex items-center justify-center overflow-hidden">
                    <img
                      src={Image23}
                      alt="Conference icon"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className=" poppins-thin_500">{conference.title}</h3>
                    <p className="text-sm poppins-thin_500 text-gray-400">
                      {conference.time}
                    </p>
                  </div>
                </div>
                <button className="text-gray-500">
                  <MoreVertical size={20} />
                </button>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm poppins-thin_500 text-gray-500">
                  {conference.members}
                </p>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                    >
                      <img
                        src={AvatarGroup}
                        alt={`Member ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
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

      <div
        className={`fixed md:static top-0 right-0 h-full z-40 w-80 bg-white p-4 md:p-6 transform transition-transform duration-500 ease-in-out ${
          showSidebar ? "translate-x-0" : "translate-x-full md:translate-x-0"
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
            className="w-full md:w-auto py-2 bg-[#0B5D3A] text-sm px-7 text-white rounded-xl mb-6 "
          >
            Create Conference
          </button>
        </div>

        <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className=" pb-4 bg-[#EDEDEDE0] p-3 rounded-md"
                >
                  <div className="flex items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                        <span className="font-medium">
                          {notification.title}
                        </span>
                        <span className="text-xs text-gray-500">
                          {notification.time}
                        </span>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    {notification.message}
                  </p>
                </div>
              ))}
            </div>
      </div>
    </div>
  );
}
