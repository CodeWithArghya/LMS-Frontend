import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import GetStarted from "./pages/GetStarted";
import StudentSignIn from "./pages/StudentSignIn";
import StudentPasswordReset from "./pages/StudentPassword";
import InstrucotrPasswordChange from "./pages/instructor/PasswordChangeI";
import InstructorPasswordReset from "./pages/InstructorPassword";
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
import CreateLWFAssessment from "./components/courses/CreateLWFAssessment";
import AssignmentTabs from "./pages/instructor/AssessmentPage";
import DrawingAndQuestionPage from "./components/DrawingAndQuestionPage";
import AssessmentDisplayPage from "./pages/student/AssessmentDisplayPage";
import AssignmentSubmission from "./pages/student/StudentAssessmentSubmission";
import MyAssessmentALL from "./pages/instructor/AssessmentView";
import InstructorAssessmentResultCard from "./pages/instructor/AssessmentResult";
import StudentPasswordChange from "./pages/student/PasswordChangeS";
import StudentReviewForm from "./components/courses/StudentReview";
import TeacherReviewForm from "./pages/instructor/InstructorReview";
import AdminLogin from "./pages/AdminSignin";
import AdminDash from "./pages/AdminDashboard";
import StudentView from "./components/dashboard/admin/StudentList";
import InstrcutorView from "./components/dashboard/admin/InstructorList";
export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/pages/admin/admin-dashboard" element={<AdminDash />} />
          <Route path="/student/signin" element={<StudentSignIn />} />
          <Route path="/pages/admin/admin-login" element={<AdminLogin />} />
          <Route path="/instructor/signin" element={<InstructorSignIn />} />
          <Route path="/student/signup" element={<StudentSignUp />} />
          <Route path="/instructor/signup" element={<InstructorSignUp />} />
          <Route path="/otp-verify" element={<OtpUser />} />
          <Route path="/student/courses" element={<CoursesPage />} />
          <Route path="/instructor/courses" element={<MyCoursesPage />} />
          <Route path="/success" element={<Success />} />
          <Route path="/pages/admin/view-students" element={<StudentView />} />
          <Route
            path="/pages/admin/view-instructors"
            element={<InstrcutorView />}
          />
          <Route
            path="/student/student-dashboard"
            element={<StudentDashboard />}
          />

          <Route
            path="/instructor/instructor-dashboard"
            element={<InstructorDashboard />}
          />
          <Route
            path="/student/submit-assessment/:id"
            element={<AssignmentSubmission />}
          />
          <Route
            path="/student/course-details/:id"
            element={<CourseDetails />}
          />
          <Route
            path="/student/forgot-password"
            element={<StudentPasswordReset />}
          />
          <Route
            path="/instructor/forgot-password"
            element={<InstructorPasswordReset />}
          />
          <Route
            path="/instructor/view-assessment-submission"
            element={<InstructorAssessmentResultCard />}
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
          <Route
            path="/default/user/common-feedback-form"
            element={<StudentReviewForm />}
          />
          <Route
            path="/instructor/feedback-form"
            element={<TeacherReviewForm />}
          />
          <Route
            path="/instructor/uploaded-assessments"
            element={<MyAssessmentALL />}
          />
          <Route
            path="/student/change-password"
            element={<StudentPasswordChange />}
          />
          <Route
            path="/instructor/change-password"
            element={<InstrucotrPasswordChange />}
          />
          <Route
            path="/instructor/create-learnwithfun-assessment"
            element={<CreateLWFAssessment />}
          />
          <Route
            path="/student/learn-with-fun"
            element={<DrawingAndQuestionPage />}
          />

          <Route
            path="/instructor/assessments-management"
            element={<AssignmentTabs />}
          />

          <Route
            path="/student/view-assessments"
            element={<AssessmentDisplayPage />}
          />
          {/**maintainance */}
          <Route path="*" element={<MaintainancePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
