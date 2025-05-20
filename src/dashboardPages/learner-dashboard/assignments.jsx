/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { Search, Bell, ChevronRight, X, Check, ArrowLeft, ArrowRight, Upload, Save } from "lucide-react"

export default function Assignments() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [quizMode, setQuizMode] = useState("details") // details, take
  const [assignmentMode, setAssignmentMode] = useState("details") // details, edit
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

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

  const assignments = [
    {
      id: 1,
      title: "Assignment",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      status: "Pending",
      dueDate: "03/31/25",
      startDate: "03/01/25",
      subject: "Physics I",
      questions: [
        {
          id: 1,
          type: "text",
          question: "Explain Newton's First Law of Motion in your own words.",
          answer: "",
          required: true,
        },
        {
          id: 2,
          type: "paragraph",
          question: "Describe a real-world example of Newton's Second Law of Motion.",
          answer: "",
          required: true,
        },
        {
          id: 3,
          type: "file",
          question: "Upload your lab report for the pendulum experiment.",
          answer: null,
          required: true,
        },
      ],
    },
    {
      id: 2,
      title: "Assignment",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      status: "Submitted",
      dueDate: "03/15/25",
      startDate: "02/15/25",
      subject: "Chemistry",
      questions: [
        {
          id: 1,
          type: "text",
          question: "Define the concept of molecular polarity.",
          answer:
            "Molecular polarity refers to the separation of electric charge in a molecule, leading to a molecule having positive and negative poles.",
          required: true,
        },
        {
          id: 2,
          type: "paragraph",
          question: "Explain how hydrogen bonding affects the properties of water.",
          answer:
            "Hydrogen bonding in water occurs between the hydrogen atom of one water molecule and the oxygen atom of another water molecule. This gives water unique properties like high surface tension, high boiling point, and the ability to dissolve many substances.",
          required: true,
        },
      ],
    },
  ]

  const quizzes = [
    {
      id: 1,
      title: "Quiz 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      status: "Passed",
      dueDate: "03/31/25",
      startDate: "03/01/25",
      subject: "Physics I",
      score: "85%",
      questions: [
        {
          id: 1,
          type: "multiple-choice",
          question: "Which of the following is Newton's First Law?",
          options: [
            "F = ma",
            "An object at rest stays at rest unless acted upon by an external force",
            "For every action, there is an equal and opposite reaction",
            "Energy cannot be created or destroyed",
          ],
          correctAnswer: 1,
          userAnswer: 1,
        },
        {
          id: 2,
          type: "multiple-choice",
          question: "What is the SI unit of force?",
          options: ["Watt", "Joule", "Newton", "Pascal"],
          correctAnswer: 2,
          userAnswer: 2,
        },
        {
          id: 3,
          type: "true-false",
          question: "Acceleration due to gravity on Earth is approximately 9.8 m/s².",
          options: ["True", "False"],
          correctAnswer: 0,
          userAnswer: 0,
        },
      ],
    },
    {
      id: 2,
      title: "Quiz 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      status: "Failed",
      dueDate: "03/15/25",
      startDate: "02/15/25",
      subject: "Chemistry",
      score: "45%",
      questions: [
        {
          id: 1,
          type: "multiple-choice",
          question: "Which of the following is NOT a state of matter?",
          options: ["Solid", "Liquid", "Gas", "Energy"],
          correctAnswer: 3,
          userAnswer: 2,
        },
        {
          id: 2,
          type: "multiple-choice",
          question: "What is the chemical symbol for gold?",
          options: ["Go", "Gd", "Au", "Ag"],
          correctAnswer: 2,
          userAnswer: 3,
        },
        {
          id: 3,
          type: "true-false",
          question: "Water's chemical formula is H2O.",
          options: ["True", "False"],
          correctAnswer: 0,
          userAnswer: 0,
        },
      ],
    },
  ]

  const notifications = [
    {
      id: 1,
      title: "Title",
      time: "now",
      message:
        "Hi Name! Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna porttitor",
    },
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

  const handleOpenQuiz = (quiz) => {
    setSelectedQuiz(quiz)
    setQuizMode("details")
    setCurrentQuestionIndex(0)
  }

  const handleOpenAssignment = (assignment) => {
    setSelectedAssignment(assignment)
    setAssignmentMode("details")
    setCurrentQuestionIndex(0)
  }

  const handleStartQuiz = () => {
    setQuizMode("take")
  }

  const handleEditAssignment = () => {
    setAssignmentMode("edit")
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (selectedQuiz?.questions.length || selectedAssignment?.questions.length) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleQuizAnswerChange = (questionId, answerIndex) => {
    setSelectedQuiz({
      ...selectedQuiz,
      questions: selectedQuiz.questions.map((q) => (q.id === questionId ? { ...q, userAnswer: answerIndex } : q)),
    })
  }

  const handleAssignmentAnswerChange = (questionId, answer) => {
    setSelectedAssignment({
      ...selectedAssignment,
      questions: selectedAssignment.questions.map((q) => (q.id === questionId ? { ...q, answer } : q)),
    })
  }

  const handleFileUpload = (questionId, file) => {
    setSelectedAssignment({
      ...selectedAssignment,
      questions: selectedAssignment.questions.map((q) => (q.id === questionId ? { ...q, answer: file } : q)),
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      {isNotificationOpen && isMobile && (
        <div className="fixed inset-0 bg-black/50 z-20" onClick={() => setIsNotificationOpen(false)} />
      )}

      <div className="md:p-4 p-2">
        <div className="max-w-4xl mr-auto flex flex-col gap-4 md:flex-row md:items-center items-start justify-between">
          <h1 className="text-2xl poppins-thin_600">Assignments</h1>

          <div className="flex items-center gap-2">
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
        <main className={`flex-1 md:p-6 p-3 overflow-y-auto`}>
          <div className="container mx-auto">
            <section className="mb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="bg-[#F9F9F9] p-6 rounded-lg">
                    <h3 className="poppins-thin_500 text-lg mb-2">{assignment.title}</h3>
                    <p className="text-gray-800 poppins-thin text-sm mb-4">{assignment.description}</p>
                    <div className="flex items-start gap-2 flex-col justify-start">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-[#E8E8E8]`}>
                        {assignment.status}
                      </span>
                      <button
                        className="flex bg-[#E8E8E8] py-2.5 px-5 rounded-sm items-center text-black text-xs poppins-thin_bold "
                        onClick={() => handleOpenAssignment(assignment)}
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
                    <h3 className="poppins-thin_500 text-lg mb-2">{quiz.title}</h3>
                    <p className="text-gray-800 text-sm poppins-thin mb-4">{quiz.description}</p>
                    <div className="flex items-start gap-2 flex-col justify-start">
                      <span className={` text-xs px-3 py-1 rounded-full  font-medium bg-[#E8E8E8] `}>
                        {quiz.status}
                      </span>
                      <button
                        className="flex bg-[#E8E8E8] py-2.5 px-5 rounded-sm items-center text-black text-xs poppins-thin_bold "
                        onClick={() => handleOpenQuiz(quiz)}
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
            ${isMobile ? "fixed inset-y-0 right-0 z-50 w-80 transform transition-transform duration-500 ease-in-out" : "w-80 "}
            ${isNotificationOpen || !isMobile ? "translate-x-0" : "translate-x-full"}
            bg-white overflow-y-auto
          `}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl poppins-thin_600">Notification</h2>
              {isMobile && (
                <button onClick={() => setIsNotificationOpen(false)} className="p-1 rounded-full hover:bg-gray-100">
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className=" pb-4 bg-[#EDEDEDE0] p-3 rounded-md">
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

      {/* Assignment Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedAssignment(null)}
              className="absolute top-4 right-4 text-white rounded-md cursor-pointer p-1 bg-black"
            >
              <X className="h-4 w-4" />
            </button>

            {assignmentMode === "details" && (
              <div className="p-6">
                <h2 className="text-md text-[#161736] mb-2 poppins-thin_bold">{selectedAssignment.title}</h2>

                <h3 className="text-md mt-4 text-gray-600 poppins-thin_800 mb-2">Description</h3>
                <p className="text-sm mt-3 text-gray-600 mb-4">{selectedAssignment.description}</p>

                <div className="grid grid-cols-1 gap-2 mb-4 text-sm">
                  <div className="flex gap-4">
                    <p className="text-gray-600 font-semibold">Due date</p>
                    <p className="text-gray-700 text-sm">{selectedAssignment.dueDate}</p>
                  </div>
                  <div className="flex gap-4">
                    <p className="text-gray-600 font-semibold">Start date</p>
                    <p className="text-gray-700 text-sm">{selectedAssignment.startDate}</p>
                  </div>
                  <div className="flex gap-4">
                    <p className="text-gray-600 font-semibold">Subject</p>
                    <p className="text-gray-700 text-sm">{selectedAssignment.subject}</p>
                  </div>
                  <div className="flex gap-4">
                    <p className="text-gray-600 font-semibold">Status</p>
                    <p className="text-gray-700 text-sm">{selectedAssignment.status}</p>
                  </div>
                </div>

                <h3 className="text-md mt-10 text-gray-600 poppins-thin_800 mb-2">Documentation</h3>
                <button className="bg-[#1E1E1F] poppins-thin_600 text-white text-xs py-1.5 cursor-pointer px-6 rounded-lg mt-2 mb-4">
                  View PDF
                </button>

                <h3 className="text-md mt-4 text-gray-600 poppins-thin_800 mb-2">Assignment</h3>
                <button
                  onClick={handleEditAssignment}
                  className="bg-[#1E1E1F] poppins-thin_600 text-white text-xs py-1.5 cursor-pointer px-6 rounded-lg mt-2 mb-4"
                >
                  {selectedAssignment.status === "Submitted" ? "View Submission" : "Start Assignment"}
                </button>
              </div>
            )}

            {assignmentMode === "edit" && (
              <div className="p-6 mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">{selectedAssignment.title}</h2>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedAssignment.status === "Submitted"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {selectedAssignment.status}
                    </span>
                  </div>
                </div>

                <div className="mb-6 text-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-500">
                      Question {currentQuestionIndex + 1} of {selectedAssignment.questions.length}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={handlePrevQuestion}
                        disabled={currentQuestionIndex === 0}
                        className={`p-1 rounded ${
                          currentQuestionIndex === 0
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <ArrowLeft size={16} />
                      </button>
                      <button
                        onClick={handleNextQuestion}
                        disabled={currentQuestionIndex === selectedAssignment.questions.length - 1}
                        className={`p-1 rounded ${
                          currentQuestionIndex === selectedAssignment.questions.length - 1
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="mb-4">
                      <h4 className="text-base font-medium mb-1">
                        {selectedAssignment.questions[currentQuestionIndex].question}
                        {selectedAssignment.questions[currentQuestionIndex].required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </h4>
                    </div>

                    {selectedAssignment.questions[currentQuestionIndex].type === "text" && (
                      <input
                        type="text"
                        value={selectedAssignment.questions[currentQuestionIndex].answer || ""}
                        onChange={(e) =>
                          handleAssignmentAnswerChange(
                            selectedAssignment.questions[currentQuestionIndex].id,
                            e.target.value,
                          )
                        }
                        placeholder="Your answer"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={selectedAssignment.status === "Submitted"}
                      />
                    )}

                    {selectedAssignment.questions[currentQuestionIndex].type === "paragraph" && (
                      <textarea
                        value={selectedAssignment.questions[currentQuestionIndex].answer || ""}
                        onChange={(e) =>
                          handleAssignmentAnswerChange(
                            selectedAssignment.questions[currentQuestionIndex].id,
                            e.target.value,
                          )
                        }
                        placeholder="Your answer"
                        rows={4}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={selectedAssignment.status === "Submitted"}
                      />
                    )}

                    {selectedAssignment.questions[currentQuestionIndex].type === "file" && (
                      <div className="mt-2">
                        {selectedAssignment.questions[currentQuestionIndex].answer ? (
                          <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-md">
                            <div className="bg-blue-100 p-2 rounded-md">
                              <Check size={16} className="text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">File uploaded</p>
                              <p className="text-xs text-gray-500">
                                {typeof selectedAssignment.questions[currentQuestionIndex].answer === "string"
                                  ? selectedAssignment.questions[currentQuestionIndex].answer
                                  : "lab_report.pdf"}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                            <Upload className="mx-auto h-8 w-8 text-gray-400" />
                            <p className="mt-1 text-sm text-gray-500">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-400">PDF, DOCX, or JPG (max. 10MB)</p>
                            <input
                              type="file"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(
                                  selectedAssignment.questions[currentQuestionIndex].id,
                                  e.target.files[0]?.name || "file.pdf",
                                )
                              }
                              disabled={selectedAssignment.status === "Submitted"}
                            />
                            <button
                              onClick={() =>
                                handleFileUpload(
                                  selectedAssignment.questions[currentQuestionIndex].id,
                                  "lab_report.pdf",
                                )
                              }
                              className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300"
                              disabled={selectedAssignment.status === "Submitted"}
                            >
                              Select File
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setAssignmentMode("details")}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    Back to Details
                  </button>
                  <button
                    className="px-4 py-2 bg-[#1E1E1F] text-white rounded-md text-sm flex items-center gap-1"
                    disabled={selectedAssignment.status === "Submitted"}
                  >
                    <Save size={16} />
                    {selectedAssignment.status === "Submitted" ? "Submitted" : "Submit Assignment"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {selectedQuiz && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedQuiz(null)}
              className="absolute top-4 right-4 text-white rounded-md cursor-pointer p-1 bg-black"
            >
              <X className="h-4 w-4" />
            </button>

            {quizMode === "details" && (
              <div className="p-6">
                <h2 className="text-md text-[#2D3748] mb-2 poppins-thin_bold">{selectedQuiz.title}</h2>

                <h3 className="text-md mt-4 text-[#4A5568] poppins-thin_800 mb-2">Description</h3>
                <p className="text-sm mt-3 text-[#718096] mb-4">{selectedQuiz.description}</p>

                <div className="grid grid-cols-1 gap-2 mb-4 text-sm">
                  <div className="flex gap-4">
                    <p className="text-[#4A5568] font-semibold">Due date</p>
                    <p className="text-[#2D3748] text-sm">{selectedQuiz.dueDate}</p>
                  </div>
                  <div className="flex gap-4">
                    <p className="text-[#4A5568] font-semibold">Start date</p>
                    <p className="text-[#2D3748] text-sm">{selectedQuiz.startDate}</p>
                  </div>
                  <div className="flex gap-4">
                    <p className="text-[#4A5568] font-semibold">Subject</p>
                    <p className="text-[#2D3748] text-sm">{selectedQuiz.subject}</p>
                  </div>
                  <div className="flex gap-4">
                    <p className="text-[#4A5568] font-semibold">Status</p>
                    <p className="text-[#2D3748] text-sm">{selectedQuiz.status}</p>
                  </div>
                  {selectedQuiz.status === "Passed" || selectedQuiz.status === "Failed" ? (
                    <div className="flex gap-4">
                      <p className="text-[#4A5568] font-semibold">Score</p>
                      <p className="text-[#2D3748] text-sm">{selectedQuiz.score}</p>
                    </div>
                  ) : null}
                </div>

                <h3 className="text-md mt-10 text-[#4A5568] poppins-thin_800 mb-2">Documentation</h3>
                <button className="bg-[#1E1E1F] poppins-thin_600 text-white text-xs py-1.5 cursor-pointer px-6 rounded-lg mt-2 mb-4 hover:bg-[#1E1E1F]">
                  View PDF
                </button>

                <h3 className="text-md mt-4 text-[#4A5568] poppins-thin_800 mb-2">Quiz</h3>
                <button
                  onClick={handleStartQuiz}
                  className="bg-[#1E1E1F] poppins-thin_600 text-white text-xs py-1.5 cursor-pointer px-6 rounded-lg mt-2 mb-4 hover:bg-[#1E1E1F]"
                >
                  {selectedQuiz.status === "Passed" || selectedQuiz.status === "Failed" ? "Review Quiz" : "Start Quiz"}
                </button>
              </div>
            )}

            {quizMode === "take" && (
              <div className="p-6 mt-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">{selectedQuiz.title}</h2>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedQuiz.status === "Passed"
                          ? "bg-green-100 text-green-800"
                          : selectedQuiz.status === "Failed"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {selectedQuiz.status === "Passed" || selectedQuiz.status === "Failed"
                        ? "Completed"
                        : "In Progress"}
                    </span>
                    {(selectedQuiz.status === "Passed" || selectedQuiz.status === "Failed") && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Score: {selectedQuiz.score}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-6 text-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-500">
                      Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={handlePrevQuestion}
                        disabled={currentQuestionIndex === 0}
                        className={`p-1 rounded ${
                          currentQuestionIndex === 0
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <ArrowLeft size={16} />
                      </button>
                      <button
                        onClick={handleNextQuestion}
                        disabled={currentQuestionIndex === selectedQuiz.questions.length - 1}
                        className={`p-1 rounded ${
                          currentQuestionIndex === selectedQuiz.questions.length - 1
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="text-base font-medium mb-4">
                      {selectedQuiz.questions[currentQuestionIndex].question}
                    </h4>

                    {selectedQuiz.questions[currentQuestionIndex].type === "multiple-choice" && (
                      <div className="space-y-2">
                        {selectedQuiz.questions[currentQuestionIndex].options.map((option, index) => {
                          const isSelected = selectedQuiz.questions[currentQuestionIndex].userAnswer === index
                          const isCorrect = selectedQuiz.questions[currentQuestionIndex].correctAnswer === index
                          const showResult = selectedQuiz.status === "Passed" || selectedQuiz.status === "Failed"

                          return (
                            <div
                              key={index}
                              className={`flex items-center p-3 border rounded-md cursor-pointer ${
                                isSelected
                                  ? showResult
                                    ? isCorrect
                                      ? "bg-green-50 border-green-200"
                                      : "bg-red-50 border-red-200"
                                    : "bg-blue-50 border-blue-200"
                                  : showResult && isCorrect
                                    ? "bg-green-50 border-green-200"
                                    : "hover:bg-gray-100"
                              }`}
                              onClick={() => {
                                if (!showResult) {
                                  handleQuizAnswerChange(selectedQuiz.questions[currentQuestionIndex].id, index)
                                }
                              }}
                            >
                              <div
                                className={`w-5 h-5 flex items-center justify-center rounded-full border mr-3 ${
                                  isSelected
                                    ? showResult
                                      ? isCorrect
                                        ? "bg-green-500 border-green-500 text-white"
                                        : "bg-red-500 border-red-500 text-white"
                                      : "bg-blue-500 border-blue-500 text-white"
                                    : showResult && isCorrect
                                      ? "border-green-500"
                                      : "border-gray-300"
                                }`}
                              >
                                {isSelected && <Check size={12} />}
                              </div>
                              <span>{option}</span>
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {selectedQuiz.questions[currentQuestionIndex].type === "true-false" && (
                      <div className="space-y-2">
                        {selectedQuiz.questions[currentQuestionIndex].options.map((option, index) => {
                          const isSelected = selectedQuiz.questions[currentQuestionIndex].userAnswer === index
                          const isCorrect = selectedQuiz.questions[currentQuestionIndex].correctAnswer === index
                          const showResult = selectedQuiz.status === "Passed" || selectedQuiz.status === "Failed"

                          return (
                            <div
                              key={index}
                              className={`flex items-center p-3 border rounded-md cursor-pointer ${
                                isSelected
                                  ? showResult
                                    ? isCorrect
                                      ? "bg-green-50 border-green-200"
                                      : "bg-red-50 border-red-200"
                                    : "bg-blue-50 border-blue-200"
                                  : showResult && isCorrect
                                    ? "bg-green-50 border-green-200"
                                    : "hover:bg-gray-100"
                              }`}
                              onClick={() => {
                                if (!showResult) {
                                  handleQuizAnswerChange(selectedQuiz.questions[currentQuestionIndex].id, index)
                                }
                              }}
                            >
                              <div
                                className={`w-5 h-5 flex items-center justify-center rounded-full border mr-3 ${
                                  isSelected
                                    ? showResult
                                      ? isCorrect
                                        ? "bg-green-500 border-green-500 text-white"
                                        : "bg-red-500 border-red-500 text-white"
                                      : "bg-blue-500 border-blue-500 text-white"
                                    : showResult && isCorrect
                                      ? "border-green-500"
                                      : "border-gray-300"
                                }`}
                              >
                                {isSelected && <Check size={12} />}
                              </div>
                              <span>{option}</span>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setQuizMode("details")}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    Back to Details
                  </button>
                  {selectedQuiz.status !== "Passed" && selectedQuiz.status !== "Failed" && (
                    <button className="px-4 py-2 bg-[#1E1E1F] text-white rounded-md text-sm">Submit Quiz</button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
