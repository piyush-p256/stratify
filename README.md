# Stratify - AI Driven Project Management Tool 🚀

## Overview
A comprehensive project management system that streamlines workflow optimization, task allocation, and project planning. This tool helps teams collaborate efficiently by automatically matching skills to tasks and providing AI-driven insights for better project execution.

## ✨ Key Features
- **Strategic Planning**: Create and manage detailed project plans with clear goals and realistic deadlines
- **Intelligent Task Allocation**: Automatically assigns tasks based on team members' skills, workload, and availability
- **Dynamic Team Structuring**: Organize teams optimally based on project requirements and individual capabilities
- **Resume Parsing**: Extract skills and experience from team member resumes for better task matching
- **AI-Powered Recommendations**: Get data-driven suggestions for project optimization and risk mitigation
- **Multi-Agent Consensus**: Leverage collective AI analysis for more balanced project planning decisions

## 🛠️ Tech Stack
- **Frontend**: React 18, Tailwind CSS, React Router
- **Backend**: Flask, Python 3.9+
- **State Management**: React Context API
- **Data Processing**: NLTK, PyPDF2
- **API Communication**: Fetch API, Axios

## 🔌 API Endpoints

### Project Planning
- **POST /generate-plan**
  - Generates comprehensive project plans with timeline and resource allocation
  - **Request Body**:
    ```json
    {
      "project_name": "Project Name",
      "start_date": "YYYY-MM-DD",
      "end_date": "YYYY-MM-DD",
      "project_description": "Brief description of the project",
      "project_goals": ["Goal 1", "Goal 2"],
      "team_members": [
        {
          "name": "Team Member Name",
          "skills": ["Skill 1", "Skill 2"],
          "availability": 0.8,
          "role": "Developer"
        }
      ],
      "tasks": [
        {
          "task_name": "Task Name",
          "description": "Task description",
          "required_skills": ["Skill 1"],
          "duration": 5,
          "dependencies": ["Task ID"]
        }
      ]
    }
    ```
  - **Response**:
    ```json
    {
      "status": "success",
      "plan_id": "unique-plan-id",
      "team_assignments": [
        {
          "team_member": "Member Name",
          "assigned_tasks": ["Task 1", "Task 2"],
          "workload": 0.75
        }
      ],
      "timeline": [
        {
          "task": "Task Name",
          "start_date": "YYYY-MM-DD",
          "end_date": "YYYY-MM-DD",
          "assigned_to": "Member Name",
          "status": "Not Started"
        }
      ],
      "consensus": {
        "recommendations": ["Recommendation 1", "Recommendation 2"],
        "risks": ["Risk 1", "Risk 2"],
        "optimization_suggestions": ["Suggestion 1"]
      }
    }
    ```

### Resume Processing
- **POST /upload-resume**
  - Uploads and processes resumes to extract professional information
  - **Request Body**: Form-data with `resume` as file and `member_id` (optional)
  - **Response**:
    ```json
    {
      "status": "success",
      "name": "Extracted Name",
      "skills": ["Extracted Skill 1", "Extracted Skill 2"],
      "experience": [
        {
          "title": "Job Title",
          "company": "Company Name",
          "duration": "X years"
        }
      ],
      "education": ["Degree, Institution"]
    }
    ```

### System Status
- **GET /health**
  - Checks the server status and services availability
  - **Response**:
    ```json
    {
      "status": "active",
      "message": "Server is running",
      "version": "1.0.0",
      "services": {
        "nlp": "active",
        "planning": "active"
      }
    }
    ```

## 📋 Prerequisites
- Node.js 16+ and npm/yarn
- Python 3.9+
- Git

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dhananjay6561/Stratify2
   cd Stratify2
   ```

2. **Set up the backend**
   ```bash
   cd backend
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   
   pip install -r requirements.txt
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend_stratify
   npm install
   # OR
   yarn install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   python app.py
   # Server will run on http://127.0.0.1:5000
   ```

2. **Start the frontend development server**
   ```bash
   cd frontend_stratify
   npm run dev
   # OR
   yarn dev
   # Frontend will be available at http://localhost:5173
   ```

3. **Access the application**
   - Open your browser and navigate to [http://localhost:5173](http://localhost:5173)

## 📱 Usage Guide

### Creating a New Project
1. Navigate to the Dashboard and click "New Project"
2. Fill in project details including name, description, and timeline
3. Add team members manually 
4. Define tasks with required skills and dependencies
5. Generate project plan and review AI recommendations

### Importing Team Skills
1. Go to "Team Management" section
2. Click "Upload Resume" for a team member
3. Review extracted skills and experience
4. Edit if necessary and confirm

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
   - Click the "Fork" button at the top right of the repository page

2. **Clone your fork**
   ```bash
   git clone https://github.com/dhananjay6561/Stratify2
   cd Stratify2
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **Make your changes**
   - Implement your feature or fix
   - Add or update tests as necessary
   - Update documentation to reflect changes

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: detailed description of your changes"
   ```

6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Create a pull request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Select your feature branch
   - Provide a clear description of your changes

### Code Style Guidelines
- Follow PEP 8 guidelines for Python code
- Use ESLint and Prettier for JavaScript/React code
- Write meaningful commit messages
- Include comments for complex logic
- Ensure all tests pass before submitting PR



## 📞 Support
For bug reports and feature requests, please open an issue on GitHub.

## 🙏 Acknowledgements
- All the contributors who have helped shape this project
- Open source libraries that made this project possible
