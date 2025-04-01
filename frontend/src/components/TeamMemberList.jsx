"use client"

import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ScrollArea } from "./ui/scroll-area"

const TeamMemberList = ({ teamMembers, onRemove }) => {
  if (teamMembers.length === 0) {
    return <p className="text-gray-500 text-center py-4">No team members added yet</p>
  }

  return (
    <div className="mt-4">
      <h3 className="font-medium mb-2">Added Team Members ({teamMembers.length})</h3>
      <ScrollArea className="h-[250px] rounded-md border p-4">
        <ul className="space-y-3">
          {teamMembers.map((member, index) => (
            <li key={index} className="flex flex-col p-3 bg-gray-50 rounded-lg border">
              <div className="flex justify-between items-start">
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

export default TeamMemberList

