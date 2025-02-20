import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import GetStarted from "./pages/GetStarted";
import StudentSignIn from "./pages/StudentSignIn";
import InstructorSignIn from "./pages/InstructorSignIn";
import StudentSignUp from "./pages/StudentSignUp";
import InstructorSignUp from "./pages/InstructorSignUp";
import OtpUser from "./pages/OtpUser";
import Success from "./pages/Success";
import MaintainancePage from "./pages/Maintainance";
import StudentDashboard from "./pages/StudentDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import CreateCourseForm from "./components/courses/CreateCourseForm";
import CoursesPage from "./pages/student/CoursesPage";
import CourseDetails from "./pages/CourseDetails";
import MyCoursesPage from "./pages/instructor/CoursesPage";
import InstructorCourseDetails from "./pages/InstructorCourseData";
import InstructorCourseEdit from "./pages/InstructorCourseEdit";
export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/student/signin" element={<StudentSignIn />} />
          <Route path="/instructor/signin" element={<InstructorSignIn />} />
          <Route path="/student/signup" element={<StudentSignUp />} />
          <Route path="/instructor/signup" element={<InstructorSignUp />} />
          <Route path="/otp-verify" element={<OtpUser />} />
          <Route path="/student/courses" element={<CoursesPage />} />
          <Route path="/instructor/courses" element={<MyCoursesPage />} />
          <Route path="/success" element={<Success />} />
          <Route
            path="/student/student-dashboard"
            element={<StudentDashboard />}
          />

          <Route
            path="/instructor/instructor-dashboard"
            element={<InstructorDashboard />}
          />
          <Route
            path="/student/course-details/:id"
            element={<CourseDetails />}
          />
          <Route
            path="/instructor/course-editform/:id"
            element={<InstructorCourseEdit />}
          />
          <Route
            path="/instructor/course-details/:id"
            element={<InstructorCourseDetails />}
          />
          <Route
            path="/instructor/create-courses"
            element={<CreateCourseForm />}
          />
          {/**maintainance */}
          <Route path="*" element={<MaintainancePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
