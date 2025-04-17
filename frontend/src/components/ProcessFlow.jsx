import React from 'react';

function ProcessFlow() {
  const steps = [
    {
      number: 1,
      title: "Upload Document",
      description: "Upload your course registration image"
    },
    {
      number: 2,
      title: "OCR Extraction",
      description: "Our system extracts course codes and slot information"
    },
    {
      number: 3,
      title: "Slot Mapping",
      description: "Course slots are mapped to the master timetable"
    },
    {
      number: 4,
      title: "Get Timetable",
      description: "Download your personalized timetable"
    }
  ];

  return (
    <div className="process-flow">
      {steps.map((step, index) => (
        <div className="process-step" key={index}>
          <div className="step-icon">{step.number}</div>
          <div className="step-title">{step.title}</div>
          <p>{step.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ProcessFlow;
