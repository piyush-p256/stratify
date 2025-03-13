"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"

// Mock data - in a real app this would come from your API
const mockResults = {
  task_assignments: [
    { task: "Build ML Model", assigned_to: "Alice" },
    { task: "Design UI", assigned_to: "Bob" },
    { task: "Data Analysis", assigned_to: "Charlie" },
  ],
  team_assignments: [
    { team: 1, members: ["Alice", "Bob"] },
    { team: 2, members: ["Charlie"] },
  ],
  timeline: [
    { task: "Build ML Model", start_date: "2025-03-10", end_date: "2025-03-17" },
    { task: "Design UI", start_date: "2025-03-17", end_date: "2025-03-22" },
  ],
}

const mockTeamMembers = [
  { name: "Alice", skills: ["Python", "Machine Learning"], workload: 20 },
  { name: "Bob", skills: ["JavaScript", "UI/UX"], workload: 30 },
  { name: "Charlie", skills: ["Python", "Data Analysis"], workload: 25 },
]

const mockTasks = [
  { name: "Build ML Model", required_skills: ["Python", "Machine Learning"], deadline: 7 },
  { name: "Design UI", required_skills: ["JavaScript", "UI/UX"], deadline: 5 },
]

export default function PlanResults() {
  // In a real app, you would fetch this data from your backend
  const [results] = useState(mockResults)
  const [teamMembers] = useState(mockTeamMembers)
  const [tasks] = useState(mockTasks)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Project Plan</h1>
          <Link
            to="/project-setup"
            className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-md transition-colors"
          >
            Create New Plan
          </Link>
        </div>

        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="tasks">Task Assignments</TabsTrigger>
            <TabsTrigger value="teams">Team Structure</TabsTrigger>
            <TabsTrigger value="timeline">Project Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle>Task Assignments</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Required Skills</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.task_assignments.map((assignment, index) => {
                      const taskDetails = tasks.find((t) => t.name === assignment.task) || {}
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{assignment.task}</TableCell>
                          <TableCell>{assignment.assigned_to}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {taskDetails.required_skills?.map((skill, skillIndex) => (
                                <Badge key={skillIndex} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teams">
            <Card>
              <CardHeader>
                <CardTitle>Team Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.team_assignments.map((team, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Team {team.team}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {team.members.map((memberName, memberIndex) => {
                            const memberDetails = teamMembers.find((m) => m.name === memberName) || {}
                            return (
                              <li key={memberIndex} className="flex flex-col p-2 bg-gray-50 rounded-lg">
                                <div className="font-medium">{memberName}</div>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {memberDetails.skills?.map((skill, skillIndex) => (
                                    <Badge key={skillIndex} variant="secondary" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </li>
                            )
                          })}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Duration</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.timeline.map((item, index) => {
                      const startDate = new Date(item.start_date)
                      const endDate = new Date(item.end_date)
                      const durationDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24))

                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.task}</TableCell>
                          <TableCell>{item.start_date}</TableCell>
                          <TableCell>{item.end_date}</TableCell>
                          <TableCell>{durationDays} days</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

