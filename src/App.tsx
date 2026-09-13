import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Pricing } from './pages/Pricing';
import { Examples } from './pages/Examples';
import { Interview } from './pages/Interview';
import { Specification } from './pages/Specification';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsConditions } from './pages/TermsConditions';
import { NotFound } from './pages/NotFound';
import { Auth } from './pages/Auth';
import { AuthProvider } from './context/AuthContext';
import { InterviewProvider } from './context/InterviewContext';
import { PaymentReturn } from './pages/PaymentReturn';
import { OrderPage } from './pages/OrderPage';
import { Settings } from './pages/Settings';
import { RefundPolicy } from './pages/RefundPolicy';
import { Contact } from './pages/Contact';

const ScrollToAnchor = () => {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToAnchor />
        <div className="min-h-screen bg-[#050505] text-white selection:bg-orange-500/30 font-sans overflow-x-hidden">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/examples" element={<Examples />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/specification" element={<InterviewProvider><Specification /></InterviewProvider>} />
            <Route path="/login" element={<Auth mode="login" />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/signup" element={<Auth mode="signup" />} />
            <Route path="/forgot-password" element={<Auth mode="forgot" />} />
            <Route path="/reset-password" element={<Auth mode="reset" />} />
            <Route path="/payment-success" element={<PaymentReturn />} />
            <Route path="/payment-cancelled" element={<PaymentReturn cancelled />} />
            <Route path="/payment/success" element={<PaymentReturn />} />
            <Route path="/payment/cancelled" element={<PaymentReturn cancelled />} />
            <Route path="/order/:orderId" element={<OrderPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
