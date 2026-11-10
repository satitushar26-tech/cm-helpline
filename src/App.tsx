import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';

import { DemoDisclaimerBanner } from './components/layout/DemoDisclaimerBanner';
import { UtilityBar } from './components/layout/UtilityBar';
import { BrandingHeader } from './components/layout/BrandingHeader';
import { MainNavbar } from './components/layout/MainNavbar';
import { Footer } from './components/layout/Footer';
import { MobileBottomBar } from './components/layout/MobileBottomBar';
import { WhatsAppContactWidget } from './components/common/WhatsAppContactWidget';

import { HomePage } from './pages/HomePage';
import { RegisterComplaintPage } from './pages/RegisterComplaintPage';
import { TrackComplaintPage } from './pages/TrackComplaintPage';
import { SendReminderPage } from './pages/SendReminderPage';
import { PublicDemandPage } from './pages/PublicDemandPage';
import { PublicSuggestionPage } from './pages/PublicSuggestionPage';
import { SchemesPage } from './pages/SchemesPage';
import { DepartmentDirectoryPage } from './pages/DepartmentDirectoryPage';
import { DistrictDirectoryPage } from './pages/DistrictDirectoryPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { CitizenDashboardPage } from './pages/CitizenDashboardPage';
import { OfficerDashboardPage } from './pages/OfficerDashboardPage';
import { StateAdminDashboardPage } from './pages/StateAdminDashboardPage';
import { HelpFaqPage } from './pages/HelpFaqPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage, TermsPage, SitemapPage } from './pages/GuidelinesPages';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <AuthProvider>
          <StoreProvider>
            <Router>
              <div className="min-h-screen flex flex-col bg-[#FFFAF5] text-[#243044]">
                {/* PRAYAS 2026 Prototype Top Notice */}
                <DemoDisclaimerBanner />

                {/* 3-Layer Government Header (White & Light-Orange Design) */}
                <header className="w-full">
                  <UtilityBar />
                  <BrandingHeader />
                  <MainNavbar />
                </header>

                {/* Main Dynamic View */}
                <main className="flex-1 w-full pb-16 lg:pb-0">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<RegisterComplaintPage />} />
                    <Route path="/track" element={<TrackComplaintPage />} />
                    <Route path="/send-reminder" element={<SendReminderPage />} />
                    <Route path="/public-demand" element={<PublicDemandPage />} />
                    <Route path="/public-suggestion" element={<PublicSuggestionPage />} />
                    <Route path="/schemes" element={<SchemesPage />} />
                    <Route path="/departments" element={<DepartmentDirectoryPage />} />
                    <Route path="/districts" element={<DistrictDirectoryPage />} />
                    <Route path="/feedback" element={<FeedbackPage />} />
                    <Route path="/citizen/dashboard" element={<CitizenDashboardPage />} />
                    <Route path="/officer/dashboard" element={<OfficerDashboardPage />} />
                    <Route path="/state-admin" element={<StateAdminDashboardPage />} />
                    <Route path="/help" element={<HelpFaqPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/privacy" element={<PrivacyPolicyPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/sitemap" element={<SitemapPage />} />
                    {/* Fallback to Home */}
                    <Route path="*" element={<HomePage />} />
                  </Routes>
                </main>

                {/* Floating WhatsApp-Based Contact Assistance Widget */}
                <WhatsAppContactWidget />

                {/* Mobile Bottom Navigation Bar */}
                <MobileBottomBar />

                {/* Government Footer */}
                <Footer />
              </div>
            </Router>
          </StoreProvider>
        </AuthProvider>
      </AccessibilityProvider>
    </LanguageProvider>
  );
};

export default App;
