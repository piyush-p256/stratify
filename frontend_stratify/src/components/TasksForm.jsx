"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Badge } from "./ui/badge";

export default function TasksForm({ initialTasks = [], onSubmit }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [taskName, setTaskName] = useState("");
  const [duration, setDuration] = useState(1);
  const [requiredSkill, setRequiredSkill] = useState(""); // New state for required skill
  const [errors, setErrors] = useState({});

  const handleAddTask = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!taskName.trim()) newErrors.taskName = "Task name is required";
    if (!requiredSkill.trim()) newErrors.requiredSkill = "Required skill is required";
    if (duration <= 0) newErrors.duration = "Duration must be at least 1 week";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newTask = {
      task_name: taskName.trim(),
      required_skill: requiredSkill.trim(), // Capture the required skill
      duration: `${duration} weeks`,
    };

    setTasks([...tasks, newTask]);
    setTaskName("");
    setRequiredSkill("");
    setDuration(1);
    setErrors({});
  };

  const handleSubmit = () => {
    if (tasks.length === 0) {
      setErrors({ general: "Please add at least one task" });
      return;
    }

    onSubmit(tasks);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Tasks</h2>
      <p className="text-gray-600 mb-6">Add the tasks for your project</p>

      <form onSubmit={handleAddTask} className="mb-8 p-4 bg-gray-50 rounded-lg">
        {/* Task Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter task name"
            className={`w-full px-4 py-2 border rounded-md ${errors.taskName ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.taskName && <p className="mt-1 text-sm text-red-500">{errors.taskName}</p>}
        </div>

        {/* Required Skill */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Required Skill</label>
          <input
            type="text"
            value={requiredSkill}
            onChange={(e) => setRequiredSkill(e.target.value)}
            placeholder="Enter the skill required for this task (e.g., AI, Python)"
            className={`w-full px-4 py-2 border rounded-md ${errors.requiredSkill ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.requiredSkill && <p className="mt-1 text-sm text-red-500">{errors.requiredSkill}</p>}
        </div>

        {/* Duration */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration (weeks)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            min={1}
            className={`w-full px-4 py-2 border rounded-md ${errors.duration ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.duration && <p className="mt-1 text-sm text-red-500">{errors.duration}</p>}
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Task
        </button>
      </form>

      {/* Displaying Added Tasks */}
      {tasks.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Added Tasks ({tasks.length})</h3>
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <div key={index} className="flex justify-between items-start p-3 bg-white rounded-lg border">
                <div>
                  <h4 className="font-medium">{task.task_name}</h4>
                  <div>
                    <Badge variant="outline">{task.required_skill}</Badge>
                    <Badge variant="outline" className="ml-2">{task.duration}</Badge>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setTasks(tasks.filter((_, i) => i !== index))}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {errors.general && <p className="mt-1 text-sm text-red-500">{errors.general}</p>}

      <button
        type="button"
        onClick={handleSubmit}
        className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-md transition-colors"
      >
        Generate Plan
      </button>
    </div>
  );
}
