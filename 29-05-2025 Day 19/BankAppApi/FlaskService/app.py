from flask import Flask, request, jsonify
import pandas as pd
import nltk
nltk.download("punkt")

from nltk.stem.lancaster import LancasterStemmer
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split as tts
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics.pairwise import cosine_similarity

# Ensure required NLTK resources
try:
    nltk.data.find("tokenizers/punkt")
except LookupError:
    nltk.download("punkt")

stemmer = LancasterStemmer()

# def cleanup(sentence):
#     word_tok = nltk.word_tokenize(sentence)
#     stemmed_words = [stemmer.stem(w) for w in word_tok]
#     return ' '.join(stemmed_words)

# Load and preprocess data
data = pd.read_csv('BankFAQs.csv')

le = LabelEncoder()
tfv = TfidfVectorizer(min_df=1, stop_words='english')

questions = data['Question'].values
# nltk.download('punkt')
X = []
for question in questions:
    X.append(question)

tfv.fit(X)
le.fit(data['Class'])

X_transformed = tfv.transform(X)
y = le.transform(data['Class'])

trainx, testx, trainy, testy = tts(X_transformed, y, test_size=0.25, random_state=42)

model = SVC(kernel='linear', probability=True)
model.fit(trainx, trainy)

print("Model trained with accuracy:", model.score(testx, testy))

# Helper function
def get_top5_indices(arr):
    indexed = sorted([(val[0][0], idx) for idx, val in enumerate(arr)], reverse=True)
    return [i[1] for i in indexed[:5]]

# Flask setup
app = Flask(__name__)

@app.route('/')
def home():
    return "Bank FAQ Chatbot API is running."

@app.route('/predict', methods=['POST'])
def predict():
    try:
        req_data = request.json
        question = req_data.get('question', '')
        top5 = req_data.get('top5', False)

        if not question:
            return jsonify({'error': 'No question provided'}), 400

        cleaned = question.lower().strip()
        vectorized = tfv.transform([cleaned])
        pred_class = model.predict(vectorized)[0]
        class_name = le.inverse_transform([pred_class])[0]
        matching_questions = data[data['Class'] == class_name]

        cos_sims = []
        for q in matching_questions['Question']:
            sim = cosine_similarity(tfv.transform([q]), vectorized)
            cos_sims.append(sim)

        best_index = cos_sims.index(max(cos_sims))

        if not top5:
            response = {
                'answer': data['Answer'][matching_questions.index[best_index]],
                'question': matching_questions['Question'].iloc[best_index],
                'class': class_name
            }
        else:
            top_indices = get_top5_indices(cos_sims)
            response = []
            for i in top_indices:
                row_index = matching_questions.index[i]
                response.append({
                    'question': data['Question'][row_index],
                    'answer': data['Answer'][row_index]
                })

        return jsonify(response)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
