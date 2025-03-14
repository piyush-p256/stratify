import nltk
from PyPDF2 import PdfReader

# Download NLTK data (only needed once)
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')

class ResumeParser:
    def extract_text(self, file_path):
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        return text

    def extract_skills(self, text):
        # Tokenize the text
        tokens = nltk.word_tokenize(text)
        
        # Use part-of-speech tagging to identify skills (nouns)
        tagged = nltk.pos_tag(tokens)
        skills = [word for word, pos in tagged if pos.startswith('NN')]  # Nouns
        
        return skills