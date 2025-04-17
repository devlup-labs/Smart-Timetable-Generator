import React from 'react';
import Hero from './Hero';
import ProcessFlow from './ProcessFlow';
import UploadSection from './UploadSection';

function HomePage() {
  return (
    <section id="home-page">
      <Hero />
      
      <div className="instructions-container">
        <h2>How It Works</h2>
        <ProcessFlow />
      </div>
      
      <UploadSection />
    </section>
  );
}

export default HomePage;
