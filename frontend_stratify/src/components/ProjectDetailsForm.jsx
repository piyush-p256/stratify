"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"

export default function ProjectDetailsForm({ initialData, onSubmit }) {
  const [projectName, setProjectName] = useState(initialData?.projectName || "")
  const [startDate, setStartDate] = useState(initialData?.startDate || "")
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation
    const newErrors = {}
    if (!projectName.trim()) newErrors.projectName = "Project name is required"
    if (!startDate) newErrors.startDate = "Start date is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit({ projectName, startDate })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Project Information</h2>
      <p className="text-gray-600 mb-6">Enter the basic details about your project</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter project name"
            className={`w-full px-4 py-2 border rounded-md ${
              errors.projectName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.projectName && <p className="mt-1 text-sm text-red-500">{errors.projectName}</p>}
        </div>

        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <div className="relative">
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md pl-10 ${
                errors.startDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          {errors.startDate && <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-md transition-colors"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  )
}

