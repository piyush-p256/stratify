"use client";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

export default function PlanResults() {
  const [results, setResults] = useState(null);
  const navigate = useNavigate(); // Allows navigation back

  useEffect(() => {
    const storedResults = localStorage.getItem("projectResults");
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
  }, []);

  if (!results) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">No Results Available</h1>
        <Link
          to="/project-setup"
          className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-md transition-colors"
        >
          Create New Plan
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Project Plan</h1>
          <div className="space-x-4">
            <Link
              to="/project-setup"
              className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-md transition-colors"
            >
              Create New Plan
            </Link>
          </div>
        </div>

        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="grid w-full md:grid-cols-3 mb-8">
            <TabsTrigger value="tasks">Task Assignments</TabsTrigger>
            <TabsTrigger value="timeline">Project Timeline</TabsTrigger>
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
                    {Object.entries(results.team_assignments || {}).map(
                      ([member, tasks]) =>
                        tasks.map((task, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {task}
                            </TableCell>{" "}
                            {/* Access task directly as a string */}
                            <TableCell>{member}</TableCell>
                          </TableRow>
                        ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Project Timeline Tab */}
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
                        <TableCell className="font-medium">
                          {item.task}
                        </TableCell>
                        <TableCell>{item.start_date}</TableCell>
                        <TableCell>{item.end_date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Consensus Tab */}
          <TabsContent value="consensus">
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Consensus</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap text-gray-700">
                  {results.consensus?.[0]?.content ||
                    "No AI-generated insights available."}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
