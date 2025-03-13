import { Link } from "react-router-dom";
import { Users, PenTool, Calendar } from "lucide-react";
import Stratify from "../assets/Stratify.jpg";

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Optimize Your Team's Workflow
            </h1>
            <p className="text-xl text-gray-600">
              Stratify helps you allocate tasks efficiently, structure your team
              optimally, and plan projects with precision.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/get-started"
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
              src={Stratify}
              alt="Team collaboration illustration"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>

      <div id="how-it-works" className="px-4 md:px-10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform uses intelligent algorithms to optimize your team's
              workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative p-8 rounded-lg border-l-4 border-teal-500 bg-white shadow-sm">
              <div className="absolute -left-5 top-8 bg-teal-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Team Structuring</h3>
              <p className="text-gray-600">
                Organize your team based on skills, roles, and project
                requirements
              </p>
            </div>

            <div className="relative p-8 rounded-lg border-l-4 border-teal-500 bg-white shadow-sm">
              <div className="absolute -left-5 top-8 bg-teal-100 p-3 rounded-full">
                <PenTool className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Task Allocation</h3>
              <p className="text-gray-600">
                Assign tasks to the right team members based on their skills and
                availability
              </p>
            </div>

            <div className="relative p-8 rounded-lg border-l-4 border-teal-500 bg-white shadow-sm">
              <div className="absolute -left-5 top-8 bg-teal-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Project Planning</h3>
              <p className="text-gray-600">
                Create detailed project timelines with optimized resource
                allocation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
