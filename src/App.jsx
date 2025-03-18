import Navbar from "./components/navbar";
import Footer from "./components/footer";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import Login from "./authentication/signin";
import Main from "./pages/main";

// Learner Dashboard Routes
import LearnerDashboardLayout from "./layouts/learner-dashboard-layout";
import Overview from "./dashboardPages/learner-dashboard/overview";
import ProgressCourse from './dashboardPages/learner-dashboard/progress-courses'
import ProgressCertificates from './dashboardPages/learner-dashboard/progress-certificates'
import ProgressBadges from './dashboardPages/learner-dashboard/progress-badges'
import Group from './dashboardPages/learner-dashboard/group'
import Messages from './dashboardPages/learner-dashboard/messages'
import Notifications from "./dashboardPages/learner-dashboard/notifications";
import Courses from './dashboardPages/learner-dashboard/courses'

function App() {
  const location = useLocation();

  const isLoginRoute = location.pathname.startsWith("/login") || location.pathname.startsWith("/learner-dashboard");

  return (
    <>
      {!isLoginRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />

        <Route path="learner-dashboard" element={<LearnerDashboardLayout />}>
          <Route path="overview" element={<Overview />} />
          <Route path="courses" element={<ProgressCourse />} />
          <Route path="certificates" element={<ProgressCertificates />} />
          <Route path="badges" element={<ProgressBadges />} />
          <Route path="groups" element={<Group />} />
          <Route path="messages" element={<Messages />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="all-courses" element={<Courses />} />


        </Route>
      </Routes>
      {!isLoginRoute && <Footer />}
    </>
  );
}

export default App;
