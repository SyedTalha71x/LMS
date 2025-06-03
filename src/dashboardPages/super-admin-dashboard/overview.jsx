/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import { Chart, registerables } from 'chart.js';
import Vector1 from "../../../public/Vector.png";
import Vector2 from "../../../public/Vector (1).png";
import Vector3 from "../../../public/Frame.png";

// Register Chart.js components
Chart.register(...registerables);

export default function Overview() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const [notifications, setNotifications] = useState([
        {
            id: 1,
            name: "Dr. Smith",
            time: "Now",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            id: 2,
            name: "Dr. Smith",
            time: "Now",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
    ]);

    useEffect(() => {
        if (chartRef.current) {
            // Destroy previous chart instance if it exists
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [
                        {
                            label: 'Subscription',
                            data: [200, 250, 300, 350, 400, 450, 500, 550, 500, 450, 400, 350],
                            borderColor: '#10B981',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            borderWidth: 3,
                            tension: 0.4,
                            fill: true
                        },
                        {
                            label: 'Course Progress',
                            data: [100, 150, 200, 250, 300, 350, 400, 450, 400, 350, 300, 250],
                            borderColor: '#1F2937',
                            backgroundColor: 'rgba(31, 41, 55, 0.1)',
                            borderWidth: 3,
                            tension: 0.4,
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                usePointStyle: true,
                                boxWidth: 6,
                                padding: 20
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            grid: {
                                drawBorder: false
                            },
                            ticks: {
                                stepSize: 100
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                    }
                }
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return (
        <div className="flex flex-col md:flex-row w-full min-h-screen bg-white relative">
            <div className="flex-1 p-3 md:p-6">
                <div className="flex md:items-center items-start md:gap-0 gap-3 flex-col md:flex-row justify-between mb-6">
                    <h1 className="text-black text-2xl poppins-thin_600">SuperAdmin Overview</h1>
                    <div className="flex items-center gap-2">
                        <button
                            className="bg-[#1E1E1F] poppins-thin text-white px-4 py-2 rounded-xl cursor-pointer text-sm"
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
                        </div>
                        <p className="text-gray-400 text-sm poppins-thin_500">Total Teachers</p>
                        <h2 className="text-4xl font-bold">50</h2>
                    </div>

                    <div className="bg-[#F9F9F9] p-5 rounded-xl">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-[#EED6D6] p-3 rounded-lg">
                                <img src={Vector2} alt="" />
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm poppins-thin_500">Total Students</p>
                        <h2 className="text-4xl font-bold">100</h2>
                    </div>

                    <div className="bg-[#F9F9F9] p-5 rounded-xl">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-[#D8D6EE] p-2 rounded-lg">
                                <img src={Vector3} alt="" />
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm poppins-thin_500">Total Courses</p>
                        <h2 className="text-4xl font-bold">50</h2>
                    </div>
                </div>

                <div className="bg-[#F9F9F9] rounded-lg p-6 mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                        <div>
                            <h2 className="poppins-thin_500 text-lg">Comparison</h2>
                            <div className="flex items-center gap-1 mt-2">
                                <span className="text-green-500 poppins-thin_500 text-sm">↑ 4% more</span>
                                <span className="text-black poppins-thin_500 text-sm ml-1">in 2024</span>
                            </div>
                        </div>
                        <div className="flex items-center mt-2 sm:mt-0">
                            <div className="flex items-center mr-4">
                                <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
                                <span className="text-sm poppins-thin_500">Subscription</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-gray-800 rounded-full mr-2"></div>
                                <span className="text-sm poppins-thin_500">Course Progress</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-64 w-full overflow-x-auto">
                        <div className="min-w-[600px] h-full">
                            <canvas ref={chartRef}></canvas>
                        </div>
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