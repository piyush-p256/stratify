import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import AboutPage from "./pages/AboutPage"
import GetStarted from "./pages/GetStarted"
import ProjectSetup from "./pages/ProjectSetup"
import PlanResults from "./pages/PlanResults"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/project-setup" element={<ProjectSetup />} />
        <Route path="/results" element={<PlanResults />} />
      </Routes>
    </Router>
  )
}
