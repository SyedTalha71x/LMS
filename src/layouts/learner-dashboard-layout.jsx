/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/learner-dashboard/sidebar";
const LearnerDashboardlayout = () => {
  return (
    <div className="min-h-screen  bg-white">
      <div className="flex flex-col md:flex-row h-full">
        <Sidebar />
        <main className="flex-1 md:h-screen h-[calc(100vh-4rem)] overflow-y-auto md:pt-5 pt-20 pb-10 md:p-5 p-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LearnerDashboardlayout;