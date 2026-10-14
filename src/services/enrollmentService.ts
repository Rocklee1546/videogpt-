import type { EnrollmentRecord, EnrollmentFormData, PaymentVerificationStatus } from '../types/enrollment';
import { DEFAULT_UPI_CONFIG } from '../types/enrollment';

const STORAGE_KEY = 'scalevix_course_enrollments';

// Helper to generate unique reference ID
export function generateReferenceId(): string {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `REF-SVD-${randomNum}`;
}

// Initial seed data for demonstration if empty
const INITIAL_DEMO_RECORDS: EnrollmentRecord[] = [
  {
    id: 'rec_init_001',
    referenceId: 'REF-SVD-38914',
    customerName: 'Karthik Raja',
    email: 'karthik.raja@gmail.com',
    whatsappNumber: '+91 98401 23456',
    location: 'Chennai, Tamil Nadu',
    courseId: 'objectflow-playbook',
    courseNameSnapshot: 'ObjectFlow Playbook — AI Viral Video Creation',
    amountSnapshot: 299,
    currency: 'INR',
    paymentMethod: 'MANUAL_UPI',
    paymentStatus: 'VERIFIED',
    paymentScreenshotFileName: 'gpay_receipt_299.jpg',
    paymentScreenshotFileSize: 342150,
    submittedAt: '2026-10-14T10:15:00.000Z',
    reviewedAt: '2026-10-14T11:00:00.000Z',
    reviewedBy: 'Admin (Gokul Ravi)',
    adminNote: 'UPI Ref 429104819 verified on GPay statement. Access credentials dispatched.',
    verifiedAt: '2026-10-14T11:00:00.000Z'
  },
  {
    id: 'rec_init_002',
    referenceId: 'REF-SVD-71209',
    customerName: 'Ananya Sharma',
    email: 'ananya.sharma@outlook.com',
    whatsappNumber: '+91 97112 55432',
    location: 'Bengaluru, Karnataka',
    courseId: 'objectflow-playbook',
    courseNameSnapshot: 'ObjectFlow Playbook — AI Viral Video Creation',
    amountSnapshot: 299,
    currency: 'INR',
    paymentMethod: 'MANUAL_UPI',
    paymentStatus: 'PENDING_VERIFICATION',
    paymentScreenshotFileName: 'phonepe_payment_screenshot.png',
    paymentScreenshotFileSize: 512400,
    submittedAt: '2026-10-14T14:40:00.000Z'
  }
];

export const enrollmentService = {
  // Retrieve all enrollments from localStorage
  getAllEnrollments(): EnrollmentRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_RECORDS));
        return INITIAL_DEMO_RECORDS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_DEMO_RECORDS;
    }
  },

  // Save new enrollment
  async createEnrollment(
    formData: EnrollmentFormData,
    screenshotFile?: File,
    screenshotDataUrl?: string
  ): Promise<EnrollmentRecord> {
    const enrollments = this.getAllEnrollments();
    const referenceId = generateReferenceId();
    const id = `rec_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const newRecord: EnrollmentRecord = {
      id,
      referenceId,
      customerName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      whatsappNumber: formData.whatsapp.trim(),
      location: formData.location.trim(),
      courseId: 'objectflow-playbook',
      courseNameSnapshot: 'ObjectFlow Playbook — AI Viral Video Creation',
      amountSnapshot: DEFAULT_UPI_CONFIG.coursePrice,
      currency: 'INR',
      paymentMethod: 'MANUAL_UPI',
      paymentStatus: 'PENDING_VERIFICATION',
      paymentScreenshotDataUrl: screenshotDataUrl,
      paymentScreenshotFileName: screenshotFile?.name || 'payment_receipt.png',
      paymentScreenshotFileSize: screenshotFile?.size || 0,
      submittedAt: new Date().toISOString()
    };

    // Prepend to list
    const updated = [newRecord, ...enrollments];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage limit reached for large image; saving without full base64 dataUrl', e);
      // If image is too large for localStorage, save record without huge dataUrl
      const lightweightRecord = { ...newRecord, paymentScreenshotDataUrl: undefined };
      const fallbackList = [lightweightRecord, ...enrollments];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fallbackList));
    }

    // Trigger admin notification interface
    this.sendAdminWhatsAppNotification(newRecord);

    return newRecord;
  },

  // Update status (Verify / Reject)
  updateStatus(
    id: string,
    status: PaymentVerificationStatus,
    adminNote?: string,
    reviewedBy: string = 'Admin (ScaleVixDigital)'
  ): EnrollmentRecord | null {
    const list = this.getAllEnrollments();
    const index = list.findIndex((item) => item.id === id || item.referenceId === id);
    if (index === -1) return null;

    const record = list[index];
    record.paymentStatus = status;
    record.reviewedAt = new Date().toISOString();
    record.reviewedBy = reviewedBy;
    if (adminNote) record.adminNote = adminNote;
    if (status === 'VERIFIED') {
      record.verifiedAt = new Date().toISOString();
    }

    list[index] = record;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

    // If verified, trigger customer access notification
    if (status === 'VERIFIED') {
      this.sendCustomerAccessNotification(record);
    }

    return record;
  },

  // WhatsApp Business API integration interface
  sendAdminWhatsAppNotification(record: EnrollmentRecord): void {
    const payload = {
      event: 'NEW_ENROLLMENT_SUBMITTED',
      recipientAdminNumber: DEFAULT_UPI_CONFIG.phoneNumber,
      referenceId: record.referenceId,
      customerName: record.customerName,
      customerEmail: record.email,
      customerWhatsApp: record.whatsappNumber,
      location: record.location,
      amount: `₹${record.amountSnapshot}`,
      submittedAt: record.submittedAt,
      reviewDashboardUrl: `${window.location.origin}/?view=admin&ref=${record.referenceId}`
    };

    // In production, dispatch via WhatsApp Business Cloud API / Twilio
    console.info('[WhatsApp Notification Service] Admin notification payload dispatched:', payload);
  },

  sendCustomerAccessNotification(record: EnrollmentRecord): void {
    const payload = {
      event: 'PAYMENT_VERIFIED_ACCESS_GRANTED',
      customerWhatsApp: record.whatsappNumber,
      customerEmail: record.email,
      customerName: record.customerName,
      referenceId: record.referenceId,
      courseAccessLink: `${window.location.origin}/?view=course&access=granted`,
      message: `Hi ${record.customerName}! Your payment for ObjectFlow Playbook (₹${record.amountSnapshot}) has been verified. Welcome aboard!`
    };

    console.info('[WhatsApp Notification Service] Customer access notification dispatched:', payload);
  }
};
