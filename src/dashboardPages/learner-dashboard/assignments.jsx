/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Search, Bell, ChevronRight, X } from "lucide-react";

export default function Assignments() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <div className="flex flex-col min-h-screen">
      {isNotificationOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-20"
          onClick={() => setIsNotificationOpen(false)}
        />
      )}

      <div className="p-4">
        <div className="max-w-4xl mr-auto flex flex-col gap-4 md:flex-row items-center justify-between">
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
                        className={` text-xs px-3 py-1 rounded-full  font-medium bg-[#E8E8E8] `}
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
                ? "fixed inset-y-0 right-0 z-50 w-80 transform transition-transform duration-500 ease-in-out"
                : "w-80 "
            }
            ${
              isNotificationOpen || !isMobile
                ? "translate-x-0"
                : "translate-x-full"
            }
            bg-white overflow-y-auto
          `}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl poppins-thin_600">Notification</h2>
              {isMobile && (
                <button
                  onClick={() => setIsNotificationOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className=" pb-4 bg-[#EDEDEDE0] p-3 rounded-md"
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
          <div className="bg-white rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setSelectedAssignment(null)}
              className="absolute top-4 right-4 text-white rounded-md cursor-pointer p-1  bg-black "
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
                  <p className="text-gray-600  font-semibold">Due date</p>
                  <p className="text-gray-700 text-sm">03/31/25</p>
                </div>
                <div className="flex gap-4">
                  <p className="text-gray-600  font-semibold">Start date</p>
                  <p className="text-gray-700 text-sm">03/01/25</p>
                </div>
                <div className="flex gap-4">
                  <p className="text-gray-600  font-semibold">Subject</p>
                  <p className="text-gray-700 text-sm">Physics I</p>
                </div>
                <div className="flex gap-4">
                  <p className="text-gray-600  font-semibold">Status</p>
                  <p className="text-gray-700 text-sm">
                    {selectedAssignment.status}
                  </p>
                </div>
              </div>

              <h3 className="text-md mt-10 text-gray-600 poppins-thin_800 mb-2">
                Documentation
              </h3>

              <button className="bg-[#1E1E1F] poppins-thin_600 text-white text-xs py-1.5 cursor-pointer px-6 rounded-lg mt-2 mb-4">
                View PDF
              </button>

              <h3 className="text-md mt-4 text-gray-600 poppins-thin_800 mb-2">
                Submit
              </h3>

              <button className="bg-[#1E1E1F] poppins-thin_600 text-white text-xs py-1.5 cursor-pointer px-6 rounded-lg mt-2 mb-4">
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedQuiz && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setSelectedQuiz(null)}
              className="absolute top-4 right-4 text-white rounded-md cursor-pointer p-1 bg-[#1E1E1F] hover:bg-[#1E1E1F]"
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
                  <p className="text-[#4A5568] font-semibold">Due date</p>
                  <p className="text-[#2D3748] text-sm">03/31/25</p>
                </div>
                <div className="flex gap-4">
                  <p className="text-[#4A5568] font-semibold">Start date</p>
                  <p className="text-[#2D3748] text-sm">03/01/25</p>
                </div>
                <div className="flex gap-4">
                  <p className="text-[#4A5568] font-semibold">Subject</p>
                  <p className="text-[#2D3748] text-sm">Physics I</p>
                </div>
                <div className="flex gap-4">
                  <p className="text-[#4A5568] font-semibold">Status</p>
                  <p className="text-[#2D3748] text-sm">
                    {selectedQuiz.status}
                  </p>
                </div>
              </div>

              <h3 className="text-md mt-10 text-[#4A5568] poppins-thin_800 mb-2">
                Documentation
              </h3>

              <button className="bg-[#1E1E1F] poppins-thin_600 text-white text-xs py-1.5 cursor-pointer px-6 rounded-lg mt-2 mb-4 hover:bg-[#1E1E1F]">
                View PDF
              </button>

              <h3 className="text-md mt-4 text-[#4A5568] poppins-thin_800 mb-2">
                Submit
              </h3>

              <button className="bg-[#1E1E1F] poppins-thin_600 text-white text-xs py-1.5 cursor-pointer px-6 rounded-lg mt-2 mb-4 hover:bg-[#1E1E1F]">
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
