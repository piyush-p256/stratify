import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [loadingMessage, setLoadingMessage] = useState("AI agents are analyzing your project requirements...");
  
  const messages = [
    "AI agents are analyzing your project requirements...",
    "Our team of virtual experts are debating the optimal task allocation...",
    "Balancing workloads and expertise across your team members...",
    "Agents are negotiating task dependencies and timelines...",
    "Optimizing resource allocation for maximum efficiency...",
    "Finalizing your personalized project plan..."
  ];

  useEffect(() => {
    let currentIndex = 0;
    
    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % messages.length;
      setLoadingMessage(messages[currentIndex]);
    }, 3000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-purple-50 to-white flex items-center justify-center">
      <div className="max-w-md w-full mx-auto text-center px-4">
        <div className="mb-8">
          <div className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 mb-4">
            <span className="flex h-2 w-2 rounded-full bg-purple-600 mr-2"></span>
            Generating Plan
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-purple-900 to-violet-800 bg-clip-text text-transparent">
            Creating Your Project Plan
          </h2>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-6 mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-purple-100 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <p className="text-gray-700 mb-4">{loadingMessage}</p>
          
          <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-violet-600 to-purple-600 animate-progress"></div>
          </div>
        </div>
        
        <p className="text-sm text-gray-500">
          This typically takes 10-15 seconds depending on project complexity
        </p>
      </div>
    </div>
  );
}