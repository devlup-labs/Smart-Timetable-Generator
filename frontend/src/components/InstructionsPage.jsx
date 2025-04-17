import React from 'react';
import InstructionCard from './InstructionCard';

function InstructionsPage() {
  return (
    <section id="instructions-page">
      <h1>How to Use Smart Time Table Generator</h1>
      
      <div className="instructions-container">
        <h2>Understanding the Process</h2>
        <p>The Smart Time Table Generator uses Optical Character Recognition (OCR) technology to extract course and slot information from your registration document. Here's how the system works:</p>
        
        <ol>
          <li><strong>OCR Processing:</strong> We use PaddleOCR to extract tabular data from your uploaded image</li>
          <li><strong>Data Extraction:</strong> Our system identifies course names/codes and their corresponding slot codes</li>
          <li><strong>Slot Mapping:</strong> We map these slot codes to a predefined timetable structure</li>
          <li><strong>Timetable Generation:</strong> A personalized timetable is created based on your registered courses</li>
        </ol>
        
        <div className="instructions-grid">
          <InstructionCard title="1. Prepare Your Document">
            <p>Make sure your course registration document clearly shows:</p>
            <ul>
              <li>Course codes/names</li>
              <li>Slot codes (e.g., A1, L3, P4)</li>
              <li>Ensure the document is in a tabular format</li>
            </ul>
          </InstructionCard>
          
          <InstructionCard title="2. Take a Clear Photo">
            <p>For the best OCR results:</p>
            <ul>
              <li>Ensure good lighting</li>
              <li>Avoid shadows on the document</li>
              <li>Keep the document flat and aligned</li>
              <li>Make sure text is clearly visible</li>
            </ul>
          </InstructionCard>
          
          <InstructionCard title="3. Upload and Process">
            <p>On the home page:</p>
            <ul>
              <li>Click "Upload Document"</li>
              <li>Select your image file (JPG, PNG, JPEG)</li>
              <li>Wait for the processing to complete</li>
            </ul>
          </InstructionCard>
          
          <InstructionCard title="4. Review and Download">
            <p>After processing:</p>
            <ul>
              <li>Review the extracted courses and slots</li>
              <li>Check for any errors or missing information</li>
              <li>Download your personalized timetable</li>
            </ul>
          </InstructionCard>
        </div>
      </div>
      
      <div className="instructions-container">
        <h2>Examples of Good Images for OCR</h2>
        <p>For the best results with our OCR technology, follow these guidelines for document images:</p>
        
        <div className="example-images">
          <div className="image-grid">
            <div className="example-image">
              <img src="/placeholder/240/160" alt="Course registration table example" />
              <p>Clear tabular format with course names and slot codes clearly visible</p>
            </div>
            <div className="example-image">
              <img src="/placeholder/240/160" alt="University portal screenshot example" />
              <p>Screenshot from university portal showing registered courses and slots</p>
            </div>
            <div className="example-image">
              <img src="/placeholder/240/160" alt="Registration printout example" />
              <p>Well-lit registration form printout with distinct columns</p>
            </div>
          </div>
        </div>
        
        <h3>Document Requirements</h3>
        <ul>
          <li><strong>Format:</strong> Table format with clear rows and columns</li>
          <li><strong>Content:</strong> Should contain both course information and slot codes</li>
          <li><strong>Quality:</strong> High resolution, well-lit image with good contrast</li>
          <li><strong>Text:</strong> Clear, printed text (not handwritten)</li>
        </ul>
        
        <h3>Sample Slot Format</h3>
        <p>Our system is designed to recognize standard slot codes used in universities. Examples include:</p>
        <ul>
          <li>A1, A2, B1, B2 (Theory slots)</li>
          <li>L1, L2, L3, L4 (Lab slots)</li>
          <li>P1, P2, P3 (Practice slots)</li>
        </ul>
        <p>Make sure your registration document shows these slot codes clearly for each course.</p>
      </div>
      
      <div className="instructions-container">
        <h2>Troubleshooting</h2>
        <p>If you encounter issues with the timetable generation, try these solutions:</p>
        <ul>
          <li><strong>OCR Not Recognizing Text:</strong> Take a clearer photo with better lighting and alignment</li>
          <li><strong>Missing Courses:</strong> Ensure all courses and their slot codes are clearly visible in the image</li>
          <li><strong>Incorrect Slot Detection:</strong> Make sure slot codes are in standard format and clearly visible</li>
          <li><strong>Processing Error:</strong> Try using a different image format or taking a screenshot instead</li>
          <li><strong>Timetable Conflicts:</strong> Check if your registered courses have overlapping slots</li>
        </ul>
      </div>
    </section>
  );
}

export default InstructionsPage;
