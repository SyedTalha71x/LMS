import { useState } from "react";
import { X, FileText, Edit } from "lucide-react";
import PhotoImage from "../../../public/image 50.svg";
import Frame31 from "../../../public/Frame 31.svg";
import CourseImage from "../../../public/course_image.svg";

const CoursesProgress = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    {
      id: 1,
      title: "Clinical Pharmacy-II",
      trainer: "Trainer",
      date: "28 dec 2025 Monday",
      time: "08:00 AM",
      progress: 40,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      tags: ["Integrity", "Generosity", "Empathy"],
      details: {
        studentsEnrolled: 22,
        AssignTeacher: "James bond",
        category: "Accountant",
        location: "Himmel",
        timing: "10:00 AM - 12:00 PM",
        titles: "Details",
      },
      materials: {
        studentsEnrolled: 22,
        AssignTeacher: "James bond",
        category: "Accountant",
        location: "Himmel",
        timing: "10:00 AM - 12:00 PM",
        titles: "Details",
      },
      image: PhotoImage,
    },
    {
      id: 2,
      title: "Fundamental I",
      trainer: "James Edwards",
      date: "30 dec 2025 Wednesday",
      time: "10:00 AM",
      progress: 40,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      tags: ["Integrity", "Generosity", "Empathy"],
      details: {
        studentsEnrolled: 22,
        AssignTeacher: "James bond",
        category: "Accountant",
        location: "Himmel",
        timing: "10:00 AM - 12:00 PM",
        titles: "Details",
      },
      materials: {
        studentsEnrolled: 22,
        AssignTeacher: "James bond",
        category: "Accountant",
        location: "Himmel",
        timing: "10:00 AM - 12:00 PM",
        titles: "Details",
      },
      image: PhotoImage,
    },
    {
      id: 3,
      title: "Clinical Pharmacy-II",
      trainer: "Trainer",
      date: "28 dec 2025 Monday",
      time: "08:00 AM",
      progress: 40,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      tags: ["Integrity", "Generosity", "Empathy"],
      details: {
        studentsEnrolled: 22,
        AssignTeacher: "James bond",
        category: "Accountant",
        location: "Himmel",
        timing: "10:00 AM - 12:00 PM",
        titles: "Details",
      },
      materials: {
        studentsEnrolled: 22,
        AssignTeacher: "James bond",
        category: "Accountant",
        location: "Himmel",
        timing: "10:00 AM - 12:00 PM",
        titles: "Details",
      },
      image: PhotoImage,
    },
    {
      id: 4,
      title: "Clinical Pharmacy-II",
      trainer: "Trainer",
      date: "28 dec 2025 Monday",
      time: "08:00 AM",
      progress: 40,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      tags: ["Integrity", "Generosity", "Empathy"],
      details: {
        studentsEnrolled: 22,
        AssignTeacher: "James bond",
        category: "Accountant",
        location: "Himmel",
        timing: "10:00 AM - 12:00 PM",
        titles: "Details",
      },
      materials: {
        studentsEnrolled: 22,
        AssignTeacher: "James bond",
        category: "Accountant",
        location: "Himmel",
        timing: "10:00 AM - 12:00 PM",
        titles: "Details",
      },
      image: PhotoImage,
    },
    {
      id: 5,
      title: "Clinical Pharmacy-II",
      trainer: "Trainer",
      date: "28 dec 2025 Monday",
      time: "08:00 AM",
      progress: 40,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      tags: ["Integrity", "Generosity", "Empathy"],
      details: {
        studentsEnrolled: 22,
        AssignTeacher: "James bond",
        category: "Accountant",
        location: "Himmel",
        timing: "10:00 AM - 12:00 PM",
        titles: "Details",
      },
      materials: {
        studentsEnrolled: 22,
        AssignTeacher: "James bond",
        category: "Accountant",
        location: "Himmel",
        timing: "10:00 AM - 12:00 PM",
        titles: "Details",
      },
      image: PhotoImage,
    },
  ];

  const openModal = (course) => {
    setSelectedCourse(course);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedCourse(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="p-1 md:p-6">
      <h1 className="text-2xl poppins-thin_600 mb-6">Courses progress</h1>

      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-[#F9F9F9] p-4 md:p-6 max-w-5xl mr-auto rounded-lg cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => openModal(course)}
          >
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex items-center md:w-1/3">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-200 mr-4">
                  <img
                    src={course.image}
                    alt="Trainer avatar"
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="flex flex-col">
                  <h3 className="poppins-thin_600">{course.title}</h3>
                  <p className="text-gray-500 text-sm">{course.trainer}</p>

                  <div className="text-sm flex md:flex-row flex-col md:gap-3 gap-0 text-gray-800 mt-1">
                    <span className="text-gray-500">{course.date}</span>
                    <span className="font-bold">{course.time}</span>
                  </div>
                </div>
              </div>

              <div className="md:w-5/12 mt-4 md:mt-0">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-gray-400">
                    {course.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#0B5D3A] h-2 rounded-full relative"
                    style={{ width: `${course.progress}%` }}
                  >
                    <div className="absolute -right-1.5 -top-1 w-4 h-4 bg-[#0B5D3A] rounded-full border-2 border-white"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-4 max-h-[90vh] overflow-y-auto custom-scrollbar relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 cursor-pointer bg-black p-1 text-sm rounded-md text-white z-10"
            >
              <X size={15} />
            </button>

            <div className="flex items-center justify-between p-6 ">
              <div className="flex items-center gap-3">
                <div className="relative h-16 w-16">
                  <img src={Frame31} className="h-full w-full" alt="" />
                </div>
                <h2 className="text-lg font-semibold">
                  {selectedCourse.title}
                </h2>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-md border border-slate-300 cursor-pointer"
              >
                <Edit size={20} className="" />
              </button>
            </div>

            <div className="w-full h-full  rounded-lg">
              <img
                src={CourseImage}
                alt={selectedCourse.title}
                className="w-full h-full  object-center "
              />
            </div>

            <div className="p-2 mt-4">
              <p className="text-sm text-[#505050]">
                {selectedCourse.description}
              </p>
            </div>

            <div className="p-3 mt-2">
              <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedCourse.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-gray-100 text-gray-700 text-xs rounded-xl poppins-thin"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 mt-2">
              <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">
                Details
              </h3>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <span className="text-gray-500 md:text-sm text-xs font-bold">
                    Students Enrolled:
                  </span>
                  <span className="col-span-2 md:text-sm text-xs text-gray-700">
                    {selectedCourse.details.studentsEnrolled}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4  text-sm">
                  <span className="text-gray-500 md:text-sm text-xs font-bold">
                    Assign Teacher:
                  </span>
                  <span className="col-span-2 md:text-sm text-xs text-gray-700">
                    {selectedCourse.details.AssignTeacher}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4  text-sm">
                  <span className="text-gray-500 md:text-sm text-xs font-bold">
                    Category:
                  </span>
                  <span className="col-span-2 md:text-sm text-xs text-gray-700">
                    {selectedCourse.details.category}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4  text-sm">
                  <span className="text-gray-500 md:text-sm text-xs font-bold">
                    Location:
                  </span>
                  <span className="col-span-2 md:text-sm text-xs text-gray-700">
                    {selectedCourse.details.location}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4  md:text-sm text-xs">
                  <span className="text-gray-500 md:text-sm text-xs font-bold">
                    Timing:
                  </span>
                  <span className="col-span-2 md:text-sm text-xs text-gray-700">
                    {selectedCourse.details.timing}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4  md:text-sm text-xs">
                  <span className="text-gray-500 md:text-sm text-xs font-bold">
                    Titles:
                  </span>
                  <span className="col-span-2 md:text-sm text-xs text-gray-700">
                    {selectedCourse.details.titles}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 mt-2">
              <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">
                Materials
              </h3>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <span className="text-gray-500 md:text-sm text-xs font-bold">
                    Students Enrolled:
                  </span>
                  <span className="col-span-2 md:text-sm text-xs text-gray-700">
                    {selectedCourse.details.studentsEnrolled}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4  text-sm">
                  <span className="text-gray-500 md:text-sm text-xs font-bold">
                    Assign Teacher:
                  </span>
                  <span className="col-span-2 md:text-sm text-xs text-gray-700">
                    {selectedCourse.details.AssignTeacher}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4  text-sm">
                  <span className="text-gray-500 md:text-sm text-xs font-bold">
                    Category:
                  </span>
                  <span className="col-span-2 md:text-sm text-xs text-gray-700">
                    {selectedCourse.details.category}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4  text-sm">
                  <span className="text-gray-500 md:text-sm text-xs font-bold">
                    Location:
                  </span>
                  <span className="col-span-2 md:text-sm text-xs text-gray-700">
                    {selectedCourse.details.location}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4  md:text-sm text-xs">
                  <span className="text-gray-500 md:text-sm text-xs font-bold">
                    Timing:
                  </span>
                  <span className="col-span-2 md:text-sm text-xs text-gray-700">
                    {selectedCourse.details.timing}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4  md:text-sm text-xs">
                  <span className="text-gray-500 md:text-sm text-xs font-bold">
                    Titles:
                  </span>
                  <span className="col-span-2 md:text-sm text-xs text-gray-700">
                    {selectedCourse.details.titles}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 mt-2">
              <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">
                Progress
              </h3>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-4  text-sm">
                  <span className="text-gray-800 md:text-md text-xs">Group activity</span>
                  <span className="col-span-2 text-gray-400">
                    {selectedCourse.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div
                    className="bg-[#0B5D3A] h-1 rounded-full"
                    style={{ width: `${selectedCourse.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="p-3 mt-2">
              <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">
                Documentation
              </h3>
              <button className="flex items-center justify-center w-auto text-white poppins-thin_bold  py-2 bg-[#1E1E1F] rounded-xl text-xs px-6 cursor-pointer transition-colors">
                <FileText size={16} className="mr-2" />
                View PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesProgress;
