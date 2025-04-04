"use client";

/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Search, Bell, ChevronRight, X } from "lucide-react";

export default function Assignments() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    dueDate: "",
    file: null,
  });

  // Check if screen is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const assignments = [
    {
      id: 1,
      title: "Assignment",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      status: "Pending",
    },
    {
      id: 2,
      title: "Assignment",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      status: "Submitted",
    },
  ];

  const quizzes = [
    {
      id: 1,
      title: "Quiz 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      status: "Passed",
    },
    {
      id: 2,
      title: "Quiz 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      status: "Failed",
    },
  ];

  const notifications = [
    {
      id: 1,
      title: "Title",
      time: "now",
      message:
        "Hi Name! Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna porttitor",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-green-800";
      case "Submitted":
        return "text-green-800";
      case "Passed":
        return "text-green-800";
      case "Failed":
        return "text-red-800";
      default:
        return "text-gray-800";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    // Reset form and close modal
    setFormData({
      name: "",
      description: "",
      category: "",
      dueDate: "",
      file: null,
    });
    setIsAddModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {isNotificationOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-20"
          onClick={() => setIsNotificationOpen(false)}
        />
      )}

      <div className="md:p-4 p-2">
        <div className="max-w-4xl mr-auto flex flex-col gap-4 md:flex-row md:items-center items-start justify-between">
          <h1 className="text-2xl poppins-thin_600">Assignments</h1>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 rounded-xl text-sm bg-gray-100 w-full focus:outline-none"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>

            {isMobile && (
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-green-500 rounded-full"></span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <main className={`flex-1 md:p-6 p-3 overflow-y-auto ${isMobile && isNotificationOpen ? 'hidden md:block' : ''}`}>
          <div className="container mx-auto">
            <section className="mb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="bg-[#F9F9F9] p-6 rounded-lg"
                  >
                    <h3 className="poppins-thin_500 text-lg mb-2">
                      {assignment.title}
                    </h3>
                    <p className="text-gray-800 poppins-thin text-sm mb-4">
                      {assignment.description}
                    </p>
                    <div className="flex items-start gap-2 flex-col justify-start">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium bg-[#E8E8E8]`}
                      >
                        {assignment.status}
                      </span>
                      <button
                        className="flex bg-[#E8E8E8] py-2.5 px-5 rounded-sm items-center text-black text-xs poppins-thin_bold "
                        onClick={() => setSelectedAssignment(assignment)}
                      >
                        DETAILS <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-[6%]">
              <h1 className="text-xl poppins-thin_600 mb-2">Quizzes</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizzes.map((quiz) => (
                  <div key={quiz.id} className="bg-[#F9F9F9] p-6 rounded-lg">
                    <h3 className="poppins-thin_500 text-lg mb-2">
                      {quiz.title}
                    </h3>
                    <p className="text-gray-800 text-sm poppins-thin mb-4">
                      {quiz.description}
                    </p>
                    <div className="flex items-start gap-2 flex-col justify-start">
                      <span
                        className={` text-xs px-3 py-1 rounded-full font-medium bg-[#E8E8E8] `}
                      >
                        {quiz.status}
                      </span>
                      <button
                        className="flex bg-[#E8E8E8] py-2.5 px-5 rounded-sm items-center text-black text-xs poppins-thin_bold "
                        onClick={() => setSelectedQuiz(quiz)}
                      >
                        DETAILS <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>

        <aside
          className={`
            ${
              isMobile
                ? "fixed inset-y-0 right-0 z-50 w-80 transform transition-transform duration-500 ease-in-out shadow-lg"
                : "w-90 "
            }
            ${
              isNotificationOpen || !isMobile
                ? "translate-x-0"
                : "translate-x-full"
            }
            bg-white overflow-y-auto
          `}
        >
          <div className="flex justify-end items-end p-3">

           {isMobile && (
             <button
             onClick={() => setIsNotificationOpen(false)}
             className="p-1 flex justify-end items-end rounded-full hover:bg-gray-100"
             >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              )}
              </div>
          <div className="p-6 ">
            <h1 className="text-xl poppins-thin_600">Add Entity</h1>
            <div className="mt-4">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="w-full py-2 bg-[#0B5D3A] text-sm px-7 text-white rounded-xl font-semibold hover:bg-opacity-90 transition-colors"
              >
                Add quiz/assignment
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl poppins-thin_600">Notification</h2>
             
            </div>

            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="bg-[#EDEDEDE0] p-4 rounded-md"
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
        </aside>
      </div>

      {selectedAssignment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md m-4 relative">
            <button
              onClick={() => setSelectedAssignment(null)}
              className="absolute top-4 right-4 text-white rounded-md cursor-pointer p-1 bg-black hover:bg-gray-800"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="p-6">
              <h2 className="text-md text-[#161736] mb-2 poppins-thin_bold">
                Assignment
              </h2>

              <h3 className="text-md mt-4 text-gray-600 poppins-thin_800 mb-2">
                Description
              </h3>
              <p className="text-sm mt-3 text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>

              <div className="grid grid-cols-1 gap-2 mb-4 text-sm">
                <div className="flex gap-4">
                  <p className="text-gray-600 font-semibold w-20">Due date</p>
                  <p className="text-gray-700 text-sm">03/31/25</p>
                </div>
                <div className="flex gap-4">
                  <p className="text-gray-600 font-semibold w-20">Start date</p>
                  <p className="text-gray-700 text-sm">03/01/25</p>
                </div>
                <div className="flex gap-4">
                  <p className="text-gray-600 font-semibold w-20">Subject</p>
                  <p className="text-gray-700 text-sm">Physics I</p>
                </div>
                <div className="flex gap-4">
                  <p className="text-gray-600 font-semibold w-20">Status</p>
                  <p className="text-gray-700 text-sm">
                    {selectedAssignment.status}
                  </p>
                </div>
              </div>

              <h3 className="text-md mt-10 text-gray-600 poppins-thin_800 mb-2">
                Documentation
              </h3>
              <div className="flex flex-col justify-start items-start gap-3">
                <button className="bg-[#1E1E1F] poppins-thin_600 text-white text-xs py-2 cursor-pointer px-6 rounded-lg hover:bg-opacity-90 transition-colors w-full md:w-auto">
                  View PDF
                </button>

                <button className="bg-[#C77373] poppins-thin_600 text-white text-xs py-2 cursor-pointer px-6 rounded-lg hover:bg-opacity-90 transition-colors w-full md:w-auto">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedQuiz && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md m-4 relative">
            <button
              onClick={() => setSelectedQuiz(null)}
              className="absolute top-4 right-4 text-white rounded-md cursor-pointer p-1 bg-black hover:bg-gray-800"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="p-6">
              <h2 className="text-md text-[#2D3748] mb-2 poppins-thin_bold">
                Quiz
              </h2>

              <h3 className="text-md mt-4 text-[#4A5568] poppins-thin_800 mb-2">
                Description
              </h3>
              <p className="text-sm mt-3 text-[#718096] mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>

              <div className="grid grid-cols-1 gap-2 mb-4 text-sm">
                <div className="flex gap-4">
                  <p className="text-[#4A5568] font-semibold w-20">Due date</p>
                  <p className="text-[#2D3748] text-sm">03/31/25</p>
                </div>
                <div className="flex gap-4">
                  <p className="text-[#4A5568] font-semibold w-20">Start date</p>
                  <p className="text-[#2D3748] text-sm">03/01/25</p>
                </div>
                <div className="flex gap-4">
                  <p className="text-[#4A5568] font-semibold w-20">Subject</p>
                  <p className="text-[#2D3748] text-sm">Physics I</p>
                </div>
                <div className="flex gap-4">
                  <p className="text-[#4A5568] font-semibold w-20">Status</p>
                  <p className="text-[#2D3748] text-sm">
                    {selectedQuiz.status}
                  </p>
                </div>
              </div>

              <h3 className="text-md mt-10 text-[#4A5568] poppins-thin_800 mb-2">
                Documentation
              </h3>

              <div className="flex flex-col justify-start items-start gap-3">
                <button className="bg-[#1E1E1F] poppins-thin_600 text-white text-xs py-2 cursor-pointer px-6 rounded-lg hover:bg-opacity-90 transition-colors w-full md:w-auto">
                  View PDF
                </button>

                <button className="bg-[#C77373] poppins-thin_600 text-white text-xs py-2 cursor-pointer px-6 rounded-lg hover:bg-opacity-90 transition-colors w-full md:w-auto">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md m-4 relative p-8">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-white rounded-md cursor-pointer p-1 bg-black hover:bg-gray-800"
            >
              <X className="h-4 w-4" />
            </button>

            <form onSubmit={handleSubmit}>
              <div className="mb-4 mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="w-full p-2 bg-[#F1F1F1] text-sm outline-none rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  className="w-full p-2 bg-[#F1F1F1] text-sm outline-none rounded-md"
                  rows={3}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-[#F1F1F1] text-sm outline-none rounded-md"
                  required
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option value="quiz">Quiz</option>
                  <option value="assignment">Assignment</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-[#F1F1F1] text-sm outline-none rounded-md"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload file
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                />
              </div>

              <div className="flex justify-center items-center gap-4 flex-col sm:flex-row">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-6 py-2 text-sm bg-[#1E1E1F] text-white rounded-xl w-full sm:w-auto hover:bg-opacity-90 transition-colors"
                >
                  Upload
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-sm bg-[#0B5D3A] text-white rounded-xl w-full sm:w-auto hover:bg-opacity-90 transition-colors"
                >
                  Create Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}