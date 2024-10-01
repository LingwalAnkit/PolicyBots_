import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import PyPDF2
import re
import io

app = Flask(__name__)
CORS(app)

def extract_data_from_pdf(pdf_file):
    try:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()

        # Use regex to find name and email
        name_match = re.search(r'Name:\s(.+)', text)
        email_match = re.search(r'Email:\s(.+)', text)

        name = name_match.group(1) if name_match else ""
        email = email_match.group(1) if email_match else ""

        return name, email
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return None, None

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and file.filename.endswith('.pdf'):
        # Create a BytesIO object from the file data
        pdf_file = io.BytesIO(file.read())
        name, email = extract_data_from_pdf(pdf_file)
        if name is not None and email is not None:
            return jsonify({'name': name, 'email': email}), 200
        else:
            return jsonify({'error': 'Failed to extract data from PDF'}), 500
    else:
        return jsonify({'error': 'Invalid file type'}), 400

if __name__ == '__main__':
    app.run(debug=True)