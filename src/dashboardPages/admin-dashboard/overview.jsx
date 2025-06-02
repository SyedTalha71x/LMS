/* eslint-disable no-unused-vars */
import { useState } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import Vector1 from "../../../public/Vector.png";
import Vector2 from "../../../public/Vector (1).png";
import Vector3 from "../../../public/Frame.png";

export default function Overview() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

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

    return (
        <div className="flex flex-col md:flex-row w-full min-h-screen bg-white relative">
            <div className="flex-1 p-3 md:p-6">
                <div className="flex md:items-center items-start md:gap-0 gap-3 flex-col md:flex-row justify-between mb-6">
                    <h1 className="text-black text-2xl poppins-thin_600">Overview</h1>
                    <div className="flex items-center gap-2">
                        <button
                            className="bg-[#1E1E1F] poppins-thin text-white px-4 py-2 rounded-xl  cursor-pointer text-sm"
                        >
                            Download Report
                        </button>
                        <button
                            className="md:hidden p-2 rounded-md hover:bg-gray-100"
                            onClick={toggleSidebar}
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-[#F9F9F9] p-5 rounded-xl">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-[#E9EED6] p-3 rounded-lg">
                                <img src={Vector1} alt="" />
                            </div>
                            {/* <button className="text-black hover:bg-gray-100 rounded-full p-1">
                <MoreHorizontal size={25} />
              </button> */}
                        </div>
                        <p className="text-gray-400 text-sm poppins-thin_500">Total Teachers</p>
                        <h2 className="text-4xl font-bold">50</h2>
                    </div>

                    <div className="bg-[#F9F9F9] p-5 rounded-xl">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-[#EED6D6] p-3 rounded-lg">
                                <img src={Vector2} alt="" />
                            </div>
                            {/* <button className="text-black hover:bg-gray-100 rounded-full p-1">
                <MoreHorizontal size={25} />
              </button> */}
                        </div>
                        <p className="text-gray-400 text-sm poppins-thin_500">Total Students</p>
                        <h2 className="text-4xl font-bold">100</h2>
                    </div>

                    <div className="bg-[#F9F9F9] p-5 rounded-xl">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-[#D8D6EE] p-2 rounded-lg">
                                <img src={Vector3} alt="" />
                            </div>
                            {/* <button className="text-black hover:bg-gray-100 rounded-full p-1">
                <MoreHorizontal size={25} />
              </button> */}
                        </div>
                        <p className="text-gray-400 text-sm poppins-thin_500">Total Courses</p>
                        <h2 className="text-4xl font-bold">50</h2>
                    </div>
                </div>

                <div className="bg-[#F9F9F9] rounded-lg p-6 mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                        <div>
                            <h2 className="poppins-thin_500 text-lg">Comparision</h2>
                            <div className="flex items-center gap-1 mt-2">
                                <span className="text-green-500 poppins-thin_500 text-sm">↑ 4% more</span>
                                <span className="text-black poppins-thin_500 text-sm ml-1">in 2024</span>
                            </div>
                        </div>
                        <div className="flex items-center mt-2 sm:mt-0">
                            <div className="flex items-center mr-4">
                                <div className="w-6 h-4 bg-green-600 rounded-full mr-2"></div>
                                <span className="text-sm poppins-thin_500">Type 1</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-6 h-4 bg-gray-800 rounded-full mr-2"></div>
                                <span className="text-sm poppins-thin_500">Type 2</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-64 w-full ">
                        <AttendanceChart />
                    </div>
                </div>
            </div>

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 bg-opacity-50 z-10 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            <div
                className={`
          fixed top-0 right-0 bottom-0 w-[320px] bg-white p-6 z-40 
          lg:static lg:w-96 lg:block lg:rounded-3xl
          transform ${sidebarOpen
                        ? "translate-x-0"
                        : "translate-x-full lg:translate-x-0"
                    }
          transition-all duration-500 ease-in-out
          overflow-y-auto
        `}
            >
                <div className="flex justify-end items-center mb-4 lg:hidden">
                    <button onClick={toggleSidebar} className="p-1">
                        <X className="h-5 w-5" />
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