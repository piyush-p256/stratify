import { Link } from "react-router-dom"

export default function GetStarted() {
  return (
    <div className="py-24 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Create your first project and experience the power of intelligent task allocation
        </p>
        <Link
          to="/project-setup"
          className="inline-block px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-md text-lg transition-colors"
        >
          Generate Your Plan
        </Link>
      </div>
    </div>
  )
}

