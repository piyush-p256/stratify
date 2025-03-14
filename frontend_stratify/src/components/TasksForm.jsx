"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Badge } from "./ui/badge";

export default function TasksForm({ initialTasks = [], onSubmit }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [taskName, setTaskName] = useState("");
  const [duration, setDuration] = useState(1);
  const [errors, setErrors] = useState({});

  const handleAddTask = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!taskName.trim()) newErrors.taskName = "Task name is required";
    if (duration <= 0) newErrors.duration = "Duration must be at least 1 week";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newTask = {
      task_name: taskName.trim(),
      duration: `${duration} weeks`,
    };

    setTasks([...tasks, newTask]);
    setTaskName("");
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

        <button type="submit" className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors">
          <Plus className="h-4 w-4 mr-2" /> Add Task
        </button>
      </form>

      {tasks.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Added Tasks ({tasks.length})</h3>
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <div key={index} className="flex justify-between items-start p-3 bg-white rounded-lg border">
                <div>
                  <h4 className="font-medium">{task.task_name}</h4>
                  <Badge variant="outline">{task.duration}</Badge>
                </div>
                <button type="button" onClick={() => setTasks(tasks.filter((_, i) => i !== index))} className="text-gray-500 hover:text-red-500">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button type="button" onClick={handleSubmit} className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-md transition-colors">
        Generate Plan
      </button>
    </div>
  );
}
