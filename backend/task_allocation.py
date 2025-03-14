class TaskAllocation:
    def allocate_tasks(self, strategic_plan):
        print("DEBUG: Inside allocate_tasks, strategic_plan ->", strategic_plan)

        tasks = []
        goals = strategic_plan.get("goals", [])
        team_members = strategic_plan.get("team_members", [])

        task_definitions = {
            "task assignment": {"task_name": "Automate Task Assignment", "required_skill": "AI"},
            "optimize team": {"task_name": "Optimize Team Structure", "required_skill": "Agile"},
            "develop ai": {"task_name": "Develop AI Model", "required_skill": "Python"},
            "backend": {"task_name": "Build Backend", "required_skill": "Flask"}
        }

        for goal in goals:
            for keyword, task_info in task_definitions.items():
                if keyword in goal.lower():
                    assigned_member = "Unassigned"
                    for member in team_members:
                        if task_info["required_skill"] in member["skills"]:
                            assigned_member = member["name"]
                            break

                    # 🚀 Ensure task_name is correctly assigned
                    task = {
                        "task_name": task_info["task_name"],  # ✅ Use correct key
                        "required_skill": task_info["required_skill"],
                        "assigned_to": assigned_member
                    }
                    tasks.append(task)

        print("DEBUG: Allocated Tasks ->", tasks)
        return tasks
