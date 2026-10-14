import React from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, Lock, Sparkles } from 'lucide-react';
import { LANDING_CONFIG } from '../../config/landingConfig';

interface PricingOfferSectionProps {
  onCtaClick: () => void;
}

export const PricingOfferSection: React.FC<PricingOfferSectionProps> = ({ onCtaClick }) => {
  const verifiedFeatures = [
    'The five-stage workflow (Stage 0 to Stage 4)',
    'Guided step-by-step instructions with interactive checklists',
    'Talking-object concept development with Object Talk GPT',
    'Director-prompt workflow with Claude script engine',
    'Video-clip generation workflow with Google Flow Agent',
    'Clip assembly, audio-sync and publishing guidance with CapCut / VN',
    'Available creator toolkit, length-to-clips calculator & idea starters'
  ];

  return (
    <section className="landing-section pricing-section" id="pricing">
      <div className="section-container">
        <div className="section-header text-center">
          <span className="section-badge highlight-green">CLEAR & TRANSPARENT PRICING</span>
          <h2 className="section-title">EVERYTHING STARTS WITH ONE IDEA</h2>
          <p className="section-subtitle">
            Get lifetime access to the entire playbook and master the AI talking-object video creation workflow today.
          </p>
        </div>

        {/* Master Offer Card */}
        <div className="master-offer-card-container">
          <div className="offer-card-glow-border" />
          
          <div className="master-offer-card">
            {/* Top Badge Banner */}
            <div className="offer-card-ribbon">
              <Sparkles size={14} className="text-dark" />
              <span>START CREATING WITH OBJECTFLOW</span>
            </div>

            <div className="offer-card-inner-grid">
              {/* Left Column: Product & Features */}
              <div className="offer-details-col">
                <div className="offer-title-group">
                  <span className="brand-tag-small">{LANDING_CONFIG.brand.name}</span>
                  <h3 className="offer-product-name">{LANDING_CONFIG.brand.courseName}</h3>
                  <p className="offer-product-subtitle">{LANDING_CONFIG.brand.courseSubtitle}</p>
                </div>

                <div className="offer-inclusions-list">
                  <h4 className="inclusions-heading">What's included in your enrollment:</h4>
                  {verifiedFeatures.map((feat, idx) => (
                    <div key={idx} className="inclusion-item-row">
                      <div className="check-bullet">
                        <CheckCircle2 size={16} className="text-green" />
                      </div>
                      <span className="inclusion-text">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="offer-guarantee-note">
                  <ShieldCheck size={18} className="text-green flex-shrink-0" />
                  <span>Learn the workflow at your own pace and revisit the playbook whenever you need it.</span>
                </div>
              </div>

              {/* Right Column: Price Callout & CTA */}
              <div className="offer-pricing-col">
                <div className="pricing-box-container">
                  <span className="pricing-box-badge">OFFICIAL OFFER</span>

                  <div className="price-box-main">
                    <span className="price-box-currency">₹</span>
                    <span className="price-box-amount">299</span>
                    <span className="price-box-only">ONLY</span>
                  </div>

                  <div className="price-terms-tags">
                    <span className="term-tag">ONE-TIME PAYMENT</span>
                    <span className="term-tag highlight">LIFETIME COURSE ACCESS</span>
                  </div>

                  <div className="offer-cta-container">
                    <button 
                      onClick={onCtaClick}
                      className="btn-primary-cta glow-pulse w-full text-center"
                    >
                      <span>GET LIFETIME ACCESS — ₹299</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>

                  <p className="no-subscription-note">
                    <Lock size={13} className="inline mr-1" />
                    No recurring course subscription. One payment for lifetime course access.
                  </p>

                  <div className="security-badges-row">
                    <span className="sec-item">✓ Instant Access</span>
                    <span className="sec-item">✓ 100% Practical</span>
                    <span className="sec-item">✓ Beginner-Friendly</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
