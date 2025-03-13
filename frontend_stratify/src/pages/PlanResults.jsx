"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"

export default function PlanResults() {
  const [results, setResults] = useState(null)

  useEffect(() => {
    const storedResults = localStorage.getItem("projectResults")
    if (storedResults) {
      setResults(JSON.parse(storedResults))
    }
  }, [])

  if (!results) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">No Results Available</h1>
        <Link to="/project-setup" className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-md transition-colors">
          Create New Plan
        </Link>
      </div>
    )
  }

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
              <CardHeader><CardTitle>Task Assignments</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Assigned To</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.task_assignments.map((assignment, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{assignment.task}</TableCell>
                        <TableCell>{assignment.assigned_to}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teams">
            <Card>
              <CardHeader><CardTitle>Team Structure</CardTitle></CardHeader>
              <CardContent>
                <ul>
                  {results.team_assignments.map((team, index) => (
                    <li key={index} className="mb-2">
                      <strong>Team {team.team}:</strong> {team.members.join(", ")}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline">
            <Card>
              <CardHeader><CardTitle>Project Timeline</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.timeline.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.task}</TableCell>
                        <TableCell>{item.start_date}</TableCell>
                        <TableCell>{item.end_date}</TableCell>
                      </TableRow>
                    ))}
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
