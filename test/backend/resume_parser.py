import nltk
from PyPDF2 import PdfReader
import re

nltk.download('punkt', quiet=True)
nltk.download('averaged_perceptron_tagger', quiet=True)
nltk.download('stopwords', quiet=True)

class ResumeParser:
    def __init__(self):
        # Common technical skills dictionary - add more as needed
        self.common_skills = {
            'programming_languages': set([
                'Python', 'Java', 'C++', 'C#', 'JavaScript', 'TypeScript', 'Ruby', 'PHP',
                'Swift', 'Kotlin', 'Go', 'Rust', 'C', 'Scala', 'R', 'MATLAB', 'Perl',
                'Shell', 'SQL', 'Assembly', 'Fortran', 'COBOL', 'Objective-C', 'Dart'
            ]),
            'frameworks_libraries': set([
                'React', 'Angular', 'Vue', 'Django', 'Flask', 'Spring', 'ASP.NET',
                'Express', 'Laravel', 'Ruby on Rails', 'TensorFlow', 'PyTorch', 'Keras',
                'Scikit-learn', 'Pandas', 'NumPy', 'Node.js', 'jQuery', 'Bootstrap',
                'Symfony', 'FastAPI', 'Redux', 'Next.js', 'Nest.js', 'Svelte', 'Backbone',
                'Ember', 'Pygame', 'Matplotlib', 'Seaborn', 'D3.js', 'Three.js', 'NLTK',
                'Selenium', 'Beautiful Soup', 'Scrapy', 'Webpack', 'Babel', 'Jest', 'Mocha'
            ]),
            'databases': set([
                'MySQL', 'PostgreSQL', 'Oracle', 'SQL Server', 'MongoDB', 'Cassandra',
                'Redis', 'Elasticsearch', 'DynamoDB', 'Firebase', 'Neo4j', 'SQLite',
                'MariaDB', 'CouchDB', 'InfluxDB', 'Snowflake', 'BigQuery', 'Redshift'
            ]),
            'cloud_devops': set([
                'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins', 'GitLab CI',
                'GitHub Actions', 'Terraform', 'Ansible', 'Puppet', 'Chef', 'Prometheus',
                'Grafana', 'ELK', 'Nginx', 'Apache', 'Heroku', 'Netlify', 'Vercel', 'Git'
            ]),
            'data_science_ml': set([
                'Machine Learning', 'Deep Learning', 'Data Mining', 'NLP', 'Computer Vision',
                'Reinforcement Learning', 'Statistics', 'Big Data', 'Data Analysis',
                'Data Visualization', 'Feature Engineering', 'Time Series Analysis',
                'Image Processing', 'Neural Networks', 'Classification', 'Regression',
                'Clustering', 'GAN', 'CNN', 'RNN', 'LSTM', 'Bi-LSTM', 'Transformer', 'BERT',
                'GPT', 'PCA', 'XGBoost', 'Random Forest', 'SVM', 'K-Means', 'DBSCAN'
            ]),
            'design_multimedia': set([
                'Photoshop', 'Illustrator', 'Figma', 'Sketch', 'InDesign', 'After Effects',
                'Premiere Pro', 'Blender', 'Unity', 'Unreal Engine', 'UI/UX', 'Responsive Design',
                'Wireframing', 'Prototyping', 'Animation', 'Video Editing', '3D Modeling',
                'Adobe XD', 'Framer'
            ]),
            'methodologies_concepts': set([
                'Agile', 'Scrum', 'Kanban', 'Waterfall', 'DevOps', 'CI/CD', 'TDD', 'BDD',
                'Object-Oriented Programming', 'OOP', 'Functional Programming', 'Microservices',
                'REST API', 'GraphQL', 'WebSockets', 'Design Patterns', 'Scalability',
                'Performance Optimization', 'Security', 'Project Management', 'Pair Programming'
            ]),
            'tools_platforms': set([
                'VS Code', 'PyCharm', 'IntelliJ', 'Eclipse', 'XCode', 'Android Studio', 'GitHub',
                'GitLab', 'Bitbucket', 'Jira', 'Confluence', 'Trello', 'Slack', 'Asana',
                'Postman', 'Swagger', 'Linux', 'Windows', 'macOS', 'Ubuntu', 'Debian', 'UNIX',
                'Jupyter', 'Colab', 'iOS', 'Android', 'WordPress', 'Shopify'
            ])
        }
        
        # Flatten the skills dictionary for easy lookup
        self.all_skills = set()
        for category in self.common_skills.values():
            self.all_skills.update(category)
        
        # Create variations of skills (lowercase, etc.)
        self.skill_variations = self._create_skill_variations()
        
        # Define stopwords to filter out irrelevant content
        self.stopwords = set(nltk.corpus.stopwords.words('english'))
        self.stopwords.update([
            "|", "@", "%", "–", "-", "/", "•", ":", ".", ",", "New", "India", "Delhi", "Email",
            "linkedin", "github", "website", "student", "present", "technology", "education", 
            "project", "system", "gmail", "in", "class", "manager", "curious", "leadership", 
            "founder", "coordinator", "hackathon", "professional", "summary", "experience", 
            "projects", "education", "skills", "achievements", "positions", "responsibility", 
            "manager", "secretary", "engineer", "developer", "lead", "head", "operations", 
            "tools", "time", "testing", "methods", "platform", "framework", "present"
        ])

    def _create_skill_variations(self):
        """Create variations of skills for better matching"""
        variations = {}
        for skill in self.all_skills:
            # Store the original form
            skill_lower = skill.lower()
            variations[skill_lower] = skill
            
            # Handle variations with .js, .NET, etc.
            if '.' in skill:
                variations[skill_lower.replace('.', '')] = skill
                
            # Handle variations with spaces
            if ' ' in skill:
                variations[skill_lower.replace(' ', '')] = skill
                variations[skill_lower.replace(' ', '-')] = skill
                
            # Handle common abbreviations
            if skill == "JavaScript":
                variations["js"] = skill
            elif skill == "TypeScript":
                variations["ts"] = skill
            elif skill == "Python":
                variations["py"] = skill
            elif skill == "React":
                variations["reactjs"] = skill
            elif skill == "Object-Oriented Programming":
                variations["oop"] = skill
                
        return variations

    def extract_text(self, file_path):
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"

        if not text.strip():
            raise ValueError("No extractable text found in the PDF.")

        return text

    def extract_skills(self, text):
        # Tokenize the text and clean it
        text = text.replace('\n', ' ')
        text = re.sub(r'[^\w\s]', ' ', text)  # Replace punctuation with spaces
        
        # Tokenize the text
        tokens = nltk.word_tokenize(text)
        
        # Remove stopwords and short tokens
        filtered_tokens = [token for token in tokens if token.lower() not in self.stopwords and len(token) > 1]
        
        # Use part-of-speech tagging to identify nouns
        pos_tagged = nltk.pos_tag(filtered_tokens)
        
        # Extract potential skill candidates (focusing on nouns and proper nouns)
        skill_candidates = set()
        for token, pos in pos_tagged:
            if pos.startswith('NN'):  # Nouns
                skill_candidates.add(token)
        
        # Extract multi-word skills using regex for common patterns
        for skill in self.all_skills:
            if len(skill.split()) > 1:  # Only check multi-word skills
                # Create a regex pattern that's flexible with spaces/punctuation
                pattern = r'\b' + r'\W*'.join(re.escape(word) for word in skill.lower().split()) + r'\b'
                if re.search(pattern, text.lower()):
                    skill_candidates.add(skill)
        
        # Match skills against our known skills list
        identified_skills = set()
        for token in skill_candidates:
            # Check if token matches any of our known skills
            if token in self.all_skills:
                identified_skills.add(token)
            elif token.lower() in self.skill_variations:
                identified_skills.add(self.skill_variations[token.lower()])
        
        # Add additional check for common technical terms that might be in different forms
        for token in filtered_tokens:
            token_lower = token.lower()
            
            # Check our variations dictionary
            if token_lower in self.skill_variations:
                identified_skills.add(self.skill_variations[token_lower])
            
            # Check for programming languages with '++'
            if token_lower == 'c++' or token == 'C++':
                identified_skills.add('C++')
            elif token_lower in ['c#', 'csharp']:
                identified_skills.add('C#')
        
        # Sort skills alphabetically for better readability
        return sorted(list(identified_skills))
    
    def categorize_skills(self, skills_list):
        """Categorize identified skills into different domains"""
        categorized = {}
        
        for category, skills_set in self.common_skills.items():
            category_name = category.replace('_', ' ').title()
            matching_skills = [skill for skill in skills_list if skill in skills_set]
            if matching_skills:
                categorized[category_name] = matching_skills
                
        return categorized