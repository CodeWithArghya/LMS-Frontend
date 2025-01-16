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
            path="/instructor/create-courses"
            element={<CreateCourseForm />}
          />

          <Route path="serverdown" element={<MaintainancePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
