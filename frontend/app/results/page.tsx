"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Download, Calendar, Clock, ArrowLeft } from "lucide-react"

interface TeamMember {
  name: string
  role: string
  skills: string
}

interface Task {
  name: string
  priority: string
  estimatedTime: string
  requiredSkills: string
  assignedTo?: string
}

interface ProjectData {
  name: string
  startDate: string | Date
  teamMembers: TeamMember[]
  tasks: Task[]
}

export default function ResultsPage() {
  const [projectData, setProjectData] = useState<ProjectData | null>(null)
  const [teams, setTeams] = useState<{ name: string; members: TeamMember[] }[]>([])

  useEffect(() => {
    // Get project data from localStorage
    const storedData = localStorage.getItem("projectData")
    if (storedData) {
      const data = JSON.parse(storedData)
      setProjectData(data)

      // Simulate task assignment
      const assignedTasks = data.tasks.map((task: Task, index: number) => {
        // Simple assignment logic - in a real app this would be more sophisticated
        const memberIndex = index % data.teamMembers.length
        return {
          ...task,
          assignedTo: data.teamMembers[memberIndex].name,
        }
      })

      // Update tasks with assignments
      data.tasks = assignedTasks

      // Create team structure (simplified)
      // In a real app, this would use a more sophisticated algorithm
      const teamStructure = [
        {
          name: "Core Development Team",
          members: data.teamMembers.filter((_, i) => i % 3 === 0),
        },
        {
          name: "Design & UX Team",
          members: data.teamMembers.filter((_, i) => i % 3 === 1),
        },
        {
          name: "QA & Support Team",
          members: data.teamMembers.filter((_, i) => i % 3 === 2),
        },
      ].filter((team) => team.members.length > 0)

      setTeams(teamStructure)
    }
  }, [])

  if (!projectData) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center">
        <p>Loading project data...</p>
      </div>
    )
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="container mx-auto py-10 relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Plan
        </Button>
      </div>

      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold">{projectData.name} - Project Plan</h1>
        <p className="text-muted-foreground">
          Start Date:{" "}
          {projectData.startDate instanceof Date
            ? projectData.startDate.toLocaleDateString()
            : new Date(projectData.startDate).toLocaleDateString()}
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-background border">
          <TabsTrigger value="overview" className="data-[state=active]:bg-accent data-[state=active]:text-primary">
            Overview
          </TabsTrigger>
          <TabsTrigger value="teams" className="data-[state=active]:bg-accent data-[state=active]:text-primary">
            Team Structure
          </TabsTrigger>
          <TabsTrigger value="tasks" className="data-[state=active]:bg-accent data-[state=active]:text-primary">
            Task Allocation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Summary</CardTitle>
              <CardDescription>An overview of your project plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Team Size</h3>
                  <p className="text-2xl font-bold">{projectData.teamMembers.length} Members</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Tasks</h3>
                  <p className="text-2xl font-bold">{projectData.tasks.length} Tasks</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Estimated Duration</h3>
                  <p className="text-2xl font-bold">
                    {projectData.tasks.reduce((total, task) => total + (Number.parseInt(task.estimatedTime) || 0), 0)}{" "}
                    Hours
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Priority Breakdown</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="border-l-4 border-l-red-400">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                          <p className="text-2xl font-bold">
                            {projectData.tasks.filter((task) => task.priority === "high").length}
                          </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-red-100 p-2 text-red-600">
                          <Clock className="h-8 w-8" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-amber-400">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Medium Priority</p>
                          <p className="text-2xl font-bold">
                            {projectData.tasks.filter((task) => task.priority === "medium").length}
                          </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-yellow-100 p-2 text-yellow-600">
                          <Clock className="h-8 w-8" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-green-400">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Low Priority</p>
                          <p className="text-2xl font-bold">
                            {projectData.tasks.filter((task) => task.priority === "low").length}
                          </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-green-100 p-2 text-green-600">
                          <Clock className="h-8 w-8" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
                <CardDescription>Estimated project timeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Project Start</p>
                      <p className="text-sm text-muted-foreground">
                        {projectData.startDate instanceof Date
                          ? projectData.startDate.toLocaleDateString()
                          : new Date(projectData.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="ml-5 border-l pl-5">
                    <div className="relative">
                      <div className="absolute -left-[29px] top-1 h-4 w-4 rounded-full bg-gradient-to-r from-teal-400 to-teal-600"></div>
                      <p className="font-medium">Planning Phase</p>
                      <p className="text-sm text-muted-foreground">1-2 weeks</p>
                    </div>
                  </div>

                  <div className="ml-5 border-l pl-5">
                    <div className="relative">
                      <div className="absolute -left-[29px] top-1 h-4 w-4 rounded-full bg-gradient-to-r from-teal-400 to-teal-600"></div>
                      <p className="font-medium">Development Phase</p>
                      <p className="text-sm text-muted-foreground">
                        {Math.ceil(
                          projectData.tasks.reduce(
                            (total, task) => total + (Number.parseInt(task.estimatedTime) || 0),
                            0,
                          ) / 40,
                        )}{" "}
                        weeks
                      </p>
                    </div>
                  </div>

                  <div className="ml-5 border-l pl-5">
                    <div className="relative">
                      <div className="absolute -left-[29px] top-1 h-4 w-4 rounded-full bg-gradient-to-r from-teal-400 to-teal-600"></div>
                      <p className="font-medium">Testing Phase</p>
                      <p className="text-sm text-muted-foreground">1-2 weeks</p>
                    </div>
                  </div>

                  <div className="ml-5">
                    <div className="relative">
                      <div className="absolute -left-[29px] top-1 h-4 w-4 rounded-full bg-gradient-to-r from-teal-400 to-teal-600"></div>
                      <p className="font-medium">Project Completion</p>
                      <p className="text-sm text-muted-foreground">
                        Estimated:{" "}
                        {new Date(
                          new Date(
                            projectData.startDate instanceof Date
                              ? projectData.startDate
                              : new Date(projectData.startDate),
                          ).setDate(
                            new Date(
                              projectData.startDate instanceof Date
                                ? projectData.startDate
                                : new Date(projectData.startDate),
                            ).getDate() +
                              Math.ceil(
                                projectData.tasks.reduce(
                                  (total, task) => total + (Number.parseInt(task.estimatedTime) || 0),
                                  0,
                                ) / 8,
                              ) +
                              14,
                          ),
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Allocation</CardTitle>
                <CardDescription>How resources are distributed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectData.teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">
                          {projectData.tasks.filter((task) => task.assignedTo === member.name).length} Tasks
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {projectData.tasks
                            .filter((task) => task.assignedTo === member.name)
                            .reduce((total, task) => total + (Number.parseInt(task.estimatedTime) || 0), 0)}{" "}
                          Hours
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="teams" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Structure</CardTitle>
              <CardDescription>Optimized team organization based on skills and project requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {teams.map((team, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-xl font-bold">{team.name}</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {team.members.map((member, memberIndex) => (
                      <Card key={memberIndex}>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="text-lg">{getInitials(member.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-bold">{member.name}</p>
                              <p className="text-sm text-muted-foreground">{member.role}</p>
                              <div className="mt-2 flex flex-wrap gap-1">
                                {member.skills.split(",").map((skill, skillIndex) => (
                                  <Badge key={skillIndex} variant="outline" className="text-xs">
                                    {skill.trim()}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Task Allocation</CardTitle>
              <CardDescription>Tasks assigned to team members based on skills and workload</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {projectData.tasks.map((task, index) => (
                  <div
                    key={index}
                    className={`rounded-lg border p-4 ${
                      task.priority === "high"
                        ? "border-l-4 border-l-red-400"
                        : task.priority === "medium"
                          ? "border-l-4 border-l-amber-400"
                          : "border-l-4 border-l-green-400"
                    }`}
                  >
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{task.name}</h3>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{task.estimatedTime} hours</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-sm font-medium">Assigned to</p>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">{getInitials(task.assignedTo || "")}</AvatarFallback>
                            </Avatar>
                            <span>{task.assignedTo}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm font-medium">Required Skills</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {task.requiredSkills.split(",").map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="text-xs">
                            {skill.trim()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

