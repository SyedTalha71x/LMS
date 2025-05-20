"use client"

/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { Search, Bell, ChevronRight, X, Users, Edit } from "lucide-react"

export default function Assignments() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [editItemType, setEditItemType] = useState(null) // 'assignment' or 'quiz'
  const [editItemId, setEditItemId] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    dueDate: "",
    startDate: "",
    subject: "",
    file: null,
  })

  // Check if screen is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Assignment",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      status: "Pending",
      dueDate: "2025-03-31",
      startDate: "2025-03-01",
      subject: "Physics I",
      assignedTo: [],
    },
    {
      id: 2,
      title: "Assignment",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      status: "Submitted",
      dueDate: "2025-03-31",
      startDate: "2025-03-01",
      subject: "Physics I",
      assignedTo: ["Group1"],
    },
  ])

  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      title: "Quiz 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      status: "Passed",
      dueDate: "2025-03-31",
      startDate: "2025-03-01",
      subject: "Physics I",
      assignedTo: ["Group2"],
    },
    {
      id: 2,
      title: "Quiz 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      status: "Failed",
      dueDate: "2025-03-31",
      startDate: "2025-03-01",
      subject: "Physics I",
      assignedTo: [],
    },
  ])

  const notifications = [
    {
      id: 1,
      title: "Title",
      time: "now",
      message:
        "Hi Name! Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna porttitor",
    },
  ]

  // Sample groups for assignment
  const groups = [
    { id: 1, name: "Group1" },
    { id: 2, name: "Group2" },
    { id: 3, name: "Group3" },
    { id: 4, name: "Group4" },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-green-800"
      case "Submitted":
        return "text-green-800"
      case "Passed":
        return "text-green-800"
      case "Failed":
        return "text-red-800"
      default:
        return "text-gray-800"
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)

    if (isEditModalOpen && editItemType) {
      // Handle edit submission
      if (editItemType === "assignment") {
        const updatedAssignments = assignments.map((item) =>
          item.id === editItemId
            ? {
                ...item,
                title: formData.name || item.title,
                description: formData.description || item.description,
                dueDate: formData.dueDate || item.dueDate,
                startDate: formData.startDate || item.startDate,
                subject: formData.subject || item.subject,
              }
            : item,
        )
        setAssignments(updatedAssignments)
      } else if (editItemType === "quiz") {
        const updatedQuizzes = quizzes.map((item) =>
          item.id === editItemId
            ? {
                ...item,
                title: formData.name || item.title,
                description: formData.description || item.description,
                dueDate: formData.dueDate || item.dueDate,
                startDate: formData.startDate || item.startDate,
                subject: formData.subject || item.subject,
              }
            : item,
        )
        setQuizzes(updatedQuizzes)
      }
      setIsEditModalOpen(false)
    } else {
      // Handle new item submission
      const newItem = {
        id: formData.category === "assignment" ? assignments.length + 1 : quizzes.length + 1,
        title: formData.name,
        description: formData.description,
        status: "Pending",
        dueDate: formData.dueDate,
        startDate: new Date().toISOString().split("T")[0], // Today's date
        subject: formData.subject || "Not specified",
        assignedTo: [],
      }

      if (formData.category === "assignment") {
        setAssignments([...assignments, newItem])
      } else if (formData.category === "quiz") {
        setQuizzes([...quizzes, newItem])
      }
      setIsAddModalOpen(false)
    }

    // Reset form
    setFormData({
      name: "",
      description: "",
      category: "",
      dueDate: "",
      startDate: "",
      subject: "",
      file: null,
    })
  }

  const openEditModal = (item, type) => {
    setEditItemType(type)
    setEditItemId(item.id)
    setFormData({
      name: item.title,
      description: item.description,
      category: type,
      dueDate: item.dueDate,
      startDate: item.startDate,
      subject: item.subject,
      file: null,
    })
    setIsEditModalOpen(true)
  }

  const openAssignModal = (item, type) => {
    setEditItemType(type)
    setEditItemId(item.id)
    setIsAssignModalOpen(true)
  }

  const handleAssignToGroups = (e) => {
    e.preventDefault()
    const selectedGroups = Array.from(e.target.elements.groups)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value)

    if (editItemType === "assignment") {
      const updatedAssignments = assignments.map((item) =>
        item.id === editItemId
          ? {
              ...item,
              assignedTo: selectedGroups,
            }
          : item,
      )
      setAssignments(updatedAssignments)
    } else if (editItemType === "quiz") {
      const updatedQuizzes = quizzes.map((item) =>
        item.id === editItemId
          ? {
              ...item,
              assignedTo: selectedGroups,
            }
          : item,
      )
      setQuizzes(updatedQuizzes)
    }

    setIsAssignModalOpen(false)
  }

  const deleteItem = (id, type) => {
    if (type === "assignment") {
      setAssignments(assignments.filter((item) => item.id !== id))
      setSelectedAssignment(null)
    } else if (type === "quiz") {
      setQuizzes(quizzes.filter((item) => item.id !== id))
      setSelectedQuiz(null)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {isNotificationOpen && isMobile && (
        <div className="fixed inset-0 bg-black/50 z-20" onClick={() => setIsNotificationOpen(false)} />
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
        <main
          className={`flex-1 md:p-6 p-3 overflow-y-auto ${isMobile && isNotificationOpen ? "hidden md:block" : ""}`}
        >
          <div className="container mx-auto">
            <section className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl poppins-thin_600">Assignments</h1>
                <button
                  onClick={() => {
                    setFormData({
                      ...formData,
                      category: "assignment",
                    })
                    setIsAddModalOpen(true)
                  }}
                  className="text-sm bg-[#0B5D3A] text-white px-4 py-1.5 rounded-lg hover:bg-opacity-90"
                >
                  Add Assignment
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="bg-[#F9F9F9] p-6 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="poppins-thin_500 text-lg">{assignment.title}</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            openEditModal(assignment, "assignment")
                          }}
                          className="p-1.5 bg-gray-200 rounded-full hover:bg-gray-300"
                        >
                          <Edit className="h-3.5 w-3.5 text-gray-700" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            openAssignModal(assignment, "assignment")
                          }}
                          className="p-1.5 bg-gray-200 rounded-full hover:bg-gray-300"
                        >
                          <Users className="h-3.5 w-3.5 text-gray-700" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-800 poppins-thin text-sm mb-4">{assignment.description}</p>
                    <div className="flex items-start gap-2 flex-col justify-start">
                      <div className="flex flex-wrap gap-2 items-center mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-[#E8E8E8]`}>
                          {assignment.status}
                        </span>
                        {assignment.assignedTo.length > 0 && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {assignment.assignedTo.length}
                          </span>
                        )}
                      </div>
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
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl poppins-thin_600">Quizzes</h1>
                <button
                  onClick={() => {
                    setFormData({
                      ...formData,
                      category: "quiz",
                    })
                    setIsAddModalOpen(true)
                  }}
                  className="text-sm bg-[#0B5D3A] text-white px-4 py-1.5 rounded-lg hover:bg-opacity-90"
                >
                  Add Quiz
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizzes.map((quiz) => (
                  <div key={quiz.id} className="bg-[#F9F9F9] p-6 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="poppins-thin_500 text-lg">{quiz.title}</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            openEditModal(quiz, "quiz")
                          }}
                          className="p-1.5 bg-gray-200 rounded-full hover:bg-gray-300"
                        >
                          <Edit className="h-3.5 w-3.5 text-gray-700" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            openAssignModal(quiz, "quiz")
                          }}
                          className="p-1.5 bg-gray-200 rounded-full hover:bg-gray-300"
                        >
                          <Users className="h-3.5 w-3.5 text-gray-700" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-800 text-sm poppins-thin mb-4">{quiz.description}</p>
                    <div className="flex items-start gap-2 flex-col justify-start">
                      <div className="flex flex-wrap gap-2 items-center mb-2">
                        <span className={` text-xs px-3 py-1 rounded-full font-medium bg-[#E8E8E8] `}>
                          {quiz.status}
                        </span>
                        {quiz.assignedTo.length > 0 && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {quiz.assignedTo.length}
                          </span>
                        )}
                      </div>
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
            ${isNotificationOpen || !isMobile ? "translate-x-0" : "translate-x-full"}
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
                <div key={notification.id} className="bg-[#EDEDEDE0] p-4 rounded-md">
                  <div className="flex items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                        <span className="font-medium">{notification.title}</span>
                        <span className="text-xs text-gray-500">{notification.time}</span>
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
          </div>
        </aside>
      </div>

      {/* Assignment Details Modal */}
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
              <div className="flex justify-between items-center">
                <h2 className="text-md text-[#161736] mb-2 poppins-thin_bold">Assignment</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedAssignment(null)
                      openEditModal(selectedAssignment, "assignment")
                    }}
                    className="p-1.5 bg-gray-200 rounded-full hover:bg-gray-300"
                    title="Edit Assignment"
                  >
                    <Edit className="h-4 w-4 text-gray-700" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedAssignment(null)
                      openAssignModal(selectedAssignment, "assignment")
                    }}
                    className="p-1.5 bg-gray-200 rounded-full hover:bg-gray-300"
                    title="Assign to Groups"
                  >
                    <Users className="h-4 w-4 text-gray-700" />
                  </button>
                </div>
              </div>

              <h3 className="text-md mt-4 text-gray-600 poppins-thin_800 mb-2">Description</h3>
              <p className="text-sm mt-3 text-gray-600 mb-4">{selectedAssignment.description}</p>

              <div className="grid grid-cols-1 gap-2 mb-4 text-sm">
                <div className="flex gap-4">
                  <p className="text-gray-600 font-semibold w-20">Due date</p>
                  <p className="text-gray-700 text-sm">{new Date(selectedAssignment.dueDate).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-4">
                  <p className="text-gray-600 font-semibold w-20">Start date</p>
                  <p className="text-gray-700 text-sm">{new Date(selectedAssignment.startDate).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-4">
                  <p className="text-gray-600 font-semibold w-20">Subject</p>
                  <p className="text-gray-700 text-sm">{selectedAssignment.subject}</p>
                </div>
                <div className="flex gap-4">
                  <p className="text-gray-600 font-semibold w-20">Status</p>
                  <p className="text-gray-700 text-sm">{selectedAssignment.status}</p>
                </div>
              </div>

              {selectedAssignment.assignedTo.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-md text-gray-600 poppins-thin_800 mb-2">Assigned To</h3>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <ul className="space-y-1">
                      {selectedAssignment.assignedTo.map((group, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-2 text-blue-600" />
                          {group}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <h3 className="text-md mt-10 text-gray-600 poppins-thin_800 mb-2">Documentation</h3>
              <div className="flex flex-col justify-start items-start gap-3">
                <button className="bg-[#1E1E1F] poppins-thin_600 text-white text-xs py-2 cursor-pointer px-6 rounded-lg hover:bg-opacity-90 transition-colors w-full md:w-auto">
                  View PDF
                </button>

                <button
                  onClick={() => deleteItem(selectedAssignment.id, "assignment")}
                  className="bg-[#C77373] poppins-thin_600 text-white text-xs py-2 cursor-pointer px-6 rounded-lg hover:bg-opacity-90 transition-colors w-full md:w-auto"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Details Modal */}
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
              <div className="flex justify-between items-center">
                <h2 className="text-md text-[#2D3748] mb-2 poppins-thin_bold">Quiz</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedQuiz(null)
                      openEditModal(selectedQuiz, "quiz")
                    }}
                    className="p-1.5 bg-gray-200 rounded-full hover:bg-gray-300"
                    title="Edit Quiz"
                  >
                    <Edit className="h-4 w-4 text-gray-700" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedQuiz(null)
                      openAssignModal(selectedQuiz, "quiz")
                    }}
                    className="p-1.5 bg-gray-200 rounded-full hover:bg-gray-300"
                    title="Assign to Groups"
                  >
                    <Users className="h-4 w-4 text-gray-700" />
                  </button>
                </div>
              </div>

              <h3 className="text-md mt-4 text-[#4A5568] poppins-thin_800 mb-2">Description</h3>
              <p className="text-sm mt-3 text-[#718096] mb-4">{selectedQuiz.description}</p>

              <div className="grid grid-cols-1 gap-2 mb-4 text-sm">
                <div className="flex gap-4">
                  <p className="text-[#4A5568] font-semibold w-20">Due date</p>
                  <p className="text-[#2D3748] text-sm">{new Date(selectedQuiz.dueDate).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-4">
                  <p className="text-[#4A5568] font-semibold w-20">Start date</p>
                  <p className="text-[#2D3748] text-sm">{new Date(selectedQuiz.startDate).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-4">
                  <p className="text-[#4A5568] font-semibold w-20">Subject</p>
                  <p className="text-[#2D3748] text-sm">{selectedQuiz.subject}</p>
                </div>
                <div className="flex gap-4">
                  <p className="text-[#4A5568] font-semibold w-20">Status</p>
                  <p className="text-[#2D3748] text-sm">{selectedQuiz.status}</p>
                </div>
              </div>

              {selectedQuiz.assignedTo.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-md text-[#4A5568] poppins-thin_800 mb-2">Assigned To</h3>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <ul className="space-y-1">
                      {selectedQuiz.assignedTo.map((group, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-2 text-blue-600" />
                          {group}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <h3 className="text-md mt-10 text-[#4A5568] poppins-thin_800 mb-2">Documentation</h3>

              <div className="flex flex-col justify-start items-start gap-3">
                <button className="bg-[#1E1E1F] poppins-thin_600 text-white text-xs py-2 cursor-pointer px-6 rounded-lg hover:bg-opacity-90 transition-colors w-full md:w-auto">
                  View PDF
                </button>

                <button
                  onClick={() => deleteItem(selectedQuiz.id, "quiz")}
                  className="bg-[#C77373] poppins-thin_600 text-white text-xs py-2 cursor-pointer px-6 rounded-lg hover:bg-opacity-90 transition-colors w-full md:w-auto"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md m-4 relative p-8">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-white rounded-md cursor-pointer p-1 bg-black hover:bg-gray-800"
            >
              <X className="h-4 w-4" />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">
              {formData.category === "quiz" ? "Add New Quiz" : "Add New Assignment"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4 mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject"
                  className="w-full p-2 bg-[#F1F1F1] text-sm outline-none rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Due date</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload file</label>
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
                  className="px-6 py-2 text-sm bg-gray-200 text-gray-800 rounded-xl w-full sm:w-auto hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-sm bg-[#0B5D3A] text-white rounded-xl w-full sm:w-auto hover:bg-opacity-90 transition-colors"
                >
                  {formData.category === "quiz" ? "Create Quiz" : "Create Assignment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md m-4 relative p-8">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 text-white rounded-md cursor-pointer p-1 bg-black hover:bg-gray-800"
            >
              <X className="h-4 w-4" />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">
              {editItemType === "quiz" ? "Edit Quiz" : "Edit Assignment"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4 mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject"
                  className="w-full p-2 bg-[#F1F1F1] text-sm outline-none rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Due date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-[#F1F1F1] text-sm outline-none rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Start date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-[#F1F1F1] text-sm outline-none rounded-md"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Replace file (optional)</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                />
              </div>

              <div className="flex justify-center items-center gap-4 flex-col sm:flex-row">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-6 py-2 text-sm bg-gray-200 text-gray-800 rounded-xl w-full sm:w-auto hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-sm bg-[#0B5D3A] text-white rounded-xl w-full sm:w-auto hover:bg-opacity-90 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign to Groups Modal */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md m-4 relative p-8">
            <button
              onClick={() => setIsAssignModalOpen(false)}
              className="absolute top-4 right-4 text-white rounded-md cursor-pointer p-1 bg-black hover:bg-gray-800"
            >
              <X className="h-4 w-4" />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">
              Assign {editItemType === "quiz" ? "Quiz" : "Assignment"} to Groups
            </h2>

            <form onSubmit={handleAssignToGroups}>
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-3">
                  Select the groups you want to assign this {editItemType} to:
                </p>

                <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
                  {groups.map((group) => {
                    // Check if this group is already assigned
                    const isAssigned =
                      editItemType === "assignment"
                        ? assignments.find((a) => a.id === editItemId)?.assignedTo.includes(group.name)
                        : quizzes.find((q) => q.id === editItemId)?.assignedTo.includes(group.name)

                    return (
                      <div key={group.id} className="flex items-center mb-2 p-2 hover:bg-gray-100 rounded">
                        <input
                          type="checkbox"
                          id={`group-${group.id}`}
                          name="groups"
                          value={group.name}
                          defaultChecked={isAssigned}
                          className="h-4 w-4 text-[#0B5D3A] focus:ring-[#0B5D3A] border-gray-300 rounded"
                        />
                        <label htmlFor={`group-${group.id}`} className="ml-2 block text-sm text-gray-700">
                          {group.name}
                        </label>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex justify-center items-center gap-4 flex-col sm:flex-row">
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(false)}
                  className="px-6 py-2 text-sm bg-gray-200 text-gray-800 rounded-xl w-full sm:w-auto hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-sm bg-[#0B5D3A] text-white rounded-xl w-full sm:w-auto hover:bg-opacity-90 transition-colors"
                >
                  Save Assignments
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
