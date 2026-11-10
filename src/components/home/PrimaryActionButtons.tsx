import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Search, PhoneCall, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const PrimaryActionButtons: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section className="relative -mt-6 z-20 max-w-7xl mx-auto px-4" aria-label="Primary Citizen Services">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
        {/* Button 1: Register Complaint (Major Highlight) */}
        <Link
          to="/register"
          className="md:col-span-5 group relative overflow-hidden bg-gradient-to-r from-gov-navy to-gov-blue text-white p-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-amber-400 hover:-translate-y-0.5 flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 text-amber-400" />{' '}
              {language === 'en' ? 'Primary Citizen Service' : 'मुख्य नागरिक सेवा'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-200 transition-colors">
              {language === 'en' ? 'Register Complaint' : 'शिकायत दर्ज करें'}
            </h3>
            <p className="text-xs text-slate-200 font-medium">
              {language === 'en'
                ? 'शिकायत दर्ज करें (4 Simple Steps • Instant Demo ID)'
                : 'Register New Grievance (4 आसान चरण)'}
            </p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-md">
            <PlusCircle className="w-8 h-8" />
          </div>
        </Link>

        {/* Button 2: Track Complaint */}
        <Link
          to="/track"
          className="md:col-span-4 group bg-white text-slate-800 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-gov-blue hover:-translate-y-0.5 flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="inline-block text-[11px] font-bold text-gov-blue uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
              {language === 'en' ? 'Live Status Tracking' : 'लाइव स्थिति ट्रैकिंग'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-gov-navy group-hover:text-gov-blue transition-colors">
              {language === 'en' ? 'Track Complaint' : 'स्थिति देखें'}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {language === 'en'
                ? 'शिकायत की स्थिति जांचें (8-Stage Timeline)'
                : 'Track Complaint Status (8-चरणीय टाइमलाइन)'}
            </p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-gov-blue flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-gov-blue group-hover:text-white transition-all shadow-xs border border-blue-100">
            <Search className="w-7 h-7" />
          </div>
        </Link>

        {/* Button 3: Call 1905 Helpline */}
        <a
          href="tel:1905"
          className="md:col-span-3 group bg-gradient-to-br from-emerald-700 to-gov-green text-white p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-between border border-emerald-600"
        >
          <div className="space-y-1">
            <span className="inline-block text-[11px] font-bold text-emerald-200 uppercase tracking-wider bg-white/15 px-2 py-0.5 rounded-full">
              {language === 'en' ? '24x7 Toll-Free Helpline' : '24x7 निःशुल्क कॉल'}
            </span>
            <h3 className="text-2xl font-black tracking-wider text-white">
              1905
            </h3>
            <p className="text-xs text-emerald-100 font-medium">
              {language === 'en' ? 'Dial Helpline Directly' : 'हेल्पलाइन पर बात करें'}
            </p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-white/20 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-white group-hover:text-emerald-700 transition-all shadow-xs">
            <PhoneCall className="w-7 h-7 animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
};
