import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Lock, CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react';
import { LANDING_CONFIG } from '../../config/landingConfig';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMsg('Please enter your full name and valid email address.');
      return;
    }
    setErrorMsg('');
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({ name: '', email: '', phone: '' });
    onClose();
  };

  return (
    <div className="popup-backdrop checkout-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="checkout-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="checkout-modal-header">
          <div className="header-info">
            <span className="checkout-badge">CHECKOUT INTEGRATION POINT</span>
            <h3 className="checkout-title">ObjectFlow Playbook Enrollment</h3>
          </div>
          <button onClick={onClose} className="close-btn" aria-label="Close checkout modal">
            <X size={20} />
          </button>
        </div>

        <div className="checkout-modal-body">
          {isSubmitted ? (
            <div className="checkout-submitted-state">
              <div className="success-icon-box">
                <CheckCircle2 size={48} className="text-green" />
              </div>
              <h4 className="submitted-title">Priority Spot Recorded!</h4>
              <p className="submitted-text">
                Thank you, <strong>{formData.name}</strong>. Your interest in the <strong>ObjectFlow Playbook</strong> (₹299 Lifetime Offer) has been recorded for <strong>{formData.email}</strong>.
              </p>
              <div className="submitted-notice-box">
                <p className="notice-sub">
                  As this is the frontend demonstration build, Razorpay & UPI payment webhooks are being connected next. You will be among the first to receive direct checkout access when live!
                </p>
              </div>
              <button onClick={handleReset} className="btn-primary-cta w-full mt-4">
                Done & Return to Page
              </button>
            </div>
          ) : (
            <>
              {/* Order Summary Box */}
              <div className="checkout-summary-box">
                <div className="summary-row">
                  <div className="summary-item-info">
                    <span className="item-title">{LANDING_CONFIG.brand.courseName}</span>
                    <span className="item-desc">{LANDING_CONFIG.brand.courseSubtitle} · Lifetime Access</span>
                  </div>
                  <div className="summary-price-col">
                    <span className="price-amount">₹299</span>
                    <span className="price-type">One-time</span>
                  </div>
                </div>

                <div className="summary-sub-row">
                  <span>Course Access Entitlement</span>
                  <span className="text-green font-semibold">Included</span>
                </div>
                <div className="summary-sub-row">
                  <span>All 5 Workflow Stages & Prompts</span>
                  <span className="text-green font-semibold">Included</span>
                </div>
                <div className="summary-total-row">
                  <span>Total Due Today:</span>
                  <span className="total-highlight">₹299</span>
                </div>
              </div>

              {/* Developer / Deployment Architecture Notice */}
              <div className="checkout-dev-notice">
                <div className="notice-header">
                  <AlertCircle size={16} className="text-green flex-shrink-0" />
                  <span>Frontend Integration Point</span>
                </div>
                <p className="notice-content">
                  This checkout interface is prepared for upcoming Razorpay / UPI gateway integration. Fill your details below to test the client-side flow.
                </p>
              </div>

              {/* Customer Input Form */}
              <form onSubmit={handleSubmit} className="checkout-form">
                {errorMsg && (
                  <div className="checkout-error-banner">
                    {errorMsg}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="student-name">Full Name *</label>
                  <input
                    id="student-name"
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="student-email">Email Address * (For Course Access)</label>
                  <input
                    id="student-email"
                    type="email"
                    required
                    placeholder="e.g. rahul@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="student-phone">WhatsApp / Mobile Number (Optional)</label>
                  <input
                    id="student-phone"
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input"
                  />
                </div>

                <button type="submit" className="btn-primary-cta glow-pulse w-full mt-2">
                  <span>CONTINUE TO PAYMENT (₹299)</span>
                  <ArrowRight size={17} />
                </button>
              </form>

              <div className="checkout-trust-footer">
                <div className="trust-item">
                  <ShieldCheck size={14} className="text-green" />
                  <span>256-Bit SSL Encrypted</span>
                </div>
                <div className="trust-item">
                  <Lock size={14} className="text-green" />
                  <span>No Recurring Charges</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
