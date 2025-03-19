/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Book,
  Notebook
} from "lucide-react";
import { LuLayoutDashboard } from "react-icons/lu";
import { GiProgression } from "react-icons/gi";
import { GrAchievement } from "react-icons/gr";
import { FaRegMessage } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import { PiNotification } from "react-icons/pi";
import { Bell } from "lucide-react";
import { FaUserGroup } from "react-icons/fa6";


const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isProgressSubmenuOpen, setIsProgressSubmenuOpen] = useState(false);

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  const location = useLocation();
  const navigate = useNavigate();

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

  // Check if current path is in the progress submenu
  useEffect(() => {
    const progressPaths = [
      "/learner-dashboard/progress",
      "/learner-dashboard/progress/courses",
      "/learner-dashboard/progress/certificate",
      "/learner-dashboard/progress/badge"
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
      <div className="fixed top-0 left-0 w-full bg-[#F5F7F9] p-4 flex items-center justify-between md:hidden z-40">
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
            <Menu size={24} />
          </button>
          <span className="text-white font-semibold"></span>
        </div>
      </div>
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 z-50 w-64 h-screen bg-[#F5F7F9] rounded-xl transition-transform duration-500 overflow-y-auto ease-in-out md:relative md:translate-x-0 flex flex-col`}
      >
        <div className="absolute top-4 right-4 md:hidden">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 text-white hover:bg-zinc-700 rounded-lg"
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col h-full overflow-y-auto mt-5">
          <div className="p-4 hidden md:block">
            <div className="flex flex-col justify-center items-start gap-3">
              <div className="flex flex-col gap-0.5">
                <h2 className="text-black text-2xl ml-1 poppins-thin_bold">LMS</h2>
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto custom-scrollbar">
            <ul className="space-y-2 p-4">
              <li>
                <button
                  onClick={() => handleNavigation("/learner-dashboard/overview")}
                  className={`flex items-center gap-3 cursor-pointer rounded-xl text-sm px-4 py-2.5 open_sans_font text-black relative w-full text-left
                  group transition-all duration-300 
                  ${
                    location.pathname === "/learner-dashboard/overview"
                      ? "text-white bg-[#0B5D3A]"
                      : "hover:text-white hover:bg-[#0B5D3A]"
                  }`}
                >
                  <LuLayoutDashboard
                    size={20}
                    className={`
                    ${
                      location.pathname === "/learner-dashboard/overview"
                        ? "text-white"
                        : "hover:text-black"
                    }`}
                  />
                  <span className="text-md">Overview</span>
                </button>
              </li>
              
              <li>
                <div className="flex flex-col">
                  <button
                    onClick={toggleProgressSubmenu}
                    className={`flex items-center justify-between cursor-pointer rounded-xl text-sm px-4 py-2.5 open_sans_font text-black relative w-full text-left
                    group transition-all duration-500 
                    ${
                      location.pathname.includes("/learner-dashboard/progress")
                        ? "text-white bg-[#0B5D3A]"
                        : "hover:text-white hover:bg-[#0B5D3A]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <GiProgression
                        size={20}
                        className={`
                        ${
                          location.pathname.includes("/learner-dashboard/progress")
                            ? "text-white"
                            : "hover:text-black"
                        }`}
                      />
                      <span className="text-md">Progress</span>
                    </div>
                    {isProgressSubmenuOpen ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                  
                  {isProgressSubmenuOpen && (
                    <ul className="pl-9 mt-1 space-y-1">
                      <li>
                        <button
                          onClick={() => handleNavigation("/learner-dashboard/courses")}
                          className={`flex items-center gap-2 cursor-pointer rounded-lg text-sm py-2 px-3 w-full text-left transition-all duration-300
                          ${
                            location.pathname === "/learner-dashboard/courses"
                              ? "text-white bg-[#0B5D3A]"
                              : "text-black hover:text-white hover:bg-[#0B5D3A]"
                          }`}
                        >
                          <span className="text-sm">Courses</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavigation("/learner-dashboard/certificates")}
                          className={`flex items-center gap-2 cursor-pointer rounded-lg text-sm py-2 px-3 w-full text-left transition-all duration-300
                          ${
                            location.pathname === "/learner-dashboard/certificates"
                              ? "text-white bg-[#0B5D3A]"
                              : "text-black hover:text-white hover:bg-[#0B5D3A]"
                          }`}
                        >
                          <span className="text-sm">Certificate</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavigation("/learner-dashboard/badges")}
                          className={`flex items-center gap-2 cursor-pointer rounded-lg text-sm py-2 px-3 w-full text-left transition-all duration-300
                          ${
                            location.pathname === "/learner-dashboard/badges"
                              ? "text-white bg-[#0B5D3A]"
                              : "text-black hover:text-white hover:bg-[#0B5D3A]"
                          }`}
                        >
                          <span className="text-sm">Badge</span>
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </li>
              
              {[
                {
                  icon: FaUserGroup,
                  label: "Group",
                  to: "/learner-dashboard/groups",
                },
                { icon: FaRegMessage, label: "Messages", to: "/learner-dashboard/messages" },
                { icon: Book, label: "Courses", to: "/learner-dashboard/all-courses" },

                { icon: MdPayment, label: "Payments", to: "/learner-dashboard/payments" },
                { icon: Notebook, label: "Assignments", to: "/learner-dashboard/assignments" },

                { icon: PiNotification, label: "Notification", to: "/learner-dashboard/notifications" },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavigation(item.to)}
                    className={`flex items-center gap-3 cursor-pointer rounded-xl text-sm px-4 py-2.5 open_sans_font text-black relative w-full text-left
                    group transition-all duration-300 
                    ${
                      location.pathname === item.to
                        ? "text-white bg-[#0B5D3A]"
                        : "hover:text-white hover:bg-[#0B5D3A]"
                    }`}
                  >
                    <item.icon
                      size={20}
                      className={`
                      ${
                        location.pathname === item.to
                          ? "text-white"
                          : "hover:text-black"
                      }`}
                    />
                    <span className="text-md">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;