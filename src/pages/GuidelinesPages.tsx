import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, Map, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const PrivacyPolicyPage: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12" id="main-content">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6 text-xs text-slate-700 leading-relaxed">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-[10px] bg-orange-50 text-gov-orangeDark border border-orange-200 px-2.5 py-1 rounded-full font-bold">
            {isEn ? 'Data Privacy' : 'गोपनीयता नीति'}
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2 font-devanagari">
            {isEn
              ? 'Citizen Data Privacy & Protection Policy'
              : 'नागरिक डेटा गोपनीयता एवं सुरक्षा नीति (Privacy Policy)'}
          </h1>
          <p className="text-slate-400 text-xs">
            {isEn ? 'Last Updated: PRAYAS 2026' : 'अंतिम अद्यतन: 2026'}
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-bold text-sm text-slate-900 font-devanagari">
            {isEn ? '1. Citizen Data Protection Commitment' : '1. नागरिक डेटा संरक्षण संकल्प'}
          </h2>
          <p>
            {isEn
              ? 'Smart CM Helpline Uttarakhand 1905 respects citizen privacy. Information collected during grievance registration (such as name, mobile number, district, and location) is solely utilized for complaint resolution, forwarding to responsible nodal officers, and verification calls.'
              : 'मुख्यमंत्री हेल्पलाइन 1905 नागरिकों की व्यक्तिगत गोपनीयता का पूर्ण सम्मान करती है। शिकायत दर्ज करते समय एकत्र की जाने वाली जानकारी (जैसे नाम, मोबाइल नंबर, जनपद एवं स्थान) का उपयोग केवल शिकायत निवारण, संबंधित विभाग को प्रेषण एवं सत्यापन कॉल हेतु किया जाता है।'}
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-bold text-sm text-slate-900 font-devanagari">
            {isEn ? '2. No Sensitive Data or Aadhaar Required' : '2. आधार अथवा संवेदनशील जानकारी का संकलन निषेध'}
          </h2>
          <p>
            {isEn
              ? 'The Helpline never requests sensitive biometric data, banking credentials, passwords, or Aadhaar details. Citizen phone numbers are masked on public interfaces (e.g. 98****3210).'
              : 'हेल्पलाइन पोर्टल कभी भी नागरिकों से उनका आधार नंबर, बैंक खाता पासवर्ड अथवा बायोमेट्रिक डेटा नहीं मांगता है। मोबाइल नंबर सार्वजनिक रूप से प्रदर्शित नहीं किया जाता (उदा. 98****3210 मास्क किया जाता है)।'}
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-bold text-sm text-slate-900 font-devanagari">
            {isEn ? '3. PRAYAS 2026 Prototype Notice' : '3. PRAYAS 2026 प्रोटोटाइप स्पष्टीकरण'}
          </h2>
          <p>
            {isEn
              ? 'This web application has been developed as an interactive demonstration prototype for the PRAYAS 2026 Hackathon. Any test grievances lodged in this demo are stored locally in the browser/client-side demo state.'
              : 'यह वेब एप्लीकेशन PRAYAS 2026 हैकाथॉन प्रदर्शन हेतु बनाई गई है। इसमें दर्ज कोई भी डेमो शिकायत आधिकारिक सरकारी सर्वर पर प्रेषित नहीं होती है।'}
          </p>
        </div>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12" id="main-content">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6 text-xs text-slate-700 leading-relaxed">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-[10px] bg-orange-50 text-gov-orangeDark border border-orange-200 px-2.5 py-1 rounded-full font-bold">
            {isEn ? 'Terms & Usage' : 'नियम व शर्तें'}
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2 font-devanagari">
            {isEn
              ? 'Terms & Conditions of Service'
              : 'उपयोग के नियम एवं शर्तें (Terms & Conditions)'}
          </h1>
          <p className="text-slate-400 text-xs">
            {isEn ? 'Last Updated: PRAYAS 2026' : 'अंतिम अद्यतन: 2026'}
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-bold text-sm text-slate-900 font-devanagari">
            {isEn ? '1. Bona Fide Public Grievances' : '1. जनहित शिकायतें'}
          </h2>
          <p>
            {isEn
              ? 'Citizens are requested to submit genuine public or administrative grievances. Lodging malicious, abusive, or knowingly fabricated complaints is strictly prohibited.'
              : 'नागरिकों से अनुरोध है कि केवल वास्तविक सार्वजनिक अथवा व्यक्तिगत प्रशासनिक समस्याओं को ही दर्ज कराएं। असत्य अथवा भ्रामक जानकारी दर्ज करना वर्जित है।'}
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-bold text-sm text-slate-900 font-devanagari">
            {isEn ? '2. Sub-Judice & RTI Matters' : '2. न्यायिक विचाराधीन मामले'}
          </h2>
          <p>
            {isEn
              ? 'Matters pending before courts of law (sub-judice), matters under arbitration, or Right to Information (RTI) applications fall outside the jurisdiction of the CM Helpline 1905.'
              : 'माननीय न्यायालय में विचाराधीन (Sub-judice) अथवा आरटीआई (RTI) से संबंधित विषयों को हेल्पलाइन 1905 के क्षेत्राधिकार से बाहर माना जाता है।'}
          </p>
        </div>
      </div>
    </div>
  );
};

