import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import GetStarted from './pages/GetStarted';
import StudentSignIn from './pages/StudentSignIn';
import InstructorSignIn from './pages/InstructorSignIn';
import StudentSignUp from './pages/StudentSignUp';
import InstructorSignUp from './pages/InstructorSignUp';

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
        </Routes>
      </Layout>
    </Router>
  );
}