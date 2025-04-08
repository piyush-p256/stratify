"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Download, Share2, ArrowLeft } from "lucide-react"

export default function PlanResults() {
  const [results, setResults] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedResults = localStorage.getItem("projectResults")
    if (storedResults) {
      setResults(JSON.parse(storedResults))
    }
  }, [])

  if (!results) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-2xl font-bold mb-4">No Results Available</h1>
            <p className="text-gray-600 mb-6">You haven't generated any project plans yet.</p>
            <Link
              to="/project-setup"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft size={18} /> Create New Plan
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Your Project Plan</h1>
              <div className="space-x-4">
                {/* <button className="px-4 py-2 bg-white hover:bg-gray-100 text-gray-800 font-medium rounded-md border border-gray-300 transition-colors inline-flex items-center gap-2">
                  <Download size={18} /> Export
                </button>
                <button className="px-4 py-2 bg-white hover:bg-gray-100 text-gray-800 font-medium rounded-md border border-gray-300 transition-colors inline-flex items-center gap-2">
                  <Share2 size={18} /> Share
                </button> */}
                <Link
                  to="/project-setup"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors"
                >
                  Create New Plan
                </Link>
              </div>
            </div>

            <Tabs defaultValue="tasks" className="w-full">
              <TabsList className="grid w-full md:grid-cols-2 mb-8">
                <TabsTrigger value="tasks">Task Assignments</TabsTrigger>
                {/* <TabsTrigger value="timeline">Project Timeline</TabsTrigger> */}
                <TabsTrigger value="consensus">AI Consensus</TabsTrigger>
              </TabsList>

              {/* Task Assignments Tab */}
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
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.entries(results.team_assignments || {}).map(([member, tasks]) =>
                          tasks.map((task, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{task}</TableCell>
                              <TableCell>{member}</TableCell>
                            </TableRow>
                          )),
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Project Timeline Tab
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
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {results.timeline?.map((item, index) => (
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
              </TabsContent> */}

              {/* AI Consensus Tab */}
              <TabsContent value="consensus">
                <Card>
                  <CardHeader>
                    <CardTitle>AI-Generated Consensus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="whitespace-pre-wrap text-gray-700 bg-gray-50 p-4 rounded-md">
                      {results.consensus?.[0]?.content || "No AI-generated insights available."}
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
