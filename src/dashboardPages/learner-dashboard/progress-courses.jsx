import PhotoImage from "../../../public/image 50.svg";

const CoursesProgress = () => {
  const courses = [
    {
      id: 1,
      title: "Clinical Pharmacy-II",
      trainer: "Trainer",
      date: "28 dec 2025 Monday",
      time: "08:00 AM",
      progress: 40,
    },
    {
      id: 2,
      title: "Clinical Pharmacy-II",
      trainer: "Trainer",
      date: "28 dec 2025 Monday",
      time: "08:00 AM",
      progress: 40,
    },
    {
      id: 3,
      title: "Clinical Pharmacy-II",
      trainer: "Trainer",
      date: "28 dec 2025 Monday",
      time: "08:00 AM",
      progress: 40,
    },
    {
      id: 4,
      title: "Clinical Pharmacy-II",
      trainer: "Trainer",
      date: "28 dec 2025 Monday",
      time: "08:00 AM",
      progress: 40,
    },
    {
      id: 5,
      title: "Clinical Pharmacy-II",
      trainer: "Trainer",
      date: "28 dec 2025 Monday",
      time: "08:00 AM",
      progress: 40,
    },
  ];

  return (
    <div className=" p-1 md:p-6">
      <h1 className="text-2xl poppins-thin_600 mb-6">Courses progress</h1>

      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-[#F9F9F9] p-4 md:p-6 rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex items-center md:w-1/3">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-200 mr-4">
                  <img
                    src={PhotoImage}
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

              <div className="md:w-5/12">
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
    </div>
  );
};

export default CoursesProgress;
