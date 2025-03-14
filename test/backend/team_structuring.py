class TeamStructuring:
    def create_teams(self, tasks, team_members):
        teams = {}

        for task in tasks:
            assigned_member = task["assigned_to"]  # Get assigned team member

            if assigned_member not in teams:
                teams[assigned_member] = []  # Create an empty task list for the member

            teams[assigned_member].append(task["task_name"])  # ✅ Use "task_name" instead of "name"

        return teams  # Return the final structured team assignments
