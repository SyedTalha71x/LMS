import { useState } from "react";
import { X, Edit2 } from "lucide-react";
import Avatar from "../../../public/avatar.png";

const Students = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const students = [
    {
      id: 1,
      name: "Jhony",
      age: 22,
      gender: "Male",
      designation: 'Student',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      achievements: [
        { name: "Forgetful", icon: null },
        { name: "Generous", icon: null },
        { name: "Forgetful", icon: null }
      ],
      certificates: [
        { name: "Forgetful", icon: null },
        { name: "Calm", icon: null },
        { name: "Generous", icon: null },
        { name: "Forgetful", icon: null }
      ],
      progress: {
        groupActivity: 40,
        singleRange1: 20,
        singleRange2: 90
      }
    },
    {
        id: 2,
        name: "Jhony",
        age: 22,
        gender: "Male",
        designation: 'Student',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        achievements: [
          { name: "Forgetful", icon: null },
          { name: "Generous", icon: null },
          { name: "Forgetful", icon: null }
        ],
        certificates: [
          { name: "Forgetful", icon: null },
          { name: "Calm", icon: null },
          { name: "Generous", icon: null },
          { name: "Forgetful", icon: null }
        ],
        progress: {
          groupActivity: 40,
          singleRange1: 20,
          singleRange2: 90
        }
      },
      {
        id: 3,
        name: "Jhony",
        age: 22,
        gender: "Male",
        designation: 'Student',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        achievements: [
          { name: "Forgetful", icon: null },
          { name: "Generous", icon: null },
          { name: "Forgetful", icon: null }
        ],
        certificates: [
          { name: "Forgetful", icon: null },
          { name: "Calm", icon: null },
          { name: "Generous", icon: null },
          { name: "Forgetful", icon: null }
        ],
        progress: {
          groupActivity: 40,
          singleRange1: 20,
          singleRange2: 90
        }
      },
      {
        id: 4,
        name: "Jhony",
        age: 22,
        gender: "Male",
        designation: 'Student',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        achievements: [
          { name: "Forgetful", icon: null },
          { name: "Generous", icon: null },
          { name: "Forgetful", icon: null }
        ],
        certificates: [
          { name: "Forgetful", icon: null },
          { name: "Calm", icon: null },
          { name: "Generous", icon: null },
          { name: "Forgetful", icon: null }
        ],
        progress: {
          groupActivity: 40,
          singleRange1: 20,
          singleRange2: 90
        }
      },
      {
        id: 5,
        name: "Jhony",
        age: 22,
        gender: "Male",
        designation: 'Student',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        achievements: [
          { name: "Forgetful", icon: null },
          { name: "Generous", icon: null },
          { name: "Forgetful", icon: null }
        ],
        certificates: [
          { name: "Forgetful", icon: null },
          { name: "Calm", icon: null },
          { name: "Generous", icon: null },
          { name: "Forgetful", icon: null }
        ],
        progress: {
          groupActivity: 40,
          singleRange1: 20,
          singleRange2: 90
        }
      },
      {
        id: 6,
        name: "Jhony",
        age: 22,
        gender: "Male",
        designation: 'Student',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        achievements: [
          { name: "Forgetful", icon: null },
          { name: "Generous", icon: null },
          { name: "Forgetful", icon: null }
        ],
        certificates: [
          { name: "Forgetful", icon: null },
          { name: "Calm", icon: null },
          { name: "Generous", icon: null },
          { name: "Forgetful", icon: null }
        ],
        progress: {
          groupActivity: 40,
          singleRange1: 20,
          singleRange2: 90
        }
      }
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
    <div className="max-w-4xl w-full mr-auto p-4 md:p-6">
      <h1 className="text-2xl poppins-thin_600 mb-6">Students</h1>
      <div className="space-y-3">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-[#F2F2F2] rounded-xl md:p-6 p-3 flex flex-col md:flex-row items-center cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => openModal(student)}
          >
            <div className="relative w-12 h-12 flex-shrink-0">
              <img src={Avatar} alt="Student avatar" className="object-contain" />
            </div>
            <div className="md:ml-4 ml-0 flex-grow text-center md:text-left">
              <h3 className="text-md poppins-thin_600">{student.name}</h3>
              <p className="text-sm text-gray-500">{student.designation}</p>
            </div>
            <div className="flex sm:flex-row items-center gap-3 sm:ml-4 w-full sm:w-auto mt-3 sm:mt-0">
              <button className="flex items-center justify-center w-auto text-white poppins-thin_bold py-2 bg-[#1E1E1F] rounded-xl text-xs px-6 cursor-pointer transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-6 overflow-y-auto custom-scrollbar relative">
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
                  <h2 className="text-xl font-semibold">{selectedStudent.name}</h2>
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
              <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">Achievements</h3>
              <div className="flex gap-2">
                {selectedStudent.achievements.map((achievement, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-2 bg-gray-100 poppins-thin_500  text-gray-700 text-xs rounded-xl inline-flex items-center"
                  >
                    {achievement.name}
                    {achievement.icon && <span className="ml-1">{achievement.icon}</span>}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">Certificates</h3>
              <div className="flex flex-wrap gap-2">
                {selectedStudent.certificates.map((certificate, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-2 bg-gray-100 poppins-thin_500  text-gray-700 text-xs rounded-xl"
                  >
                    {certificate.name}
                    {certificate.icon && <span className="ml-1">{certificate.icon}</span>}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">Progress</h3>
              <div className="space-y-3">
                <div className="">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-black">Group activity</span>
                    <span className="text-sm text-gray-700">
                      {selectedStudent.progress.groupActivity}%
                    </span>
                  </div>
                  <div className="bg-gray-200 h-2 rounded-full">
                    <div 
                      className="bg-[#0B5D3A] h-2 rounded-full" 
                      style={{width: `${selectedStudent.progress.groupActivity}%`}}
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
                      style={{width: `${selectedStudent.progress.singleRange1}%`}}
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
                      style={{width: `${selectedStudent.progress.singleRange2}%`}}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button 
                className="w-auto bg-[#C77373] text-sm text-white py-2 px-7  rounded-xl cursor-pointer hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;