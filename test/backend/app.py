from flask import Flask, request, jsonify
from flask_cors import CORS
from strategic_planning import StrategicPlanning
from task_allocation import TaskAllocation
from team_structuring import TeamStructuring
from resume_parser import ResumeParser
from multi_agent import MultiAgentConsensus

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})  # Enable CORS for frontend requests

# Initialize modules
strategic_planning = StrategicPlanning()
task_allocation = TaskAllocation()
team_structuring = TeamStructuring()
resume_parser = ResumeParser()
multi_agent = MultiAgentConsensus()

@app.route('/plan', methods=['POST'])
def plan_project():
    try:
        data = request.json
        print("DEBUG: Received Data ->", data)  # Debugging input request

        # Step 1: Strategic Planning
        strategic_plan = strategic_planning.create_plan(data)
        strategic_plan["team_members"] = data.get("team_members", [])  # Ensure team members are included
        print("DEBUG: Strategic Plan ->", strategic_plan)

        # Step 2: Multi-Agent Consensus
        consensus = multi_agent.get_consensus(
            project_name=data.get("project_name", "Unnamed Project"),
            goals=data.get("goals", []),
            team_members=data.get("team_members", [])
        )
        print("DEBUG: Multi-Agent Consensus ->", consensus)

        # Step 3: Task Allocation
        tasks = task_allocation.allocate_tasks(strategic_plan)
        print("DEBUG: Allocated Tasks ->", tasks)

        # Step 4: Team Structuring (Ensuring correct inputs)
        teams = team_structuring.create_teams(tasks, data.get("team_members", []))
        print("DEBUG: Generated Teams ->", teams)

        # Step 5: Generate Timeline (Using Correct Key: `task_name`)
        timeline = strategic_planning.generate_timeline(tasks)
        print("DEBUG: Generated Timeline ->", timeline)

        # Step 6: Format and Return Response
        response = {
            "team_assignments": teams,
            "timeline": timeline,
            "consensus": consensus,
            "status": "success"
        }
        return jsonify(response)

    except Exception as e:
        print("ERROR:", str(e))  # Debug error messages
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/upload-resume', methods=['POST'])
def upload_resume():
    try:
        file = request.files['resume']
        file_path = f"uploads/{file.filename}"
        file.save(file_path)

        print("DEBUG: Saved Resume at ->", file_path)  # Debug file path

        # Parse resume
        text = resume_parser.extract_text(file_path)
        skills = resume_parser.extract_skills(text)
        print("DEBUG: Extracted Skills ->", skills)  # Debug parsed skills

        return jsonify({"status": "success", "skills": skills})

    except Exception as e:
        print("ERROR:", str(e))  # Debugging errors
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
