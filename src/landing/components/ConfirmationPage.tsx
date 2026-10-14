import React, { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  Copy, 
  Check, 
  ArrowRight, 
  BookOpen
} from 'lucide-react';
import type { EnrollmentRecord } from '../../types/enrollment';
import { LandingFooter } from './LandingFooter';

interface ConfirmationPageProps {
  record: EnrollmentRecord;
  onBackToSales: () => void;
  onExploreCourse: () => void;
  onOpenAdmin?: () => void;
}

export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({
  record,
  onBackToSales,
  onExploreCourse,
  onOpenAdmin
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyRef = () => {
    navigator.clipboard.writeText(record.referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedDate = new Date(record.submittedAt).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  return (
    <div className="confirmation-page-root">
      
      {/* Top Stepper with Step 2 Active */}
      <header className="checkout-top-header">
        <div className="checkout-header-inner">
          <div className="checkout-progress-stepper">
            <div className="progress-step-item completed">
              <span className="step-num-badge">✓</span>
              <span className="step-label">Checkout</span>
            </div>
            <div className="progress-step-line completed" />
            <div className="progress-step-item active">
              <span className="step-num-badge">2</span>
              <span className="step-label">Order Confirmation</span>
            </div>
            <div className="progress-step-line" />
            <div className="progress-step-item">
              <span className="step-num-badge">3</span>
              <span className="step-label">Instant Access</span>
            </div>
          </div>
        </div>
      </header>

      {/* Confirmation Content Container */}
      <main className="confirmation-main-container">
        <div className="confirmation-card">
          
          {/* Success Check Header */}
          <div className="confirmation-hero-badge">
            <div className="success-circle-icon">
              <CheckCircle size={56} className="text-green check-bounce" />
            </div>
            <h1 className="confirmation-title">Thank You!</h1>
            <p className="confirmation-subtitle">
              Your enrollment request has been submitted successfully.
            </p>
          </div>

          {/* Reference & Status Pill */}
          <div className="reference-status-banner">
            <div className="ref-item">
              <span className="ref-lbl">REFERENCE ID</span>
              <div className="ref-val-row">
                <strong className="ref-code">{record.referenceId}</strong>
                <button 
                  onClick={handleCopyRef} 
                  className="btn-copy-ref" 
                  title="Copy Reference ID"
                  type="button"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            <div className="status-item">
              <span className="ref-lbl">PAYMENT STATUS</span>
              <div className="status-pill-badge pending">
                <Clock size={14} className="spin-slow" />
                <span>Pending Verification</span>
              </div>
            </div>
          </div>

          {/* Submission Details Card */}
          <div className="confirmation-details-card">
            <h3 className="card-section-title">Submission Details</h3>
            
            <div className="details-grid">
              <div className="detail-row">
                <span className="detail-label">Student Name:</span>
                <span className="detail-value">{record.customerName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email Address:</span>
                <span className="detail-value">{record.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">WhatsApp Number:</span>
                <span className="detail-value">{record.whatsappNumber}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Location:</span>
                <span className="detail-value">{record.location}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Course:</span>
                <span className="detail-value font-semibold">{record.courseNameSnapshot}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Amount Paid:</span>
                <span className="detail-value price-green font-bold">₹{record.amountSnapshot}.00</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Payment Method:</span>
                <span className="detail-value">Manual UPI (8098791513)</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Submission Date:</span>
                <span className="detail-value">{formattedDate}</span>
              </div>
            </div>
          </div>

          {/* Verification Notice Card */}
          <div className="verification-notice-box">
            <h4 className="notice-heading">What Happens Next?</h4>
            <p className="notice-body">
              Your payment screenshot and enrollment details have been received and are awaiting verification.
              Our team will review the submitted information and payment evidence. Once the payment has been verified, your course access credentials will be shared through WhatsApp and email.
            </p>
            
            <div className="next-steps-timeline">
              <div className="timeline-item">
                <div className="timeline-node">1</div>
                <div className="timeline-content">
                  <strong>Verification Review</strong>
                  <span>Our admin team verifies your UPI transaction within 1–2 hours.</span>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-node">2</div>
                <div className="timeline-content">
                  <strong>WhatsApp & Email Dispatch</strong>
                  <span>Direct course credentials & login link delivered to your contact info.</span>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-node">3</div>
                <div className="timeline-content">
                  <strong>Instant Playbook Access</strong>
                  <span>Unlock all 5 workflow stages, templates, and video prompts for lifetime.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="confirmation-actions-row">
            <button 
              onClick={onBackToSales}
              className="btn-back-home"
              type="button"
            >
              <span>Back to Website</span>
            </button>

            <button 
              onClick={onExploreCourse}
              className="btn-explore-preview"
              type="button"
            >
              <BookOpen size={16} />
              <span>Preview Course Playbook</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Support & Admin Testing Bar */}
          <div className="confirmation-footer-note">
            <p>
              Need immediate help? Reach us on WhatsApp at <strong>+91 8098791513</strong>.
            </p>
            {onOpenAdmin && (
              <button 
                onClick={onOpenAdmin} 
                className="admin-quick-link"
                type="button"
              >
                🔐 Open Admin Verification Panel (Demonstration Mode)
              </button>
            )}
          </div>

        </div>
      </main>

      <LandingFooter />

    </div>
  );
};
