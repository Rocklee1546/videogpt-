import React, { useState, useEffect } from 'react';
import { 
  Search, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Clock, 
  ArrowLeft, 
  X, 
  FileText, 
  RefreshCw
} from 'lucide-react';
import type { EnrollmentRecord, PaymentVerificationStatus } from '../types/enrollment';
import { enrollmentService } from '../services/enrollmentService';

interface AdminVerificationDashboardProps {
  onBackToSales: () => void;
}

export const AdminVerificationDashboard: React.FC<AdminVerificationDashboardProps> = ({
  onBackToSales
}) => {
  const [enrollments, setEnrollments] = useState<EnrollmentRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | PaymentVerificationStatus>('ALL');
  const [selectedRecord, setSelectedRecord] = useState<EnrollmentRecord | null>(null);
  const [viewScreenshotUrl, setViewScreenshotUrl] = useState<string | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  const loadData = () => {
    const list = enrollmentService.getAllEnrollments();
    setEnrollments(list);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleVerify = (id: string) => {
    const note = adminNoteInput.trim() || 'Payment verified against UPI bank account statement.';
    const updated = enrollmentService.updateStatus(id, 'VERIFIED', note, 'Admin (Gokul Ravi)');
    if (updated) {
      loadData();
      setActionSuccessMsg(`Enrollment ${updated.referenceId} has been successfully VERIFIED! Customer credentials dispatched via WhatsApp & Email.`);
      setSelectedRecord(null);
      setAdminNoteInput('');
      setTimeout(() => setActionSuccessMsg(''), 5000);
    }
  };

  const handleReject = (id: string) => {
    const note = adminNoteInput.trim() || 'Payment screenshot could not be matched with bank statement.';
    const updated = enrollmentService.updateStatus(id, 'REJECTED', note, 'Admin (Gokul Ravi)');
    if (updated) {
      loadData();
      setActionSuccessMsg(`Enrollment ${updated.referenceId} marked as REJECTED.`);
      setSelectedRecord(null);
      setAdminNoteInput('');
      setTimeout(() => setActionSuccessMsg(''), 5000);
    }
  };

  const filtered = enrollments.filter((item: EnrollmentRecord) => {
    const matchesSearch = 
      item.referenceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.whatsappNumber.includes(searchQuery);

    const matchesStatus = statusFilter === 'ALL' || item.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = enrollments.filter((e: EnrollmentRecord) => e.paymentStatus === 'PENDING_VERIFICATION').length;
  const verifiedCount = enrollments.filter((e: EnrollmentRecord) => e.paymentStatus === 'VERIFIED').length;
  const totalRevenue = verifiedCount * 299;

  return (
    <div className="admin-dashboard-root">
      
      {/* Top Navbar */}
      <header className="admin-nav-header">
        <div className="admin-nav-inner">
          <div className="admin-brand-lockup">
            <span className="admin-badge-pill">ADMIN PANEL</span>
            <h1 className="admin-title">ScaleVixDigital Payment Verification</h1>
          </div>
          <button onClick={onBackToSales} className="btn-admin-back">
            <ArrowLeft size={16} />
            <span>Back to Website</span>
          </button>
        </div>
      </header>

      <main className="admin-main-container">
        
        {/* KPI Stats Bar */}
        <div className="admin-kpi-grid">
          <div className="kpi-card">
            <span className="kpi-label">Total Submissions</span>
            <span className="kpi-value">{enrollments.length}</span>
          </div>
          <div className="kpi-card highlight-pending">
            <span className="kpi-label">Pending Verification</span>
            <span className="kpi-value text-amber">{pendingCount}</span>
          </div>
          <div className="kpi-card highlight-verified">
            <span className="kpi-label">Verified Enrollees</span>
            <span className="kpi-value text-green">{verifiedCount}</span>
          </div>
          <div className="kpi-card">
            <span className="kpi-label">Verified Revenue</span>
            <span className="kpi-value price-green">₹{totalRevenue.toLocaleString()}</span>
          </div>
        </div>

        {/* Success Alert Banner */}
        {actionSuccessMsg && (
          <div className="admin-alert-banner success">
            <CheckCircle2 size={18} />
            <span>{actionSuccessMsg}</span>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="admin-filter-bar">
          <div className="search-input-wrap">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search by Reference ID, Name, Email, or WhatsApp..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-search-input"
            />
          </div>

          <div className="filter-buttons-group">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`filter-btn ${statusFilter === 'ALL' ? 'active' : ''}`}
            >
              All ({enrollments.length})
            </button>
            <button
              onClick={() => setStatusFilter('PENDING_VERIFICATION')}
              className={`filter-btn ${statusFilter === 'PENDING_VERIFICATION' ? 'active' : ''}`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setStatusFilter('VERIFIED')}
              className={`filter-btn ${statusFilter === 'VERIFIED' ? 'active' : ''}`}
            >
              Verified ({verifiedCount})
            </button>
            <button
              onClick={() => setStatusFilter('REJECTED')}
              className={`filter-btn ${statusFilter === 'REJECTED' ? 'active' : ''}`}
            >
              Rejected
            </button>
          </div>

          <button onClick={loadData} className="btn-refresh-data" title="Reload submissions">
            <RefreshCw size={15} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Enrollments Table */}
        <div className="admin-table-card">
          <div className="admin-table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ref ID</th>
                  <th>Student Info</th>
                  <th>WhatsApp</th>
                  <th>Location</th>
                  <th>Course & Fee</th>
                  <th>Submitted At</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="empty-table-cell">
                      No enrollment records found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item.id} className={`status-row-${item.paymentStatus.toLowerCase()}`}>
                      <td>
                        <strong className="table-ref-code">{item.referenceId}</strong>
                      </td>
                      <td>
                        <div className="student-info-col">
                          <span className="student-name">{item.customerName}</span>
                          <span className="student-email">{item.email}</span>
                        </div>
                      </td>
                      <td>
                        <span className="student-phone">{item.whatsappNumber}</span>
                      </td>
                      <td>
                        <span className="student-location">{item.location}</span>
                      </td>
                      <td>
                        <div className="course-fee-col">
                          <span className="course-name-tag">ObjectFlow</span>
                          <span className="course-fee">₹{item.amountSnapshot}</span>
                        </div>
                      </td>
                      <td>
                        <span className="table-timestamp">
                          {new Date(item.submittedAt).toLocaleDateString('en-IN', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </td>
                      <td>
                        <span className={`admin-status-pill ${item.paymentStatus.toLowerCase()}`}>
                          {item.paymentStatus === 'PENDING_VERIFICATION' && <Clock size={12} />}
                          {item.paymentStatus === 'VERIFIED' && <CheckCircle2 size={12} />}
                          {item.paymentStatus === 'REJECTED' && <XCircle size={12} />}
                          <span>{item.paymentStatus.replace('_', ' ')}</span>
                        </span>
                      </td>
                      <td>
                        <div className="admin-action-btn-group">
                          {item.paymentScreenshotDataUrl ? (
                            <button
                              onClick={() => setViewScreenshotUrl(item.paymentScreenshotDataUrl || null)}
                              className="btn-view-screenshot"
                              title="View Payment Screenshot"
                            >
                              <Eye size={14} />
                              <span>Receipt</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => alert(`Receipt File: ${item.paymentScreenshotFileName || 'Uploaded'}`)}
                              className="btn-view-screenshot secondary"
                              title="Receipt file attached"
                            >
                              <FileText size={14} />
                              <span>File</span>
                            </button>
                          )}

                          <button
                            onClick={() => setSelectedRecord(item)}
                            className="btn-review-item"
                          >
                            Review
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Review Modal / Drawer */}
      {selectedRecord && (
        <div className="popup-backdrop admin-modal-backdrop" onClick={() => setSelectedRecord(null)}>
          <div className="admin-review-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <div className="modal-title-col">
                <span className="modal-ref-tag">{selectedRecord.referenceId}</span>
                <h3>Review Payment Submission</h3>
              </div>
              <button onClick={() => setSelectedRecord(null)} className="close-btn">
                <X size={20} />
              </button>
            </div>

            <div className="modal-body-content">
              
              <div className="review-meta-grid">
                <div>
                  <label>Customer Name:</label>
                  <strong>{selectedRecord.customerName}</strong>
                </div>
                <div>
                  <label>Email Address:</label>
                  <strong>{selectedRecord.email}</strong>
                </div>
                <div>
                  <label>WhatsApp Number:</label>
                  <strong>{selectedRecord.whatsappNumber}</strong>
                </div>
                <div>
                  <label>Location:</label>
                  <strong>{selectedRecord.location}</strong>
                </div>
                <div>
                  <label>Course Fee:</label>
                  <strong className="price-green">₹{selectedRecord.amountSnapshot}.00 (Manual UPI)</strong>
                </div>
                <div>
                  <label>Current Status:</label>
                  <span className={`admin-status-pill ${selectedRecord.paymentStatus.toLowerCase()}`}>
                    {selectedRecord.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Screenshot Preview in Review Modal */}
              <div className="review-screenshot-box">
                <label className="section-sub-label">Uploaded Receipt Screenshot:</label>
                {selectedRecord.paymentScreenshotDataUrl ? (
                  <img 
                    src={selectedRecord.paymentScreenshotDataUrl} 
                    alt="Payment Screenshot" 
                    className="review-receipt-preview"
                  />
                ) : (
                  <div className="no-preview-box">
                    <FileText size={32} />
                    <span>File attached: {selectedRecord.paymentScreenshotFileName} ({(selectedRecord.paymentScreenshotFileSize ? selectedRecord.paymentScreenshotFileSize / 1024 : 0).toFixed(1)} KB)</span>
                  </div>
                )}
              </div>

              {/* Admin Review Note Input */}
              <div className="admin-note-form-group">
                <label htmlFor="admin-note">Reviewer Note / UPI Transaction Ref:</label>
                <textarea
                  id="admin-note"
                  rows={2}
                  placeholder="Enter verified bank transaction ID or note (e.g. Verified on GPay 8098791513 statement)..."
                  value={adminNoteInput}
                  onChange={(e) => setAdminNoteInput(e.target.value)}
                  className="admin-textarea"
                />
              </div>

              {/* Action Buttons */}
              <div className="review-actions-row">
                <button
                  onClick={() => handleReject(selectedRecord.id)}
                  className="btn-reject-action"
                >
                  <XCircle size={16} />
                  <span>Reject Submission</span>
                </button>

                <button
                  onClick={() => handleVerify(selectedRecord.id)}
                  className="btn-verify-action"
                >
                  <CheckCircle2 size={16} />
                  <span>Verify Payment & Send Access</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Full Size Screenshot Lightbox */}
      {viewScreenshotUrl && (
        <div className="popup-backdrop lightbox-backdrop" onClick={() => setViewScreenshotUrl(null)}>
          <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setViewScreenshotUrl(null)} className="lightbox-close-btn">
              <X size={24} />
            </button>
            <img src={viewScreenshotUrl} alt="Payment Receipt Full View" className="lightbox-image" />
          </div>
        </div>
      )}

    </div>
  );
};
