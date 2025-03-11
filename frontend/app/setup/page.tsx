"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Plus, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SetupPage() {
  const router = useRouter()
  const [date, setDate] = useState<Date>()
  const [activeTab, setActiveTab] = useState("project")
  const [projectName, setProjectName] = useState("")
  const [teamMembers, setTeamMembers] = useState([{ name: "", role: "", skills: "" }])
  const [tasks, setTasks] = useState([{ name: "", priority: "medium", estimatedTime: "", requiredSkills: "" }])

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: "", role: "", skills: "" }])
  }

  const removeTeamMember = (index: number) => {
    const updatedMembers = [...teamMembers]
    updatedMembers.splice(index, 1)
    setTeamMembers(updatedMembers)
  }

  const updateTeamMember = (index: number, field: string, value: string) => {
    const updatedMembers = [...teamMembers]
    updatedMembers[index] = { ...updatedMembers[index], [field]: value }
    setTeamMembers(updatedMembers)
  }

  const addTask = () => {
    setTasks([...tasks, { name: "", priority: "medium", estimatedTime: "", requiredSkills: "" }])
  }

  const removeTask = (index: number) => {
    const updatedTasks = [...tasks]
    updatedTasks.splice(index, 1)
    setTasks(updatedTasks)
  }

  const updateTask = (index: number, field: string, value: string) => {
    const updatedTasks = [...tasks]
    updatedTasks[index] = { ...updatedTasks[index], [field]: value }
    setTasks(updatedTasks)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would validate and process the data here
    const projectData = {
      name: projectName,
      startDate: date,
      teamMembers,
      tasks,
    }

    // Store the data in localStorage for the next page
    localStorage.setItem("projectData", JSON.stringify(projectData))

    // Navigate to the processing page
    router.push("/processing")
  }

  const nextTab = () => {
    if (activeTab === "project") setActiveTab("team")
    else if (activeTab === "team") setActiveTab("tasks")
  }

  const prevTab = () => {
    if (activeTab === "tasks") setActiveTab("team")
    else if (activeTab === "team") setActiveTab("project")
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="mb-10">
        <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary">
          ← Back to Home
        </Link>
      </div>

      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold">Project Setup</h1>

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-background border">
              <TabsTrigger value="project" className="data-[state=active]:bg-accent data-[state=active]:text-primary">
                Project Details
              </TabsTrigger>
              <TabsTrigger value="team" className="data-[state=active]:bg-accent data-[state=active]:text-primary">
                Team Members
              </TabsTrigger>
              <TabsTrigger value="tasks" className="data-[state=active]:bg-accent data-[state=active]:text-primary">
                Tasks
              </TabsTrigger>
            </TabsList>

            <TabsContent value="project">
              <Card>
                <CardHeader>
                  <CardTitle>Project Information</CardTitle>
                  <CardDescription>Enter the basic details about your project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-name">Project Name</Label>
                    <Input
                      id="project-name"
                      placeholder="Enter project name"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                          id="start-date"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" disabled>
                    Previous
                  </Button>
                  <Button type="button" onClick={nextTab}>
                    Next
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="team">
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Add the members of your team and their skills</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="space-y-4 rounded-lg border border-teal-200 p-4 bg-white">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium">Team Member {index + 1}</h3>
                        {teamMembers.length > 1 && (
                          <Button variant="ghost" size="icon" onClick={() => removeTeamMember(index)} type="button">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor={`member-name-${index}`}>Name</Label>
                          <Input
                            id={`member-name-${index}`}
                            placeholder="Enter name"
                            value={member.name}
                            onChange={(e) => updateTeamMember(index, "name", e.target.value)}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`member-role-${index}`}>Role</Label>
                          <Input
                            id={`member-role-${index}`}
                            placeholder="Enter role"
                            value={member.role}
                            onChange={(e) => updateTeamMember(index, "role", e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`member-skills-${index}`}>Skills (comma separated)</Label>
                        <Input
                          id={`member-skills-${index}`}
                          placeholder="e.g., JavaScript, UI Design, Project Management"
                          value={member.skills}
                          onChange={(e) => updateTeamMember(index, "skills", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  ))}

                  <Button type="button" variant="outline" className="w-full" onClick={addTeamMember}>
                    <Plus className="mr-2 h-4 w-4" /> Add Team Member
                  </Button>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={prevTab}>
                    Previous
                  </Button>
                  <Button type="button" onClick={nextTab}>
                    Next
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="tasks">
              <Card>
                <CardHeader>
                  <CardTitle>Tasks</CardTitle>
                  <CardDescription>Define the tasks for your project and their requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tasks.map((task, index) => (
                    <div key={index} className="space-y-4 rounded-lg border border-amber-200 p-4 bg-white">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium">Task {index + 1}</h3>
                        {tasks.length > 1 && (
                          <Button variant="ghost" size="icon" onClick={() => removeTask(index)} type="button">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`task-name-${index}`}>Task Name</Label>
                        <Input
                          id={`task-name-${index}`}
                          placeholder="Enter task name"
                          value={task.name}
                          onChange={(e) => updateTask(index, "name", e.target.value)}
                          required
                        />
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor={`task-priority-${index}`}>Priority</Label>
                          <Select value={task.priority} onValueChange={(value) => updateTask(index, "priority", value)}>
                            <SelectTrigger id={`task-priority-${index}`}>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`task-time-${index}`}>Estimated Time (hours)</Label>
                          <Input
                            id={`task-time-${index}`}
                            type="number"
                            placeholder="Enter hours"
                            value={task.estimatedTime}
                            onChange={(e) => updateTask(index, "estimatedTime", e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`task-skills-${index}`}>Required Skills (comma separated)</Label>
                        <Input
                          id={`task-skills-${index}`}
                          placeholder="e.g., JavaScript, UI Design, Project Management"
                          value={task.requiredSkills}
                          onChange={(e) => updateTask(index, "requiredSkills", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  ))}

                  <Button type="button" variant="outline" className="w-full" onClick={addTask}>
                    <Plus className="mr-2 h-4 w-4" /> Add Task
                  </Button>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={prevTab}>
                    Previous
                  </Button>
                  <Button type="submit" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Generate Plan
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </div>
    </div>
  )
}

