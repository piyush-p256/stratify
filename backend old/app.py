from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from task_allocation import assign_tasks
from team_structuring import structure_teams
from strategic_planning import generate_timeline

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}) 
@app.route("/generate-plan", methods=["POST"])
def generate_plan():
    try:
        # Get JSON data from the request
        data = request.json
        team_members = data["team_members"]
        tasks = data["tasks"]
        start_date = data["start_date"]
        
        # Step 1: Assign tasks
        task_assignments = assign_tasks(team_members, tasks)
        
        # Step 2: Structure teams
        team_assignments = structure_teams(team_members)
        
        # Step 3: Generate timeline
        timeline = generate_timeline(tasks, start_date)
        
        return jsonify({
            "task_assignments": task_assignments,
            "team_assignments": team_assignments,
            "timeline": timeline
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
