"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function ProjectDetailsForm({ onSubmit }) {
  const [projectName, setProjectName] = useState("");
  const [goals, setGoals] = useState([]);
  const [goalInput, setGoalInput] = useState("");
  const [errors, setErrors] = useState({});

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!goalInput.trim()) return;

    setGoals([...goals, goalInput.trim()]);
    setGoalInput("");
  };

  const handleRemoveGoal = (index) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!projectName.trim()) newErrors.projectName = "Project name is required";
    if (goals.length === 0) newErrors.goals = "At least one goal is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({ projectName, goals });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Project Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Name
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter project name"
            className={`w-full px-4 py-2 border rounded-md ${errors.projectName ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.projectName && <p className="mt-1 text-sm text-red-500">{errors.projectName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Goals
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              placeholder="Enter a project goal"
              className="w-full px-4 py-2 border rounded-md border-gray-300"
            />
            <button
              type="button"
              onClick={handleAddGoal}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          {errors.goals && <p className="mt-1 text-sm text-red-500">{errors.goals}</p>}
        </div>

        {goals.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Added Goals ({goals.length})</h3>
            <div className="space-y-3">
              {goals.map((goal, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span>{goal}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveGoal(index)}
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
          type="submit"
          className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-md transition-colors"
        >
          Next
        </button>
      </form>
    </div>
  );
}
