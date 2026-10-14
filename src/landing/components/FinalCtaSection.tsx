import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { LANDING_CONFIG } from '../../config/landingConfig';

interface FinalCtaSectionProps {
  onCtaClick: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onCtaClick }) => {
  return (
    <section className="landing-section final-cta-section" id="final-cta">
      <div className="final-cta-glow-bg" />

      <div className="section-container text-center">
        <div className="final-badge-wrap">
          <span className="section-badge highlight-green">
            <Sparkles size={14} className="inline mr-1" />
            START CREATING TODAY
          </span>
        </div>

        <h2 className="final-headline">
          READY TO MAKE YOUR NEXT IDEA TALK?
        </h2>

        <p className="final-supporting-copy">
          Explore the five-stage ObjectFlow Playbook and learn a practical workflow for developing talking-object AI videos.
        </p>

        {/* Big Offer Box */}
        <div className="final-offer-summary-card">
          <div className="final-product-label">{LANDING_CONFIG.brand.courseName.toUpperCase()}</div>
          <div className="final-price-tag">₹299 — ONE-TIME PAYMENT</div>
          <div className="final-access-tag">LIFETIME COURSE ACCESS</div>

          <div className="final-button-wrap">
            <button 
              onClick={onCtaClick}
              className="btn-primary-cta glow-pulse btn-large"
            >
              <span>GET LIFETIME ACCESS — ₹299</span>
              <ArrowRight size={20} />
            </button>
          </div>

          <p className="final-revisit-note">
            Start exploring the workflow at your own pace.
          </p>
        </div>
      </div>
    </section>
  );
};
