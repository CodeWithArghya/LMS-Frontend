import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MaintainancePage from "./pages/Maintainance";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <Router>
      <Routes>
        {/** Create your all routes here */}
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<MaintainancePage />} />{" "}
        {/** By Default all pages which will not included here will be maintainance page */}
      </Routes>
    </Router>
  );
}

export default App;
