import { useState } from "react";
import { X, FileText, Edit } from "lucide-react";
// Import the images you're using
import Frame31 from "../../../public/Frame 31.svg";
import CourseImage from "../../../public/course_image.svg";
import PhotoImage from "../../../public/image 50.svg";

const CertificateProgress = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const certificates = [
    {
      id: 1,
      title: "Basic of Pharma",
      percentage: 87,
      stage: "Stage 1-5",
      completedStages: 3,
      trainer: "Dr. Sarah Johnson",
      date: "15 Apr 2025 Thursday",
      time: "09:00 AM",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      tags: ["Integrity", "Pharmacy", "Research"],
      details: {
        studentsEnrolled: 45,
        AssignTeacher: "Dr. Sarah Johnson",
        category: "Pharmacy",
        location: "Himmel",
        timing: "09:00 AM - 11:00 AM",
        titles: "Details",
      },
      materials: {
        studentsEnrolled: 45,
        AssignTeacher: "Dr. Sarah Johnson",
        category: "Pharmacy",
        location: "Himmel",
        timing: "09:00 AM - 11:00 AM",
        titles: "Details",
      },
      image: PhotoImage,
    },
    {
      id: 2,
      title: "Pharmaceutical Chemistry",
      percentage: 65,
      stage: "Stage 1-5",
      completedStages: 2,
      trainer: "Dr. Michael Chen",
      date: "20 Apr 2025 Tuesday",
      time: "10:00 AM",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      tags: ["Chemistry", "Analysis", "Research"],
      details: {
        studentsEnrolled: 38,
        AssignTeacher: "Dr. Michael Chen",
        category: "Chemistry",
        location: "Himmel",
        timing: "10:00 AM - 12:00 PM",
        titles: "Details",
      },
      materials: {
        studentsEnrolled: 38,
        AssignTeacher: "Dr. Michael Chen",
        category: "Chemistry",
        location: "Himmel",
        timing: "10:00 AM - 12:00 PM",
        titles: "Details",
      },
      image: PhotoImage,
    },
    {
      id: 3,
      title: "Clinical Pharmacy",
      percentage: 92,
      stage: "Stage 1-5",
      completedStages: 4,
      trainer: "Dr. Emily Roberts",
      date: "22 Apr 2025 Thursday",
      time: "01:00 PM",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      tags: ["Clinical", "Patient Care", "Ethics"],
      details: {
        studentsEnrolled: 32,
        AssignTeacher: "Dr. Emily Roberts",
        category: "Clinical",
        location: "Himmel",
        timing: "01:00 PM - 03:00 PM",
        titles: "Details",
      },
      materials: {
        studentsEnrolled: 32,
        AssignTeacher: "Dr. Emily Roberts",
        category: "Clinical",
        location: "Himmel",
        timing: "01:00 PM - 03:00 PM",
        titles: "Details",
      },
      image: PhotoImage,
    },
    {
      id: 4,
      title: "Pharmaceutical Regulations",
      percentage: 42,
      stage: "Stage 1-5",
      completedStages: 2,
      trainer: "Prof. David Wilson",
      date: "25 Apr 2025 Monday",
      time: "09:00 AM",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      tags: ["Regulations", "Compliance", "Guidelines"],
      details: {
        studentsEnrolled: 40,
        AssignTeacher: "Prof. David Wilson",
        category: "Regulations",
        location: "Himmel",
        timing: "09:00 AM - 11:00 AM",
        titles: "Details",
      },
      materials: {
        studentsEnrolled: 40,
        AssignTeacher: "Prof. David Wilson",
        category: "Regulations",
        location: "Himmel",
        timing: "09:00 AM - 11:00 AM",
        titles: "Details",
      },
      image: PhotoImage,
    },
    {
      id: 5,
      title: "Pharmacology Advanced",
      percentage: 75,
      stage: "Stage 1-5",
      completedStages: 3,
      trainer: "Dr. Lisa Thompson",
      date: "28 Apr 2025 Thursday",
      time: "02:00 PM",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      tags: ["Pharmacology", "Research", "Advanced"],
      details: {
        studentsEnrolled: 35,
        AssignTeacher: "Dr. Lisa Thompson",
        category: "Pharmacology",
        location: "Himmel",
        timing: "02:00 PM - 04:00 PM",
        titles: "Details",
      },
      materials: {
        studentsEnrolled: 35,
        AssignTeacher: "Dr. Lisa Thompson",
        category: "Pharmacology",
        location: "Himmel",
        timing: "02:00 PM - 04:00 PM",
        titles: "Details",
      },
      image: PhotoImage,
    },
    {
      id: 6,
      title: "Pharmaceutical Manufacturing",
      percentage: 50,
      stage: "Stage 1-5",
      completedStages: 2,
      trainer: "Prof. Robert Adams",
      date: "30 Apr 2025 Monday",
      time: "10:00 AM",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      tags: ["Manufacturing", "Quality", "GMP"],
      details: {
        studentsEnrolled: 42,
        AssignTeacher: "Prof. Robert Adams",
        category: "Manufacturing",
        location: "Himmel",
        timing: "10:00 AM - 12:00 PM",
        titles: "Details",
      },
      materials: {
        studentsEnrolled: 42,
        AssignTeacher: "Prof. Robert Adams",
        category: "Manufacturing",
        location: "Himmel",
        timing: "10:00 AM - 12:00 PM",
        titles: "Details",
      },
      image: PhotoImage,
    },
  ];

  const openModal = (certificate) => {
    setSelectedCertificate(certificate);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedCertificate(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl mb-6 poppins-thin_600">Certificate progress</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {certificates.map((certificate) => (
          <div 
            key={certificate.id} 
            className="bg-[#F2F2F2] p-5 rounded-xl cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => openModal(certificate)}
          >
            <h3 className="text-sm poppins-thin_600 mb-1">{certificate.title}</h3>
            <div className="text-4xl font-bold mb-1">
              {certificate.percentage}%
            </div>
            <p className="text-sm text-gray-600 mb-4">
              of customers recommend this product
            </p>

            <div className="space-y-2">
              <div className="text-sm font-medium">Progress</div>

              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((stage) => (
                  <div
                    key={stage}
                    className={`h-2 flex-1 ${
                      stage <= certificate.completedStages
                        ? "bg-[#0B5D3A]"
                        : "bg-gray-200"
                    } ${stage === 1 ? "rounded-l-full" : ""} ${
                      stage === 5 ? "rounded-r-full" : ""
                    }`}
                  ></div>
                ))}
              </div>

              <div className="text-xs text-gray-700">{certificate.stage}</div>
            </div>
          </div>
        ))}
      </div>

      {selectedCertificate && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-4 max-h-[90vh] overflow-y-auto custom-scrollbar relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 cursor-pointer bg-black p-1 text-sm rounded-md text-white z-10"
            >
              <X size={15} />
            </button>

            <div className="flex items-center justify-between p-2">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold">
                  {selectedCertificate.title}
                </h2>
              </div>
            </div>

            <div className="p-2 ">
              <p className="text-sm text-[#505050]">
                {selectedCertificate.description}
              </p>
            </div>

            <div className="p-3 mt-2">
              <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">
                Completion
              </h3>
              <button className="flex items-center justify-center w-auto text-white poppins-thin_bold py-2 bg-[#1E1E1F] rounded-xl text-xs px-6 cursor-pointer transition-colors">
              Continue
              </button>
            </div>

            <div className="p-3 mt-2">
              <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedCertificate.tags.map((tag, index) => (
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
                    {selectedCertificate.details.studentsEnrolled}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <span className="text-gray-500 md:text-sm text-xs font-bold">
                    Assign Teacher:
                  </span>
                  <span className="col-span-2 md:text-sm text-xs text-gray-700">
                    {selectedCertificate.details.AssignTeacher}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <span className="text-gray-500 md:text-sm text-xs font-bold">
                    Category:
                  </span>
                  <span className="col-span-2 md:text-sm text-xs text-gray-700">
                    {selectedCertificate.details.category}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <span className="text-gray-500 md:text-sm text-xs font-bold">
                    Location:
                  </span>
                  <span className="col-span-2 md:text-sm text-xs text-gray-700">
                    {selectedCertificate.details.location}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 md:text-sm text-xs">
                  <span className="text-gray-500 md:text-sm text-xs font-bold">
                    Timing:
                  </span>
                  <span className="col-span-2 md:text-sm text-xs text-gray-700">
                    {selectedCertificate.details.timing}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 md:text-sm text-xs">
                  <span className="text-gray-500 md:text-sm text-xs font-bold">
                    Titles:
                  </span>
                  <span className="col-span-2 md:text-sm text-xs text-gray-700">
                    {selectedCertificate.details.titles}
                  </span>
                </div>
              </div>
            </div>


            <div className="p-3 mt-2">
              <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">
                Progress
              </h3>
              <div className="space-y-2">
                <div className="mt-2">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((stage) => (
                      <div
                        key={stage}
                        className={`h-2 flex-1 ${
                          stage <= selectedCertificate.completedStages
                            ? "bg-[#0B5D3A]"
                            : "bg-gray-200"
                        } ${stage === 1 ? "rounded-l-full" : ""} ${
                          stage === 5 ? "rounded-r-full" : ""
                        }`}
                      ></div>
                    ))}
                  </div>
                  <div className="text-xs text-gray-700 mt-1">{selectedCertificate.stage}</div>
                </div>
              </div>
            </div>

            <div className="p-3 mt-2">
              <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">
                Documentation
              </h3>
              <button className="flex items-center justify-center w-auto text-white poppins-thin_bold py-2 bg-[#1E1E1F] rounded-xl text-xs px-6 cursor-pointer transition-colors">
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

export default CertificateProgress;