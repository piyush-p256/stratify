"use client"

import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ScrollArea } from "./ui/scroll-area"

const TaskList = ({ tasks, onRemove }) => {
  if (tasks.length === 0) {
    return <p className="text-gray-500 text-center py-4">No tasks added yet</p>
  }

  return (
    <div className="mt-4">
      <h3 className="font-medium mb-2">Added Tasks ({tasks.length})</h3>
      <ScrollArea className="h-[250px] rounded-md border p-4">
        <ul className="space-y-3">
          {tasks.map((task, index) => (
            <li key={index} className="flex flex-col p-3 bg-gray-50 rounded-lg border">
              <div className="flex justify-between items-start">
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
                  <Button variant="ghost" size="sm" onClick={() => onRemove(index)} className="h-7 w-7 p-0">
                    ✕
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  )
}

export default TaskList

