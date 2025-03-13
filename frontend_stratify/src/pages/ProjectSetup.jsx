"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import ProjectDetailsForm from "../components/ProjectDetailsForm"
import TeamMembersForm from "../components/TeamMembersForm"
import TasksForm from "../components/TasksForm"

export default function ProjectSetup() {
  const [currentStep, setCurrentStep] = useState(1)
  const [projectData, setProjectData] = useState({
    projectName: "",
    startDate: "",
    teamMembers: [],
    tasks: [],
  })

  const navigate = useNavigate()

  const steps = [
    { id: 1, name: "Project Details" },
    { id: 2, name: "Team Members" },
    { id: 3, name: "Tasks" },
  ]

  const handleProjectDetailsSubmit = (data) => {
    setProjectData((prev) => ({ ...prev, ...data }))
    setCurrentStep(2)
  }

  const handleTeamMembersSubmit = (teamMembers) => {
    setProjectData((prev) => ({ ...prev, teamMembers }))
    setCurrentStep(3)
  }

  const handleTasksSubmit = (tasks) => {
    setProjectData((prev) => ({ ...prev, tasks }))
    // Here you would typically send the data to your backend
    console.log("Submitting project data:", { ...projectData, tasks })
    navigate("/results")
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>

      <h1 className="text-3xl font-bold text-center mb-8">Project Setup</h1>

      <div className="max-w-4xl mx-auto">
        {/* Step indicators */}
        <div className="flex border-b mb-8">
          {steps.map((step) => (
            <button
              key={step.id}
              className={`flex-1 text-center py-4 px-4 ${
                currentStep === step.id ? "border-b-2 border-teal-500 text-teal-600 bg-teal-50" : "text-gray-500"
              }`}
              disabled={true}
            >
              {step.name}
            </button>
          ))}
        </div>

        {/* Step content */}
        <div className="bg-white rounded-lg border p-8">
          {currentStep === 1 && (
            <ProjectDetailsForm
              initialData={{ projectName: projectData.projectName, startDate: projectData.startDate }}
              onSubmit={handleProjectDetailsSubmit}
            />
          )}

          {currentStep === 2 && (
            <TeamMembersForm
              initialTeamMembers={projectData.teamMembers}
              onSubmit={handleTeamMembersSubmit}
              onBack={handlePrevious}
            />
          )}

          {currentStep === 3 && (
            <TasksForm initialTasks={projectData.tasks} onSubmit={handleTasksSubmit} onBack={handlePrevious} />
          )}
        </div>
      </div>
    </div>
  )
}

