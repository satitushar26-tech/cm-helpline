import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  CheckCircle,
  Users,
  Search,
  MessageSquarePlus,
  BookOpen,
  ArrowUpRight,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';

export const SixCardDashboard: React.FC = () => {
  const { complaints } = useStore();
  const { t, language } = useLanguage();

  // Dynamic calculations on top of illustrative demo base
  const resolvedCount = complaints.filter((c) => c.status === 'RESOLVED').length;
  const inProgressCount = complaints.filter((c) => c.status === 'ACTION_IN_PROGRESS').length;

  const demoBaseTotal = 248920 + complaints.length;
  const demoBaseResolved = 236470 + resolvedCount;
  const demoLiveOnline = 1420;

  return (
    <section className="max-w-7xl mx-auto px-4 my-10" aria-label="Helpline Statistics and Quick Services">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-gov-navy">
              {language === 'en'
                ? 'CM Helpline Live Statistics & Quick Services'
                : 'सीएम हेल्पलाइन सांख्यिकी एवं त्वरित सेवाएं'}
            </h2>
            <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
              DEMO DATA
            </span>
          </div>
          <p className="text-xs text-slate-500">
            {language === 'en'
              ? 'Transparent, real-time grievance redressal performance across Uttarakhand (Illustrative Demonstration Data)'
              : 'राज्य स्तर पर पारदर्शी जन शिकायत निस्तारण की वास्तविक-समय प्रगति (प्रोटोटाइप डेटा)'}
          </p>
        </div>

        <Link
          to="/state-admin"
          className="text-xs font-bold text-gov-blue hover:text-gov-navy flex items-center gap-1 hover:underline"
        >
          <span>{language === 'en' ? 'View Detailed State Analytics' : 'विस्तृत राज्य एनालिटिक्स देखें'}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Card 1: Total Complaints */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex items-start justify-between group">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              {t('statTotalRegistered')}
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-gov-navy tracking-tight">
              {demoBaseTotal.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-slate-400">
              {language === 'en'
                ? 'Total public grievances registered across all 13 districts'
                : 'सभी 13 जनपदों से कुल प्राप्त जन समस्याएं'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-gov-blue flex items-center justify-center group-hover:scale-105 transition-transform">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Total Resolved Complaints */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex items-start justify-between group">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-gov-green"></span>
              {t('statTotalResolved')}
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-gov-green tracking-tight">
              {demoBaseResolved.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-slate-400">
              {language === 'en' ? 'Average Resolution Rate: ' : 'औसत समाधान दर: '}
              <strong className="text-emerald-700 font-bold">95.0%</strong>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-gov-green flex items-center justify-center group-hover:scale-105 transition-transform">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Online Active Citizens */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex items-start justify-between group">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              {t('statOnlineUsers')}
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-950 tracking-tight">
              {demoLiveOnline.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-slate-400">
              {language === 'en'
                ? 'Citizens currently active on portal & mobile app'
                : 'वर्तमान में पोर्टल व ऐप पर सक्रिय नागरिक'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Action Shortcut - Complaint Status */}
        <Link
          to="/track"
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-gov-blue transition-all flex items-start justify-between group"
        >
          <div className="space-y-1">
            <span className="text-xs font-bold text-gov-blue uppercase tracking-wide">
              {t('statComplaintStatus')}
            </span>
            <h3 className="text-lg font-bold text-gov-navy group-hover:text-gov-blue transition-colors">
              {language === 'en' ? 'Quick Status Check' : 'स्थिति तुरंत जांचें'}
            </h3>
            <p className="text-[11px] text-slate-500">
              {language === 'en'
                ? 'Search by Complaint ID or Registered Mobile'
                : 'रेफरेंस संख्या अथवा मोबाइल नंबर दर्ज करें'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-gov-blue flex items-center justify-center group-hover:scale-110 group-hover:bg-gov-blue group-hover:text-white transition-all">
            <Search className="w-6 h-6" />
          </div>
        </Link>

        {/* Card 5: Action Shortcut - Register Grievance / Demand / Suggestion */}
        <Link
          to="/register"
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-400 transition-all flex items-start justify-between group"
        >
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">
              {language === 'en' ? 'Citizen Participation' : 'नागरिक सहभागिता'}
            </span>
            <h3 className="text-lg font-bold text-gov-navy group-hover:text-amber-600 transition-colors">
              {language === 'en' ? 'Complaint / Demand / Suggestion' : 'शिकायत / मांग / सुझाव'}
            </h3>
            <p className="text-[11px] text-slate-500">
              {language === 'en'
                ? 'Register online with instant demo acknowledgment'
                : 'ऑनलाइन दर्ज करें एवं त्वरित पावती प्राप्त करें'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-gov-saffron flex items-center justify-center group-hover:scale-110 group-hover:bg-gov-saffron group-hover:text-slate-950 transition-all">
            <MessageSquarePlus className="w-6 h-6" />
          </div>
        </Link>

        {/* Card 6: Action Shortcut - Govt Schemes */}
        <Link
          to="/schemes"
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-gov-green transition-all flex items-start justify-between group"
        >
          <div className="space-y-1">
            <span className="text-xs font-bold text-gov-green uppercase tracking-wide">
              {language === 'en' ? 'Welfare Programs' : 'कल्याणकारी कार्यक्रम'}
            </span>
            <h3 className="text-lg font-bold text-gov-navy group-hover:text-gov-green transition-colors">
              {language === 'en' ? 'Government Schemes' : 'सरकारी योजनाएं'}
            </h3>
            <p className="text-[11px] text-slate-500">
              {language === 'en'
                ? 'Ayushman, Gaura Kanya, Kisan Kalyan, MSY'
                : 'आयुष्मान, गौरा कन्या, किसान कल्याण आदि'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-gov-green flex items-center justify-center group-hover:scale-110 group-hover:bg-gov-green group-hover:text-white transition-all">
            <BookOpen className="w-6 h-6" />
          </div>
        </Link>
      </div>
    </section>
  );
};
