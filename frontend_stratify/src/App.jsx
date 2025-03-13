import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import GetStarted from "./pages/GetStarted"
import ProjectSetup from "./pages/ProjectSetup"
import PlanResults from "./pages/PlanResults"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/project-setup" element={<ProjectSetup />} />
            <Route path="/results" element={<PlanResults />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

