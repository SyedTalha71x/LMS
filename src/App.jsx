import Navbar from "./components/navbar";
import Footer from "./components/footer";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import Login from "./authentication/signin";
import Main from "./pages/main";

// Learner Dashboard Routes
import LearnerDashboardLayout from "./layouts/learner-dashboard-layout";
import Overview from "./dashboardPages/learner-dashboard/overview";
import ProgressCourse from "./dashboardPages/learner-dashboard/progress-courses";
import ProgressCertificates from "./dashboardPages/learner-dashboard/progress-certificates";
import ProgressBadges from "./dashboardPages/learner-dashboard/progress-badges";
import Group from "./dashboardPages/learner-dashboard/group";
import Messages from "./dashboardPages/learner-dashboard/messages";
import Notifications from "./dashboardPages/learner-dashboard/notifications";
import Courses from "./dashboardPages/learner-dashboard/courses";
import Assignments from "./dashboardPages/learner-dashboard/assignments";
import Calender from "./dashboardPages/learner-dashboard/calender";
import CourseDetail from './dashboardPages/learner-dashboard/courses-details/course-detail'

//Instructor Dashboard Routes
import InstructorDashboardlayout from "./layouts/instructor-dashboard";
import Profile from "./dashboardPages/instructor-dashboard/profile";
import InstructorOverview from "./dashboardPages/instructor-dashboard/overview";
import Students from './dashboardPages/instructor-dashboard/students'
import InstructorGroup from './dashboardPages/instructor-dashboard/groups'
import Discussion from "./dashboardPages/instructor-dashboard/discussion";
import InstructorAssignments from "./dashboardPages/instructor-dashboard/assignments";
import InstructorEvents from './dashboardPages/instructor-dashboard/events'
import Conference from './dashboardPages/instructor-dashboard/conference'
import InstructorCourses from './dashboardPages/instructor-dashboard/courses'
import InstructorNotifcations from './dashboardPages/instructor-dashboard/notification'


// Admin Dashboard Layout
import AdminDashboardlayout from "./layouts/admin-dashboard";
import AdminOverview from './dashboardPages/admin-dashboard/overview'
import AdminMyProfile from './dashboardPages/admin-dashboard/my-profile'
import AdminStudents from './dashboardPages/admin-dashboard/students'
import AdminCourses from './dashboardPages/admin-dashboard/courses'
import AdminConference from './dashboardPages/admin-dashboard/conference'
import AdminDiscussion from './dashboardPages/admin-dashboard/discussions'
import AdminAssignments from './dashboardPages/admin-dashboard/assignements'
import AdminNotifications from './dashboardPages/admin-dashboard/notifications'
import AdminEvents from './dashboardPages/admin-dashboard/events'
import AdminPayments from './dashboardPages/admin-dashboard/payment'
import AdminInstructors from './dashboardPages/admin-dashboard/instructors'
import AdminGroups from './dashboardPages/admin-dashboard/groups'

// Super Admin Dashboard
import SuperDashboardlayout from "./layouts/super-admin-dashboard";
import SuperAdminOverview from './dashboardPages/super-admin-dashboard/overview'
import SuperAdminMyProfile from './dashboardPages/super-admin-dashboard/my-profile'
import SuperAdminStudents from './dashboardPages/super-admin-dashboard/students'
import SuperAdminCourses from './dashboardPages/super-admin-dashboard/courses'
import SuperAdminDiscussion from './dashboardPages/super-admin-dashboard/discussions'
import SuperAdminAssignments from './dashboardPages/super-admin-dashboard/assignements'
import SuperAdminNotifications from './dashboardPages/super-admin-dashboard/notifications'
import SuperAdminPayments from './dashboardPages/super-admin-dashboard/payment'
import SuperAdminInstructors from './dashboardPages/super-admin-dashboard/instructors'
import SuperAdminVideoDocs from './dashboardPages/super-admin-dashboard/video-and-docs'


function App() {
  const location = useLocation();

  const isLoginRoute =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/learner-dashboard") || location.pathname.startsWith("/instructor-dashboard") || location.pathname.startsWith("/admin-dashboard") || location.pathname.startsWith("/super-admin-dashboard");

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
          <Route path="assignments" element={<Assignments />} />
          <Route path="calender" element={<Calender />} />
          <Route path="course-details/:id" element={<CourseDetail />} />
        </Route>

        <Route
          path="instructor-dashboard"
          element={<InstructorDashboardlayout />}
        >
          <Route path="overview" element={<InstructorOverview />} />
          <Route path="profile" element={<Profile />} />
          <Route path="students" element={<Students />} />
          <Route path="groups" element={<InstructorGroup />} />
          <Route path="discussion" element={<Discussion />} />
          <Route path="assignments" element={<InstructorAssignments />} />
          <Route path="events" element={<InstructorEvents />} />
          <Route path="conference" element={<Conference />} />
          <Route path="courses" element={<InstructorCourses />} />
          <Route path="notifications" element={<InstructorNotifcations />} />

        </Route>


        <Route
          path="admin-dashboard"
          element={<AdminDashboardlayout />}
        >
          <Route path="overview" element={<AdminOverview />} />
          <Route path="my-profile" element={<AdminMyProfile />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="discussion" element={<AdminDiscussion />} />
          <Route path="assignments" element={<AdminAssignments />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="conference" element={<AdminConference />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="instructors" element={<AdminInstructors />} />
          <Route path="groups" element={<AdminGroups />} />
        </Route>

        <Route path="super-admin-dashboard" element={<SuperDashboardlayout />}>
          <Route path="overview" element={<SuperAdminOverview />} />
          <Route path="my-profile" element={<SuperAdminMyProfile />} />
          <Route path="students" element={<SuperAdminStudents />} />
          <Route path="courses" element={<SuperAdminCourses />} />
          <Route path="discussion" element={<SuperAdminDiscussion />} />
          <Route path="assignments" element={<SuperAdminAssignments />} />
          <Route path="notifications" element={<SuperAdminNotifications />} />
          <Route path="payments" element={<SuperAdminPayments />} />
          <Route path="instructors" element={<SuperAdminInstructors />} />
          <Route path="video&docs" element={<SuperAdminVideoDocs />} />


        </Route>

      </Routes>
      {!isLoginRoute && <Footer />}
    </>
  );
}

export default App;
