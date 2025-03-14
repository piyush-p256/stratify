import ollama

class CustomOllamaClient:
    def __init__(self, base_url, model):
        self.base_url = base_url
        self.model = model

    def generate(self, prompt):
        print(f"Generating response for prompt: {prompt}")  # Debug print
        try:
            response = ollama.generate(model=self.model, prompt=prompt)
            print(f"Response: {response}")  # Debug print
            return response["response"]
        except Exception as e:
            print(f"Error connecting to Ollama: {e}")  # Debug print
            raise Exception("Failed to connect to Ollama. Please check that Ollama is downloaded, running and accessible. https://ollama.com/download")

class MultiAgentConsensus:
    def __init__(self):
        # Define custom Ollama client
        self.ollama_client = CustomOllamaClient(
            base_url="http://localhost:11434",
            model="mistral"
        )

    def get_consensus(self, project_name, goals, team_members):
        # Create a detailed prompt for Ollama
        prompt = f"""
        You are a project management AI. Generate a detailed plan for the following project:

        Project Name: {project_name}
        Goals: {', '.join(goals)}
        Team Members: {', '.join([f"{member['name']} (Skills: {', '.join(member['skills'])})" for member in team_members])}

        The plan should include:
        1. Task allocation based on team members' skills.
        2. A timeline for task completion.
        3. Team structuring recommendations.
        """

        # Get response from Ollama
        response = self.ollama_client.generate(prompt)
        return [{"role": "assistant", "content": response}]