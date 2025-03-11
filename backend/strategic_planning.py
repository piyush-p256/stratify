import requests
import json

def generate_timeline(tasks, start_date):
    # Generate a structured prompt for Ollama
    prompt = f"""
    Generate a timeline for the following tasks starting from {start_date}.
    Each task has a deadline (in days). Ensure tasks are scheduled sequentially.
    Return the result in strict JSON format. Example:
    [
        {{"task": "Build ML Model", "start_date": "2025-03-10", "end_date": "2025-03-17"}},
        {{"task": "Design UI", "start_date": "2025-03-17", "end_date": "2025-03-22"}}
    ]
    Tasks:
    {json.dumps(tasks, indent=2)}
    """

    # Call Ollama API
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={"model": "llama2", "prompt": prompt, "stream": False}
    )

    # Extract response safely
    try:
        response_data = response.json()
        timeline_json = response_data.get("response", "").strip()
        timeline = json.loads(timeline_json)  # Safe parsing instead of eval()
        return timeline
    except (json.JSONDecodeError, KeyError) as e:
        print(f"Error parsing response: {e}")
        return None

# Test the function
if __name__ == "__main__":
    tasks = [
        {"name": "Build ML Model", "required_skills": ["Python", "Machine Learning"], "deadline": 7},
        {"name": "Design UI", "required_skills": ["JavaScript", "UI/UX"], "deadline": 5}
    ]
    start_date = "2025-03-10"
    
    timeline = generate_timeline(tasks, start_date)
    print(json.dumps(timeline, indent=2))  # Pretty print output
