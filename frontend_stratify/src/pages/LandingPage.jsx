import { Link } from "react-router-dom"

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Optimize Your Team's Workflow
            </h1>
            <p className="text-xl text-gray-600">
              Stratify helps you allocate tasks efficiently, structure your team optimally, and plan projects with
              precision.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/project-setup"
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-md transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/how-it-works"
                className="px-6 py-3 bg-white hover:bg-gray-100 text-gray-800 font-medium rounded-md border border-gray-300 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XlPZIWjuaTJqrdyXPTkkPRI8Yiv3Mo.png"
              alt="Team collaboration illustration"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

