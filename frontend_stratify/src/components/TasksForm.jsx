"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"
import { Badge } from "./ui/badge"

export default function TasksForm({ initialTasks = [], onSubmit, onBack }) {
  const [tasks, setTasks] = useState(initialTasks)
  const [name, setName] = useState("")
  const [requiredSkills, setRequiredSkills] = useState("")
  const [deadline, setDeadline] = useState(7)
  const [errors, setErrors] = useState({})

  const handleAddTask = (e) => {
    e.preventDefault()

    // Validation
    const newErrors = {}
    if (!name.trim()) newErrors.name = "Task name is required"
    if (!requiredSkills.trim()) newErrors.requiredSkills = "Required skills are required"
    if (deadline <= 0) newErrors.deadline = "Deadline must be greater than 0"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Add task
    const newTask = {
      name: name.trim(),
      required_skills: requiredSkills.split(",").map((skill) => skill.trim()),
      deadline: Number.parseInt(deadline),
    }

    setTasks([...tasks, newTask])

    // Reset form
    setName("")
    setRequiredSkills("")
    setDeadline(7)
    setErrors({})
  }

  const handleRemoveTask = (index) => {
    const updatedTasks = [...tasks]
    updatedTasks.splice(index, 1)
    setTasks(updatedTasks)
  }

  const handleSubmit = () => {
    if (tasks.length === 0) {
      setErrors({ general: "Please add at least one task" })
      return
    }

    onSubmit(tasks)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Tasks</h2>
      <p className="text-gray-600 mb-6">Add the tasks for your project</p>

      <form onSubmit={handleAddTask} className="mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="taskName" className="block text-sm font-medium text-gray-700 mb-1">
              Task Name
            </label>
            <input
              type="text"
              id="taskName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter task name"
              className={`w-full px-4 py-2 border rounded-md ${errors.name ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="requiredSkills" className="block text-sm font-medium text-gray-700 mb-1">
              Required Skills (comma separated)
            </label>
            <input
              type="text"
              id="requiredSkills"
              value={requiredSkills}
              onChange={(e) => setRequiredSkills(e.target.value)}
              placeholder="Python, JavaScript, UI/UX, etc."
              className={`w-full px-4 py-2 border rounded-md ${
                errors.requiredSkills ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.requiredSkills && <p className="mt-1 text-sm text-red-500">{errors.requiredSkills}</p>}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
            Deadline (days)
          </label>
          <input
            type="number"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            min={1}
            className={`w-full px-4 py-2 border rounded-md ${errors.deadline ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.deadline && <p className="mt-1 text-sm text-red-500">{errors.deadline}</p>}
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </button>
      </form>

      {errors.general && <p className="mb-4 text-sm text-red-500">{errors.general}</p>}

      {tasks.length > 0 ? (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Added Tasks ({tasks.length})</h3>
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <div key={index} className="flex justify-between items-start p-3 bg-white rounded-lg border">
                <div>
                  <h4 className="font-medium">{task.name}</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {task.required_skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{task.deadline} days</Badge>
                  <button
                    type="button"
                    onClick={() => handleRemoveTask(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4 mb-6">No tasks added yet</p>
      )}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition-colors"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-md transition-colors"
        >
          Generate Plan
        </button>
      </div>
    </div>
  )
}

