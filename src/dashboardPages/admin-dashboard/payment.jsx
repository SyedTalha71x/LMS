/* eslint-disable no-unused-vars */
"use client"

import { X, Edit } from "lucide-react"
import Image23 from "../../../public/image (23).png"
import { useState, useRef, useEffect } from "react"
import MasterCard from "../../../public/Master Card 1 (Hot Ion).svg"
import VectorImage from "../../../public/Vector-payment.svg"
import CardImage from "../../../public/money-coins.png"

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

  const dropdownRef = useRef(null)

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

  const paymentHistory = [
    {
      id: 1,
      title: "Payment of July 2025",
      date: "Nov 22, 2025",
      cardNumber: "**** **** **** 4878",
      amount: "$238",
    },
    {
      id: 2,
      title: "Payment of Jun 2025",
      date: "Nov 22, 2025",
      cardNumber: "**** **** **** 4878",
      amount: "$238",
    },
    {
      id: 3,
      title: "Payment of May 2025",
      date: "Nov 22, 2025",
      cardNumber: "**** **** **** 4878",
      amount: "$238",
    },
    {
      id: 4,
      title: "Payment of April 2025",
      date: "Nov 22, 2025",
      cardNumber: "**** **** **** 4878",
      amount: "$238",
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

  return (
    <div className="flex rounded-3xl text-black min-h-screen overflow-hidden ">
      <div className="flex-1 md:p-6 p-2 overflow-y-auto">
        <div className="max-w-3xl mr-auto w-full">
          <div className="flex justify-between md:items-center md:flex-row  gap-3 items-start mb-6">
            <h1 className="text-2xl font-semibold">Payment</h1>
            {/* Mobile sidebar toggle button */}
            <button onClick={toggleSidebar} className="md:hidden bg-[#0B5D3A] text-white px-4 py-2 rounded-lg text-sm">
              Manage Cards
            </button>
          </div>

          {/* Wallet Card */}
          <div className="mb-8 w-full  lg:p-4 p-2">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <img src={MasterCard || "/placeholder.svg"} alt="" />
              </div>

              {/* Right side summary cards */}
              <div className="flex flex-col gap-4">
                {/* Last month card */}
                <div className="bg-gray-100 rounded-lg p-4 w-40">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                      <div>
                        <img src={CardImage || "/placeholder.svg"} alt="" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 text-center  poppins-thin mb-1">Last month</p>
                  <p className="text-lg poppins-thin_500 text-center">$53,000</p>
                </div>

                {/* Last year card */}
                <div className="bg-gray-100 rounded-lg p-4 w-40    ">
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

          {/* History Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">History</h2>
            <div className="space-y-3">
              {paymentHistory.map((payment) => (
                <div key={payment.id} className="bg-[#F9F9F9] rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white p-5 rounded-md">
                      <img src={VectorImage || "/placeholder.svg"} alt="" />
                    </div>
                    <div>
                      <h3 className="poppins-thin_500 text-md">{payment.title}</h3>
                      <p className="text-xs mt-1 poppins-thin text-gray-500">
                        {payment.date} | {payment.cardNumber}
                      </p>
                    </div>
                  </div>
                  <span className="poppins-thin_500">{payment.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for sidebar on mobile */}
      {showSidebar && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={toggleSidebar}></div>}

      {/* Right sidebar */}
      <div
        className={`fixed md:static top-0 right-0 h-full z-50 w-80 sm:w-96 bg-white p-6 transform transition-transform duration-500 ease-in-out border-l border-gray-100 ${
          showSidebar ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
      >
        {/* Close button for mobile */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-semibold text-lg">Add Entity</h1>
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
