/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

// Font Awesome Icons
import {
  FaUser,
  FaUsers,
  FaChalkboardTeacher,
  FaBook,
  FaComments,
  FaTasks,
  FaCalendarAlt,
  FaBell,
  FaSignOutAlt,
  FaTachometerAlt,
  FaFileVideo,
  FaIdCard,
  FaUserCircle,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => navigate("/login");
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleNavigation = (to) => {
    navigate(to);
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { icon: FaTachometerAlt, label: "Overview", to: "/super-admin-dashboard/overview" },
    { icon: FaUserCircle, label: "My Profile", to: "/super-admin-dashboard/my-profile" },
    { icon: FaChalkboardTeacher, label: "Pharmacies", to: "/super-admin-dashboard/pharmacies" },
    { icon: FaFileVideo, label: "Video & Docs", to: "/super-admin-dashboard/video&docs" },
    { icon: FaBook, label: "Courses", to: "/super-admin-dashboard/courses" },
    { icon: FaComments, label: "Discussion", to: "/super-admin-dashboard/discussion" },
    { icon: FaBell, label: "Notification", to: "/super-admin-dashboard/notifications" },
    { icon: FaTasks, label: "Assignments", to: "/super-admin-dashboard/assignments" },
    { icon: FaCalendarAlt, label: "Payments", to: "/super-admin-dashboard/payments" },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
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
            className="p-2 rounded-lg text-black hover:bg-zinc-700 hover:text-white"
            aria-label="Toggle Sidebar"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 z-50 w-50 h-screen bg-[#F5F7F9] rounded-xl transition-transform duration-500 overflow-y-auto ease-in-out lg:relative lg:translate-x-0 flex flex-col`}
      >
        {/* Close button (mobile) */}
        <div className="absolute top-4 right-4 md:hidden">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 text-white hover:bg-zinc-700 rounded-lg"
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col h-full mt-5">
          <div className="p-4 hidden md:block">
            <h2 className="text-black text-2xl ml-1 poppins-thin_bold">LMS</h2>
          </div>

          <nav className="flex-1 overflow-y-auto custom-scrollbar">
            <ul className="space-y-2 p-4">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavigation(item.to)}
                    className={`flex items-center gap-3 cursor-pointer rounded-xl text-sm px-4 py-2.5 open_sans_font w-full text-left transition-all duration-300 ${
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

              {/* Logout */}
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 cursor-pointer rounded-xl text-sm px-4 py-2.5 open_sans_font w-full text-left text-black hover:text-white hover:bg-red-600 transition-all duration-300"
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
