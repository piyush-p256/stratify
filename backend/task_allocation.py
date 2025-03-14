class TaskAllocation:
    def allocate_tasks(self, strategic_plan, task_definitions):
        print("DEBUG: Inside allocate_tasks, strategic_plan ->", strategic_plan)

        tasks = []
        goals = strategic_plan.get("goals", [])
        team_members = strategic_plan.get("team_members", [])

        if not task_definitions:
            print("ERROR: No task definitions provided!")
            return []

        print("DEBUG: Task Definitions ->", task_definitions)

        for goal in goals:
            for keyword, task_info in task_definitions.items():
                if keyword.lower() in goal.lower():
                    assigned_member = "Unassigned"
                    for member in team_members:
                        if task_info["required_skill"] in member["skills"]:
                            assigned_member = member["name"]
                            break

                    task = {
                        "task_name": task_info["task_name"],
                        "required_skill": task_info["required_skill"],
                        "assigned_to": assigned_member
                    }
                    tasks.append(task)

        print("DEBUG: Allocated Tasks ->", tasks)
        return tasks
