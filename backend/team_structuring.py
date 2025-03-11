import requests
import json

def structure_teams(team_members):
    # Generate a prompt for Ollama
    prompt = f"""
    Form optimal teams from the following team members based on their skills:
    {json.dumps(team_members, indent=2)}
    Return the team assignments in JSON format. Example:
    [
        {{"team": 1, "members": ["Alice", "Bob"]}},
        {{"team": 2, "members": ["Charlie"]}}
    ]
    """
    
    # Call Ollama
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
        team_assignments_json = response_data.get("response", "").strip()
        team_assignments = json.loads(team_assignments_json)
        return team_assignments
    except (json.JSONDecodeError, KeyError) as e:
        print(f"Error parsing response: {e}")
        return None

# # Test the function
# if _name_ == "_main_":
#     team_members = [
#         {"name": "Alice", "skills": ["Python", "Machine Learning"], "workload": 20},
#         {"name": "Bob", "skills": ["JavaScript", "UI/UX"], "workload": 30},
#         {"name": "Charlie", "skills": ["Python", "Data Analysis"], "workload": 25}
#     ]
#     print(structure_teams(team_members))