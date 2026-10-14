import React, { useState, useRef } from 'react';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  UploadCloud, 
  ArrowLeft, 
  Lock, 
  ShieldCheck, 
  AlertCircle,
  FileCheck,
  Edit2
} from 'lucide-react';
import type { EnrollmentFormData, EnrollmentRecord } from '../../types/enrollment';
import { DEFAULT_UPI_CONFIG } from '../../types/enrollment';
import { enrollmentService } from '../../services/enrollmentService';
import { LandingFooter } from './LandingFooter';

interface CheckoutPageProps {
  initialFormData: EnrollmentFormData;
  onBackToSales: () => void;
  onEditDetails: () => void;
  onPaymentSubmitted: (record: EnrollmentRecord) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  initialFormData,
  onBackToSales,
  onEditDetails,
  onPaymentSubmitted
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const courseBenefits = [
    'Complete 5-Stage AI Viral Video Creation Playbook',
    'Turn Everyday Objects, Food & Products Into Talking Characters',
    'Full Director Prompts Library for Claude 3.5 & ChatGPT',
    'Google Flow Agent Video Generation Workflow & Settings',
    'CapCut & VN Audio-Sync, Auto-Captions & Sound Effects',
    'Lifetime Course Access + All Future Playbook Updates'
  ];

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(DEFAULT_UPI_CONFIG.phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 5 MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size exceeds 5MB. Please upload a smaller image.');
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    // Validate type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Invalid format. Please upload JPG, PNG, or PDF file.');
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    setUploadError('');
    setSelectedFile(file);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadError('Please select and upload your payment screenshot before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      const record = await enrollmentService.createEnrollment(
        initialFormData,
        selectedFile,
        previewUrl || undefined
      );
      onPaymentSubmitted(record);
    } catch (err) {
      console.error('Failed to submit enrollment:', err);
      setUploadError('Submission failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-page-root">
      
      {/* 1. Top Checkout Breadcrumb Progress Bar (Screenshot 1) */}
      <header className="checkout-top-header">
        <div className="checkout-header-inner">
          <div className="checkout-progress-stepper">
            <div className="progress-step-item active">
              <span className="step-num-badge">1</span>
              <span className="step-label">Checkout</span>
            </div>
            <div className="progress-step-line" />
            <div className="progress-step-item">
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

      {/* 2. Banner with Course Title (Screenshot 1) */}
      <div className="checkout-hero-banner">
        <div className="checkout-banner-container">
          <div className="banner-badge-lockup">
            <span className="banner-tag">10X YOUR CONTENT REACH</span>
            <span className="banner-brand">OBJECTFLOW PLAYBOOK</span>
          </div>
          <h1 className="banner-headline">
            Turn Everyday Objects Into Scroll-Stopping Talking AI Videos
          </h1>
          <p className="banner-subtext">
            Complete Step-By-Step Workflow To Create Viral Videos And Unlock New Business Opportunities.
          </p>
        </div>
      </div>

      {/* 3. Main Two-Column Layout (Screenshots 1, 2, 3) */}
      <main className="checkout-main-content">
        <div className="checkout-layout-grid">

          {/* ================= LEFT COLUMN: CHECKOUT & PAYMENT ================= */}
          <div className="checkout-left-column">
            
            <div className="checkout-card-header-row">
              <h2 className="checkout-heading">Checkout Here</h2>
              
              {/* Trust Badges: McAfee, TRUSTe, Norton style (Screenshot 1) */}
              <div className="checkout-security-seals">
                <div className="seal-badge seal-mcafee">
                  <span className="seal-m">M</span>
                  <div className="seal-text-col">
                    <span className="seal-title">McAfee</span>
                    <span className="seal-sub">SECURE</span>
                  </div>
                </div>
                <div className="seal-badge seal-truste">
                  <span className="seal-t">e</span>
                  <div className="seal-text-col">
                    <span className="seal-title">TRUSTe</span>
                    <span className="seal-sub">VERIFIED</span>
                  </div>
                </div>
                <div className="seal-badge seal-norton">
                  <span className="seal-n">✓</span>
                  <div className="seal-text-col">
                    <span className="seal-title">Norton</span>
                    <span className="seal-sub">SECURED</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 1 & 2 Tabs (Screenshots 1 & 2) */}
            <div className="checkout-steps-bar">
              <div className="step-bar-tab completed">
                <span className="tab-digit">1</span>
                <div className="tab-text">
                  <span className="tab-main">YOUR INFO</span>
                  <span className="tab-sub">ORDER DETAILS</span>
                </div>
              </div>
              <div className="step-bar-tab active">
                <span className="tab-digit">2</span>
                <div className="tab-text">
                  <span className="tab-main">PAYMENT</span>
                  <span className="tab-sub">MANUAL UPI</span>
                </div>
              </div>
            </div>

            {/* Customer Details Summary (Allows quick editing) */}
            <div className="customer-review-summary-card">
              <div className="summary-card-header">
                <span className="summary-title">Customer Information</span>
                <button 
                  onClick={onEditDetails} 
                  className="btn-edit-details"
                  type="button"
                >
                  <Edit2 size={13} />
                  <span>Edit Details</span>
                </button>
              </div>
              <div className="customer-info-grid">
                <div className="info-cell">
                  <span className="info-cell-lbl">Name:</span>
                  <strong className="info-cell-val">{initialFormData.fullName}</strong>
                </div>
                <div className="info-cell">
                  <span className="info-cell-lbl">Email:</span>
                  <strong className="info-cell-val">{initialFormData.email}</strong>
                </div>
                <div className="info-cell">
                  <span className="info-cell-lbl">WhatsApp:</span>
                  <strong className="info-cell-val">{initialFormData.whatsapp}</strong>
                </div>
                <div className="info-cell">
                  <span className="info-cell-lbl">Location:</span>
                  <strong className="info-cell-val">{initialFormData.location}</strong>
                </div>
              </div>
            </div>

            {/* Order Summary Table (Screenshot 2) */}
            <div className="checkout-order-summary-card">
              <div className="table-header-row">
                <span>Item</span>
                <span className="text-center">Quantity</span>
                <span className="text-right">Price</span>
              </div>
              <div className="table-item-row">
                <div className="item-details">
                  <input type="radio" checked readOnly className="radio-dot" />
                  <span className="item-name">ObjectFlow Playbook — Lifetime Access</span>
                </div>
                <span className="item-qty text-center">1</span>
                <span className="item-price text-right">₹{DEFAULT_UPI_CONFIG.coursePrice}.00</span>
              </div>
              <div className="table-divider-line" />
              <div className="order-total-row">
                <span className="total-label">Order Total</span>
                <span className="total-amount">₹{DEFAULT_UPI_CONFIG.coursePrice}.00</span>
              </div>
            </div>

            {/* Manual UPI Payment Card (Screenshot 5 Reference) */}
            <div className="manual-upi-payment-card">
              <div className="upi-card-header">
                <span className="amount-pay-label">AMOUNT TO PAY</span>
                <h3 className="amount-pay-value">₹{DEFAULT_UPI_CONFIG.coursePrice}</h3>
              </div>

              {/* Recipient Phone Number Box with 1-Click Copy */}
              <div className="upi-recipient-box">
                <span className="recipient-tag">PHONEPE / GPAY / PAYTM NUMBER</span>
                <div className="recipient-number-row">
                  <span className="recipient-number">{DEFAULT_UPI_CONFIG.phoneNumber}</span>
                  <button 
                    type="button" 
                    onClick={handleCopyNumber}
                    className={`btn-copy-upi ${copied ? 'copied' : ''}`}
                    title="Copy phone number"
                  >
                    {copied ? (
                      <>
                        <Check size={16} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        <span>Copy Number</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="recipient-name-hint">
                  Recipient: <strong>{DEFAULT_UPI_CONFIG.recipientName}</strong>
                </p>
              </div>

              {/* Supported UPI Apps Pills */}
              <div className="supported-apps-row">
                {DEFAULT_UPI_CONFIG.supportedApps.map((app, idx) => (
                  <span key={idx} className="app-badge-pill">{app}</span>
                ))}
              </div>

              {/* Step-by-Step Instructions (Screenshot 5) */}
              <div className="upi-instructions-list">
                <ol>
                  <li>Open <strong>Google Pay</strong>, <strong>Paytm</strong>, or <strong>PhonePe</strong>.</li>
                  <li>Send the exact fee (<strong>₹{DEFAULT_UPI_CONFIG.coursePrice}</strong>) to the above number: <strong>{DEFAULT_UPI_CONFIG.phoneNumber}</strong>.</li>
                  <li>Complete the payment transaction.</li>
                  <li>Take a clear screenshot of the payment receipt.</li>
                  <li>Upload the screenshot below.</li>
                  <li>Click <strong>Submit Enrollment</strong>.</li>
                </ol>
              </div>

              {/* Screenshot Upload Control (Screenshot 5) */}
              <form onSubmit={handleSubmit} className="screenshot-upload-section">
                <label className="upload-section-title">
                  Upload Payment Screenshot <span className="req-star">*</span>
                </label>
                
                {uploadError && (
                  <div className="upload-error-banner">
                    <AlertCircle size={16} />
                    <span>{uploadError}</span>
                  </div>
                )}

                <div className={`file-upload-dropzone ${selectedFile ? 'has-file' : ''}`}>
                  <input
                    ref={fileInputRef}
                    id="screenshot-input"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,application/pdf"
                    onChange={handleFileChange}
                    className="file-input-hidden"
                  />

                  {selectedFile ? (
                    <div className="selected-file-preview-wrap">
                      {previewUrl ? (
                        <div className="file-thumb-container">
                          <img src={previewUrl} alt="Payment receipt preview" className="file-preview-img" />
                        </div>
                      ) : (
                        <div className="pdf-icon-box">
                          <FileCheck size={36} className="text-green" />
                        </div>
                      )}
                      <div className="file-meta-col">
                        <span className="file-name">{selectedFile.name}</span>
                        <span className="file-size">{(selectedFile.size / 1024).toFixed(1)} KB</span>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="btn-remove-file"
                        >
                          Remove & Choose Another
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label htmlFor="screenshot-input" className="file-picker-label">
                      <UploadCloud size={32} className="upload-cloud-icon" />
                      <div className="picker-text-wrap">
                        <span className="browse-btn-pill">Browse File...</span>
                        <span className="picker-hint">Drag & drop or click to upload screenshot</span>
                        <span className="picker-formats">Accepted formats: JPG, PNG, JPEG, PDF (Max 5MB)</span>
                      </div>
                    </label>
                  )}
                </div>

                {/* Final Submission Buttons (Screenshot 5) */}
                <div className="checkout-action-row">
                  <button
                    type="button"
                    onClick={onBackToSales}
                    className="btn-back-link"
                    disabled={isSubmitting}
                  >
                    <ArrowLeft size={16} />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    className="btn-submit-enrollment"
                    disabled={isSubmitting || !selectedFile}
                  >
                    {isSubmitting ? (
                      <span className="spinner-wrap">Submitting Enrollment...</span>
                    ) : (
                      <>
                        <CheckCircle2 size={19} />
                        <span>Submit Enrollment</span>
                      </>
                    )}
                  </button>
                </div>

              </form>

            </div>

            {/* Trust Footer Note */}
            <div className="checkout-footer-guarantee">
              <Lock size={15} className="text-green" />
              <span>100% Safe Manual UPI Payment · Reviewed by ScaleVixDigital Team</span>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: COURSE POSTER & BENEFITS ================= */}
          <div className="checkout-right-column">
            
            {/* Promotional Poster (Screenshots 1 & 2) */}
            <div className="checkout-poster-wrapper">
              <img 
                src="/objectflow-poster.jpg" 
                alt="ObjectFlow Playbook Course Poster" 
                className="checkout-poster-img"
              />
            </div>

            {/* Individual White Benefits Cards with Green Checks (Screenshot 2) */}
            <div className="checkout-benefits-list">
              {courseBenefits.map((benefit, idx) => (
                <div key={idx} className="benefit-white-card">
                  <div className="benefit-check-icon">
                    <CheckCircle2 size={20} className="check-svg" />
                  </div>
                  <span className="benefit-text">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Support Contact Pill */}
            <div className="checkout-help-card">
              <ShieldCheck size={20} className="text-green flex-shrink-0" />
              <div className="help-text">
                <span className="help-title">Need Help with Payment?</span>
                <span className="help-desc">
                  WhatsApp Support: <strong>+91 8098791513</strong> (Mon–Sun 9 AM – 9 PM)
                </span>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* 4. Footer */}
      <LandingFooter />

    </div>
  );
};
