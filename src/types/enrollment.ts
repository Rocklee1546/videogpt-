/**
 * Enrollment and Manual UPI Payment Gateway Types
 * ScaleVixDigital / THYNK Digital Solutions
 */

export interface EnrollmentFormData {
  fullName: string;
  email: string;
  whatsapp: string;
  location: string;
}

export type PaymentVerificationStatus = 'PENDING_VERIFICATION' | 'VERIFIED' | 'REJECTED';

export interface EnrollmentRecord {
  id: string;
  referenceId: string;
  customerName: string;
  email: string;
  whatsappNumber: string;
  location: string;
  courseId: string;
  courseNameSnapshot: string;
  amountSnapshot: number; // in INR
  currency: string;
  paymentMethod: 'MANUAL_UPI';
  paymentStatus: PaymentVerificationStatus;
  paymentScreenshotStorageKey?: string;
  paymentScreenshotDataUrl?: string;
  paymentScreenshotFileName?: string;
  paymentScreenshotFileSize?: number;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  adminNote?: string;
  verifiedAt?: string;
}

export interface UPIConfig {
  phoneNumber: string;
  upiId: string;
  recipientName: string;
  coursePrice: number;
  currencySymbol: string;
  supportedApps: string[];
}

export const DEFAULT_UPI_CONFIG: UPIConfig = {
  phoneNumber: '8098791513',
  upiId: '8098791513@okbizaxis',
  recipientName: 'ScaleVixDigital / Gokul Ravi',
  coursePrice: 299,
  currencySymbol: '₹',
  supportedApps: ['Google Pay', 'Paytm', 'PhonePe', 'BHIM', 'Amazon Pay']
};
