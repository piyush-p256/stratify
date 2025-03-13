"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"
import { Badge } from "./ui/badge"

export default function TeamMembersForm({ initialTeamMembers = [], onSubmit, onBack }) {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers)
  const [name, setName] = useState("")
  const [skills, setSkills] = useState("")
  const [workload, setWorkload] = useState(50)
  const [errors, setErrors] = useState({})

  const handleAddMember = (e) => {
    e.preventDefault()

    // Validation
    const newErrors = {}
    if (!name.trim()) newErrors.name = "Name is required"
    if (!skills.trim()) newErrors.skills = "At least one skill is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Add team member
    const newMember = {
      name: name.trim(),
      skills: skills.split(",").map((skill) => skill.trim()),
      workload,
    }

    setTeamMembers([...teamMembers, newMember])

    // Reset form
    setName("")
    setSkills("")
    setWorkload(50)
    setErrors({})
  }

  const handleRemoveMember = (index) => {
    const updatedMembers = [...teamMembers]
    updatedMembers.splice(index, 1)
    setTeamMembers(updatedMembers)
  }

  const handleSubmit = () => {
    if (teamMembers.length === 0) {
      setErrors({ general: "Please add at least one team member" })
      return
    }

    onSubmit(teamMembers)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Team Members</h2>
      <p className="text-gray-600 mb-6">Add the members of your team and their skills</p>

      <form onSubmit={handleAddMember} className="mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className={`w-full px-4 py-2 border rounded-md ${errors.name ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
              Skills (comma separated)
            </label>
            <input
              type="text"
              id="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Python, JavaScript, UI/UX, etc."
              className={`w-full px-4 py-2 border rounded-md ${errors.skills ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.skills && <p className="mt-1 text-sm text-red-500">{errors.skills}</p>}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="workload" className="block text-sm font-medium text-gray-700 mb-1">
            Current Workload: {workload}%
          </label>
          <input
            type="range"
            id="workload"
            min="0"
            max="100"
            step="5"
            value={workload}
            onChange={(e) => setWorkload(Number.parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Team Member
        </button>
      </form>

      {errors.general && <p className="mb-4 text-sm text-red-500">{errors.general}</p>}

      {teamMembers.length > 0 ? (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Added Team Members ({teamMembers.length})</h3>
          <div className="space-y-3">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex justify-between items-start p-3 bg-white rounded-lg border">
                <div>
                  <h4 className="font-medium">{member.name}</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {member.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={member.workload > 70 ? "destructive" : member.workload > 40 ? "default" : "outline"}>
                    {member.workload}% load
                  </Badge>
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(index)}
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
        <p className="text-gray-500 text-center py-4 mb-6">No team members added yet</p>
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
          Next
        </button>
      </div>
    </div>
  )
}

