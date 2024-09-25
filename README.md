# Policy Bot Project

## Overview
This project is designed to assist users in navigating and understanding policies through a user-friendly interface. The system leverages Optical Character Recognition (OCR) and machine learning (ML) algorithms to analyze and interpret policy documents. The platform is built using **React.js** for the front-end, and it integrates a **Botpress chatbot** to offer real-time assistance, powered by the Botpress API.

## Features
- **OCR Integration**: Extracts text from uploaded policy documents.
- **Machine Learning Algorithms**: Different ML models are applied to analyze the policy text, identify key terms, classify policies, and provide insights.
- **Interactive Chatbot**: A chatbot powered by the **Botpress API** helps users with policy-related queries, allowing for a smooth and interactive experience.
- **React.js Front-End**: The UI is built using React.js to ensure a responsive and intuitive design.
  
## Tech Stack
- **React.js**: Front-end framework for building the user interface.
- **Botpress API**: For integrating the chatbot and handling policy-related queries.
- **OCR**: Extracts text from images or scanned documents for further processing.
- **Machine Learning Algorithms**: A variety of algorithms are applied to classify policies, detect keywords, and offer suggestions. This is handled on the back end.
  
## Installation

### Prerequisites
- **Node.js**: Ensure you have Node.js installed on your system.
- **Botpress Account**: You need an API key from Botpress to set up the chatbot integration.
- **Python (Optional)**: If you’re processing OCR or machine learning models locally, Python is required.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/policy-bot.git
   cd policy-bot
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up the Botpress chatbot API:
   - Sign up on the Botpress website.
   - Create a chatbot and get the API key.
   - Add your API key in the environment file `.env`:
     ```bash
     REACT_APP_BOTPRESS_API_KEY=your-botpress-api-key
     ```

4. Start the development server:
   ```bash
   npm start
   ```

5. (Optional) Set up OCR and machine learning back end:
   - Install necessary Python libraries (if OCR and ML are handled in Python):
     ```bash
     pip install -r requirements.txt
     ```

## Usage
1. **Uploading Policy Documents**: Users can upload scanned or digital policy documents. The OCR will extract the text for processing.
2. **Chatbot Interaction**: Users can interact with the chatbot to get answers about the uploaded policy documents or general policy-related questions.
3. **Policy Analysis**: Machine learning models are applied to analyze the extracted text, and relevant insights are presented.

## Project Structure
- **/src**: Contains all React components and UI logic.
  - **/components**: Reusable components like the document uploader, chatbot window, etc.
  - **/services**: Logic for interacting with OCR and machine learning models.
  - **/chatbot**: Chatbot integration using Botpress API.
- **/backend**: (Optional) Code for OCR processing and machine learning models.
- **/public**: Static assets such as images or fonts.
  
## Future Enhancements
- **Improved Policy Classification**: Incorporate more advanced machine learning models to better classify and interpret policy documents.
- **Natural Language Processing (NLP)**: Improve chatbot responses with NLP-based insights on policies.
- **User Authentication**: Add secure login for users to store and retrieve their policy analysis history.

## License
This project is licensed under the MIT License.

## Contact
For any issues or contributions, please reach out to [2eze4abhishek@gmail.com].

---
