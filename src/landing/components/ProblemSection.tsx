import React from 'react';
import { RefreshCw, Compass, Layers, ArrowRight, Sparkles } from 'lucide-react';
import { PromotionalVideoPlayer } from './PromotionalVideoPlayer';

interface ProblemSectionProps {
  onCtaClick: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onCtaClick }) => {
  return (
    <section className="landing-section problem-section" id="problem">
      <div className="section-container">
        <div className="section-header text-center">
          <span className="section-badge red-accent">THE CREATIVE HURDLE</span>
          <h2 className="section-title">RUNNING OUT OF FRESH VIDEO IDEAS?</h2>
          <p className="section-subtitle">
            Creating attention-grabbing content can feel challenging when every post starts to look the same. Talking-object videos offer a creative way to experiment with storytelling, humour, and product-focused content.
          </p>
        </div>

        {/* 3 Problem Cards Grid */}
        <div className="problem-cards-grid">
          {/* Card 1 */}
          <div className="problem-card">
            <div className="card-top-icon">
              <RefreshCw size={24} className="icon-orange" />
            </div>
            <span className="card-number-tag">01</span>
            <h3 className="problem-card-title">SAME OLD CONTENT?</h3>
            <p className="problem-card-text">
              Explore a fresh creative format using everyday objects as your starting point.
            </p>
            <div className="card-accent-line" />
          </div>

          {/* Card 2 */}
          <div className="problem-card">
            <div className="card-top-icon">
              <Compass size={24} className="icon-green" />
            </div>
            <span className="card-number-tag">02</span>
            <h3 className="problem-card-title">NOT SURE WHERE TO START?</h3>
            <p className="problem-card-text">
              Follow a guided workflow instead of trying to piece every step together yourself.
            </p>
            <div className="card-accent-line" />
          </div>

          {/* Card 3 */}
          <div className="problem-card">
            <div className="card-top-icon">
              <Layers size={24} className="icon-blue" />
            </div>
            <span className="card-number-tag">03</span>
            <h3 className="problem-card-title">TOO MANY TOOLS, NO CLEAR PROCESS?</h3>
            <p className="problem-card-text">
              Understand how the tools covered in the playbook fit into a single creation workflow.
            </p>
            <div className="card-accent-line" />
          </div>
        </div>

        {/* Video Player Display: Centered right after the 3 cards */}
        <div className="problem-video-section-wrap">
          <PromotionalVideoPlayer videoId="1-91aVYpyp8hjS2qk02d517uKf1yXq6ZD" />
        </div>

        {/* Concluding Opportunity Banner */}
        <div className="problem-conclusion-banner">
          <div className="conclusion-glow" />
          <div className="conclusion-content">
            <Sparkles size={24} className="text-green mb-2" />
            <h3 className="conclusion-title">
              START WITH AN IDEA. FOLLOW THE WORKFLOW. CREATE SOMETHING OF YOUR OWN.
            </h3>
            <p className="conclusion-desc">
              From coffee mugs and laptops to headphones and sneakers — discover how simple everyday items become engaging digital stories.
            </p>
            <button onClick={onCtaClick} className="btn-primary-cta glow-pulse mt-4">
              <span>EXPLORE OBJECTFLOW — ₹299</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
