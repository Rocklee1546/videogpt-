import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';

interface HeroSectionProps {
  onCtaClick: () => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onCtaClick, onExploreClick }) => {
  return (
    <section className="landing-section hero-section" id="hero">
      <div className="hero-glow-blob hero-glow-1" />
      <div className="hero-glow-blob hero-glow-2" />

      <div className="section-container hero-container">
        
        {/* Top Lockup: 10X Badge + Divider + THYNK Digital Solution Logo */}
        <div className="hero-top-lockup">
          <div className="hero-lockup-badge-box">
            <img 
              src="/10x-badge-v2.png?v=2" 
              alt="10X Your Business Using Viral Videos" 
              className="hero-top-badge-img" 
            />
          </div>
          <div className="hero-top-lockup-divider" />
          <div className="hero-lockup-logo-box">
            <img 
              src="/thynk-logo-v2.png?v=2" 
              alt="THYNK Digital Solution" 
              className="hero-top-logo-img" 
            />
          </div>
        </div>

        {/* Pre-headline */}
        <p className="hero-pre-headline">
          Stop Creating Ordinary Content. Start Building Attention.
        </p>

        {/* Main Headline with High-Converting Green Highlights and Quotes */}
        <h1 className="hero-main-headline hero-headline-impact">
          HOW TO <span className="hero-highlight-green">10X YOUR CONTENT REACH</span>
          <br />
          WITH <span className="hero-highlight-green">"AI VIRAL VIDEOS"</span>
        </h1>

        {/* Supporting Headline */}
        <p className="hero-supporting-headline hero-supporting-lead">
          Turn Everyday Objects Into Scroll-Stopping Talking Videos Using The ObjectFlow AI Video Creation Playbook.
        </p>

        {/* Supporting Copy */}
        <p className="hero-supporting-copy hero-body-expanded">
          Learn The Step-By-Step Workflow To Create Attention-Grabbing Videos, Promote Your Products, Grow Your Audience, And Unlock New Business Opportunities — Even If You're A Beginner.
        </p>

        {/* High-Impact Punchline */}
        <div className="hero-punchline-wrap">
          <p className="hero-punchline-text">
            Create Better Content. Capture More Attention. Accelerate Your Growth.
          </p>
        </div>

        {/* Seamless Hero Poster Showcase without boxed card edges */}
        <div className="hero-poster-showcase-container">
          <div 
            className="hero-poster-wrapper"
            onClick={onCtaClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onCtaClick();
              }
            }}
            aria-label="ObjectFlow Playbook Course Poster - Click to get lifetime access for ₹299"
          >
            <div className="poster-ambient-glow" />
            <img 
              src="/objectflow-poster.jpg" 
              alt="ObjectFlow Playbook — AI Viral Videos Made Simple. Turn everyday objects into talking characters for just ₹299." 
              className="hero-official-poster-img"
            />
          </div>

          {/* Under-poster Action Buttons */}
          <div className="poster-action-wrap">
            <button 
              onClick={onCtaClick}
              className="btn-primary-cta glow-pulse btn-large"
            >
              <span>GET LIFETIME ACCESS — ₹299</span>
              <ArrowRight size={20} className="cta-arrow" />
            </button>
            <button 
              onClick={onExploreClick}
              className="btn-secondary-cta"
            >
              <span>Explore Curriculum</span>
              <Sparkles size={16} />
            </button>
            <p className="poster-trust-note">
              <ShieldCheck size={14} className="text-green" />
              <span>One-time payment • Lifetime access • 100% beginner friendly</span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
