/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Book,
  Notebook,
  Calendar,
  User2,
  MessageCircle,
  BookDashed,
  Video
} from "lucide-react";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdEvent } from "react-icons/md";
import { PiNotification } from "react-icons/pi";
import { FaUserGroup } from "react-icons/fa6";


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

  // Check if current path is in the progress submenu
  useEffect(() => {
    const progressPaths = [
      "/instructor-dashboard/progress",
      "/instructor-dashboard/progress/courses",
      "/instructor-dashboard/progress/certificate",
      "/instructor-dashboard/progress/badge"
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
                  onClick={() => handleNavigation("/super-admin-dashboard/overview")}
                  className={`flex items-center gap-3 cursor-pointer rounded-xl text-sm px-4 py-2.5 open_sans_font text-black relative w-full text-left
                  group transition-all duration-300 
                  ${
                    location.pathname === "/super-admin-dashboard/overview"
                      ? "text-white bg-[#0B5D3A]"
                      : "hover:text-white hover:bg-[#0B5D3A]"
                  }`}
                >
                  <LuLayoutDashboard
                    size={20}
                    className={`
                    ${
                      location.pathname === "/super-admin-dashboard/overview"
                        ? "text-white"
                        : "hover:text-black"
                    }`}
                  />
                  <span className="text-md">Overview</span>
                </button>
              </li>
              {[
                {
                  icon: FaUserGroup,
                  label: "My Profile",
                  to: "/super-admin-dashboard/my-profile",
                },
                { icon: User2, label: "Instructors", to: "/super-admin-dashboard/instructors" },
                { icon: Video, label: "Video & Docs", to: "/super-admin-dashboard/video&docs" },


                { icon: Book, label: "Courses   ", to: "/super-admin-dashboard/courses" },

                { icon: MessageCircle, label: "Discussion", to: "/super-admin-dashboard/discussion" },
                { icon: PiNotification, label: "Notification", to: "/super-admin-dashboard/notifications" },


                { icon: Notebook, label: "Assignments", to: "/super-admin-dashboard/assignments" },

                { icon: MdEvent, label: "Payments", to: "/super-admin-dashboard/payments" },

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

<li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 cursor-pointer rounded-xl text-sm px-4 py-2.5 open_sans_font text-black w-full text-left hover:text-white hover:bg-red-600 transition-all duration-300"
                >
                  <BookDashed size={20} />
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