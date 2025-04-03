import { Search, MoreVertical, X, Bell, ChevronRight, Edit } from "lucide-react";
import AvatarGroup from "../../../public/avatar-group.png";
import Image23 from "../../../public/image (23).png";
import { useState, useRef, useEffect } from "react";

export default function ConferencePage() {
  const conferences = [
    {
      id: 1,
      title: "Pharma II catch up",
      time: "10:00 AM",
      members: "10+ member joining",
      studentsEnrolled: 22,
      link: "https://123456789//"
    },
    {
      id: 2,
      title: "Pharma II catch up",
      time: "10:00 AM",
      members: "10+ member joining",
      studentsEnrolled: 18,
      link: "https://123456789//"
    },
    {
      id: 3,
      title: "Pharma II catch up",
      time: "10:00 AM",
      members: "10+ member joining",
      studentsEnrolled: 15,
      link: "https://123456789//"
    },
    {
      id: 4,
      title: "Pharma II catch up",
      time: "10:00 AM",
      members: "10+ member joining",
      studentsEnrolled: 20,
      link: "https://123456789//"
    },
  ];
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [profileImage, setProfileImage] = useState(Image23);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedConference, setSelectedConference] = useState(null);
  
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

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

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const openDetailsModal = (conference) => {
    setSelectedConference(conference);
    setShowDetailsModal(true);
    setActiveDropdown(null);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
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
              className="bg-gray-100 rounded-2xl text-sm outline-none py-2 pl-10 pr-4 w-full md:w-64"
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
                    <h3 className="poppins-thin_500">{conference.title}</h3>
                    <p className="text-sm poppins-thin_500 text-gray-400">
                      {conference.time}
                    </p>
                  </div>
                </div>
                <div className="relative" ref={activeDropdown === conference.id ? dropdownRef : null}>
                  <button 
                    className="text-gray-500 p-1"
                    onClick={() => toggleDropdown(conference.id)}
                  >
                    <MoreVertical size={20} className="cursor-pointer" />
                  </button>
                  
                  {activeDropdown === conference.id && (
                    <div className="absolute cursor-pointer right-3 top-6 bg-white shadow-lg rounded-lg w-40 z-10 py-1 border border-gray-100">
                      <button 
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                        onClick={() => openDetailsModal(conference)}
                      >
                        View Details
                      </button>
                    </div>
                  )}
                </div>
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
          <button onClick={toggleSidebar} className="p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div>
          <h1 className="font-bold mb-4">Add Entity</h1>
        </div>

        <div className="">
          <button
            onClick={toggleCreateModal}
            className="w-full md:w-auto py-2 bg-[#0B5D3A] text-sm px-7 text-white rounded-xl mb-6"
          >
            Create Conference
          </button>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="pb-4 bg-[#EDEDEDE0] p-3 rounded-md"
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

      {/* Create Conference Modal */}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  placeholder="Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Set Time</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  placeholder="Set time"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Add People</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  placeholder="Add People"
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

              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  className="md:w-auto w-full bg-[#0B5D3A] text-white text-sm py-2 px-6 rounded-xl hover:bg-green-700 transition-colors"
                  onClick={toggleCreateModal}
                >
                  Create Conference
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Conference Details Modal */}
      {showDetailsModal && selectedConference && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black/60" onClick={closeDetailsModal}></div>
          <div className="bg-white rounded-lg w-full max-w-md relative p-6 mx-4 z-10">
            <button onClick={closeDetailsModal} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-amber-800 flex items-center justify-center overflow-hidden">
                <img
                  src={Image23}
                  alt="Conference icon"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className=" poppins-thin_500 text-lg">{selectedConference.title}</h2>
            </div>
            
            <div className="space-y-2">
              <div>
                <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2 italic">Time</h3>
                <p className=" font-bold mt-4">{selectedConference.time}</p>
              </div>
              
              <div className="flex gap-4 items-center mt-6">
                <h3 className="text-gray-700 md:text-sm text-xs font-bold ">Students Enrolled:</h3>
                <p className="font-medium text-sm text-gray-500">{selectedConference.studentsEnrolled}</p>
              </div>
              
              <div className="flex gap-4 items-center">
                <h3 className="text-gray-700 md:text-sm text-xs font-bold ">Link:</h3>
                <p className="font-medium text-sm text-gray-500 ">{selectedConference.link}</p>
              </div>
              
              <div className="pt-4 flex justify-between">
              <button className="w-auto bg-[#C77373] text-sm text-white py-2 px-7  rounded-xl cursor-pointer  transition-colors">
                    Delete
                  </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}