import { Link } from "react-router-dom"
import { ArrowRight, CheckCircle } from "lucide-react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function GetStarted() {
  const benefits = [
    "AI-powered task allocation based on team skills",
    "Automated project timeline generation",
    "Intelligent team structuring for optimal performance",
    "Detailed reasoning for each allocation decision",
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <section className="py-16 md:py-24 bg-gradient-to-b from-purple-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Get Started with Stratify</h1>
                <p className="text-xl text-gray-600">Transform your project planning process in minutes</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                <h2 className="text-2xl font-bold mb-6">Why Choose Stratify?</h2>

                <ul className="space-y-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-purple-50 p-6 rounded-lg mb-8">
                  <h3 className="text-lg font-semibold mb-2">How It Works</h3>
                  <ol className="space-y-3 list-decimal list-inside text-gray-700">
                    <li>Enter your project details</li>
                    <li>Add your team members and their skills</li>
                    <li>Define project tasks and requirements</li>
                    <li>Let our AI generate an optimized project plan</li>
                  </ol>
                </div>

                <div className="text-center">
                  <Link
                    to="/project-setup"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md text-lg transition-colors"
                  >
                    Create Your Project <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
