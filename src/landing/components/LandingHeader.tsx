import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

interface LandingHeaderProps {
  onCtaClick: () => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({ onCtaClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Urgent Announcement Banner */}
      <div className="announcement-banner">
        <div className="banner-content">
          <span className="banner-badge">SPECIAL LAUNCH OFFER</span>
          <span className="banner-text">
            ObjectFlow Playbook — AI Viral Video Creation is now available for just <strong>₹299</strong> (One-time payment)!
          </span>
          <button onClick={onCtaClick} className="banner-action-link">
            Claim Offer <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`landing-nav-header ${isScrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-container">
          {/* Desktop Nav Links */}
          <nav className="nav-links-desktop">
            <button onClick={() => scrollTo('problem')} className="nav-link-btn">Why ObjectFlow</button>
            <button onClick={() => scrollTo('what-you-learn')} className="nav-link-btn">Curriculum</button>
            <button onClick={() => scrollTo('five-stages')} className="nav-link-btn">5-Stage Workflow</button>
            <button onClick={() => scrollTo('inside-course')} className="nav-link-btn">Inside Course</button>
            <button onClick={() => scrollTo('pricing')} className="nav-link-btn">Offer (₹299)</button>
            <button onClick={() => scrollTo('faq')} className="nav-link-btn">FAQ</button>
          </nav>

          {/* Right Action Buttons */}
          <div className="nav-actions">
            <button 
              onClick={onCtaClick}
              className="btn-nav-primary"
            >
              Get Access — ₹299
            </button>
            <button 
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu-dropdown">
            <button onClick={() => scrollTo('problem')} className="mobile-nav-link">Why ObjectFlow</button>
            <button onClick={() => scrollTo('what-you-learn')} className="mobile-nav-link">What You'll Learn</button>
            <button onClick={() => scrollTo('five-stages')} className="mobile-nav-link">5-Stage Workflow</button>
            <button onClick={() => scrollTo('inside-course')} className="mobile-nav-link">Inside Course Workspace</button>
            <button onClick={() => scrollTo('audience')} className="mobile-nav-link">Who It's For</button>
            <button onClick={() => scrollTo('pricing')} className="mobile-nav-link">₹299 Price Offer</button>
            <button onClick={() => scrollTo('faq')} className="mobile-nav-link">Frequently Asked Questions</button>
            <div className="mobile-menu-cta">
              <button 
                onClick={() => { setMobileMenuOpen(false); onCtaClick(); }}
                className="btn-primary-cta w-full"
              >
                GET LIFETIME ACCESS — ₹299
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
