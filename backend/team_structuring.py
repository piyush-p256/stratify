import requests
import json
import re

def structure_teams(team_members):
    # Enforce strict JSON output in the prompt
    prompt = f"""
    Form optimal teams from the following team members based on their skills.
    Ensure that workload is balanced.

    Return ONLY valid JSON output. No explanations, extra text, or markdown formatting.
    
    Example response format:
    [
        {{"team": 1, "members": ["Alice", "Bob"]}},
        {{"team": 2, "members": ["Charlie"]}}
    ]

    Team Members:
    {json.dumps(team_members, indent=2)}
    """

    # Call Mistral API via Ollama
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "mistral",
            "prompt": prompt,
            "stream": False
        }
    )

    try:
        response_data = response.json()
        raw_response = response_data.get("response", "").strip()

        # Use regex to extract JSON portion
        json_match = re.search(r"\{.*\}|\[.*\]", raw_response, re.DOTALL)
        if json_match:
            cleaned_json = json_match.group(0)
            team_assignments = json.loads(cleaned_json)
            return team_assignments
        else:
            print("❌ No valid JSON found in response")
            return None

    except (json.JSONDecodeError, KeyError, ValueError) as e:
        print(f"❌ Error parsing response: {e}\nRaw response:\n{raw_response}")
        return None

# Test the function
team_members = [
    {"name": "Alice", "skills": ["Python", "Machine Learning"], "workload": 20},
    {"name": "Bob", "skills": ["JavaScript", "UI/UX"], "workload": 30},
    {"name": "Charlie", "skills": ["Python", "Data Analysis"], "workload": 25}
]

print(structure_teams(team_members))
