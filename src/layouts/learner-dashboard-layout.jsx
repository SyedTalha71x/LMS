/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/learner-dashboard/sidebar";

const LearnerDashboardlayout = () => {
  const location = useLocation();

  const hideSidebarPaths = ["/course-details", "/course-details/:id"];

  const shouldHideSidebar = hideSidebarPaths.some((path) =>
    location.pathname.startsWith("/course-details")
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col md:flex-row h-full">
        {!shouldHideSidebar && <Sidebar />}

        <main className="flex-1 md:h-screen h-[calc(100vh-4rem)] overflow-y-auto lg:pt-6 md:pt-24 pt-20 pb-10 md:p-2 p-2">
          <Outlet />
        </main> 
      </div>
    </div>
  );
};

export default LearnerDashboardlayout;
