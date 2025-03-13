import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

const PlanResults = ({ results, teamMembers, tasks }) => {
  const { task_assignments, team_assignments, timeline } = results

  return (
    <div className="space-y-6">
      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
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
                  {task_assignments.map((assignment, index) => {
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
                {team_assignments.map((team, index) => (
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
                  {timeline.map((item, index) => {
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
  )
}

export default PlanResults

