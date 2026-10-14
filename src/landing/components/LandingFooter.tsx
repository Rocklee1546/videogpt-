import React, { useState } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { LANDING_CONFIG } from '../../config/landingConfig';

export const LandingFooter: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'contact' | null>(null);

  return (
    <footer className="landing-footer">
      <div className="section-container footer-container">
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <img 
                src="/thynk-logo.png" 
                alt="THYNK Digital Solution" 
                className="footer-brand-logo-img" 
              />
            </div>
            <p className="footer-course-name">{LANDING_CONFIG.brand.courseName} — {LANDING_CONFIG.brand.courseSubtitle}</p>
            <p className="footer-desc">
              A practical guided playbook for creating AI talking-object videos. Learn the five-stage workflow from character concept to finished clip assembly.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col links-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="#hero">Top of Page</a></li>
              <li><a href="#problem">Why ObjectFlow</a></li>
              <li><a href="#what-you-learn">Curriculum</a></li>
              <li><a href="#five-stages">5 Stages</a></li>
              <li><a href="#pricing">₹299 Offer</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div className="footer-col legal-col">
            <h4 className="footer-col-title">Legal & Trust</h4>
            <ul className="footer-links-list">
              <li>
                <button onClick={() => setActiveModal('privacy')} className="footer-modal-btn">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('terms')} className="footer-modal-btn">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('contact')} className="footer-modal-btn">
                  Contact Support
                </button>
              </li>
            </ul>
            <div className="footer-badge-pill mt-3">
              <ShieldCheck size={14} className="text-green" />
              <span>Verified THYNK Digital Program</span>
            </div>
          </div>
        </div>

        {/* Disclaimer Notice */}
        <div className="footer-disclaimer-box">
          <p className="disclaimer-text">
            <strong>Disclaimer:</strong> The ObjectFlow Playbook teaches a creative video creation workflow. Results depend on individual effort, creativity, and platform distribution. We do not guarantee views, virality, or financial returns. Third-party AI tools mentioned (ChatGPT, Claude, Google Flow, CapCut, VN) are properties of their respective owners and may require independent accounts, credits, or subscription tiers.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © 2026 {LANDING_CONFIG.brand.name}. All Rights Reserved.
          </p>
          <p className="footer-note">
            Lifetime access to your purchased course.
          </p>
        </div>
      </div>

      {/* Info Modals */}
      {activeModal && (
        <div className="info-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="info-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="info-modal-header">
              <h3>
                {activeModal === 'privacy' && 'Privacy Policy'}
                {activeModal === 'terms' && 'Terms and Conditions'}
                {activeModal === 'contact' && 'Contact Support'}
              </h3>
              <button onClick={() => setActiveModal(null)} className="close-btn" aria-label="Close modal">
                <X size={20} />
              </button>
            </div>
            <div className="info-modal-body">
              {activeModal === 'privacy' && (
                <div>
                  <p>At THYNK Digital Solutions, we respect your privacy. We collect minimal information (such as your name and email) solely to grant you access to the ObjectFlow Playbook and send important course updates.</p>
                  <p className="mt-2">We never sell, rent, or share your personal data with third-party marketers. All student data is handled securely according to standard data protection regulations.</p>
                </div>
              )}
              {activeModal === 'terms' && (
                <div>
                  <p>By purchasing the ObjectFlow Playbook (₹299 one-time payment), you receive personal, non-transferable lifetime access to the educational materials and workflow guides contained within the course.</p>
                  <p className="mt-2">Course access is subject to continuous availability of the service. Third-party tools covered (such as Claude, ChatGPT, Google Flow) operate under their own terms of service and usage limitations.</p>
                </div>
              )}
              {activeModal === 'contact' && (
                <div>
                  <p>Have questions about the ObjectFlow Playbook or need assistance with your enrollment?</p>
                  <div className="contact-info-box mt-3">
                    <p><strong>Brand:</strong> {LANDING_CONFIG.brand.name}</p>
                    <p><strong>Course:</strong> {LANDING_CONFIG.brand.courseName}</p>
                    <p><strong>Support Email:</strong> <a href={`mailto:${LANDING_CONFIG.contact.supportEmail}`} className="text-green">{LANDING_CONFIG.contact.supportEmail}</a></p>
                    <p><strong>Response Time:</strong> Typically within 24 business hours.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
