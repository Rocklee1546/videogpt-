import React, { useEffect } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface OfferPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onGetAccess: () => void;
}

export const OfferPopup: React.FC<OfferPopupProps> = ({ isOpen, onClose, onGetAccess }) => {
  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="popup-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="popup-title">
      <div className="popup-card-content" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={onClose} 
          className="popup-close-btn"
          aria-label="Close offer popup"
        >
          <X size={20} />
        </button>

        <div className="popup-header-badge">
          <Sparkles size={14} className="text-dark" />
          <span>SPECIAL COURSE OFFER</span>
        </div>

        <h3 id="popup-title" className="popup-headline">
          YOUR NEXT VIDEO IDEA STARTS HERE
        </h3>

        <p className="popup-description">
          Explore the ObjectFlow Playbook and learn a guided workflow for creating AI talking-object videos.
        </p>

        {/* Price Tag Box */}
        <div className="popup-price-callout">
          <div className="popup-offer-label">GET LIFETIME COURSE ACCESS FOR</div>
          <div className="popup-price-val">
            <span className="currency">₹</span>
            <span className="amount">299</span>
            <span className="suffix">ONE-TIME</span>
          </div>
        </div>

        {/* Benefits list */}
        <div className="popup-perks-list">
          <div className="perk-item">
            <CheckCircle2 size={15} className="text-green flex-shrink-0" />
            <span>Complete 5-stage creation roadmap</span>
          </div>
          <div className="perk-item">
            <CheckCircle2 size={15} className="text-green flex-shrink-0" />
            <span>Proven Director prompts & model workflows</span>
          </div>
          <div className="perk-item">
            <CheckCircle2 size={15} className="text-green flex-shrink-0" />
            <span>Lifetime access · Revisit anytime</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="popup-actions-col">
          <button 
            onClick={() => {
              onClose();
              onGetAccess();
            }} 
            className="btn-primary-cta glow-pulse w-full text-center"
          >
            <span>GET OBJECTFLOW — ₹299</span>
            <ArrowRight size={16} />
          </button>

          <button 
            onClick={onClose} 
            className="popup-secondary-btn"
          >
            CONTINUE EXPLORING
          </button>
        </div>
      </div>
    </div>
  );
};
