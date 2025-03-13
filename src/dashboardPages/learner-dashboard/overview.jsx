"use client";

import { useState } from "react";
import {
  X,
  MoreHorizontal,
  Edit,
  ChevronLeft,
  ChevronRight,
  Check,
  Menu,
} from "lucide-react";
import { FiUsers } from "react-icons/fi";
import ReactApexChart from "react-apexcharts";
import CalenderImage from "../../../public/Frame 31.svg";
import ReportFrame from "../../../public/Frame (1).svg";
import ProfilePicture from "../../../public/Profile Picture.png";

function Overview() {
  const [activeTab, setActiveTab] = useState("study");
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(ProfilePicture);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const hourData = {
    study: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May"],
      series: [{ name: "Study Hours", data: [40, 25, 70, 40, 15] }],
    },
    exams: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May"],
      series: [{ name: "Exam Hours", data: [35, 30, 50, 45, 20] }],
    },
  };

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: "45%",
      },
    },
    xaxis: {
      categories: hourData[activeTab].categories,
    },
    colors: ["#FFA500"],
  };

  const calendarDays = ["M", "T", "W", "T", "F", "S", "S"];
  const calendarDates = [[24, 25, 26, 27, 28, 29, 30]];

  const classes = [
    {
      name: "Pharmaceutics-1",
      time: "08:00 AM",
      completed: false,
    },
    {
      name: "Physical Pharmacy",
      time: "",
      completed: false,
    },
    {
      name: "Research Objective User",
      subtext: "Product Design",
      time: "02:40 PM",
      completed: false,
    },
    {
      name: "Report Analysis PDF Business",
      subtext: "Webinar (Done)",
      time: "04:50 PM",
      completed: true,
    },
  ];

  return (
    <div className="flex rounded-3xl text-black min-h-screen overflow-hidden">
      <main className="flex-1 min-w-0 ">
        <div className="p-2 md:p-3">
          <div className="flex md:items-center items-start md:flex-row flex-col gap-4 justify-between mb-8">
            <div className="">

              <h1 className="text-xl md:text-2xl poppins-thin_600">
                Hello Maietry{" "}
                <span className="inline-block animate-wave">👋</span>
              </h1>
              <p className="text-gray-500 mt-2 text-sm">
                Let's learn something new today!
              </p>
            </div>

        

            <div className="flex  items-center gap-2">
              <input
                type="text"
                placeholder="Search"
                className="outline-none text-sm p-3 bg-[#F1F1F1] text-black rounded-xl py-2 "
              />
                          <button
                onClick={toggleRightSidebar}
                className="lg:hidden p-2 bg-[#F1F1F1] rounded-xl"
              >
                <Menu size={20} />
              </button>
            
            </div>
          </div>

          <div className="max-w-6xl mx-auto ">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-[#E1E2F6] rounded-xl p-4 relative">
                <div className="flex justify-between items-start">
                  <div className="bg-white rounded-full p-2 w-14 h-14 flex items-center justify-center">
                    <img src={CalenderImage || "/placeholder.svg"} alt="" />
                  </div>
                  <button className="text-gray-700">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
                <div className="mt-8 rounded-md">
                  <h3 className="text-[#1F1D39] ml-1 text-lg poppins-thin_600">
                    Title
                  </h3>
                  <div className="flex items-center justify-center gap-1.5 w-18 rounded-xl p-2 mt-2 text-sm text-black bg-[#FCF9FF]">
                    <FiUsers className="font-semibold" />
                    <span className="font-semibold">99</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#F8EFE2] rounded-xl p-4 relative">
                <div className="flex justify-between items-start">
                  <div className="bg-white rounded-full p-2 w-14 h-14 flex items-center justify-center">
                    <img src={CalenderImage || "/placeholder.svg"} alt="" />
                  </div>
                  <button className="text-gray-700">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
                <div className="mt-8 rounded-md">
                  <h3 className="text-[#1F1D39] ml-1 text-lg poppins-thin_600">
                    Title
                  </h3>
                  <div className="flex items-center justify-center gap-1.5 w-18 rounded-xl p-2 mt-2 text-sm text-black bg-[#FCF9FF]">
                    <FiUsers className="font-semibold" />
                    <span className="font-semibold">99</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#F8EFE2] rounded-xl p-4 relative">
                <div className="flex justify-between items-start">
                  <div className="bg-white rounded-full p-2 w-14 h-14 flex items-center justify-center">
                    <img src={CalenderImage || "/placeholder.svg"} alt="" />
                  </div>
                  <button className="text-gray-700">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
                <div className="mt-8 rounded-md">
                  <h3 className="text-[#1F1D39] ml-1 text-lg poppins-thin_600">
                    Title
                  </h3>
                  <div className="flex items-center justify-center gap-1.5 w-18 rounded-xl p-2 mt-2 text-sm text-black bg-[#FCF9FF]">
                    <FiUsers className="font-semibold" />
                    <span className="font-semibold">99</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl mb-4 poppins-thin_600">Hours Spent</h2>
                <div className="bg-[#F9F9F9] rounded-xl p-2 ">
                  <div className="flex space-x-4 mb-6">
                    <button
                      className={`px-4 py-2 rounded-lg text-sm ${
                        activeTab === "study"
                          ? "bg-orange-100 text-orange-500"
                          : "bg-gray-100 text-gray-500"
                      }`}
                      onClick={() => setActiveTab("study")}
                    >
                      Study
                    </button>
                    <button
                      className={`px-4 py-2 rounded-lg text-sm ${
                        activeTab === "exams"
                          ? "bg-orange-100 text-orange-500"
                          : "bg-gray-100 text-gray-500"
                      }`}
                      onClick={() => setActiveTab("exams")}
                    >
                      Exams
                    </button>
                  </div>

                  <ReactApexChart
                    options={options}
                    series={hourData[activeTab].series}
                    type="bar"
                    height={300}
                  />
                </div>
              </div>

              <div>
                <h2 className="text-xl mb-4 poppins-thin_600">Performance</h2>
                <div className="bg-[#F9F9F9] rounded-xl">
                  <div className="mb-6 pb-12">
                    <div className="flex w-full gap-1 md:items-center items-start md:flex-row flex-col md:justify-between justify-start space-x-2 rounded-lg px-4 py-2">
                      <div className="flex items-center gap-1 bg-[#EFF1F3] p-2 px-4 text-sm rounded-md">
                        <div className="w-3 h-3 rounded-full bg-green-600"></div>
                        <span className="text-sm">Point Progress</span>
                      </div>
                      <div></div>
                      <div className="flex items-center gap-1 bg-[#EFF1F3] p-2 px-4 text-sm rounded-md">
                        <span className="text-sm">Monthly</span>
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M6 9L12 15L18 9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col pb-8 items-center justify-center">
                    <div className="relative w-48 h-48">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#f0f0f0"
                          strokeWidth="10"
                          strokeDasharray="283"
                          strokeDashoffset="0"
                          strokeLinecap="round"
                          transform="rotate(-90 50 50)"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#0e8a5f"
                          strokeWidth="10"
                          strokeDasharray="283"
                          strokeDashoffset="141"
                          strokeLinecap="round"
                          transform="rotate(-90 50 50)"
                        />
                        {/* Needle */}
                        <line
                          x1="50"
                          y1="50"
                          x2="50"
                          y2="20"
                          stroke="#333"
                          strokeWidth="2"
                          transform="rotate(45 50 50)"
                        />
                        <circle cx="50" cy="50" r="5" fill="#333" />
                      </svg>
                    </div>
                    <div className="flex gap-1 items-center text-center mt-4">
                      <p className="text-gray-500">Your Points:</p>
                      <p className="text-xl poppins-thin_600">8,966</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 bg-[#F9F9F9] rounded-xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="w-24 h-24 mr-6 hidden sm:block">
                    <img src={ReportFrame || "/placeholder.svg"} alt="" />
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-black font-semibold">Yearly report</p>
                    <h2 className="text-4xl poppins-thin_bold">2024</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Lorem ipsum dolor sit amet
                    </p>
                  </div>
                </div>
                <button className="bg-black poppins-thin_600 text-white rounded-xl cursor-pointer text-sm px-6 py-2 hover:bg-gray-700 transition-colors">
                  Download Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {isRightSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleRightSidebar}
        />
      )}

      <aside
        className={`
          fixed top-0 right-0 bottom-0 w-[320px] bg-white p-6 z-40 
          lg:static lg:w-80 lg:block lg:rounded-3xl
          transform ${
            isRightSidebarOpen
              ? "translate-x-0"
              : "translate-x-full lg:translate-x-0"
          }
          transition-all duration-500 ease-in-out
          overflow-y-auto
        `}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl poppins-thin_600">Profile</h2>
          <div className="flex items-center gap-2">
            <button
              className="text-gray-600 hover:text-gray-900"
              onClick={openEditModal}
            >
              <Edit size={18} />
            </button>
            <button
              onClick={toggleRightSidebar}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 mb-3">
            <div className="absolute inset-0 rounded-full">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="#e6e6e6"
                  strokeWidth="4"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="4"
                  strokeDasharray="302"
                  strokeDashoffset="75"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>
            <img
              src={profileImage}
              alt="Profile"
              className="absolute inset-0 w-full h-full object-cover rounded-full border-2 border-white"
            />
          </div>

          <h3 className="text-lg font-semibold">Maletry Prajapati</h3>
          <p className="text-sm text-black font-semibold mt-2">
            College Student
          </p>
        </div>

        <div className="mb-6 bg-[#F8F8F8] p-3 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <button className="text-gray-600 hover:text-gray-900">
              <ChevronLeft size={20} />
            </button>
            <h3 className="text-sm font-bold ">December 2021</h3>
            <button className="text-gray-600 hover:text-gray-900">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {calendarDays.map((day, index) => (
              <div key={index} className="text-xs text-black">
                {day}
              </div>
            ))}
          </div>

          {calendarDates.map((week, weekIndex) => (
            <div
              key={weekIndex}
              className="grid grid-cols-7 gap-1 text-center mb-1"
            >
              {week.map((date, dateIndex) => {
                const isActive = weekIndex === 0 && dateIndex === 1;
                return (
                  <div
                    key={dateIndex}
                    className={`text-xs py-1 ${
                      isActive
                        ? "bg-black text-white rounded-full"
                        : "text-gray-700"
                    }`}
                  >
                    {date}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="h-[1px] mb-4 w-full bg-slate-300/70"></div>

        <div>
          <h3 className="text-lg poppins-thin_600 mb-4 mt-10">Classes</h3>
          <div className="space-y-3">
            {classes.map((classItem, index) => (
              <div key={index} className="flex items-start poppins-thin_600">
                <div
                  className={`w-5 h-5 mt-0.5 m-2 border rounded flex-shrink-0 mr-3 ${
                    classItem.completed
                      ? "bg-green-500 border-green-500 flex items-center justify-center"
                      : "border-gray-300"
                  }`}
                >
                  {classItem.completed && (
                    <Check size={14} className="text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm  font-medium">{classItem.name}</p>
                  <div className="flex items-center  gap-3 ">
                    {classItem.subtext && (
                      <p className="text-xs text-gray-500">
                        {classItem.subtext}
                      </p>
                    )}
                    {classItem.time && (
                      <p className="text-xs text-black font-semibold">
                        {classItem.time}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md relative p-6 mx-4">
            <button
              onClick={closeEditModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center mb-6">
              <div className="relative w-24 h-24 mb-3 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
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
              {profileImage !== ProfilePicture && (
                <p className="text-green-600 text-xs mt-1">
                  New image selected
                </p>
              )}
            </div>

            <form className="space-y-4 custom-scrollbar overflow-y-auto max-h-[60vh]">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300/40 rounded-md bg-[#F1F1F1] outline-none text-sm "
                  defaultValue="Maletry"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300/40 rounded-md bg-[#F1F1F1] outline-none text-sm "
                  defaultValue="Prajapati"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300/40 rounded-md bg-[#F1F1F1] outline-none text-sm "
                  defaultValue="maletry@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone No
                </label>
                <input
                  type="tel"
                  className="w-full p-2 border border-gray-300/40 rounded-md bg-[#F1F1F1] outline-none text-sm "
                  defaultValue=""
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Input
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300/40 rounded-md bg-[#F1F1F1] outline-none text-sm "
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Input
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300/40 rounded-md bg-[#F1F1F1] outline-none text-sm "
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Input
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300/40 rounded-md bg-[#F1F1F1] outline-none text-sm "
                />
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  className="md:w-auto w-full bg-[#0B5D3A] text-white text-sm py-2 px-6 rounded-xl hover:bg-green-700 transition-colors"
                  onClick={closeEditModal}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Overview;
