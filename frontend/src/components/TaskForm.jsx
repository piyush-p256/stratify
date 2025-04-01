"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

const TaskForm = ({ onAddTask }) => {
  const [name, setName] = useState("")
  const [requiredSkills, setRequiredSkills] = useState("")
  const [deadline, setDeadline] = useState(7)
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
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

    // Clear errors
    setErrors({})

    // Create task object
    const task = {
      name: name.trim(),
      required_skills: requiredSkills.split(",").map((skill) => skill.trim()),
      deadline: Number.parseInt(deadline),
    }

    // Add task
    onAddTask(task)

    // Reset form
    setName("")
    setRequiredSkills("")
    setDeadline(7)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="taskName">Task Name</Label>
        <Input
          id="taskName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter task name"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <Label htmlFor="requiredSkills">Required Skills (comma separated)</Label>
        <Input
          id="requiredSkills"
          value={requiredSkills}
          onChange={(e) => setRequiredSkills(e.target.value)}
          placeholder="Python, JavaScript, UI/UX, etc."
          className={errors.requiredSkills ? "border-red-500" : ""}
        />
        {errors.requiredSkills && <p className="text-red-500 text-sm mt-1">{errors.requiredSkills}</p>}
      </div>

      <div>
        <Label htmlFor="deadline">Deadline (days)</Label>
        <Input
          id="deadline"
          type="number"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          min={1}
          className={errors.deadline ? "border-red-500" : ""}
        />
        {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>}
      </div>

      <Button type="submit" className="w-full">
        Add Task
      </Button>
    </form>
  )
}

export default TaskForm

