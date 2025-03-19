import { useState } from "react";
import { X, FileText, MoreVertical } from "lucide-react";
import Badge from "../../../public/Badge.svg";

const BadgesProgress = () => {
  const [selectedBadge, setSelectedBadge] = useState(null);

  const badges = [
    {
      id: 1,
      title: "Badge 1",
      subtitle: "#12345",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      progress: 40,
      tags: ["Integrity", "Pharmacy", "Research"],
      details: {
        dateEarned: "Not yet earned",
        issuer: "Himmel Academy",
        category: "Professional Development",
        validity: "Lifetime",
        requirements: "Complete all related courses",
        type: "Achievement"
      },
      documentation: "badge1_requirements.pdf"
    },
    {
      id: 2,
      title: "Badge 2",
      subtitle: "#67890",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      progress: 65,
      tags: ["Chemistry", "Analysis", "Research"],
      details: {
        dateEarned: "Not yet earned",
        issuer: "Himmel Academy",
        category: "Technical Skills",
        validity: "3 years",
        requirements: "Pass certification exam",
        type: "Certification"
      },
      documentation: "badge2_requirements.pdf"
    },
    {
      id: 3,
      title: "Badge 3",
      subtitle: "#24680",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      progress: 90,
      tags: ["Clinical", "Patient Care", "Ethics"],
      details: {
        dateEarned: "Not yet earned",
        issuer: "Himmel Academy",
        category: "Clinical Practice",
        validity: "2 years",
        requirements: "Complete practical assessment",
        type: "Qualification"
      },
      documentation: "badge3_requirements.pdf"
    },
    {
      id: 4,
      title: "Badge 4",
      subtitle: "#13579",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      progress: 20,
      tags: ["Regulations", "Compliance", "Guidelines"],
      details: {
        dateEarned: "Not yet earned",
        issuer: "Himmel Academy",
        category: "Regulatory Affairs",
        validity: "1 year",
        requirements: "Complete regulatory courses",
        type: "Compliance"
      },
      documentation: "badge4_requirements.pdf"
    },
    {
      id: 5,
      title: "Badge 5",
      subtitle: "#97531",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      progress: 75,
      tags: ["Pharmacology", "Research", "Advanced"],
      details: {
        dateEarned: "Not yet earned",
        issuer: "Himmel Academy",
        category: "Research",
        validity: "Lifetime",
        requirements: "Publish research paper",
        type: "Academic"
      },
      documentation: "badge5_requirements.pdf"
    },
    {
      id: 6,
      title: "Badge 6",
      subtitle: "#08642",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      progress: 50,
      tags: ["Manufacturing", "Quality", "GMP"],
      details: {
        dateEarned: "Not yet earned",
        issuer: "Himmel Academy",
        category: "Manufacturing",
        validity: "5 years",
        requirements: "Complete GMP certification",
        type: "Industrial"
      },
      documentation: "badge6_requirements.pdf"
    },
  ];

  const openModal = (badge) => {
    setSelectedBadge(badge);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedBadge(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="max-w-4xl w-full mr-auto p-4 md:p-6">
      <h1 className="text-2xl poppins-thin_600 mb-6">Badges progress</h1>
      <div className="space-y-3">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="bg-[#F2F2F2] rounded-xl md:p-6 p-3 flex flex-col md:flex-row items-center cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => openModal(badge)}
          >
            <div className="relative w-12 h-12 flex-shrink-0">
              <img src={Badge} alt="Badge icon" className="object-contain" />
            </div>
            <div className="md:ml-4 ml-0 flex-grow text-center md:text-left">
              <h3 className="text-md poppins-thin_600">{badge.title}</h3>
              <p className="text-sm text-gray-500">{badge.subtitle}</p>
            </div>
            <div className="flex sm:flex-row items-center gap-3 sm:ml-4 w-full sm:w-auto mt-3 sm:mt-0">
              <div className="hidden sm:block text-sm font-medium">
                Progress
              </div>
              <div className="w-full sm:w-32 relative">
                <div className="bg-gray-200 h-2 rounded-full w-full">
                  <div
                    className="bg-[#0B5D3A] h-2 rounded-full relative"
                    style={{ width: `${badge.progress}%` }}
                  >
                    <div className="absolute -right-1.5 -top-1 w-4 h-4 bg-[#0B5D3A] rounded-full border-2 border-white"></div>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-400">{badge.progress}%</div>
              <button 
                className="ml-auto sm:ml-2 p-1 hover:bg-gray-100 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  // Add additional action if needed
                }}
              >
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedBadge && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-4  overflow-y-auto custom-scrollbar relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 cursor-pointer bg-black p-1 text-sm rounded-md text-white z-10"
            >
              <X size={15} />
            </button>

            <div className="flex items-center justify-between p-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10">
                  <img src={Badge} alt="Badge icon" className="object-contain" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">
                    {selectedBadge.title}
                  </h2>
                  <p className="text-xs text-gray-500">{selectedBadge.subtitle}</p>
                </div>
              </div>
            </div>

            <div className="p-2">
              <p className="text-sm text-[#505050]">
                {selectedBadge.description}
              </p>
            </div>

            <div className="p-3 mt-2">
              <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedBadge.tags.map((tag, index) => (
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
                Progress
              </h3>
              <div className="space-y-2">
                <div className="mt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-full relative">
                    <span className="text-gray-800 md:text-md text-xs mb-5">Group activity</span>
                      <div className="bg-gray-200 h-2 rounded-full w-full">
                        <div
                          className="bg-[#0B5D3A] h-2 rounded-full relative"
                          style={{ width: `${selectedBadge.progress}%` }}
                        >
                          <div className="absolute -right-1.5 -top-1 w-4 h-4 bg-[#0B5D3A] rounded-full border-2 border-white"></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-700">{selectedBadge.progress}%</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 mt-2">
              <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">
                Documentation
              </h3>
              <button className="flex items-center justify-center w-auto text-white poppins-thin_bold py-2 bg-[#1E1E1F] rounded-xl text-xs px-6 cursor-pointer transition-colors">
                <FileText size={16} className="mr-2" />
                View Requirements
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgesProgress;