import { MoreVertical } from "lucide-react";
import Badge from "../../../public/Badge.svg";

const BadgesProgress = () => {
  const badges = [
    {
      id: 1,
      title: "Title",
      description: "Description",
      progress: 40,
    },
    {
      id: 2,
      title: "Title",
      description: "Description",
      progress: 40,
    },
    {
      id: 3,
      title: "Title",
      description: "Description",
      progress: 40,
    },
    {
      id: 4,
      title: "Title",
      description: "Description",
      progress: 40,
    },
    {
      id: 5,
      title: "Title",
      description: "Description",
      progress: 40,
    },
    {
      id: 6,
      title: "Title",
      description: "Description",
      progress: 40,
    },
  ];

  return (
    <div className="max-w-4xl w-full mr-auto p-4 md:p-6">
      <h1 className="text-2xl poppins-thin_600 mb-6">Badges progress</h1>

      <div className="space-y-3">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="bg-[#F2F2F2] rounded-xl md:p-6 p-3 flex flex-col md:flex-row items-center"
          >
              <div className="relative w-12 h-12 flex-shrink-0">
                <img src={Badge} alt="Badge icon" className="object-contain" />
              </div>

              <div className="md:ml-4 ml-0 flex-grow text-center md:text-left">
                <h3 className="text-md poppins-thin_600">{badge.title}</h3>
                <p className="text-sm text-gray-500">{badge.description}</p>
              </div>
            <div className="flex  sm:flex-row items-center gap-3 sm:ml-4 w-full sm:w-auto mt-3 sm:mt-0">
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

              <button className="ml-auto sm:ml-2 p-1 hover:bg-gray-100 rounded-full">
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgesProgress;
