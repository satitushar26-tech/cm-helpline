import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Volume2, ShieldCheck, Wifi, Eye, UserCheck, PhoneCall } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useAuth } from '../../context/AuthContext';
import { LanguageCode } from '../../types/language';

export const UtilityBar: React.FC = () => {
  const { language, setLanguage, t, languages } = useLanguage();
  const {
    textSize,
    increaseTextSize,
    decreaseTextSize,
    resetTextSize,
    highContrast,
    toggleHighContrast,
    lowBandwidthMode,
    toggleLowBandwidthMode,
  } = useAccessibility();
  const { currentOfficer, isOfficerLoggedIn } = useAuth();
  const isEn = language === 'en';

  return (
    <div className="bg-[#FFF8F2] text-[#243044] text-xs py-1.5 px-4 border-b border-orange-200 select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: State Branding & Skip Link */}
        <div className="flex items-center gap-3">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-gov-orange focus:text-white focus:px-3 focus:py-1 focus:rounded font-semibold"
          >
            {isEn ? 'Skip to Main Content' : 'मुख्य सामग्री पर जाएं'}
          </a>
          <span className="font-bold text-[#243044] tracking-wide flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-gov-orange"></span>
            {isEn ? 'Government of Uttarakhand' : 'उत्तराखण्ड शासन'}
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="hidden md:inline text-[#667085] font-medium">
            {t('primaryTagline')}
          </span>
        </div>

        {/* Right: Accessibility Controls, Low BW, Language & Login */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Text Size Controls */}
          <div
            className="flex items-center bg-white rounded-lg px-2 py-0.5 border border-[#E9E9E9] shadow-2xs"
            title={isEn ? 'Text Size' : 'अक्षर का आकार'}
          >
            <span className="text-[10px] text-slate-500 mr-1.5 font-semibold">A / अ:</span>
            <button
              onClick={decreaseTextSize}
              aria-label={isEn ? 'Decrease Text Size' : 'अक्षर छोटा करें'}
              className="px-1 hover:text-gov-orange font-semibold text-slate-600"
              title="Small (A-)"
            >
              A-
            </button>
            <button
              onClick={resetTextSize}
              aria-label={isEn ? 'Reset Text Size' : 'सामान्य अक्षर आकार'}
              className={`px-1 hover:text-gov-orange font-bold ${textSize === 'normal' ? 'text-gov-orange' : 'text-slate-700'}`}
              title="Normal (A)"
            >
              A
            </button>
            <button
              onClick={increaseTextSize}
              aria-label={isEn ? 'Increase Text Size' : 'अक्षर बड़ा करें'}
              className={`px-1 hover:text-gov-orange font-bold ${textSize === 'larger' ? 'text-gov-orange' : 'text-slate-700'}`}
              title="Large (A+)"
            >
              A+
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={toggleHighContrast}
            aria-label={isEn ? 'Toggle High Contrast' : 'उच्च कंट्रास्ट टॉगल करें'}
            title={isEn ? 'High Contrast Mode' : 'हाई कंट्रास्ट मोड'}
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[11px] font-semibold transition-colors border ${
              highContrast
                ? 'bg-gov-orange text-white border-gov-orange shadow-xs font-bold'
                : 'bg-white hover:bg-orange-50 text-slate-700 border-[#E9E9E9]'
            }`}
          >
            <Eye className="w-3 h-3 text-gov-orange" />
            <span className="hidden sm:inline">{isEn ? 'Contrast' : 'कंट्रास्ट'}</span>
          </button>

          {/* Low Bandwidth Mode (Mountain / Rural friendly) */}
          <button
            onClick={toggleLowBandwidthMode}
            aria-label={isEn ? 'Toggle Data Saver Mode' : 'कम बैंडविड्थ मोड टॉगल करें'}
            title={isEn ? 'Data Saver for 2G/3G in Hill Regions' : 'पर्वतीय व ग्रामीण क्षेत्रों हेतु डेटा सेवर'}
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[11px] font-semibold transition-colors border ${
              lowBandwidthMode
                ? 'bg-gov-green text-white border-gov-green font-semibold'
                : 'bg-white hover:bg-emerald-50 text-slate-700 border-[#E9E9E9]'
            }`}
          >
            <Wifi className="w-3 h-3 text-gov-green" />
            <span className="hidden sm:inline">
              {lowBandwidthMode
                ? isEn ? '2G Saver ON' : 'डेटा सेवर चालू'
                : isEn ? 'Low Data' : 'डेटा सेवर'}
            </span>
          </button>

          {/* Language Switcher Pill */}
          <div className="flex items-center bg-white rounded-lg p-0.5 border border-[#E9E9E9] text-[11px]">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                language === 'en'
                  ? 'bg-gov-orange text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                language === 'hi'
                  ? 'bg-gov-orange text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              हिन्दी
            </button>
          </div>

          {/* Officer Login Link */}
          <Link
            to="/officer/dashboard"
            className="flex items-center gap-1 text-[11px] font-bold text-gov-orange hover:text-gov-orangeDark px-2 py-0.5 rounded hover:bg-orange-50 transition-colors"
          >
            <UserCheck className="w-3 h-3" />
            <span>{isEn ? 'Officer Login' : 'अधिकारी लॉगिन'}</span>
          </Link>

          {/* Contact Us */}
          <Link
            to="/contact"
            className="hidden md:inline text-[11px] font-semibold text-slate-600 hover:text-gov-orange"
          >
            {isEn ? 'Contact Us' : 'संपर्क'}
          </Link>
        </div>
      </div>
    </div>
  );
};
