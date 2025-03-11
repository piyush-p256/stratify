import requests

def structure_teams(team_members):
    # Generate a prompt for Ollama
    prompt = f"""
    Form optimal teams from the following team members based on their skills:
    {team_members}
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
            "model": "llama2",
            "prompt": prompt,
            "stream": False
        }
    )
    
    team_assignments = eval(response.json()["response"].strip())
    return team_assignments

# Test the function
if __name__ == "__main__":
    team_members = [
        {"name": "Alice", "skills": ["Python", "Machine Learning"], "workload": 20},
        {"name": "Bob", "skills": ["JavaScript", "UI/UX"], "workload": 30},
        {"name": "Charlie", "skills": ["Python", "Data Analysis"], "workload": 25}
    ]
    print(structure_teams(team_members))