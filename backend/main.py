# from fastapi import FastAPI, UploadFile, File
# import shutil
# from fastapi.middleware.cors import CORSMiddleware
# import os

# app = FastAPI()

# # Allow CORS for all origins (to avoid CORS-related errors)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# UPLOAD_DIR = "uploads"
# os.makedirs(UPLOAD_DIR, exist_ok=True)

# @app.post("/upload")
# async def upload_file(file: UploadFile = File(...)):
#     file_path = os.path.join(UPLOAD_DIR, file.filename)
    
#     with open(file_path, "wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)

#     return {"message": "File uploaded successfully", "filename": file.filename}

# @app.delete("/delete/{filename}")
# async def delete_file(filename: str):
#     file_path = os.path.join(UPLOAD_DIR, filename)
    
#     if os.path.exists(file_path):
#         os.remove(file_path)
#         return {"message": "File deleted successfully"}
    
#     return {"error": "File not found"}

from fastapi import FastAPI, File, UploadFile, HTTPException
from pathlib import Path
from img2table.document import Image
from img2table.ocr import PaddleOCR
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
import os
import uvicorn

app = FastAPI()

# Allow CORS for all origins (to avoid CORS-related errors)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
PROCESSED_FOLDER = "processed"

# Ensure directories exist
Path(UPLOAD_FOLDER).mkdir(parents=True, exist_ok=True)
Path(PROCESSED_FOLDER).mkdir(parents=True, exist_ok=True)

# Initialize PaddleOCR
ocr = PaddleOCR(lang='en')

def process_image_to_excel(image_path, output_excel):
    """Converts an image with tabular data into an Excel file using PaddleOCR."""
    img = Image(image_path)
    img.to_xlsx(output_excel, ocr=ocr, borderless_tables=True)  # FIXED: Correct usage
    return output_excel if os.path.exists(output_excel) else None

def remove_n(listt):
    return [i.replace("\n", " ") for i in listt]

def extract_subjects_and_slots(file_path):
    """Extracts subjects and slots dynamically from an Excel file."""
    df = pd.read_excel(file_path, header=None)
    
    subject_keywords = ["subject", "course"]
    slot_keywords = ["slot"]
    
    possible_header = df.iloc[0].astype(str).str.lower()
    subject_col, slot_col = None, None
    
    for i, col_name in enumerate(possible_header):
        if col_name in subject_keywords:
            subject_col = i
        if col_name in slot_keywords:
            slot_col = i
    
    if subject_col is not None and slot_col is not None:
        df.columns = df.iloc[0]
        df = df[1:].reset_index(drop=True)
    else:
        for i in range(df.shape[1]):
            sample_values = df[i].dropna().astype(str).tolist()
            sample_values = remove_n(sample_values)
            
            if any(len(val.split()) > 1 for val in sample_values) and subject_col is None:
                subject_col = i
            if any(not val.strip().isalpha() and val.strip().isalnum() and len(val.strip()) <= 3 for val in sample_values):
                slot_col = i

    subjects = df.iloc[:, subject_col].dropna().tolist() if subject_col is not None else []
    slots = df.iloc[:, slot_col].dropna().tolist() if slot_col is not None else []
    
    os.remove(file_path)

    return subjects, slots

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    if not file.filename.endswith((".jpg", ".png", ".jpeg")):
        raise HTTPException(status_code=400, detail="Invalid file format. Only JPG, PNG, and JPEG are allowed.")
    
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    output_excel = os.path.join(PROCESSED_FOLDER, file.filename.replace(".jpg", ".xlsx").replace(".png", ".xlsx"))
    extracted_file = process_image_to_excel(file_path, output_excel)

    os.remove(file_path)
    
    if not extracted_file:
        raise HTTPException(status_code=400, detail="Failed to extract table from image.")

    return {"message": "Image processed successfully", "excel_file": extracted_file}

@app.get("/get_subjects_slots")
async def get_subjects_slots():
    """API endpoint to return extracted subjects and slots."""
    excel_files = list(Path(PROCESSED_FOLDER).glob("*.xlsx"))

    if not excel_files:
        raise HTTPException(status_code=404, detail="No processed Excel file found.")

    subjects, slots = extract_subjects_and_slots(str(excel_files[0]))

    
    
    return {"subjects": subjects, "slots": slots}

if __name__ == "__main__":
    # Run the FastAPI app with Uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
