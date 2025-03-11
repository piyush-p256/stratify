"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function ProcessingPage() {
  const router = useRouter()
  const [logs, setLogs] = useState<string[]>([])
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate processing with logs
    const processingSteps = [
      "Loading project data...",
      "Analyzing team member skills...",
      "Matching tasks with team members...",
      "Optimizing task allocation...",
      "Structuring teams based on skills...",
      "Creating project timeline...",
      "Finalizing resource allocation...",
      "Generating plan...",
    ]

    let currentStep = 0

    const interval = setInterval(() => {
      if (currentStep < processingSteps.length) {
        setLogs((prev) => [...prev, processingSteps[currentStep]])
        setProgress(Math.round(((currentStep + 1) / processingSteps.length) * 100))
        currentStep++
      } else {
        clearInterval(interval)
        // Navigate to results page after processing is complete
        setTimeout(() => {
          router.push("/results")
        }, 1000)
      }
    }, 800)

    return () => clearInterval(interval)
  }, [router])

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center py-10 bg-gradient-to-b from-accent/50 to-background">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Processing Your Plan</h1>
          <p className="text-muted-foreground">Please wait while we generate your optimized project plan</p>
        </div>

        <div className="flex justify-center">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>

        <div className="space-y-2">
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">{progress}% Complete</p>
        </div>

        <div className="mt-8 h-48 overflow-auto rounded-lg border bg-white/80 backdrop-blur-sm p-4 text-left shadow-sm">
          <div className="space-y-1">
            {logs.map((log, index) => (
              <p key={index} className="text-sm">
                <span className="text-teal-600">{">"}</span> {log}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

