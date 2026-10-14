import React, { useState, useEffect } from 'react';
import './landing.css';
import { LandingHeader } from './components/LandingHeader';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { WhatYouWillLearn } from './components/WhatYouWillLearn';
import { FiveStagesSection } from './components/FiveStagesSection';
import { InsideCoursePreview } from './components/InsideCoursePreview';
import { TargetAudienceSection } from './components/TargetAudienceSection';
import { WhyObjectFlowSection } from './components/WhyObjectFlowSection';
import { PricingOfferSection } from './components/PricingOfferSection';
import { FaqSection } from './components/FaqSection';

import { LandingFooter } from './components/LandingFooter';
import { StickyPurchaseBar } from './components/StickyPurchaseBar';
import { OfferPopup } from './components/OfferPopup';
import { EnrollmentModal } from './components/EnrollmentModal';
import type { EnrollmentFormData } from '../types/enrollment';

interface LandingPageProps {
  onProceedToCheckout: (data: EnrollmentFormData) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onProceedToCheckout }) => {
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hasPopupTriggered, setHasPopupTriggered] = useState(false);

  // Trigger popup on exit intent or modest 25s delay
  useEffect(() => {
    // Check if popup was already dismissed in this session
    const dismissed = sessionStorage.getItem('objectflow-popup-dismissed');
    if (dismissed) {
      setHasPopupTriggered(true);
      return;
    }

    // 25 second timer
    const timer = setTimeout(() => {
      if (!hasPopupTriggered) {
        setIsPopupOpen(true);
        setHasPopupTriggered(true);
      }
    }, 25000);

    // Desktop exit intent
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !hasPopupTriggered) {
        setIsPopupOpen(true);
        setHasPopupTriggered(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasPopupTriggered]);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    sessionStorage.setItem('objectflow-popup-dismissed', 'true');
  };

  const handleOpenEnrollment = () => {
    setIsEnrollmentOpen(true);
  };

  const handleCloseEnrollment = () => {
    setIsEnrollmentOpen(false);
  };

  const handleProceed = (data: EnrollmentFormData) => {
    setIsEnrollmentOpen(false);
    onProceedToCheckout(data);
  };

  const handleExploreScroll = () => {
    const el = document.getElementById('what-you-learn');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-page-root">
      {/* 1. Header with announcement banner and navigation */}
      <LandingHeader 
        onCtaClick={handleOpenEnrollment}
      />

      {/* 2. Hero Section (Above-the-fold) */}
      <HeroSection 
        onCtaClick={handleOpenEnrollment}
        onExploreClick={handleExploreScroll}
      />

      {/* 3. The Problem and The Opportunity */}
      <ProblemSection 
        onCtaClick={handleOpenEnrollment}
      />

      {/* 4. What You Will Learn (4 Visual Cards) */}
      <WhatYouWillLearn 
        onCtaClick={handleOpenEnrollment}
      />

      {/* 5. The Five-Stage Playbook */}
      <FiveStagesSection 
        onCtaClick={handleOpenEnrollment}
      />

      {/* 6. Show The Real Course (Interactive Inside Preview) */}
      <InsideCoursePreview 
        onCtaClick={handleOpenEnrollment}
      />

      {/* 7. Who Should Learn ObjectFlow? */}
      <TargetAudienceSection />

      {/* 8. Why ObjectFlow? */}
      <WhyObjectFlowSection 
        onCtaClick={handleOpenEnrollment}
      />

      {/* 9. Course Offer and Price (₹299 Major Conversion Card) */}
      <PricingOfferSection 
        onCtaClick={handleOpenEnrollment}
      />

      {/* 10. Frequently Asked Questions (Accordion) */}
      <FaqSection />

      {/* 12. Footer with THYNK Branding & Disclaimers */}
      <LandingFooter />

      {/* 13. Mobile Bottom Sticky Purchase CTA & Floating Bar */}
      <StickyPurchaseBar 
        onCtaClick={handleOpenEnrollment}
      />

      {/* 14. Promotional Offer Popup */}
      <OfferPopup 
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onGetAccess={() => {
          handleClosePopup();
          handleOpenEnrollment();
        }}
      />

      {/* 15. Step 1 Course Enrollment Modal (4 Fields Only, No Price) */}
      <EnrollmentModal 
        isOpen={isEnrollmentOpen}
        onClose={handleCloseEnrollment}
        onProceedToCheckout={handleProceed}
      />
    </div>
  );
};
