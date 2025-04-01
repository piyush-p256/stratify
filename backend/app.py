from flask import Flask, request, jsonify
from flask_cors import CORS
from strategic_planning import StrategicPlanning
from task_allocation import TaskAllocation
from team_structuring import TeamStructuring
from resume_parser import ResumeParser
from multi_agent import MultiAgentConsensus
import os
import traceback  # Added for detailed error tracking

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

        # Ensure task definitions are passed in request JSON
        task_definitions = data.get("task_definitions", {})
        print(f"DEBUG: Type of task_definitions: {type(task_definitions)}")  # Debugging the type
        if not task_definitions:
            return jsonify({"status": "error", "message": "Task definitions are required"}), 400

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

        # Step 3: Task Allocation (Pass task definitions from request)
        tasks = task_allocation.allocate_tasks(strategic_plan, task_definitions)
        print("DEBUG: Allocated Tasks ->", tasks)

        # Step 4: Team Structuring
        teams = team_structuring.create_teams(tasks, data.get("team_members", []))
        print("DEBUG: Generated Teams ->", teams)

        # Step 5: Generate Timeline
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
        print("ERROR:", str(e))
        print(traceback.format_exc())
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route('/upload-resume', methods=['POST'])
def upload_resume():
    try:
        if 'resume' not in request.files:
            return jsonify({"status": "error", "message": "No resume file provided"}), 400
            
        file = request.files['resume']
        if file.filename == '':
            return jsonify({"status": "error", "message": "No selected file"}), 400

        # Ensure the 'uploads/' directory exists
        upload_folder = "uploads"
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)

        file_path = os.path.join(upload_folder, file.filename)
        file.save(file_path)

        print(f"DEBUG: Saved resume at {file_path}")
        
        # Call parse_resume directly - this should work based on your test output
        result = resume_parser.parse_resume(file_path)
        
        # Create a response with exactly the same structure as your test script
        response = {
            "status": "success",
            "name": result["name"],
            "skills": result["skills"],
        }
        
        # Print the response for debugging
        print("DEBUG: About to return response:", response)
        
        return jsonify(response)

    except Exception as e:
        import traceback
        print(f"ERROR: {str(e)}")
        print(traceback.format_exc())
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "active", "message": "Server is running"}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)