export const SitemapPage: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12" id="main-content">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6 text-xs text-slate-700">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-[10px] bg-orange-50 text-gov-orangeDark border border-orange-200 px-2.5 py-1 rounded-full font-bold">
            {isEn ? 'Portal Architecture' : 'संरचना'}
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2 font-devanagari">
            {isEn ? 'Complete Portal Sitemap' : 'पोर्टल साइटमैप (Sitemap)'}
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-slate-900 font-devanagari">
              {isEn ? 'Citizen Services' : 'मुख्य पृष्ठ एवं सेवाएं'}
            </h3>
            <ul className="space-y-1.5 pl-2 border-l border-orange-200">
              <li><Link to="/" className="text-gov-orange hover:text-gov-orangeDark hover:underline">{isEn ? 'Home' : 'मुख्य पृष्ठ'}</Link></li>
              <li><Link to="/register" className="text-gov-orange hover:text-gov-orangeDark hover:underline">{isEn ? 'Register Grievance' : 'शिकायत दर्ज करें'}</Link></li>
              <li><Link to="/track" className="text-gov-orange hover:text-gov-orangeDark hover:underline">{isEn ? 'Track Grievance' : 'शिकायत ट्रैक करें'}</Link></li>
              <li><Link to="/send-reminder" className="text-gov-orange hover:text-gov-orangeDark hover:underline">{isEn ? 'Send Reminder' : 'अनुस्मारक भेजें'}</Link></li>
              <li><Link to="/feedback" className="text-gov-orange hover:text-gov-orangeDark hover:underline">{isEn ? 'Citizen Feedback' : 'नागरिक फीडबैक'}</Link></li>
              <li><Link to="/public-demand" className="text-gov-orange hover:text-gov-orangeDark hover:underline">{isEn ? 'Public Demand' : 'सार्वजनिक मांग'}</Link></li>
              <li><Link to="/public-suggestion" className="text-gov-orange hover:text-gov-orangeDark hover:underline">{isEn ? 'Public Suggestion' : 'सार्वजनिक सुझाव'}</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-sm text-slate-900 font-devanagari">
              {isEn ? 'Directories & Schemes' : 'निर्देशिका एवं योजनाएं'}
            </h3>
            <ul className="space-y-1.5 pl-2 border-l border-orange-200">
              <li><Link to="/schemes" className="text-gov-orange hover:text-gov-orangeDark hover:underline">{isEn ? 'Government Schemes' : 'सरकारी योजनाएं'}</Link></li>
              <li><Link to="/departments" className="text-gov-orange hover:text-gov-orangeDark hover:underline">{isEn ? 'Departments Directory' : 'विभाग निर्देशिका'}</Link></li>
              <li><Link to="/districts" className="text-gov-orange hover:text-gov-orangeDark hover:underline">{isEn ? '13 Districts Portals' : '13 जनपद पोर्टल'}</Link></li>
              <li><Link to="/about" className="text-gov-orange hover:text-gov-orangeDark hover:underline">{isEn ? 'About Us' : 'हमारे बारे में'}</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-sm text-slate-900 font-devanagari">
              {isEn ? 'Dashboards & Admin' : 'पोर्टल एवं प्रशासक'}
            </h3>
            <ul className="space-y-1.5 pl-2 border-l border-orange-200">
              <li><Link to="/citizen/dashboard" className="text-gov-orange hover:text-gov-orangeDark hover:underline">{isEn ? 'Citizen Dashboard' : 'नागरिक डैशबोर्ड'}</Link></li>
              <li><Link to="/officer/dashboard" className="text-gov-orange hover:text-gov-orangeDark hover:underline">{isEn ? 'Officer Dashboard' : 'अधिकारी डैशबोर्ड'}</Link></li>
              <li><Link to="/state-admin" className="text-gov-orange hover:text-gov-orangeDark hover:underline">{isEn ? 'State Analytics' : 'राज्य एनालिटिक्स'}</Link></li>
              <li><Link to="/help" className="text-gov-orange hover:text-gov-orangeDark hover:underline">{isEn ? 'Help & FAQs' : 'सहायता व FAQs'}</Link></li>
              <li><Link to="/contact" className="text-gov-orange hover:text-gov-orangeDark hover:underline">{isEn ? 'Contact Us' : 'संपर्क निर्देशिका'}</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
