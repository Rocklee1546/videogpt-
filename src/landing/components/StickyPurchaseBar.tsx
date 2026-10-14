import React, { useState, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { LANDING_CONFIG } from '../../config/landingConfig';

interface StickyPurchaseBarProps {
  onCtaClick: () => void;
}

export const StickyPurchaseBar: React.FC<StickyPurchaseBarProps> = ({ onCtaClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show only after scrolling 450px past the hero
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible || isDismissed) return null;

  return (
    <div className="sticky-purchase-bar" role="complementary" aria-label="Quick purchase bar">
      <div className="sticky-bar-inner">
        {/* Left: Product & Price */}
        <div className="sticky-info-group">
          <div className="sticky-title-wrap">
            <span className="sticky-product-name">{LANDING_CONFIG.brand.courseName}</span>
            <span className="sticky-tag">Lifetime</span>
          </div>
          <div className="sticky-price-wrap">
            <span className="sticky-price-symbol">₹</span>
            <span className="sticky-price-value">299</span>
            <span className="sticky-price-note">one-time</span>
          </div>
        </div>

        {/* Right: CTA & Dismiss */}
        <div className="sticky-action-group">
          <button 
            onClick={onCtaClick}
            className="btn-sticky-cta"
          >
            <span>GET ACCESS</span>
            <ArrowRight size={15} />
          </button>
          
          <button 
            onClick={() => setIsDismissed(true)}
            className="sticky-dismiss-btn"
            aria-label="Dismiss quick bar"
            title="Dismiss bar"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
