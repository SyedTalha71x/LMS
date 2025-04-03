import { useState } from "react";
import { X, Edit2, Bell, Menu, Search, Edit } from "lucide-react";
import Avatar from "../../../public/avatar.png";
import ProfilePicture from '../../../public/image (2).png'
const Students = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(ProfilePicture);
  
    const handleImageChange = (event) => {
      const file = event.target.files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setProfileImage(imageUrl);
      }
    };
  
  
    const openAddModal = () => {
      setIsAddModalOpen(true);
    };
  
    const closeAddModal = () => {
      setIsAddModalOpen(false);
    };
  
  // Toggle functions
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };



  const students = [
    {
      id: 1,
      name: "Jhony",
      age: 22,
      gender: "Male",
      designation: "Student",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      achievements: [
        { name: "Forgetful", icon: null },
        { name: "Generous", icon: null },
        { name: "Forgetful", icon: null },
      ],
      certificates: [
        { name: "Forgetful", icon: null },
        { name: "Calm", icon: null },
        { name: "Generous", icon: null },
        { name: "Forgetful", icon: null },
      ],
      progress: {
        groupActivity: 40,
        singleRange1: 20,
        singleRange2: 90,
      },
    },
    {
      id: 2,
      name: "Jhony",
      age: 22,
      gender: "Male",
      designation: "Student",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      achievements: [
        { name: "Forgetful", icon: null },
        { name: "Generous", icon: null },
        { name: "Forgetful", icon: null },
      ],
      certificates: [
        { name: "Forgetful", icon: null },
        { name: "Calm", icon: null },
        { name: "Generous", icon: null },
        { name: "Forgetful", icon: null },
      ],
      progress: {
        groupActivity: 40,
        singleRange1: 20,
        singleRange2: 90,
      },
    },
    {
      id: 3,
      name: "Jhony",
      age: 22,
      gender: "Male",
      designation: "Student",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      achievements: [
        { name: "Forgetful", icon: null },
        { name: "Generous", icon: null },
        { name: "Forgetful", icon: null },
      ],
      certificates: [
        { name: "Forgetful", icon: null },
        { name: "Calm", icon: null },
        { name: "Generous", icon: null },
        { name: "Forgetful", icon: null },
      ],
      progress: {
        groupActivity: 40,
        singleRange1: 20,
        singleRange2: 90,
      },
    },
    {
      id: 4,
      name: "Jhony",
      age: 22,
      gender: "Male",
      designation: "Student",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      achievements: [
        { name: "Forgetful", icon: null },
        { name: "Generous", icon: null },
        { name: "Forgetful", icon: null },
      ],
      certificates: [
        { name: "Forgetful", icon: null },
        { name: "Calm", icon: null },
        { name: "Generous", icon: null },
        { name: "Forgetful", icon: null },
      ],
      progress: {
        groupActivity: 40,
        singleRange1: 20,
        singleRange2: 90,
      },
    },
    {
      id: 5,
      name: "Jhony",
      age: 22,
      gender: "Male",
      designation: "Student",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      achievements: [
        { name: "Forgetful", icon: null },
        { name: "Generous", icon: null },
        { name: "Forgetful", icon: null },
      ],
      certificates: [
        { name: "Forgetful", icon: null },
        { name: "Calm", icon: null },
        { name: "Generous", icon: null },
        { name: "Forgetful", icon: null },
      ],
      progress: {
        groupActivity: 40,
        singleRange1: 20,
        singleRange2: 90,
      },
    },
    {
      id: 6,
      name: "Jhony",
      age: 22,
      gender: "Male",
      designation: "Student",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      achievements: [
        { name: "Forgetful", icon: null },
        { name: "Generous", icon: null },
        { name: "Forgetful", icon: null },
      ],
      certificates: [
        { name: "Forgetful", icon: null },
        { name: "Calm", icon: null },
        { name: "Generous", icon: null },
        { name: "Forgetful", icon: null },
      ],
      progress: {
        groupActivity: 40,
        singleRange1: 20,
        singleRange2: 90,
      },
    },
  ];

  const openModal = (student) => {
    setSelectedStudent(student);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedStudent(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="flex rounded-3xl text-black min-h-screen overflow-hidden">
      <div className="flex-1">
        <div className="max-w-4xl w-full mr-auto p-4 md:p-6">
          <div className="flex justify-between md:items-center items-start flex-col gap-4 w-full md:flex-row mb-6">
            <h1 className="text-2xl poppins-thin_600">Students</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-[#F9F9F9] outline-none rounded-2xl text-sm w-48 md:w-64"
                />
              </div>
              <button
                className="p-2 md:hidden bg-[#F9F9F9] rounded-full"
                onClick={toggleSidebar}
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {students.map((student) => (
              <div
                key={student.id}
                className="bg-[#F2F2F2] rounded-xl md:p-6 p-3 flex flex-col md:flex-row items-center cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => openModal(student)}
              >
                <div className="relative w-12 h-12 flex-shrink-0">
                  <img
                    src={Avatar}
                    alt="Student avatar"
                    className="object-contain"
                  />
                </div>
                <div className="md:ml-4 ml-0 flex-grow text-center md:text-left">
                  <h3 className="text-md poppins-thin_600">{student.name}</h3>
                  <p className="text-sm text-gray-500">{student.designation}</p>
                </div>
                <div className="flex sm:flex-row justify-center items-center gap-3 sm:ml-4 w-full sm:w-auto mt-3 sm:mt-0">
                  <button className="flex items-center justify-center w-auto text-white poppins-thin_bold py-2 bg-[#1E1E1F] rounded-xl text-xs px-6 cursor-pointer transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {selectedStudent && (
            <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg w-full max-w-lg p-6 overflow-y-auto max-h-[75vh] custom-scrollbar relative">
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-3 cursor-pointer bg-black p-1 text-sm rounded-md text-white z-10"
                >
                  <X size={15} />
                </button>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 relative">
                      <img
                        src={Avatar}
                        alt="Student avatar"
                        className="object-cover  w-full h-full"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">
                        {selectedStudent.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {selectedStudent.age} / {selectedStudent.gender}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-[#505050] poppins-thin_500">
                    {selectedStudent.description}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">
                    Achievements
                  </h3>
                  <div className="flex gap-2">
                    {selectedStudent.achievements.map((achievement, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-gray-100 poppins-thin_500  text-gray-700 text-xs rounded-xl inline-flex items-center"
                      >
                        {achievement.name}
                        {achievement.icon && (
                          <span className="ml-1">{achievement.icon}</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">
                    Certificates
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudent.certificates.map((certificate, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-gray-100 poppins-thin_500  text-gray-700 text-xs rounded-xl"
                      >
                        {certificate.name}
                        {certificate.icon && (
                          <span className="ml-1">{certificate.icon}</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">
                    Progress
                  </h3>
                  <div className="space-y-3">
                    <div className="">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-black">
                          Group activity
                        </span>
                        <span className="text-sm text-gray-700">
                          {selectedStudent.progress.groupActivity}%
                        </span>
                      </div>
                      <div className="bg-gray-200 h-2 rounded-full">
                        <div
                          className="bg-[#0B5D3A] h-2 rounded-full"
                          style={{
                            width: `${selectedStudent.progress.groupActivity}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-black">Single Range</span>
                        <span className="text-sm text-gray-600">
                          {selectedStudent.progress.singleRange1}%
                        </span>
                      </div>
                      <div className="bg-gray-200 h-2 rounded-full">
                        <div
                          className="bg-[#0B5D3A] h-2 rounded-full"
                          style={{
                            width: `${selectedStudent.progress.singleRange1}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-black">Single Range</span>
                        <span className="text-sm text-gray-600">
                          {selectedStudent.progress.singleRange2}%
                        </span>
                      </div>
                      <div className="bg-gray-200 h-2 rounded-full">
                        <div
                          className="bg-[#0B5D3A] h-2 rounded-full"
                          style={{
                            width: `${selectedStudent.progress.singleRange2}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-auto bg-[#C77373] text-sm text-white py-2 px-7  rounded-xl cursor-pointer hover:bg-red-600 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`fixed md:static top-0 right-0 h-full z-40 w-80 bg-white p-4 md:p-6 transform transition-transform duration-500 ease-in-out ${
          showSidebar ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex justify-end items-center mb-4 md:hidden">
          {/* <h2 className="font-medium">Notifications</h2> */}
          <button onClick={toggleSidebar} className="p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div>
          <h1 className="font-bold mb-4">Add Entity</h1>
        </div>

        <div className="">
          {/* <h1 className="poppins-thin_600 text-black mb-6" onClick={toggleModal}>Join Group</h1> */}
          <button
            onClick={openAddModal}
            className="w-full md:w-auto py-2 bg-[#0B5D3A] text-sm px-7 text-white rounded-xl mb-6 font-semibold"
          >
            Add Student
          </button>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md relative p-6 mx-4">
            <button
              onClick={closeAddModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center mb-6">
              <div className="relative w-24 h-24 mb-3 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
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
              {profileImage !== ProfilePicture && (
                <p className="text-green-600 text-xs mt-1">
                  New image selected
                </p>
              )}
            </div>

            <form className="space-y-4 custom-scrollbar overflow-y-auto max-h-[50vh]">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300/40 rounded-md bg-[#F1F1F1] outline-none text-sm "
                  defaultValue="Maletry"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300/40 rounded-md bg-[#F1F1F1] outline-none text-sm "
                  defaultValue="Prajapati"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300/40 rounded-md bg-[#F1F1F1] outline-none text-sm "
                  defaultValue="maletry@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone No
                </label>
                <input
                  type="tel"
                  className="w-full p-2 border border-gray-300/40 rounded-md bg-[#F1F1F1] outline-none text-sm "
                  defaultValue=""
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Input
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300/40 rounded-md bg-[#F1F1F1] outline-none text-sm "
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Input
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300/40 rounded-md bg-[#F1F1F1] outline-none text-sm "
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Input
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300/40 rounded-md bg-[#F1F1F1] outline-none text-sm "
                />
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  className="md:w-auto w-full bg-[#0B5D3A] text-white text-sm py-2 px-6 rounded-xl hover:bg-green-700 transition-colors"
                  onClick={closeAddModal}
                >
                  Create Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
