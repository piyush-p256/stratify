from datetime import datetime, timedelta

class StrategicPlanning:
    def create_plan(self, data):
        return {
            "project_name": data.get("project_name", "Unnamed Project"),
            "goals": data.get("goals", []),
            "deadline": data.get("deadline", "2023-12-31")
        }

    def generate_timeline(self, tasks):
        timeline = []
        start_date = datetime.strptime("2023-10-01", "%Y-%m-%d")  # Initial start date

        for task in tasks:
            duration = task.get("duration", 5)  # Default duration is 5 days if not provided
            end_date = start_date + timedelta(days=duration - 1)

            timeline.append({
                "task": task["task_name"],
                "start_date": start_date.strftime("%Y-%m-%d"),
                "end_date": end_date.strftime("%Y-%m-%d")
            })

            start_date = end_date + timedelta(days=1)  # Next task starts after the previous one ends

        return timeline
