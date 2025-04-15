import { useState } from "react";
import { Calendar, BookOpen, Award, MoreHorizontal, Menu, Check } from "lucide-react";
import Vector1 from "../../../public/Vector.png";
import Vector2 from "../../../public/Vector (1).png";
import Vector3 from "../../../public/Frame.png";

import Avatar1 from '../../../public/avatar.png'
import Avatar2 from '../../../public/avatar (1).png'
import Avatar3 from '../../../public/avatar (2).png'
import Avatar4 from '../../../public/avatar4.png'
import Layer1 from '../../../public/Layer_1.png'

export default function Overview() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-white relative">
      {/* Main Content */}
      <div className="flex-1 p-3 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-black text-2xl poppins-thin_600">Overview</h1>
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={toggleSidebar}
          >
            <Menu size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#F9F9F9] p-5 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-[#E9EED6] p-3 rounded-lg">
                <img src={Vector1} alt="" />
              </div>
              <button className="text-black hover:bg-gray-100 rounded-full p-1">
                <MoreHorizontal size={25} />
              </button>
            </div>
            <h2 className="text-4xl font-bold">05</h2>
            <p className="text-gray-400 text-sm poppins-thin_500">Events</p>
          </div>

          <div className="bg-[#F9F9F9] p-5 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-[#EED6D6] p-3 rounded-lg">
                <img src={Vector2} alt="" />
              </div>
              <button className="text-black hover:bg-gray-100 rounded-full p-1">
                <MoreHorizontal size={25} />
              </button>
            </div>
            <h2 className="text-4xl font-bold">05</h2>
            <p className="text-gray-400 text-sm poppins-thin_500">Total students</p>
          </div>

          <div className="bg-[#F9F9F9] p-5 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-[#D8D6EE] p-3 rounded-lg">
                <img src={Vector3} alt="" />
              </div>
              <button className="text-black hover:bg-gray-100 rounded-full p-1">
                <MoreHorizontal size={25} />
              </button>
            </div>
            <h2 className="text-4xl font-bold">05</h2>
            <p className="text-gray-400 text-sm poppins-thin_500">Total courses</p>
          </div>
        </div>

        <div className="bg-[#F9F9F9] rounded-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div>
              <h2 className="poppins-thin_500 text-lg">Attendance</h2>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-green-500 poppins-thin_500 text-sm">↑ 4% more</span>
                <span className="text-black poppins-thin_500 text-sm ml-1">in 2024</span>
              </div>
            </div>
            <div className="flex items-center mt-2 sm:mt-0">
              <div className="flex items-center mr-4">
                <div className="w-6 h-4 bg-green-600 rounded-full mr-2"></div>
                <span className="text-sm poppins-thin_500">Present</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-4 bg-gray-800 rounded-full mr-2"></div>
                <span className="text-sm poppins-thin_500">Absent</span>
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            <AttendanceChart />
          </div>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 right-0 bottom-0 w-[320px] bg-white p-6 z-40 
          lg:static lg:w-80 lg:block lg:rounded-3xl
          transform ${
            sidebarOpen
              ? "translate-x-0"
              : "translate-x-full lg:translate-x-0"
          }
          transition-all duration-500 ease-in-out
          overflow-y-auto
        `}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-black text-lg poppins-thin_600">Other card</h2>
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mb-8 bg-[#F9F9F9] p-6 rounded-lg">
          <div className="flex items-center mb-2 gap-2">
            <div>
              <img src={Layer1} alt="" />
            </div>
            <h3 className="poppins-thin_bold">Student performance</h3>
          </div>
          <p className="text-gray-500 text-sm mb-6">
            Minim dolor in amet nulla laboris enim dolore consequat.
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={Avatar1}
                  alt="Wade Warren"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 className="poppins-thin_500">Wade Warren</h4>
                  <p className="text-gray-400 poppins-thin_500 text-xs">Student 1</p>
                </div>
              </div>
              <button className="bg-[#272829] text-white text-xs px-4 py-1.5 rounded-xl">
                VIEW
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={Avatar2}
                  alt="Robert Fox"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 className="poppins-thin_500">Robert Fox</h4>
                  <p className="text-gray-400 poppins-thin_500 text-xs">Student 1</p>
                </div>
              </div>
              <button className="bg-[#272829] text-white text-xs px-4 py-1.5 rounded-xl">
                VIEW
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={Avatar3}
                  alt="Jane Cooper"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 className="poppins-thin_500">Jane Cooper</h4>
                  <p className="text-gray-400 poppins-thin_500 text-xs">Student 1</p>
                </div>
              </div>
              <button className="bg-[#272829] text-white text-xs px-4 py-1.5 rounded-xl">
                VIEW
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={Avatar4}
                  alt="Natalia"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 className="poppins-thin_500">Natalia</h4>
                  <p className="text-gray-400 poppins-thin_500 text-xs">Student 1</p>
                </div>
              </div>
              <button className="bg-[#272829] text-white text-xs px-4 py-1.5 rounded-xl">
                VIEW
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mt-7 bg-gray-50 p-3 rounded-md">
            <span className="text-xs poppins-thin_500 text-gray-500">
              54 STUDENT
            </span>
            <a href="#" className="text-xs text-black poppins-thin_500">
              VIEW ALL MEMBER
            </a>
          </div>
        </div>

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
                  <p className="text-sm font-medium">{classItem.name}</p>
                  <div className="flex items-center gap-3">
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
      </div>
    </div>
  );
}

function AttendanceChart() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute poppins-thin_500 left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
        <div>500</div>
        <div>400</div>
        <div>300</div>
        <div>200</div>
        <div>100</div>
        <div>0</div>
      </div>

      {/* Chart area */}
      <div className="absolute left-8 right-0 top-0 bottom-4 bg-[#F9F9F9]">
        {/* Chart SVG */}
        <svg
          className="w-full h-full"
          viewBox="0 0 800 300"
          preserveAspectRatio="none"
        >
          {/* Light green area for Present */}
          <path
            d="M0,250 C50,200 100,150 150,180 C200,210 250,120 300,100 C350,80 400,150 450,120 C500,90 550,150 600,80 C650,10 700,50 800,10 L800,300 L0,300 Z"
            fill="rgba(16, 185, 129, 0.1)"
          />

          {/* Present line (green) */}
          <path
            d="M0,250 C50,200 100,150 150,180 C200,210 250,120 300,100 C350,80 400,150 450,120 C500,90 550,150 600,80 C650,10 700,50 800,10"
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
          />

          {/* Absent line (dark) */}
          <path
            d="M0,280 C50,250 100,200 150,220 C200,240 250,180 300,200 C350,220 400,250 450,200 C500,150 550,250 600,220 C650,190 700,100 800,150"
            fill="none"
            stroke="#1F2937"
            strokeWidth="3"
          />
        </svg>

        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
          <div>Apr</div>
          <div>May</div>
          <div>Jun</div>
          <div>Jul</div>
          <div>Aug</div>
          <div>Sep</div>
          <div>Oct</div>
          <div>Nov</div>
          <div>Dec</div>
        </div>
      </div>
    </div>
  );
}