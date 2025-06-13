/* eslint-disable no-unused-vars */
"use client"

import {
  X,
  Edit,
  Search,
  Download,
  Filter,
  ArrowUpDown,
  BarChart3,
  PieChart,
  Calendar,
  CreditCard,
  Wallet,
  DollarSign,
  Users,
  FileText,
} from "lucide-react"
import Image23 from "../../../public/image (23).png"
import { useState, useRef, useEffect } from "react"
import MasterCard from "../../../public/Master Card 1 (Hot Ion).svg"
import CardImage from "../../../public/money-coins.png"
import gsap from "gsap"

import MasterCard2 from "../../../public/Master Card 2 (Dark Crystal).png"
import VisaCard from "../../../public/Visa Card 1 (Sweet Colors).png"

import { BiEdit } from "react-icons/bi"
import { RiDeleteBin6Line } from "react-icons/ri"

export default function Payments() {
  const [showSidebar, setShowSidebar] = useState(false)
  const [showAddCardModal, setShowAddCardModal] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [profileImage, setProfileImage] = useState(Image23)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedConference, setSelectedConference] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [dateRange, setDateRange] = useState("monthly")
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)

  const dropdownRef = useRef(null)
  const tabContentRef = useRef({
    overview: null,
    transactions: null,
    subscriptions: null,
    analytics: null,
  })

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Initialize animations when component mounts
  useEffect(() => {
    // Set initial state for the active tab content
    if (tabContentRef.current[activeTab]) {
      gsap.set(tabContentRef.current[activeTab], { opacity: 1, y: 0 })
    }

    // Hide all other tab contents
    Object.keys(tabContentRef.current).forEach((tab) => {
      if (tab !== activeTab && tabContentRef.current[tab]) {
        gsap.set(tabContentRef.current[tab], { opacity: 0, y: 10 })
      }
    })
  }, [])

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

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

  const toggleAddCardModal = () => {
    setShowAddCardModal(!showAddCardModal)
  }

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id)
  }

  const openDetailsModal = (conference) => {
    setSelectedConference(conference)
    setShowDetailsModal(true)
    setActiveDropdown(null)
  }

  const closeDetailsModal = () => {
    setShowDetailsModal(false)
  }

  const openInvoiceModal = (payment) => {
    setSelectedPayment(payment)
    setShowInvoiceModal(true)
  }

  const closeInvoiceModal = () => {
    setShowInvoiceModal(false)
  }

  const switchTab = (tab) => {
    // First, animate out the current tab content
    if (activeTab && tabContentRef.current[activeTab]) {
      gsap.to(tabContentRef.current[activeTab], {
        opacity: 0,
        y: 10,
        duration: 0.3,
        onComplete: () => {
          // After animation completes, change the active tab
          setActiveTab(tab)

          // Then animate in the new tab content
          if (tabContentRef.current[tab]) {
            gsap.fromTo(tabContentRef.current[tab], { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.4 })
          }
        },
      })
    } else {
      // If no current tab (first load), just set the active tab
      setActiveTab(tab)

      // And animate in the new tab content
      if (tabContentRef.current[tab]) {
        gsap.fromTo(tabContentRef.current[tab], { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.4 })
      }
    }
  }

  const paymentHistory = [
    {
      id: 1,
      title: "Payment of July 2025",
      date: "Nov 22, 2025",
      cardNumber: "**** **** **** 4878",
      amount: "$238",
      status: "Completed",
      student: "John Doe",
      course: "Advanced Web Development",
    },
    {
      id: 2,
      title: "Payment of Jun 2025",
      date: "Nov 22, 2025",
      cardNumber: "**** **** **** 4878",
      amount: "$238",
      status: "Completed",
      student: "Jane Smith",
      course: "UX Design Fundamentals",
    },
    {
      id: 3,
      title: "Payment of May 2025",
      date: "Nov 22, 2025",
      cardNumber: "**** **** **** 4878",
      amount: "$238",
      status: "Failed",
      student: "Robert Johnson",
      course: "Data Science Bootcamp",
    },
    {
      id: 4,
      title: "Payment of April 2025",
      date: "Nov 22, 2025",
      cardNumber: "**** **** **** 4878",
      amount: "$238",
      status: "Pending",
      student: "Emily Williams",
      course: "Mobile App Development",
    },
  ]

  const savedCards = [
    {
      id: 1,
      name: "DJ Snake",
      number: "5242 - 4242 - 5242 - 4878",
      type: "mastercard",
      color: "bg-gradient-to-br from-teal-500 to-green-600",
    },
    {
      id: 2,
      name: "Luis Fonsi",
      number: "4502 - 2215 - 183 - 4289",
      type: "visa",
      color: "bg-gradient-to-br from-purple-500 to-pink-600",
    },
  ]

  // Analytics data
  const analyticsData = {
    totalRevenue: "$238,400",
    pendingPayments: "$12,580",
    totalStudents: "1,245",
    revenueGrowth: "+12.5%",
    monthlyRevenue: [
      { month: "Jan", amount: 12000 },
      { month: "Feb", amount: 15000 },
      { month: "Mar", amount: 18000 },
      { month: "Apr", amount: 22000 },
      { month: "May", amount: 19000 },
      { month: "Jun", amount: 25000 },
      { month: "Jul", amount: 28000 },
    ],
    courseRevenue: [
      { course: "Web Development", amount: 85000 },
      { course: "Data Science", amount: 65000 },
      { course: "UX Design", amount: 45000 },
      { course: "Mobile Development", amount: 43400 },
    ],
  }

  // Subscription plans
  const subscriptionPlans = [
    {
      id: 1,
      name: "Basic Plan",
      price: "$19.99",
      period: "monthly",
      students: 124,
      revenue: "$2,478.76",
    },
    {
      id: 2,
      name: "Standard Plan",
      price: "$49.99",
      period: "monthly",
      students: 356,
      revenue: "$17,796.44",
    },
    {
      id: 3,
      name: "Premium Plan",
      price: "$99.99",
      period: "monthly",
      students: 765,
      revenue: "$76,492.35",
    },
  ]

  return (
    <div className="flex rounded-3xl text-black min-h-screen overflow-hidden">
      <div className="flex-1 md:p-6 p-2 overflow-y-auto">
        <div className="max-w-5xl mr-auto w-full">
          {/* Header with tabs */}
          <div className="flex flex-col mb-6">
            <div className="flex justify-between  flex-col md:items-center md:flex-row gap-3 items-start mb-4">
              <h1 className="text-2xl font-semibold">Payment Management</h1>
              {/* Mobile sidebar toggle button */}
              <button
                onClick={toggleSidebar}
                className="md:hidden bg-[#0B5D3A] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1"
              >
                <Wallet className="h-4 w-4" />
                Manage Cards
              </button>
            </div>

            {/* Navigation tabs */}
            <div className="flex flex-wrap gap-2 border-b overflow-x-auto pb-1">
              <button
                onClick={() => switchTab("overview")}
                className={`px-4 py-2 text-sm font-medium ${activeTab === "overview" ? "border-b-2 border-[#0B5D3A] text-[#0B5D3A]" : "text-gray-500"}`}
              >
                Overview
              </button>
              <button
                onClick={() => switchTab("transactions")}
                className={`px-4 py-2 text-sm font-medium ${activeTab === "transactions" ? "border-b-2 border-[#0B5D3A] text-[#0B5D3A]" : "text-gray-500"}`}
              >
                Transactions
              </button>
              <button
                onClick={() => switchTab("subscriptions")}
                className={`px-4 py-2 text-sm font-medium ${activeTab === "subscriptions" ? "border-b-2 border-[#0B5D3A] text-[#0B5D3A]" : "text-gray-500"}`}
              >
                Subscriptions
              </button>
              <button
                onClick={() => switchTab("analytics")}
                className={`px-4 py-2 text-sm font-medium ${activeTab === "analytics" ? "border-b-2 border-[#0B5D3A] text-[#0B5D3A]" : "text-gray-500"}`}
              >
                Analytics
              </button>
            </div>
          </div>

          {/* Overview Tab Content */}
          {activeTab === "overview" && (
            <div ref={(el) => (tabContentRef.current.overview = el)}>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mb-8">
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Revenue</p>
                      <h3 className="text-2xl font-semibold mt-1">{analyticsData.totalRevenue}</h3>
                      <p className="text-xs text-green-600 mt-1">{analyticsData.revenueGrowth} from last month</p>
                    </div>
                    <div className="bg-[#0B5D3A]/10 p-3 rounded-full">
                      <DollarSign className="h-6 w-6 text-[#0B5D3A]" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Pending Payments</p>
                      <h3 className="text-2xl font-semibold mt-1">{analyticsData.pendingPayments}</h3>
                      <p className="text-xs text-amber-600 mt-1">12 transactions pending</p>
                    </div>
                    <div className="bg-amber-100 p-3 rounded-full">
                      <Wallet className="h-6 w-6 text-amber-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Active Students</p>
                      <h3 className="text-2xl font-semibold mt-1">{analyticsData.totalStudents}</h3>
                      <p className="text-xs text-green-600 mt-1">+85 this month</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Invoices Generated</p>
                      <h3 className="text-2xl font-semibold mt-1">1,245</h3>
                      <p className="text-xs text-gray-500 mt-1">Last: 2 hours ago</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                      <FileText className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Wallet Card */}
              <div className="mb-8 w-full lg:p-4 p-2">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative w-full md:w-auto">
                    <img src={MasterCard || "/placeholder.svg"} alt="" className="w-full md:w-auto" />
                  </div>

                  {/* Right side summary cards */}
                  <div className="flex flex-row md:flex-col gap-4 overflow-x-auto">
                    {/* Last month card */}
                    <div className="bg-gray-100 rounded-lg p-4 w-40 min-w-[10rem]">
                      <div className="flex items-center justify-center mb-2">
                        <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                          <div>
                            <img src={CardImage || "/placeholder.svg"} alt="" />
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 text-center poppins-thin mb-1">Last month</p>
                      <p className="text-lg poppins-thin_500 text-center">$53,000</p>
                    </div>

                    {/* Last year card */}
                    <div className="bg-gray-100 rounded-lg p-4 w-40 min-w-[10rem]">
                      <div className="flex items-center justify-center mb-2">
                        <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                          <div>
                            <img src={CardImage || "/placeholder.svg"} alt="" />
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 text-center poppins-thin mb-1">Last year</p>
                      <p className="text-lg poppins-thin_500 text-center">$53,000</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                  <h2 className="text-xl font-semibold">Recent Transactions</h2>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-none">
                      <input
                        type="text"
                        placeholder="Search transactions..."
                        className="pl-8 pr-4 py-1 text-sm border rounded-lg w-full"
                      />
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    <button className="p-1.5 border rounded-lg">
                      <Filter className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            <div className="flex items-center gap-1">
                              Transaction
                              <ArrowUpDown className="h-3 w-3" />
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Student
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Course
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Date
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Amount
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paymentHistory.map((payment) => (
                          <tr key={payment.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{payment.title}</div>
                              <div className="text-xs text-gray-500">{payment.cardNumber}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.student}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.course}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {payment.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${
                                  payment.status === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : payment.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }`}
                              >
                                {payment.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button
                                onClick={() => openInvoiceModal(payment)}
                                className="text-[#0B5D3A] hover:text-[#0B5D3A]/80 font-medium"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-6 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 gap-3">
                    <div className="text-sm text-gray-500">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of{" "}
                      <span className="font-medium">24</span> results
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 border rounded text-sm">Previous</button>
                      <button className="px-3 py-1 bg-[#0B5D3A] text-white rounded text-sm">1</button>
                      <button className="px-3 py-1 border rounded text-sm">2</button>
                      <button className="px-3 py-1 border rounded text-sm">3</button>
                      <button className="px-3 py-1 border rounded text-sm">Next</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Transactions Tab Content */}
          {activeTab === "transactions" && (
            <div ref={(el) => (tabContentRef.current.transactions = el)}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                <h2 className="text-xl font-semibold">All Transactions</h2>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      className="pl-8 pr-4 py-2 text-sm border rounded-lg w-full sm:w-auto"
                    />
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 border rounded-lg">
                      <Filter className="h-4 w-4 text-gray-500" />
                    </button>
                    <button className="p-2 border rounded-lg">
                      <Calendar className="h-4 w-4 text-gray-500" />
                    </button>
                    <button className="flex items-center gap-1 bg-[#0B5D3A] text-white px-3 py-2 rounded-lg text-sm">
                      <Download className="h-4 w-4" />
                      Export
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          <div className="flex items-center gap-1">
                            Transaction ID
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Student
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Course/Plan
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Payment Method
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[...paymentHistory, ...paymentHistory].map((payment, index) => (
                        <tr key={`${payment.id}-${index}`} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">TRX-{1000 + index}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.student}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.course}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {index % 3 === 0 ? "Credit Card" : index % 3 === 1 ? "PayPal" : "Stripe"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {payment.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${
                                payment.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : payment.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {payment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openInvoiceModal(payment)}
                                className="text-[#0B5D3A] hover:text-[#0B5D3A]/80"
                              >
                                View
                              </button>
                              <button className="text-gray-500 hover:text-gray-700">
                                <Download className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 gap-3">
                  <div className="text-sm text-gray-500">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of{" "}
                    <span className="font-medium">24</span> results
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 border rounded text-sm">Previous</button>
                    <button className="px-3 py-1 bg-[#0B5D3A] text-white rounded text-sm">1</button>
                    <button className="px-3 py-1 border rounded text-sm">2</button>
                    <button className="px-3 py-1 border rounded text-sm">3</button>
                    <button className="px-3 py-1 border rounded text-sm">Next</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Subscriptions Tab Content */}
          {activeTab === "subscriptions" && (
            <div ref={(el) => (tabContentRef.current.subscriptions = el)}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                <h2 className="text-xl font-semibold">Subscription Plans</h2>
                <button className="bg-[#0B5D3A] text-white px-4 py-2 rounded-lg text-sm">Add New Plan</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {subscriptionPlans.map((plan) => (
                  <div key={plan.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold">{plan.name}</h3>
                      <div className="flex gap-2">
                        <button className="p-1.5 hover:bg-gray-100 rounded-md">
                          <BiEdit size={18} />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded-md text-red-500">
                          <RiDeleteBin6Line size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="mb-4">
                      <span className="text-2xl font-bold">{plan.price}</span>
                      <span className="text-gray-500 text-sm">/{plan.period}</span>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Active Students:</span>
                        <span className="text-sm font-medium">{plan.students}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Total Revenue:</span>
                        <span className="text-sm font-medium">{plan.revenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Renewal Rate:</span>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                    </div>
                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg text-sm font-medium transition-colors">
                      View Details
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Subscription Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm text-gray-500 mb-1">Monthly Recurring Revenue</h4>
                    <p className="text-2xl font-semibold">$24,568</p>
                    <p className="text-xs text-green-600 mt-1">+8.2% from last month</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm text-gray-500 mb-1">Average Revenue Per User</h4>
                    <p className="text-2xl font-semibold">$42.35</p>
                    <p className="text-xs text-green-600 mt-1">+2.1% from last month</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm text-gray-500 mb-1">Churn Rate</h4>
                    <p className="text-2xl font-semibold">3.2%</p>
                    <p className="text-xs text-red-600 mt-1">+0.5% from last month</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab Content */}
          {activeTab === "analytics" && (
            <div ref={(el) => (tabContentRef.current.analytics = el)}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                <h2 className="text-xl font-semibold">Payment Analytics</h2>
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    className="border rounded-lg px-3 py-2 text-sm"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                  >
                    <option value="weekly">Last 7 days</option>
                    <option value="monthly">Last 30 days</option>
                    <option value="quarterly">Last 90 days</option>
                    <option value="yearly">Last 12 months</option>
                  </select>
                  <button className="flex items-center gap-1 bg-[#0B5D3A] text-white px-3 py-2 rounded-lg text-sm">
                    <Download className="h-4 w-4" />
                    Export Report
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Revenue Overview</h3>
                    <button className="p-1 hover:bg-gray-100 rounded-md">
                      <BarChart3 className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                  <div className="h-64 flex items-end justify-between gap-2 overflow-x-auto pb-2">
                    {analyticsData.monthlyRevenue.map((item, index) => (
                      <div key={index} className="flex flex-col items-center min-w-[2rem]">
                        <div
                          className="bg-[#0B5D3A]/80 hover:bg-[#0B5D3A] rounded-t-sm w-10"
                          style={{ height: `${(item.amount / 30000) * 200}px` }}
                        ></div>
                        <span className="text-xs mt-2">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Revenue by Course</h3>
                    <button className="p-1 hover:bg-gray-100 rounded-md">
                      <PieChart className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                  <div className="h-64 flex flex-col justify-center space-y-4">
                    {analyticsData.courseRevenue.map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{item.course}</span>
                          <span className="font-medium">${(item.amount / 1000).toFixed(1)}k</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${
                              index === 0
                                ? "bg-[#0B5D3A]"
                                : index === 1
                                  ? "bg-blue-500"
                                  : index === 2
                                    ? "bg-purple-500"
                                    : "bg-amber-500"
                            }`}
                            style={{ width: `${(item.amount / 85000) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Credit Card</span>
                        <span className="font-medium">65%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-[#0B5D3A] h-2.5 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>PayPal</span>
                        <span className="font-medium">25%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "25%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Stripe</span>
                        <span className="font-medium">10%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "10%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Payment Status</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Completed</span>
                        <span className="font-medium">82%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "82%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Pending</span>
                        <span className="font-medium">12%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "12%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Failed</span>
                        <span className="font-medium">6%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "6%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for sidebar on mobile */}
      {showSidebar && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={toggleSidebar}></div>}

      {/* Right sidebar */}
      <div
        className={`fixed md:static top-0 right-0 h-full z-50 w-80 sm:w-96 bg-white p-6 transform transition-transform duration-500 ease-in-out border-l border-gray-100 ${
          showSidebar ? "translate-x-0" : "translate-x-full md:translate-x-0"
        } overflow-y-auto`}
      >
        {/* Close button for mobile */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-semibold text-lg">Payment Methods</h1>
          <button onClick={toggleSidebar} className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <button
            onClick={toggleAddCardModal}
            className="w-full bg-[#0B5D3A] poppins-thin-500 text-white text-sm py-2.5 px-4 rounded-lg cursor-pointer transition-colors"
          >
            Add payment method
          </button>
        </div>

        {/* All Cards Section */}
        <div>
          <h2 className="font-semibold mb-4">All cards</h2>
          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              {/* First card */}
              <div>
                <div className="flex items-center gap-2">
                  {/* The horizontal line that takes full width except for the icons */}
                  <div className="flex-grow h-[1px] bg-slate-300"></div>

                  {/* Icons container */}
                  <div className="flex gap-2">
                    <div className="border border-slate-300 rounded-md cursor-pointer p-2">
                      <BiEdit size={18} />
                    </div>
                    <div className="border border-slate-300 rounded-md cursor-pointer p-2">
                      <RiDeleteBin6Line size={18} className="text-red-600" />
                    </div>
                  </div>
                </div>

                {/* Card image */}
                <div className="mt-2">
                  <img src={MasterCard2 || "/placeholder.svg"} alt="MasterCard" className="w-full max-w-xs" />
                </div>
              </div>

              {/* Second card */}
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex-grow h-[1px] bg-slate-300"></div>
                  <div className="flex gap-2">
                    <div className="border border-slate-300 rounded-md cursor-pointer p-2">
                      <BiEdit size={18} />
                    </div>
                    <div className="border border-slate-300 rounded-md cursor-pointer p-2">
                      <RiDeleteBin6Line size={18} className="text-red-600" />
                    </div>
                  </div>
                </div>

                {/* Card image */}
                <div className="mt-2">
                  <img src={VisaCard || "/placeholder.svg"} alt="VisaCard" className="w-full max-w-xs" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Gateway Section */}
        <div className="mt-8">
          <h2 className="font-semibold mb-4">Payment Gateways</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Stripe</h3>
                  <p className="text-xs text-gray-500">Connected</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-[#0B5D3A] rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">PayPal</h3>
                  <p className="text-xs text-gray-500">Connected</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-[#0B5D3A] rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-medium">Square</h3>
                  <p className="text-xs text-gray-500">Not connected</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-gray-200 rounded-full relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Card Modal */}
      {showAddCardModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black/60" onClick={toggleAddCardModal}></div>
          <div className="bg-white rounded-lg w-full max-w-md relative p-6 mx-4 z-10">
            <button onClick={toggleAddCardModal} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>

            <form className="space-y-6 mt-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card No</label>
                <input
                  type="text"
                  className="w-full p-4 rounded-lg bg-gray-100 outline-none text-sm placeholder-gray-500"
                  placeholder="Card No"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                <input
                  type="text"
                  className="w-full p-4 rounded-lg bg-gray-100 outline-none text-sm placeholder-gray-500"
                  placeholder="CVV"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry date</label>
                <input
                  type="text"
                  className="w-full p-4 rounded-lg bg-gray-100 outline-none text-sm placeholder-gray-500"
                  placeholder="Expiry date"
                />
              </div>

              <div className="pt-4 flex justify-center items-center">
                <button
                  type="button"
                  className="md:w-auto w-full bg-[#0B5D3A] text-white text-sm py-2 px-6 rounded-xl cursor-pointer hover:bg-green-800 transition-colors font-medium"
                  onClick={toggleAddCardModal}
                >
                  Add Card
                </button>
              </div>

              <div className="flex items-center justify-center">
                <div className="flex-grow h-[1px] bg-gray-300"></div>
                <span className="px-4 text-sm text-gray-500">Or</span>
                <div className="flex-grow h-[1px] bg-gray-300"></div>
              </div>

              <div className="flex justify-center items-center">
                <button
                  type="button"
                  className="md:w-auto w-full bg-gray-500 text-white text-sm py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Paypal
                </button>
              </div>

              <div className="flex items-center justify-center">
                <div className="flex-grow h-[1px] bg-gray-300"></div>
                <span className="px-4 text-sm text-gray-500">Or</span>
                <div className="flex-grow h-[1px] bg-gray-300"></div>
              </div>

              <div className="flex justify-center items-center">
                <button
                  type="button"
                  className="md:w-auto w-full bg-gray-500 text-white text-sm py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Stripe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {showInvoiceModal && selectedPayment && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black/60" onClick={closeInvoiceModal}></div>
          <div className="bg-white rounded-lg w-full max-w-2xl relative p-6 mx-4 z-10 max-h-[90vh] overflow-y-auto">
            <button onClick={closeInvoiceModal} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
              <div>
                <h2 className="text-xl font-semibold">Invoice #{selectedPayment.id + 1000}</h2>
                <p className="text-sm text-gray-500">Date: {selectedPayment.date}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 border rounded-lg">
                  <Download className="h-4 w-4 text-gray-500" />
                </button>
                <button className="bg-[#0B5D3A] text-white px-4 py-2 rounded-lg text-sm">Print Invoice</button>
              </div>
            </div>

            <div className="border-t border-b py-4 mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">From</h3>
                  <p className="font-medium">LMS Admin</p>
                  <p className="text-sm text-gray-600">123 Education Street</p>
                  <p className="text-sm text-gray-600">Learning City, LC 12345</p>
                  <p className="text-sm text-gray-600">admin@lmssystem.com</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">To</h3>
                  <p className="font-medium">{selectedPayment.student}</p>
                  <p className="text-sm text-gray-600">Student ID: ST-{selectedPayment.id + 5000}</p>
                  <p className="text-sm text-gray-600">student@example.com</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Invoice Details</h3>
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Course
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{selectedPayment.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{selectedPayment.course}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                          {selectedPayment.amount}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Platform Fee</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">$12</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50">
                        <td
                          colSpan={2}
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right"
                        >
                          Subtotal
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                          $250
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td
                          colSpan={2}
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right"
                        >
                          Tax (5%)
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                          $12.50
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td
                          colSpan={2}
                          className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right"
                        >
                          Total
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                          $262.50
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Payment Information</h3>
              <div className="flex flex-col sm:flex-row justify-between text-sm gap-3">
                <div>
                  <p>
                    <span className="font-medium">Payment Method:</span> Credit Card
                  </p>
                  <p>
                    <span className="font-medium">Card Number:</span> {selectedPayment.cardNumber}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-medium">Status:</span>
                    <span
                      className={`ml-1 ${
                        selectedPayment.status === "Completed"
                          ? "text-green-600"
                          : selectedPayment.status === "Pending"
                            ? "text-amber-600"
                            : "text-red-600"
                      }`}
                    >
                      {selectedPayment.status}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Transaction ID:</span> TRX-{selectedPayment.id + 1000}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Conference Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black/60" onClick={toggleCreateModal}></div>
          <div className="bg-white rounded-lg w-full max-w-md relative p-7 mx-4 z-10 max-h-[90vh] overflow-y-auto">
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
                <img src={Image23 || "/placeholder.svg"} alt="Conference icon" className="w-full h-full object-cover" />
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
  )
}
