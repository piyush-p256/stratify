"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Slider } from "./ui/slider"

const TeamMemberForm = ({ onAddTeamMember }) => {
  const [name, setName] = useState("")
  const [skills, setSkills] = useState("")
  const [workload, setWorkload] = useState(50)
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation
    const newErrors = {}
    if (!name.trim()) newErrors.name = "Name is required"
    if (!skills.trim()) newErrors.skills = "At least one skill is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Clear errors
    setErrors({})

    // Create team member object
    const teamMember = {
      name: name.trim(),
      skills: skills.split(",").map((skill) => skill.trim()),
      workload: workload,
    }

    // Add team member
    onAddTeamMember(teamMember)

    // Reset form
    setName("")
    setSkills("")
    setWorkload(50)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter team member name"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <Label htmlFor="skills">Skills (comma separated)</Label>
        <Input
          id="skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Python, JavaScript, UI/UX, etc."
          className={errors.skills ? "border-red-500" : ""}
        />
        {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
      </div>

      <div>
        <Label htmlFor="workload">Current Workload: {workload}%</Label>
        <Slider
          id="workload"
          value={[workload]}
          onValueChange={(value) => setWorkload(value[0])}
          min={0}
          max={100}
          step={5}
          className="mt-2"
        />
      </div>

      <Button type="submit" className="w-full">
        Add Team Member
      </Button>
    </form>
  )
}

export default TeamMemberForm

