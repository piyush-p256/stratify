import { Link } from "react-router-dom"
import { Users, PenTool, Calendar, CheckCircle, ArrowRight } from "lucide-react"
import Stratify from "../assets/Stratify.jpg"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-purple-50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                    Optimize Your Team's Workflow
                  </h1>
                  <p className="mt-6 text-xl text-gray-600">
                    Stratify helps you allocate tasks efficiently, structure your team optimally, and plan projects with
                    precision using AI-powered insights.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/get-started"
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors flex items-center gap-2"
                  >
                    Get Started <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/about"
                    className="px-6 py-3 bg-white hover:bg-gray-100 text-gray-800 font-medium rounded-md border border-gray-300 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="flex justify-center md:justify-end">
                <img
                  src={Stratify || "/placeholder.svg"}
                  alt="Team collaboration illustration"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="how-it-works" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our platform uses intelligent algorithms to optimize your team's workflow and project planning
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative p-8 rounded-lg border-l-4 border-purple-500 bg-white shadow-md hover:shadow-lg transition-shadow">
                <div className="absolute -left-5 top-8 bg-purple-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Team Structuring</h3>
                <p className="text-gray-600">
                  Organize your team based on skills, roles, and project requirements for optimal performance
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Skill-based team formation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Balanced workload distribution</span>
                  </li>
                </ul>
              </div>

              <div className="relative p-8 rounded-lg border-l-4 border-purple-500 bg-white shadow-md hover:shadow-lg transition-shadow">
                <div className="absolute -left-5 top-8 bg-purple-100 p-3 rounded-full">
                  <PenTool className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Task Allocation</h3>
                <p className="text-gray-600">
                  Assign tasks to the right team members based on their skills and availability
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Skill-matching algorithms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Intelligent workload balancing</span>
                  </li>
                </ul>
              </div>

              <div className="relative p-8 rounded-lg border-l-4 border-purple-500 bg-white shadow-md hover:shadow-lg transition-shadow">
                <div className="absolute -left-5 top-8 bg-purple-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Project Planning</h3>
                <p className="text-gray-600">
                  Create detailed project timelines with optimized resource allocation and dependencies
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Automated timeline generation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Dependency-aware scheduling</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-purple-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Optimize Your Project Planning?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join thousands of teams who use Stratify to streamline their workflow
            </p>
            <Link
              to="/project-setup"
              className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md text-lg transition-colors"
            >
              Create Your First Project
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
