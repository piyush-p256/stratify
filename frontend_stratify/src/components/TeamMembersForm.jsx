"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Badge } from "./ui/badge";

export default function TeamMembersForm({ onSubmit }) {
  const [teamMembers, setTeamMembers] = useState([]);
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [errors, setErrors] = useState({});

  const handleAddMember = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!skills.trim()) newErrors.skills = "At least one skill is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newMember = {
      name: name.trim(),
      skills: skills.split(",").map((skill) => skill.trim()),
    };

    setTeamMembers([...teamMembers, newMember]);
    setName("");
    setSkills("");
    setErrors({});
  };

  const handleSubmit = () => {
    if (teamMembers.length === 0) {
      setErrors({ general: "Please add at least one team member" });
      return;
    }

    onSubmit(teamMembers);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Team Members</h2>
      <form onSubmit={handleAddMember} className="mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className={`w-full px-4 py-2 border rounded-md ${errors.name ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills (comma separated)
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Python, JavaScript, UI/UX, etc."
              className={`w-full px-4 py-2 border rounded-md ${errors.skills ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.skills && <p className="mt-1 text-sm text-red-500">{errors.skills}</p>}
          </div>
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

      {teamMembers.length > 0 && (
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
                <button
                  type="button"
                  onClick={() => setTeamMembers(teamMembers.filter((_, i) => i !== index))}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-md transition-colors"
      >
        Next
      </button>
    </div>
  );
}
