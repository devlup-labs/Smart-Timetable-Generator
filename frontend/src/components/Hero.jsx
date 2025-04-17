import React from 'react';

function Hero() {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Smart Timetable Generator</h1>
        <p>Generate your perfect class schedule in seconds! Our advanced OCR technology extracts your registered courses and automatically maps them to the optimal time slots.</p>
        <p>Upload your course registration document, and we'll extract the course codes and slot information to create a personalized, conflict-free timetable.</p>
        <div className="button-container">
          <a href="#upload-section" className="btn btn-primary">Upload Document</a>
          <div className="counter">22</div>
          <a href="#" className="btn btn-secondary">Reset</a>
        </div>
      </div>
      <div className="hero-image">
        <img src="/placeholder/500/400" alt="Course schedule and timetable illustration" />
      </div>
    </div>
  );
}

export default Hero;
