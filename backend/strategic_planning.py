import requests
import json

def generate_timeline(tasks, start_date):
    # Improved structured prompt
    prompt = f"""
    Generate a timeline for the following tasks starting from {start_date}.
    Each task has a deadline (in days). Ensure tasks are scheduled sequentially.
    Return ONLY valid JSON. No explanations, no extra text. Example format:
    
    ```json
    [
        {{"task": "Build ML Model", "start_date": "2025-03-10", "end_date": "2025-03-17"}},
        {{"task": "Design UI", "start_date": "2025-03-17", "end_date": "2025-03-22"}}
    ]
    ```
    
    Tasks:
    {json.dumps(tasks, indent=2)}
    """

    # Call Ollama API
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={"model": "mistral", "prompt": prompt, "stream": False}
    )

    # Extract response safely
    try:
        response_data = response.json()
        raw_response = response_data.get("response", "").strip()

        # Remove any extra text before/after JSON
        json_start = raw_response.find("[")
        json_end = raw_response.rfind("]") + 1
        cleaned_json = raw_response[json_start:json_end]

        timeline = json.loads(cleaned_json)  # Parse JSON safely
        return timeline

    except (json.JSONDecodeError, KeyError, ValueError) as e:
        print(f"Error parsing response: {e}\nRaw response:\n{raw_response}")
        return None

# Example test
tasks = [
    {"name": "Build ML Model", "deadline": 7},
    {"name": "Design UI", "deadline": 5}
]

print(generate_timeline(tasks, "2025-03-10"))
