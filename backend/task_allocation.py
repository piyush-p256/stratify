import requests
import json

def assign_tasks(team_members, tasks):
    task_assignments = []
    for task in tasks:
        # Generate a prompt for Ollama
        prompt = f"""
        Assign the task '{task['name']}' to the most suitable team member based on their skills and workload.
        Team Members:
        {json.dumps(team_members, indent=2)}
        Task Requirements:
        {task['required_skills']}
        Return only the name of the team member. Do not include any explanations or additional text.
        """
        
        # Call Ollama
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "deepseek-r1",
                "prompt": prompt,
                "stream": False
            }
        )
        
        try:
            response_data = response.json()
            assigned_to = response_data.get("response", "").strip()
            task_assignments.append({
                "task": task["name"],
                "assigned_to": assigned_to
            })
        except (json.JSONDecodeError, KeyError) as e:
            print(f"Error parsing response: {e}")
            task_assignments.append({
                "task": task["name"],
                "assigned_to": "Error"
            })
    
    return task_assignments

# Test the function
if __name__ == "_main_":
    team_members = [
        {"name": "Alice", "skills": ["Python", "Machine Learning"], "workload": 20},
        {"name": "Bob", "skills": ["JavaScript", "UI/UX"], "workload": 30}
    ]
    tasks = [
        {"name": "Build ML Model", "required_skills": ["Python", "Machine Learning"], "deadline": 7}
    ]
    print(assign_tasks(team_members, tasks))