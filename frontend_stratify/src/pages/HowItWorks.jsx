import { Users, PenTool, Calendar } from "lucide-react"

export default function HowItWorks() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform uses intelligent algorithms to optimize your team's workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative p-8 rounded-lg border-l-4 border-teal-500 bg-white shadow-sm">
            <div className="absolute -left-5 top-8 bg-teal-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Team Structuring</h3>
            <p className="text-gray-600">Organize your team based on skills, roles, and project requirements</p>
          </div>

          <div className="relative p-8 rounded-lg border-l-4 border-teal-500 bg-white shadow-sm">
            <div className="absolute -left-5 top-8 bg-teal-100 p-3 rounded-full">
              <PenTool className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Task Allocation</h3>
            <p className="text-gray-600">
              Assign tasks to the right team members based on their skills and availability
            </p>
          </div>

          <div className="relative p-8 rounded-lg border-l-4 border-teal-500 bg-white shadow-sm">
            <div className="absolute -left-5 top-8 bg-teal-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Project Planning</h3>
            <p className="text-gray-600">Create detailed project timelines with optimized resource allocation</p>
          </div>
        </div>
      </div>
    </div>
  )
}

