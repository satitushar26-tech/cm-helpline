import React, { useState, useEffect } from 'react';
import { Bell, Pause, Play, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const AnnouncementStrip: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { language } = useLanguage();

  const announcementsEn = [
    'Dial Toll-Free 1905 for 24x7 Free Citizen Grievance Registration — Your Voice, Our Priority.',
    'PRAYAS 2026 Innovation: Voice input assistance in English, Hindi, Garhwali, Kumaoni & Jaunsari now live.',
    'Samadhan Diwas: Special public grievance review meetings held every Tuesday at all 13 District Headquarters.',
    'Citizen Advisory: Please attach supporting photos or PDF documents during grievance registration for faster resolution.',
  ];

  const announcementsHi = [
    'हेल्पलाइन नंबर 1905 पर 24x7 निःशुल्क शिकायत दर्ज कराएं — आपकी समस्या, हमारी प्राथमिकता।',
    'PRAYAS 2026 हैकाथॉन प्रोटोटाइप: अब अंग्रेजी, हिन्दी, गढ़वाली, कुमाऊँनी एवं जौनसारी भाषा सहायता एवं AI ड्राफ्टिंग उपलब्ध।',
    'जनता दर्शन एवं समाधान दिवस: प्रत्येक मंगलवार को जिला मुख्यालयों में जनसमस्याओं की विशेष समीक्षा।',
    'नागरिक ध्यान दें: शिकायत दर्ज करते समय फोटो अथवा पीडीएफ साक्ष्य अवश्य संलग्न करें ताकि त्वरित निस्तारण हो सके।',
  ];

  const announcements = language === 'en' ? announcementsEn : announcementsHi;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, announcements.length]);

  return (
    <div className="bg-gov-navyDark text-slate-200 border-y border-slate-800 my-8 py-2.5 px-4 shadow-inner">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
        {/* Label badge */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="bg-gov-saffron text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded tracking-wide uppercase flex items-center gap-1">
            <Bell className="w-3 h-3 text-slate-950" />
            {language === 'en' ? 'LATEST UPDATE' : 'नवीनतम सूचना'}
          </span>
          <span className="hidden sm:inline bg-slate-800 text-amber-400 text-[10px] px-1.5 py-0.5 rounded border border-slate-700 font-mono">
            SAMPLE ANNOUNCEMENT — DEMO
          </span>
        </div>

        {/* Moving / Fading Announcement */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex-1 overflow-hidden font-medium text-slate-100 transition-all duration-300 px-2"
        >
          <p className="truncate flex items-center gap-1.5 animate-in fade-in">
            <ChevronRight className="w-3.5 h-3.5 text-gov-saffron flex-shrink-0" />
            <span>{announcements[currentIndex % announcements.length]}</span>
          </p>
        </div>

        {/* Pause / Play Control */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? 'Resume Announcements' : 'Pause Announcements'}
            title={isPaused ? 'Play' : 'Pause'}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
