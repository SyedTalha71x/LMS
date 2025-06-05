/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

// React Icons
import { LuLayoutDashboard } from "react-icons/lu";
import { FaUser, FaUsers, FaChalkboardTeacher, FaBook, FaComments, FaTasks, FaCalendarAlt, FaCreditCard } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigation = (to) => {
    navigate(to);
    setIsSidebarOpen(false);
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
              {/* Overview */}
              <li>
                <button
                  onClick={() => handleNavigation("/admin-dashboard/overview")}
                  className={`flex items-center gap-3 cursor-pointer rounded-xl text-sm px-4 py-2.5 open_sans_font text-black relative w-full text-left
                  group transition-all duration-300 
                  ${
                    location.pathname === "/admin-dashboard/overview"
                      ? "text-white bg-[#0B5D3A]"
                      : "hover:text-white hover:bg-[#0B5D3A]"
                  }`}
                >
                  <LuLayoutDashboard size={20} />
                  <span className="text-md">Overview</span>
                </button>
              </li>

              {/* Other Links */}
              {[
                { icon: FaUser, label: "My Profile", to: "/admin-dashboard/my-profile" },
                { icon: FaChalkboardTeacher, label: "Instructors", to: "/admin-dashboard/instructors" },
                { icon: FaUsers, label: "Groups", to: "/admin-dashboard/groups" },
                { icon: FaUser, label: "Students", to: "/admin-dashboard/students" },
                { icon: FaBook, label: "Courses", to: "/admin-dashboard/courses" },
                { icon: FaComments, label: "Discussion", to: "/admin-dashboard/discussion" },
                { icon: IoIosNotificationsOutline, label: "Notification", to: "/admin-dashboard/notifications" },
                { icon: FaTasks, label: "Assignments", to: "/admin-dashboard/assignments" },
                { icon: FaCalendarAlt, label: "Events", to: "/admin-dashboard/events" },
                { icon: FaCalendarAlt, label: "Conference", to: "/admin-dashboard/conference" },
                { icon: FaCreditCard, label: "Payments", to: "/admin-dashboard/payments" },
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
                    <item.icon size={20} />
                    <span className="text-md">{item.label}</span>
                  </button>
                </li>
              ))}

              {/* Logout */}
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 cursor-pointer rounded-xl text-sm px-4 py-2.5 open_sans_font text-black w-full text-left hover:text-white hover:bg-red-600 transition-all duration-300"
                >
                  <FiLogOut size={20} />
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
