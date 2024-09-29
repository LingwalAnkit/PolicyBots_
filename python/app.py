import os
import PyPDF2
import re
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

def print_extracted_text(text):
    print("Extracted text from PDF:")
    print("-" * 50)
    print(text[:500] + "..." if len(text) > 500 else text)  # Print first 500 characters
    print("-" * 50)

def extract_data_from_pdf(pdf_path):
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            for page in reader.pages:
                text += page.extract_text()
        
        print_extracted_text(text)
        
        # Use regex to find name and email
        name_match = re.search(r'Name:\s*(.+)', text)
        email_match = re.search(r'Email:\s*(.+)', text)
        
        if not name_match:
            print("Warning: Couldn't find a name in the expected format.")
        if not email_match:
            print("Warning: Couldn't find an email in the expected format.")
        
        name = name_match.group(1) if name_match else ""
        email = email_match.group(1) if email_match else ""
        
        return name, email
    except FileNotFoundError:
        print(f"Error: The file {pdf_path} was not found.")
        return None, None
    except PyPDF2.errors.PdfReadError as e:
        print(f"Error: The file {pdf_path} is not a valid PDF or is encrypted.")
        print(f"PyPDF2 error: {str(e)}")
        return None, None
    except Exception as e:
        print(f"An unexpected error occurred: {str(e)}")
        return None, None

def fill_form(name, email):
    if name is None or email is None:
        print("Cannot fill form: Invalid data extracted from PDF.")
        return

    try:
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service)
        
        driver.get("http://localhost:3000")  # Replace with your form URL
        
        print("Waiting for form elements to load...")
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "name"))
        )
        
        print("Filling in name field...")
        name_field = driver.find_element(By.ID, "name")
        name_field.send_keys(name)
        
        print("Filling in email field...")
        email_field = driver.find_element(By.ID, "email")
        email_field.send_keys(email)
        
        print("Clicking submit button...")
        submit_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Submit')]")
        submit_button.click()
        
        print("Form filled successfully!")
    
    except Exception as e:
        print(f"An error occurred while filling the form: {str(e)}")
    
    finally:
        if 'driver' in locals():
            driver.quit()

if __name__ == "__main__":
    # Use a relative path to the PDF file
    pdf_filename = "example.pdf"  # Replace with your PDF file name
    pdf_path = os.path.join(os.path.dirname(__file__), pdf_filename)
    
    print(f"Attempting to read PDF from: {pdf_path}")
    
    name, email = extract_data_from_pdf(pdf_path)
    
    print(f"Extracted Name: '{name}'")
    print(f"Extracted Email: '{email}'")
    
    if name or email:
        fill_form(name, email)
    else:
        print("Failed to extract valid data from the PDF.")