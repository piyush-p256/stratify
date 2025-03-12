import requests
import json
from datetime import datetime, timedelta

def generate_timeline(tasks, start_date):
    """
    Generate a timeline for a given list of tasks starting from a given date.

    Parameters:
    - tasks (list of dict): Each task should have a "name" and "deadline" (in days).
    - start_date (str): The start date in "YYYY-MM-DD" format.

    Returns:
    - list of dict: Each entry contains "task", "start_date", and "end_date".
    """

    # Convert start_date to a datetime object
    current_date = datetime.strptime(start_date, "%Y-%m-%d")

    # Construct task schedule sequentially
    timeline = []
    for task in tasks:
        task_name = task["name"]
        duration = task["deadline"]

        end_date = current_date + timedelta(days=duration)
        timeline.append({
            "task": task_name,
            "start_date": current_date.strftime("%Y-%m-%d"),
            "end_date": end_date.strftime("%Y-%m-%d")
        })

        # Move to the next start date (assuming sequential execution)
        current_date = end_date

    return timeline

# Example test
tasks = [
    {"name": "Build ML Model", "deadline": 7},
    {"name": "Design UI", "deadline": 5}
]

print(json.dumps(generate_timeline(tasks, "2025-03-10"), indent=2))
