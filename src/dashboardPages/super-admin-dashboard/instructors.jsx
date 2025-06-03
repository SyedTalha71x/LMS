import { useState } from "react"
import CardBGImage from "../../../public/portada.png"
import { ChevronRight, X, Upload } from "lucide-react"

export default function InstructorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showSidebar, setShowSidebar] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedInstructor, setSelectedInstructor] = useState(null)

  // Sample instructor data
  const instructors = [
    {
      id: "1",
      name: "Pharmacy 1",
      role: "Teacher",
      imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      backgroundUrl: CardBGImage,
      subheading: "Subheading",
      description:
        "Emmelia is a traditional book worm and has always been from a young age. She is a housekeeper mom with two kids and she has a lot of time to read and relax. Emmelia tends to casually browse books in a bookstore but she usually has a hard time finding the right one and spends a lot of time browsing.",
      courses: ["Dummy", "Calm", "Generous", "Forgetful"],
      progress: [
        { name: "Progress 1", value: 40 },
        { name: "Progress 2", value: 20 },
        { name: "Progress 3", value: 80 },
      ],
      position: "Ast. teacher",
      membership: 'paid'
    },
    {
      id: "2",
      name: "Pharmacy 1",
      role: "Teacher",
      imageUrl: "https://randomuser.me/api/portraits/women/68.jpg",
      backgroundUrl: CardBGImage,
      subheading: "Subheading",
      description:
        "Emmelia is a traditional book worm and has always been from a young age. She is a housekeeper mom with two kids and she has a lot of time to read and relax.",
      courses: ["Dummy", "Calm", "Generous"],
      progress: [
        { name: "Progress 1", value: 60 },
        { name: "Progress 2", value: 30 },
        { name: "Progress 3", value: 90 },
      ],
      position: "Ast. teacher",
      membership: 'paid'
    },
    {
      id: "3",
      name: "Pharmacy 1",
      role: "Teacher",
      imageUrl: "https://randomuser.me/api/portraits/women/65.jpg",
      backgroundUrl: CardBGImage,
      subheading: "Subheading",
      description:
        "Emmelia is a traditional book worm and has always been from a young age. She is a housekeeper mom with two kids and she has a lot of time to read and relax.",
      courses: ["Dummy", "Calm"],
      progress: [
        { name: "Progress 1", value: 50 },
        { name: "Progress 2", value: 70 },
        { name: "Progress 3", value: 30 },
      ],
      position: "Ast. teacher",
      membership: 'paid'
    },
    {
      id: "4",
      name: "Pharmacy 1",
      role: "Teacher",
      imageUrl: "https://randomuser.me/api/portraits/women/54.jpg",
      backgroundUrl: CardBGImage,
      subheading: "Subheading",
      description:
        "Emmelia is a traditional book worm and has always been from a young age. She is a housekeeper mom with two kids and she has a lot of time to read and relax.",
      courses: ["Dummy", "Calm", "Generous", "Forgetful"],
      progress: [
        { name: "Progress 1", value: 80 },
        { name: "Progress 2", value: 40 },
        { name: "Progress 3", value: 60 },
      ],
      position: "Ast. teacher",
      membership: 'paid'
    },
  ]

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const openCreateModal = () => {
    setShowCreateModal(true)
  }

  const closeCreateModal = () => {
    setShowCreateModal(false)
  }

  const openDetailsModal = (instructor) => {
    setSelectedInstructor(instructor)
    setShowDetailsModal(true)
  }

  const closeDetailsModal = () => {
    setShowDetailsModal(false)
    setSelectedInstructor(null)
  }

  const notifications = [
    {
      id: 1,
      time: "File now",
      name: "Hi Norman",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna porttitor",
    },
    {
      id: 2,
      time: "File now",
      name: "Hi Norman",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna porttitor",
    },
  ]

  const filteredInstructors = instructors.filter(
    (instructor) =>
      instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen ">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1">
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-3xl font-bold text-gray-800">Instructors</h1>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-full bg-gray-100 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 sm:w-64"
                  />
                  <svg
                    className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Instructor Grid */}
            <div className="grid grid-cols-1 gap-4  md:grid-cols-2">
              {filteredInstructors.map((instructor) => (
                <div
                  key={instructor.id}
                  className="relative w-full max-w-md mx-auto overflow-hidden rounded-xl shadow-lg"
                >
                  {/* Colorful background image */}
                  <div className="h-52 w-full overflow-hidden">
                    <img
                      src={instructor.backgroundUrl || "/placeholder.svg"}
                      alt="Background"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="absolute bottom-28 left-1/2 flex h-30 w-30 -translate-x-1/2 transform items-center justify-center">
                    <div className="h-full w-full overflow-hidden rounded-full border-4 border-white bg-white shadow-lg">
                      <img
                        src={instructor.imageUrl || "/placeholder.svg"}
                        alt={instructor.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Instructor info */}
                  <div className="flex flex-col items-center bg-white p-4 pt-12 text-center">
                    <h3 className="mb-1 text-lg font-bold text-gray-800 poppins-thin-600">{instructor.name}</h3>
                    <p className="mb-4 text-sm text-gray-600 poppins-thin">{instructor.role}</p>
                    <button
                      onClick={() => openDetailsModal(instructor)}
                      className="rounded-xl poppins-thin-500  bg-[#272829] cursor-pointer px-6 py-2 text-xs uppercase tracking-wider text-white transition-colors "
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* No results message */}
            {filteredInstructors.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No instructors found matching your search.</p>
              </div>
            )}
          </div>
        </div>

        {/* Notification Panel */}
        <div
          className={`fixed lg:static top-0 right-0 h-full z-40 w-4/5 lg:w-1/3 bg-white p-4 md:p-6 transform transition-transform duration-500 ease-in-out ${
            showSidebar ? "translate-x-0" : "translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex justify-end items-center mb-4 lg:hidden">
            <button onClick={toggleSidebar} className="p-1">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div>
            <h1 className="text-xl mb-4 poppins-thin_600">Add Entity</h1>
          </div>

          <div className="">
            <button
              onClick={openCreateModal}
              className="w-full md:w-auto py-2 bg-[#0B5D3A] text-sm px-7 text-white rounded-xl mb-6 font-semibold"
            >
              Add Instructor
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

      {/* Create Instructor Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Create Instructor</h2>
                <button onClick={closeCreateModal} className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form className="space-y-4">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                    <img
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    className="bg-[#1E1E1F] text-white px-4 py-2 cursor-pointer  rounded-lg text-sm flex items-center gap-2"
                  >
                    Upload picture
                  </button>
                </div>

                {/* Form Fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full px-3 py-2  rounded-xl bg-[#F1F1F1] text-sm outline-none poppins-thin  "
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full px-3 py-2  rounded-xl bg-[#F1F1F1] text-sm outline-none poppins-thin  "
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-3 py-2  rounded-xl bg-[#F1F1F1] text-sm outline-none poppins-thin  "
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone No</label>
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full px-3 py-2  rounded-xl bg-[#F1F1F1] text-sm outline-none poppins-thin  "
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input
                    type="text"
                    placeholder="Input"
                    className="w-full px-3 py-2  rounded-xl bg-[#F1F1F1] text-sm outline-none poppins-thin  "
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Courses</label>
                  <input
                    type="text"
                    placeholder="Input"
                    className="w-full px-3 py-2  rounded-xl bg-[#F1F1F1] text-sm outline-none poppins-thin  "
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Input</label>
                  <input
                    type="text"
                    placeholder="Input"
                    className="w-full px-3 py-2  rounded-xl bg-[#F1F1F1] text-sm outline-none poppins-thin  "
                  />
                </div>
                <div className="flex justify-center items-center">


                <button type="submit" className=" bg-[#0B5D3A] text-white py-2 px-6 rounded-xl text-sm md:w-auto w-full font-semibold mt-6">
                  Create Instructor
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Instructor Details Modal */}
      {showDetailsModal && selectedInstructor && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedInstructor.imageUrl || "/placeholder.svg"}
                    alt={selectedInstructor.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{selectedInstructor.name}</h2>
                    <p className="text-sm text-gray-600">{selectedInstructor.subheading}</p>
                  </div>
                </div>
                <button onClick={closeDetailsModal} className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Description */}
                <p className="text-sm text-gray-700 leading-relaxed">{selectedInstructor.description}</p>

                {/* Assign Courses */}
                <div>
                  <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">Assign courses</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedInstructor.courses.map((course, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">Progress</h3>
                  <div className="space-y-3">
                    {selectedInstructor.progress.map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{item.name}</span>
                          <span className="text-sm text-gray-600">{item.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#0B5D3A] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${item.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-start items-start">
                  <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">Membership</h3>
                  <p className="text-sm text-white bg-[#5DBA72] py-1.5 poppins-thin cursor-pointer px-7 rounded-xl w-auto ">{selectedInstructor.membership}</p>

                  <div className="mt-3 flex items-center gap-1">
                    <span className="text-sm text-red-600 font-bold">Next Payment:</span><div className="text-sm text-gray-600">19-02-2025</div>
                  </div>
                </div>

                {/* Role */}
                <div className="flex flex-col justify-start items-start">
                  <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">Role</h3>
                  <p className="text-sm text-gray-700 bg-gray-100 py-2 poppins-thin cursor-pointer px-6 rounded-xl w-auto ">{selectedInstructor.position}</p>
                </div>

                {/* Delete Button */}
                <button className="w-full md:w-auto bg-[#C77373] text-white py-2 px-6 poppins-thin  cursor-pointer text-sm rounded-xl font-semibold ">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
