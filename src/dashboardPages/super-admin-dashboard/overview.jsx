"use client"

/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react"
import { ChevronRight, Menu, X, DollarSign, Calendar, CreditCard, TrendingUp, Users } from "lucide-react"
import { Chart, registerables } from "chart.js"
import Vector1 from "../../../public/Vector.png"
import Vector2 from "../../../public/Vector (1).png"
import Vector3 from "../../../public/Frame.png"

// Register Chart.js components
Chart.register(...registerables)

export default function Overview() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  // Set "revenue" as the default selected chart
  const [selectedChart, setSelectedChart] = useState("revenue")
  const [timeRange, setTimeRange] = useState("yearly")
  const enrollmentChartRef = useRef(null)
  const enrollmentChartInstance = useRef(null)
  const revenueChartRef = useRef(null)
  const revenueChartInstance = useRef(null)
  const paymentMethodChartRef = useRef(null)
  const paymentMethodChartInstance = useRef(null)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Payment Received",
      time: "10m ago",
      message: "New subscription payment of $199 received from John Doe for 'Advanced Web Development' course.",
    },
    {
      id: 2,
      title: "Subscription Expired",
      time: "1h ago",
      message: "5 student subscriptions have expired today. Total potential renewal value: $495.",
    },
  ])

  // Financial summary data
  const financialSummary = {
    totalRevenue: "$24,500",
    monthlyRecurring: "$8,750",
    averageOrderValue: "$199",
    conversionRate: "8.2%",
  }

  // Top selling courses data
  const topSellingCourses = [
    { id: 1, name: "Advanced Web Development", sales: 125, revenue: "$24,875", growth: "+12%" },
    { id: 2, name: "UI/UX Design Masterclass", sales: 98, revenue: "$19,502", growth: "+8%" },
    { id: 3, name: "Data Science Fundamentals", sales: 87, revenue: "$17,313", growth: "+15%" },
    { id: 4, name: "Mobile App Development", sales: 76, revenue: "$15,124", growth: "+5%" },
  ]

  // Function to create responsive chart options
  const getResponsiveChartOptions = (isLineChart = true) => {
    const baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: window.innerWidth < 768 ? "bottom" : "top",
          labels: {
            usePointStyle: true,
            boxWidth: window.innerWidth < 768 ? 4 : 6,
            padding: window.innerWidth < 768 ? 10 : 20,
            font: {
              size: window.innerWidth < 768 ? 10 : 12,
            },
          },
        },
        tooltip: {
          mode: "index",
          intersect: false,
          bodyFont: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
          titleFont: {
            size: window.innerWidth < 768 ? 12 : 14,
          },
        },
      },
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: false,
      },
    }

    if (isLineChart) {
      return {
        ...baseOptions,
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              drawBorder: false,
            },
            ticks: {
              font: {
                size: window.innerWidth < 768 ? 8 : 11,
              },
              callback: selectedChart === "revenue" ? (value) => "$" + value : undefined,
              stepSize: selectedChart === "enrollment" ? 100 : undefined,
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: window.innerWidth < 768 ? 8 : 11,
              },
              maxRotation: window.innerWidth < 768 ? 45 : 0,
              minRotation: window.innerWidth < 768 ? 45 : 0,
            },
          },
        },
      }
    } else {
      // For doughnut chart
      return {
        ...baseOptions,
        cutout: window.innerWidth < 768 ? "60%" : "70%",
        plugins: {
          ...baseOptions.plugins,
          legend: {
            ...baseOptions.plugins.legend,
            position: window.innerWidth < 768 ? "bottom" : "right",
          },
        },
      }
    }
  }

  useEffect(() => {
    // Function to initialize/update charts
    const initializeCharts = () => {
      // Revenue Chart
      if (revenueChartRef.current) {
        if (revenueChartInstance.current) {
          revenueChartInstance.current.destroy()
        }

        const ctx = revenueChartRef.current.getContext("2d")

        revenueChartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
              {
                label: "Revenue",
                data: [2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 5000, 4500, 4000, 3500],
                borderColor: "#10B981",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                borderWidth: window.innerWidth < 768 ? 2 : 3,
                tension: 0.4,
                fill: true,
              },
              {
                label: "Expenses",
                data: [1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2200, 2000, 1800, 1600],
                borderColor: "#EF4444",
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                borderWidth: window.innerWidth < 768 ? 2 : 3,
                tension: 0.4,
                fill: true,
              },
            ],
          },
          options: getResponsiveChartOptions(true),
        })
      }

      // Enrollment Chart
      if (enrollmentChartRef.current) {
        if (enrollmentChartInstance.current) {
          enrollmentChartInstance.current.destroy()
        }

        const ctx = enrollmentChartRef.current.getContext("2d")

        enrollmentChartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
              {
                label: "Subscription",
                data: [200, 250, 300, 350, 400, 450, 500, 550, 500, 450, 400, 350],
                borderColor: "#10B981",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                borderWidth: window.innerWidth < 768 ? 2 : 3,
                tension: 0.4,
                fill: true,
              },
              {
                label: "Course Progress",
                data: [100, 150, 200, 250, 300, 350, 400, 450, 400, 350, 300, 250],
                borderColor: "#1F2937",
                backgroundColor: "rgba(31, 41, 55, 0.1)",
                borderWidth: window.innerWidth < 768 ? 2 : 3,
                tension: 0.4,
                fill: true,
              },
            ],
          },
          options: getResponsiveChartOptions(true),
        })
      }

      // Payment Method Chart
      if (paymentMethodChartRef.current) {
        if (paymentMethodChartInstance.current) {
          paymentMethodChartInstance.current.destroy()
        }

        const ctx = paymentMethodChartRef.current.getContext("2d")

        paymentMethodChartInstance.current = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: ["Credit Card", "PayPal", "Bank Transfer", "Other"],
            datasets: [
              {
                data: [65, 20, 10, 5],
                backgroundColor: [
                  "#10B981", // Green
                  "#3B82F6", // Blue
                  "#F59E0B", // Amber
                  "#6B7280", // Gray
                ],
                borderWidth: 0,
                hoverOffset: 4,
              },
            ],
          },
          options: getResponsiveChartOptions(false),
        })
      }
    }

    // Initialize charts
    initializeCharts()

    // Add resize event listener for responsive charts
    const handleResize = () => {
      initializeCharts()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (enrollmentChartInstance.current) {
        enrollmentChartInstance.current.destroy()
      }
      if (revenueChartInstance.current) {
        revenueChartInstance.current.destroy()
      }
      if (paymentMethodChartInstance.current) {
        paymentMethodChartInstance.current.destroy()
      }
    }
  }, [selectedChart, timeRange])

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-white relative">
      <div className="flex-1 p-3">
        <div className="flex md:items-center items-start md:gap-0 gap-3 flex-col md:flex-row justify-between mb-6">
          <h1 className="text-black text-xl sm:text-2xl poppins-thin_600">SuperAdmin Overview</h1>
          <div className="flex items-center gap-2 flex-wrap">
            <select
              className="bg-[#F9F9F9] border border-gray-300 text-gray-700 py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            <button className="bg-[#1E1E1F] poppins-thin text-white px-3 sm:px-4 py-2 rounded-xl cursor-pointer text-xs sm:text-sm">
              Download Report
            </button>
            <button className="md:hidden p-2 rounded-md hover:bg-gray-100" onClick={toggleSidebar}>
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-[#F9F9F9] p-3 sm:p-5 rounded-xl">
            <div className="flex justify-between items-start mb-2 sm:mb-4">
              <div className="bg-[#D6EED9] p-2 sm:p-3 rounded-lg">
                <DollarSign className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
              </div>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm poppins-thin_500">Total Revenue</p>
            <h2 className="text-2xl sm:text-4xl font-bold">{financialSummary.totalRevenue}</h2>
            <p className="text-green-500 text-xs sm:text-sm mt-1">↑ 12% from last month</p>
          </div>

          <div className="bg-[#F9F9F9] p-3 sm:p-5 rounded-xl">
            <div className="flex justify-between items-start mb-2 sm:mb-4">
              <div className="bg-[#D6DEEE] p-2 sm:p-3 rounded-lg">
                <Calendar className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm poppins-thin_500">Monthly Recurring</p>
            <h2 className="text-2xl sm:text-4xl font-bold">{financialSummary.monthlyRecurring}</h2>
            <p className="text-green-500 text-xs sm:text-sm mt-1">↑ 8% from last month</p>
          </div>

          <div className="bg-[#F9F9F9] p-3 sm:p-5 rounded-xl">
            <div className="flex justify-between items-start mb-2 sm:mb-4">
              <div className="bg-[#EEE6D6] p-2 sm:p-3 rounded-lg">
                <CreditCard className="h-4 w-4 sm:h-6 sm:w-6 text-amber-600" />
              </div>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm poppins-thin_500">Avg. Order Value</p>
            <h2 className="text-2xl sm:text-4xl font-bold">{financialSummary.averageOrderValue}</h2>
            <p className="text-green-500 text-xs sm:text-sm mt-1">↑ 5% from last month</p>
          </div>

          <div className="bg-[#F9F9F9] p-3 sm:p-5 rounded-xl">
            <div className="flex justify-between items-start mb-2 sm:mb-4">
              <div className="bg-[#E6D6EE] p-2 sm:p-3 rounded-lg">
                <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm poppins-thin_500">Conversion Rate</p>
            <h2 className="text-2xl sm:text-4xl font-bold">{financialSummary.conversionRate}</h2>
            <p className="text-green-500 text-xs sm:text-sm mt-1">↑ 2.1% from last month</p>
          </div>
        </div>

        {/* Platform Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#F9F9F9] p-5 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-[#E9EED6] p-3 rounded-lg">
                <img src={Vector1 || "/placeholder.svg"} alt="" />
              </div>
            </div>
            <p className="text-gray-400 text-sm poppins-thin_500">Total Teachers</p>
            <h2 className="text-4xl font-bold">50</h2>
            <p className="text-green-500 text-sm mt-1">↑ 10% from last month</p>
          </div>

          <div className="bg-[#F9F9F9] p-5 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-[#EED6D6] p-3 rounded-lg">
                <img src={Vector2 || "/placeholder.svg"} alt="" />
              </div>
            </div>
            <p className="text-gray-400 text-sm poppins-thin_500">Total Students</p>
            <h2 className="text-4xl font-bold">100</h2>
            <p className="text-green-500 text-sm mt-1">↑ 15% from last month</p>
          </div>

          <div className="bg-[#F9F9F9] p-5 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-[#D8D6EE] p-2 rounded-lg">
                <img src={Vector3 || "/placeholder.svg"} alt="" />
              </div>
            </div>
            <p className="text-gray-400 text-sm poppins-thin_500">Total Courses</p>
            <h2 className="text-4xl font-bold">50</h2>
            <p className="text-green-500 text-sm mt-1">↑ 8% from last month</p>
          </div>
        </div>

        {/* Charts Section with Tabs */}
        <div className="bg-[#F9F9F9] rounded-lg p-6 mb-8">
          <div className="border-b border-gray-200 mb-4">
            <ul className="flex flex-wrap -mb-px">
              <li className="mr-2">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${selectedChart === "revenue" ? "border-green-600 text-green-600" : "border-transparent hover:text-gray-600 hover:border-gray-300"}`}
                  onClick={() => setSelectedChart("revenue")}
                >
                  Revenue Analytics
                </button>
              </li>
              <li className="mr-2">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${selectedChart === "enrollment" ? "border-green-600 text-green-600" : "border-transparent hover:text-gray-600 hover:border-gray-300"}`}
                  onClick={() => setSelectedChart("enrollment")}
                >
                  Enrollment Trends
                </button>
              </li>
              <li>
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${selectedChart === "payment" ? "border-green-600 text-green-600" : "border-transparent hover:text-gray-600 hover:border-gray-300"}`}
                  onClick={() => setSelectedChart("payment")}
                >
                  Payment Methods
                </button>
              </li>
            </ul>
          </div>

          {selectedChart === "revenue" && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div>
                  <h2 className="poppins-thin_500 text-lg">Revenue vs Expenses</h2>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-green-500 poppins-thin_500 text-sm">↑ 12% revenue growth</span>
                    <span className="text-black poppins-thin_500 text-sm ml-1">compared to last year</span>
                  </div>
                </div>
                <div className="flex items-center mt-2 sm:mt-0">
                  <div className="flex items-center mr-4">
                    <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
                    <span className="text-sm poppins-thin_500">Revenue</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-sm poppins-thin_500">Expenses</span>
                  </div>
                </div>
              </div>

              <div className="relative h-64 w-full overflow-x-auto">
                <div className="min-w-[600px] h-full">
                  <canvas ref={revenueChartRef}></canvas>
                </div>
              </div>
            </div>
          )}

          {selectedChart === "enrollment" && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div>
                  <h2 className="poppins-thin_500 text-lg">Enrollment Comparison</h2>
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
                  <canvas ref={enrollmentChartRef}></canvas>
                </div>
              </div>
            </div>
          )}

          {selectedChart === "payment" && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div>
                  <h2 className="poppins-thin_500 text-lg">Payment Method Distribution</h2>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-black poppins-thin_500 text-sm">Most popular payment methods</span>
                  </div>
                </div>
              </div>

              <div className="relative h-64 w-full">
                <canvas ref={paymentMethodChartRef}></canvas>
              </div>
            </div>
          )}
        </div>

        {/* Top Selling Courses */}
        <div className="bg-[#F9F9F9] rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="poppins-thin_500 text-lg">Top Selling Courses</h2>
              <p className="text-sm text-gray-500">Courses generating the most revenue</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-sm">Course Name</th>
                  <th className="text-right py-3 px-4 font-medium text-sm">Sales</th>
                  <th className="text-right py-3 px-4 font-medium text-sm">Revenue</th>
                  <th className="text-right py-3 px-4 font-medium text-sm">Growth</th>
                </tr>
              </thead>
              <tbody>
                {topSellingCourses.map((course) => (
                  <tr key={course.id} className="border-b">
                    <td className="py-3 px-4 text-sm">{course.name}</td>
                    <td className="py-3 px-4 text-sm text-right">{course.sales}</td>
                    <td className="py-3 px-4 text-sm text-right">{course.revenue}</td>
                    <td className="py-3 px-4 text-sm text-right text-green-500">{course.growth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-10 md:hidden" onClick={toggleSidebar}></div>
      )}

      <div
        className={`
                    fixed top-0 right-0 bottom-0 w-[320px] bg-white p-6 z-40 
                    lg:static lg:w-96 lg:block lg:rounded-3xl
                    transform ${sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
                    transition-all duration-500 ease-in-out
                    overflow-y-auto
                `}
      >
        <div className="flex justify-end items-center mb-6 lg:hidden">
          <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-100">
            <X size={24} />
          </button>
        </div>

        <div className="">
          <h2 className="text-xl poppins-thin_600 mb-4">Financial Alerts</h2>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="pb-4 bg-[#EDEDEDE0] p-3 rounded-md">
                <div className="flex items-start mb-1">
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 bg-[#0B5D3A] rounded-full"></span>
                      <div className="text-sm font-medium">{notification.title}</div>
                      <span className="text-xs text-gray-500 ml-auto">{notification.time}</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-600">{notification.message}</p>
              </div>
            ))}
          </div>

          {/* Recent Transactions */}
          <h2 className="text-xl poppins-thin_600 mt-6 mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#EDEDEDE0] rounded-md">
              <div className="flex items-center gap-3">
                <div className="bg-[#D6EED9] p-2 rounded-full">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Course Purchase</p>
                  <p className="text-xs text-gray-500">John Doe</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">$199.00</p>
                <p className="text-xs text-gray-500">Today</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#EDEDEDE0] rounded-md">
              <div className="flex items-center gap-3">
                <div className="bg-[#D6DEEE] p-2 rounded-full">
                  <CreditCard className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Subscription Renewal</p>
                  <p className="text-xs text-gray-500">Sarah Johnson</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">$99.00</p>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#EDEDEDE0] rounded-md">
              <div className="flex items-center gap-3">
                <div className="bg-[#EEE6D6] p-2 rounded-full">
                  <Users className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Group Enrollment</p>
                  <p className="text-xs text-gray-500">Tech Solutions Inc.</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">$1,495.00</p>
                <p className="text-xs text-gray-500">Jun 10</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
