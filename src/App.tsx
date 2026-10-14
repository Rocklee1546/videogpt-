import { useState, useEffect } from 'react';
import { LandingPage } from './landing/LandingPage';
import { CoursePlaybook } from './course/CoursePlaybook';
import { CheckoutPage } from './landing/components/CheckoutPage';
import { ConfirmationPage } from './landing/components/ConfirmationPage';
import { AdminVerificationDashboard } from './admin/AdminVerificationDashboard';
import type { EnrollmentFormData, EnrollmentRecord } from './types/enrollment';

type AppView = 'sales' | 'checkout' | 'confirmation' | 'admin' | 'course';

const DEFAULT_FORM_DATA: EnrollmentFormData = {
  fullName: 'Gokul Ravi',
  email: 'gokul@scalevix.com',
  whatsapp: '+91 8098791513',
  location: 'Chennai, Tamil Nadu'
};

export function App() {
  const [currentView, setCurrentView] = useState<AppView>(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      const path = window.location.pathname;
      const hash = window.location.hash;

      if (
        search.includes('view=admin') || 
        path.startsWith('/admin') || 
        hash === '#admin'
      ) {
        return 'admin';
      }

      if (
        search.includes('view=checkout') || 
        path.startsWith('/checkout') || 
        hash === '#checkout'
      ) {
        return 'checkout';
      }

      if (
        search.includes('view=confirmation') || 
        path.startsWith('/confirmation') || 
        hash === '#confirmation'
      ) {
        return 'confirmation';
      }

      if (
        search.includes('view=course') || 
        search.includes('view=playbook') || 
        path.startsWith('/course') || 
        path.startsWith('/playbook') || 
        hash === '#course' || 
        hash === '#playbook'
      ) {
        return 'course';
      }
    }
    return 'sales';
  });

  const [enrollmentData, setEnrollmentData] = useState<EnrollmentFormData>(() => {
    try {
      const cached = sessionStorage.getItem('scalevix_pending_enrollment');
      if (cached) return JSON.parse(cached);
    } catch {
      // ignore
    }
    return DEFAULT_FORM_DATA;
  });

  const [submittedRecord, setSubmittedRecord] = useState<EnrollmentRecord | null>(() => {
    try {
      const cached = sessionStorage.getItem('scalevix_last_submission');
      if (cached) return JSON.parse(cached);
    } catch {
      // ignore
    }
    return null;
  });

  // Keep browser history and URL in sync
  useEffect(() => {
    const handlePopState = () => {
      const search = window.location.search;
      const path = window.location.pathname;
      const hash = window.location.hash;

      if (search.includes('view=admin') || path.startsWith('/admin') || hash === '#admin') {
        setCurrentView('admin');
      } else if (search.includes('view=checkout') || path.startsWith('/checkout') || hash === '#checkout') {
        setCurrentView('checkout');
      } else if (search.includes('view=confirmation') || path.startsWith('/confirmation') || hash === '#confirmation') {
        setCurrentView('confirmation');
      } else if (search.includes('view=course') || path.startsWith('/course') || hash === '#course') {
        setCurrentView('course');
      } else {
        setCurrentView('sales');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (view: AppView, queryParam: string = '') => {
    setCurrentView(view);
    const newPath = view === 'sales' ? '/' : `/?view=${view}${queryParam ? `&${queryParam}` : ''}`;
    window.history.pushState({ view }, '', newPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToCheckout = (data: EnrollmentFormData) => {
    setEnrollmentData(data);
    try {
      sessionStorage.setItem('scalevix_pending_enrollment', JSON.stringify(data));
    } catch {
      // ignore
    }
    navigateTo('checkout');
  };

  const handlePaymentSubmitted = (record: EnrollmentRecord) => {
    setSubmittedRecord(record);
    try {
      sessionStorage.setItem('scalevix_last_submission', JSON.stringify(record));
    } catch {
      // ignore
    }
    navigateTo('confirmation', `ref=${record.referenceId}`);
  };

  const handleBackToSales = () => {
    navigateTo('sales');
  };

  const handleExploreCourse = () => {
    navigateTo('course');
  };

  const handleOpenAdmin = () => {
    navigateTo('admin');
  };

  // Render respective views
  if (currentView === 'admin') {
    return <AdminVerificationDashboard onBackToSales={handleBackToSales} />;
  }

  if (currentView === 'checkout') {
    return (
      <CheckoutPage
        initialFormData={enrollmentData}
        onBackToSales={handleBackToSales}
        onEditDetails={handleBackToSales}
        onPaymentSubmitted={handlePaymentSubmitted}
      />
    );
  }

  if (currentView === 'confirmation' && submittedRecord) {
    return (
      <ConfirmationPage
        record={submittedRecord}
        onBackToSales={handleBackToSales}
        onExploreCourse={handleExploreCourse}
        onOpenAdmin={handleOpenAdmin}
      />
    );
  }

  if (currentView === 'course') {
    return <CoursePlaybook onBackToSales={handleBackToSales} />;
  }

  return (
    <LandingPage 
      onProceedToCheckout={handleProceedToCheckout} 
    />
  );
}

export default App;
