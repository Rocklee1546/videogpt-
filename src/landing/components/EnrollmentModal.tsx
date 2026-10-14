import React, { useState, useEffect } from 'react';
import { X, ArrowRight, User, Mail, Phone, MapPin, AlertCircle, Shield } from 'lucide-react';
import type { EnrollmentFormData } from '../../types/enrollment';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: (data: EnrollmentFormData) => void;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  onProceedToCheckout
}) => {
  const [formData, setFormData] = useState<EnrollmentFormData>({
    fullName: '',
    email: '',
    whatsapp: '',
    location: ''
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  // Real-time validation
  const validateField = (field: keyof EnrollmentFormData, value: string): string => {
    const trimmed = value.trim();
    switch (field) {
      case 'fullName':
        if (!trimmed) return 'Full Name is required.';
        if (trimmed.length < 2) return 'Please enter a valid full name.';
        return '';
      case 'email':
        if (!trimmed) return 'Email address is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
          return 'Please enter a valid email address.';
        }
        return '';
      case 'whatsapp': {
        if (!trimmed) return 'WhatsApp / mobile number is required.';
        // Strip non-digits to test count
        const digits = trimmed.replace(/\D/g, '');
        if (digits.length < 10) {
          return 'Please enter a valid 10-digit mobile number.';
        }
        return '';
      }
      case 'location':
        if (!trimmed) return 'Location (City / State) is required.';
        if (trimmed.length < 2) return 'Please enter your location.';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (field: keyof EnrollmentFormData, val: string) => {
    const updated = { ...formData, [field]: val };
    setFormData(updated);
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, val) }));
    }
  };

  const handleBlur = (field: keyof EnrollmentFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, formData[field]) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {
      fullName: validateField('fullName', formData.fullName),
      email: validateField('email', formData.email),
      whatsapp: validateField('whatsapp', formData.whatsapp),
      location: validateField('location', formData.location)
    };

    setTouched({
      fullName: true,
      email: true,
      whatsapp: true,
      location: true
    });
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((msg) => !!msg);
    if (hasErrors) {
      return;
    }

    // Save and navigate to Step 2 Billing / Payment page
    onProceedToCheckout(formData);
  };

  return (
    <div 
      className="popup-backdrop checkout-modal-backdrop" 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="enrollment-modal-title"
    >
      <div 
        className="enrollment-modal-card" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="enrollment-modal-header">
          <div className="header-info">
            <span className="enrollment-pill-badge">QUICK ENROLLMENT</span>
            <h3 id="enrollment-modal-title" className="enrollment-modal-title">
              Course Enrollment
            </h3>
            <p className="enrollment-modal-subtitle">
              Fill in your details below to begin your access setup.
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="enrollment-close-btn" 
            aria-label="Close enrollment form"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body - Notice NO price or summary is displayed here per Step 1 specs! */}
        <div className="enrollment-modal-body">
          <form onSubmit={handleSubmit} className="enrollment-form" noValidate>
            
            {/* Field 1: Full Name */}
            <div className={`enrollment-form-group ${touched.fullName && errors.fullName ? 'has-error' : ''}`}>
              <label htmlFor="field-fullName" className="enrollment-label">
                Full Name <span className="req-star">*</span>
              </label>
              <div className="input-with-icon">
                <User size={18} className="field-icon" />
                <input
                  id="field-fullName"
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  onBlur={() => handleBlur('fullName')}
                  className="enrollment-input"
                  autoComplete="name"
                />
              </div>
              {touched.fullName && errors.fullName && (
                <p className="inline-error-msg">
                  <AlertCircle size={13} />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* Field 2: Email Address */}
            <div className={`enrollment-form-group ${touched.email && errors.email ? 'has-error' : ''}`}>
              <label htmlFor="field-email" className="enrollment-label">
                Email Address <span className="req-star">*</span>
              </label>
              <div className="input-with-icon">
                <Mail size={18} className="field-icon" />
                <input
                  id="field-email"
                  type="email"
                  required
                  placeholder="e.g. rahul@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className="enrollment-input"
                  autoComplete="email"
                />
              </div>
              {touched.email && errors.email && (
                <p className="inline-error-msg">
                  <AlertCircle size={13} />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Field 3: WhatsApp / Mobile Number */}
            <div className={`enrollment-form-group ${touched.whatsapp && errors.whatsapp ? 'has-error' : ''}`}>
              <label htmlFor="field-whatsapp" className="enrollment-label">
                WhatsApp / Mobile Number <span className="req-star">*</span>
              </label>
              <div className="input-with-icon">
                <Phone size={18} className="field-icon" />
                <input
                  id="field-whatsapp"
                  type="tel"
                  required
                  placeholder="e.g. 98765 43210"
                  value={formData.whatsapp}
                  onChange={(e) => handleChange('whatsapp', e.target.value)}
                  onBlur={() => handleBlur('whatsapp')}
                  className="enrollment-input"
                  autoComplete="tel"
                />
              </div>
              {touched.whatsapp && errors.whatsapp && (
                <p className="inline-error-msg">
                  <AlertCircle size={13} />
                  <span>{errors.whatsapp}</span>
                </p>
              )}
            </div>

            {/* Field 4: Location */}
            <div className={`enrollment-form-group ${touched.location && errors.location ? 'has-error' : ''}`}>
              <label htmlFor="field-location" className="enrollment-label">
                Location <span className="req-star">*</span>
              </label>
              <div className="input-with-icon">
                <MapPin size={18} className="field-icon" />
                <input
                  id="field-location"
                  type="text"
                  required
                  placeholder="e.g. Chennai, Tamil Nadu"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  onBlur={() => handleBlur('location')}
                  className="enrollment-input"
                  autoComplete="address-level2"
                />
              </div>
              {touched.location && errors.location && (
                <p className="inline-error-msg">
                  <AlertCircle size={13} />
                  <span>{errors.location}</span>
                </p>
              )}
            </div>

            {/* Primary CTA: PAY NOW */}
            <button 
              type="submit" 
              className="btn-enrollment-pay-now"
            >
              <span>PAY NOW</span>
              <ArrowRight size={18} className="pay-arrow" />
            </button>
          </form>

          {/* Privacy & Trust micro-copy */}
          <div className="enrollment-trust-footer">
            <Shield size={14} className="text-green" />
            <span>Your information is protected by 256-bit encryption.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
