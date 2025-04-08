import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import ProjectDetailsForm from "../components/ProjectDetailsForm";
import TeamMembersForm from "../components/TeamMembersForm";
import TasksForm from "../components/TasksForm";
import LoadingScreen from "../components/LoadingScreen";

export default function ProjectSetup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [projectData, setProjectData] = useState({
    projectName: "",
    startDate: "",
    teamMembers: [],
    tasks: [],
  });

  const navigate = useNavigate();

  const steps = [
    { id: 1, name: "Project Details" },
    { id: 2, name: "Team Members" },
    { id: 3, name: "Tasks" },
  ];

  const handleProjectDetailsSubmit = (data) => {
    setProjectData((prev) => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handleTeamMembersSubmit = (teamMembers) => {
    setProjectData((prev) => ({ ...prev, teamMembers }));
    setCurrentStep(3);
  };

  const handleTasksSubmit = async (tasks) => {
    setIsLoading(true);
    
    // Convert tasks array to an object (task_definitions) as expected by the backend
    const taskDefinitions = {};
    tasks.forEach(task => {
      taskDefinitions[task.task_name] = {
        task_name: task.task_name,
        required_skill: task.required_skill,
        duration: task.duration
      };
    });
  
    const finalData = {
      project_name: projectData.projectName,
      goals: tasks.map(task => task.task_name),  // Task names as goals
      team_members: projectData.teamMembers,
      task_definitions: taskDefinitions,  // Key change here
    };
  
    try {
      const response = await fetch("https://b30a-115-111-246-26.ngrok-free.app/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to generate project plan: ${errorText}`);
      }
  
      const result = await response.json();
      localStorage.setItem("projectResults", JSON.stringify(result));
      
      // Navigate after a slight delay to ensure the loading screen is visible
      setTimeout(() => {
        setIsLoading(false);
        navigate("/results");
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
      alert("Failed to generate project plan. Please try again.");
    }
  };

  // Show loading screen when isLoading is true
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-purple-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 mb-4">
              <span className="flex h-2 w-2 rounded-full bg-purple-600 mr-2"></span>
              Setup Your Project
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-purple-900 to-violet-800 bg-clip-text text-transparent">
              Project Setup
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Follow these steps to configure your project and let our AI generate the optimal plan for your team
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex-1 ${
                    currentStep === step.id 
                      ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white" 
                      : currentStep > step.id 
                        ? "bg-purple-100 text-purple-800" 
                        : "bg-white text-gray-500"
                  }`}
                >
                  <div className="flex items-center justify-center p-4">
                    <div className={`flex items-center justify-center h-8 w-8 rounded-full mr-2 
                      ${currentStep > step.id 
                        ? "bg-purple-600 text-white" 
                        : currentStep === step.id 
                          ? "bg-white text-purple-700" 
                          : "bg-gray-100 text-gray-500"}`}
                    >
                      {currentStep > step.id ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <span>{step.id}</span>
                      )}
                    </div>
                    <span className="font-medium">{step.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8">
            {currentStep === 1 && (
              <ProjectDetailsForm
                initialData={{ projectName: projectData.projectName, startDate: projectData.startDate }}
                onSubmit={handleProjectDetailsSubmit}
              />
            )}

            {currentStep === 2 && (
              <TeamMembersForm
                initialTeamMembers={projectData.teamMembers}
                onSubmit={handleTeamMembersSubmit}
              />
            )}

            {currentStep === 3 && (
              <TasksForm 
                initialTasks={projectData.tasks} 
                onSubmit={handleTasksSubmit} 
              />
            )}
          </div>
          
          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Your data is processed securely and never shared with third parties</p>
          </div>
        </div>
      </div>
    </div>
  );
}