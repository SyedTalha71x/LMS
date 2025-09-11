/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaBook,
  FaRegCalendarAlt,
  FaRegUser,
  FaChalkboardTeacher,
  FaCommentDots,
  FaSignOutAlt,
  FaChartLine,
  FaGraduationCap,
  FaCertificate,
  FaUsers,
  FaBell,
  FaFolderOpen,
  FaRegFileAlt
} from "react-icons/fa";
import { MdDashboard, MdAssignment, MdEvent } from "react-icons/md";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { PiBellRingingBold } from "react-icons/pi";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isProgressSubmenuOpen, setIsProgressSubmenuOpen] = useState(false);

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, []);

  useEffect(() => {
    const progressPaths = [
      "/learner-dashboard/progress",
      "/learner-dashboard/progress/courses",
      "/learner-dashboard/progress/certificate",
      "/learner-dashboard/progress/badge",
    ];
    if (progressPaths.includes(location.pathname)) {
      setIsProgressSubmenuOpen(true);
    }
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigation = (to) => {
    navigate(to);
    setIsSidebarOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleProgressSubmenu = () => {
    setIsProgressSubmenuOpen(!isProgressSubmenuOpen);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-[#F5F7F9] p-4 flex items-center justify-between lg:hidden z-40">
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-black hover:bg-zinc-700 hover:text-white cursor-pointer"
            aria-label="Toggle Sidebar"
          >
            <FaBars size={24} />
          </button>
        </div>
      </div>

      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 z-50 w-64 h-screen bg-[#F5F7F9] rounded-xl transition-transform duration-500 overflow-y-auto ease-in-out lg:relative lg:translate-x-0 flex flex-col`}
      >
        <div className="absolute top-4 right-4 md:hidden">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 text-white hover:bg-zinc-700 rounded-lg"
            aria-label="Close Sidebar"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="flex flex-col h-full overflow-y-auto mt-5">
          <div className="p-4 hidden md:block">
            <h2 className="text-black text-2xl ml-1 poppins-thin_bold">LMS</h2>
          </div>

          <nav className="flex-1 overflow-y-auto custom-scrollbar">
            <ul className="space-y-2 p-4">
              <li>
                <button
                  onClick={() => handleNavigation("/learner-dashboard/overview")}
                  className={`flex items-center gap-3 cursor-pointer rounded-xl text-sm px-4 py-2.5 open_sans_font relative w-full text-left transition-all duration-300 ${
                    location.pathname === "/learner-dashboard/overview"
                      ? "text-white bg-[#0B5D3A]"
                      : "text-black hover:text-white hover:bg-[#0B5D3A]"
                  }`}
                >
                  <MdDashboard size={20} />
                  <span className="text-md">Overview</span>
                </button>
              </li>

              <li>
                <div className="flex flex-col">
                  <button
                    onClick={toggleProgressSubmenu}
                    className={`flex items-center justify-between cursor-pointer rounded-xl text-sm px-4 py-2.5 open_sans_font relative w-full text-left transition-all duration-500 ${
                      location.pathname.includes("/learner-dashboard/progress")
                        ? "text-white bg-[#0B5D3A]"
                        : "text-black hover:text-white hover:bg-[#0B5D3A]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FaChartLine size={20} />
                      <span className="text-md">Progress</span>
                    </div>
                    {isProgressSubmenuOpen ? (
                      <IoChevronUp size={16} />
                    ) : (
                      <IoChevronDown size={16} />
                    )}
                  </button>

                  {isProgressSubmenuOpen && (
                    <ul className="pl-9 mt-1 space-y-1">
                      <li>
                        <button
                          onClick={() => handleNavigation("/learner-dashboard/courses")}
                          className={`flex items-center gap-2 cursor-pointer rounded-lg text-sm py-2 px-3 w-full text-left transition-all duration-300 ${
                            location.pathname === "/learner-dashboard/courses"
                              ? "text-white bg-[#0B5D3A]"
                              : "text-black hover:text-white hover:bg-[#0B5D3A]"
                          }`}
                        >
                          <FaBook size={16} />
                          <span className="text-sm">Courses</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavigation("/learner-dashboard/certificates")}
                          className={`flex items-center gap-2 cursor-pointer rounded-lg text-sm py-2 px-3 w-full text-left transition-all duration-300 ${
                            location.pathname === "/learner-dashboard/certificates"
                              ? "text-white bg-[#0B5D3A]"
                              : "text-black hover:text-white hover:bg-[#0B5D3A]"
                          }`}
                        >
                          <FaCertificate size={16} />
                          <span className="text-sm">Certificate</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavigation("/learner-dashboard/badges")}
                          className={`flex items-center gap-2 cursor-pointer rounded-lg text-sm py-2 px-3 w-full text-left transition-all duration-300 ${
                            location.pathname === "/learner-dashboard/badges"
                              ? "text-white bg-[#0B5D3A]"
                              : "text-black hover:text-white hover:bg-[#0B5D3A]"
                          }`}
                        >
                          <FaGraduationCap size={16} />
                          <span className="text-sm">Badge</span>
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </li>

              {[
                {
                  icon: FaUsers,
                  label: "Group",
                  to: "/learner-dashboard/groups",
                },
                {
                  icon: FaCommentDots,
                  label: "Messages",
                  to: "/learner-dashboard/messages",
                },
                {
                  icon: FaFolderOpen,
                  label: "Courses",
                  to: "/learner-dashboard/all-courses",
                },
                {
                  icon: FaRegCalendarAlt,
                  label: "Calender",
                  to: "/learner-dashboard/calender",
                },
                {
                  icon: MdAssignment,
                  label: "Assignments",
                  to: "/learner-dashboard/assignments",
                },
                {
                  icon: PiBellRingingBold,
                  label: "Notification",
                  to: "/learner-dashboard/notifications",
                },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavigation(item.to)}
                    className={`flex items-center gap-3 cursor-pointer rounded-xl text-sm px-4 py-2.5 open_sans_font relative w-full text-left transition-all duration-300 ${
                      location.pathname === item.to
                        ? "text-white bg-[#0B5D3A]"
                        : "text-black hover:text-white hover:bg-[#0B5D3A]"
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="text-md">{item.label}</span>
                  </button>
                </li>
              ))}

              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 cursor-pointer rounded-xl text-sm px-4 py-2.5 open_sans_font text-black w-full text-left hover:text-white hover:bg-red-600 transition-all duration-300"
                >
                  <FaSignOutAlt size={20} />
                  <span className="text-md">Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
