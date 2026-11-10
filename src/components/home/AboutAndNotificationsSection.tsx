import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Search,
  MessageSquare,
  ArrowRight,
  Bell,
  Calendar,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface NotificationItem {
  id: string;
  dateEn: string;
  dateHi: string;
  categoryEn: string;
  categoryHi: string;
  headlineEn: string;
  headlineHi: string;
  descriptionEn: string;
  descriptionHi: string;
  source: string;
  link: string;
}

export const AboutAndNotificationsSection: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const notifications: NotificationItem[] = [
    {
      id: 'notif-1',
      dateEn: '06 Feb 2026',
      dateHi: '06 फरवरी 2026',
      categoryEn: 'CM Helpline',
      categoryHi: 'सीएम हेल्पलाइन',
      headlineEn: 'Round-the-clock grievance registration for quick resolution of public concerns across Uttarakhand',
      headlineHi: 'उत्तराखण्ड में जनसमस्याओं के त्वरित समाधान हेतु नागरिक हेल्पलाइन सेवा 24 घंटे कार्यरत',
      descriptionEn: 'Citizens across all 13 districts can register complaints regarding roads, water, power, health, and civil services.',
      descriptionHi: 'प्रदेश के समस्त 13 जनपदों के नागरिक सड़क, पेयजल, विद्युत, स्वास्थ्य व नागरिक सेवाओं की समस्या दर्ज करा सकते हैं।',
      source: 'cmhelpline.uk.gov.in',
      link: '/about',
    },
    {
      id: 'notif-2',
      dateEn: '28 Jan 2026',
      dateHi: '28 जनवरी 2026',
      categoryEn: 'Public Service',
      categoryHi: 'जन सेवा पहल',
      headlineEn: 'Right to Reopen Grievance: Higher officer review for complaints not resolved satisfactorily',
      headlineHi: 'पुनः खोलने का अधिकार: असंतोषजनक समाधान पर उच्चाधिकारियों द्वारा केस की समीक्षा',
      descriptionEn: 'If field resolution is deemed inadequate by citizen feedback, cases are escalated for re-inspection.',
      descriptionHi: 'यदि नागरिक समाधान से असंतुष्ट हैं तो केस को वरिष्ठ नोडल अधिकारी के समक्ष दोबारा प्रस्तुत किया जाता है।',
      source: 'it.uk.gov.in',
      link: '/help',
    },
    {
      id: 'notif-3',
      dateEn: '15 Jan 2026',
      dateHi: '15 जनवरी 2026',
      categoryEn: 'Digital Governance',
      categoryHi: 'डिजिटल सुशासन',
      headlineEn: 'Integrated 13 Districts Single-Window Nodal Network active under ITDA Uttarakhand',
      headlineHi: 'आईटीडीए के तत्वावधान में सभी 13 जनपदों का एकीकृत सिंगल विंडो नोडल नेटवर्क सक्रिय',
      descriptionEn: 'Facilitates direct online forwarding of complaints to concerned executive engineers and tehsildars.',
      descriptionHi: 'संबंधित अधिशासी अभियंताओं एवं तहसीलदारों को शिकायतों का सीधा डिजिटल आवंटन एवं समयबद्ध निस्तारण।',
      source: 'itda.uk.gov.in',
      link: '/districts',
    },
    {
      id: 'notif-4',
      dateEn: '04 Jan 2026',
      dateHi: '04 जनवरी 2026',
      categoryEn: 'Citizen Feedback',
      categoryHi: 'नागरिक फीडबैक',
      headlineEn: 'Monthly Samadhan Diwas: Over 95% grievance resolution rate recorded statewide',
      headlineHi: 'मासिक समाधान दिवस: राज्य स्तर पर 95% से अधिक जन शिकायतों का गुणवत्तापूर्ण निस्तारण दर्ज',
      descriptionEn: 'Continuous review of department performance by Chief Minister Secretariat and Chief Secretary.',
      descriptionHi: 'मुख्यमंत्री सचिवालय एवं मुख्य सचिव द्वारा विभागों की मासिक रैंकिंग एवं निस्तारण गुणवत्ता की नियमित समीक्षा।',
      source: 'cm.uk.gov.in',
      link: '/state-admin',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 my-14" aria-label="About Helpline and Notifications">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (55%): About CM Helpline Uttarakhand */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#E9E9E9] shadow-md space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center font-black text-gov-orange text-lg shadow-2xs">
                1905
              </div>
              <div>
                <span className="text-[11px] font-black text-gov-orange uppercase tracking-wider block">
                  {isEn ? 'Uttarakhand Citizen Redressal' : 'उत्तराखण्ड जन समाधान'}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-devanagari">
                  {isEn ? 'About CM Helpline Uttarakhand 1905' : 'मुख्यमंत्री हेल्पलाइन उत्तराखण्ड के बारे में'}
                </h2>
              </div>
            </div>

            {/* Official Uttarakhand Verified Content */}
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {isEn ? (
                <>
                  The Uttarakhand Chief Minister's Helpline 1905 is a government grievance redressal initiative designed to improve public service delivery and facilitate timely resolution of citizen concerns. Citizens can register grievances, submit public demands and suggestions, track complaint progress and provide feedback through the available service channels.
                </>
              ) : (
                <>
                  मुख्यमंत्री हेल्पलाइन 1905 उत्तराखण्ड सरकार की एक पारदर्शी, जवाबदेह और नागरिक-हितैषी जन शिकायत निवारण प्रणाली है। इसका मुख्य उद्देश्य शासन और नागरिक के बीच की दूरी को समाप्त कर प्रत्येक नागरिक की समस्या का त्वरित, समयबद्ध एवं गुणवत्तापूर्ण समाधान सुनिश्चित करना है।
                </>
              )}
            </p>

            {/* Three Feature Highlights with Orange Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="bg-orange-50/60 p-4 rounded-2xl border border-orange-100 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-white text-gov-orange flex items-center justify-center shadow-2xs font-bold">
                  <FileText className="w-4 h-4 text-gov-orange" />
                </div>
                <h4 className="font-black text-slate-900">
                  {isEn ? 'Grievance Registration' : 'नागरिक शिकायत पंजीकरण'}
                </h4>
                <p className="text-[11px] text-slate-600 leading-normal">
                  {isEn ? 'Simple 4-step online filing with evidence upload.' : 'वेब व कॉल सेंटर से आसान पंजीकरण।'}
                </p>
              </div>

              <div className="bg-orange-50/60 p-4 rounded-2xl border border-orange-100 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-white text-gov-orange flex items-center justify-center shadow-2xs font-bold">
                  <Search className="w-4 h-4 text-gov-orange" />
                </div>
                <h4 className="font-black text-slate-900">
                  {isEn ? 'Transparent Tracking' : 'पारदर्शी निगरानी व टाइमलाइन'}
                </h4>
                <p className="text-[11px] text-slate-600 leading-normal">
                  {isEn ? '8-stage visual audit trail with designated nodal officer.' : '8-चरणीय आधिकारिक रिकॉर्ड।'}
                </p>
              </div>

              <div className="bg-orange-50/60 p-4 rounded-2xl border border-orange-100 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-white text-gov-orange flex items-center justify-center shadow-2xs font-bold">
                  <MessageSquare className="w-4 h-4 text-gov-orange" />
                </div>
                <h4 className="font-black text-slate-900">
                  {isEn ? 'Feedback & Demands' : 'फीडबैक एवं जन मांगें'}
                </h4>
                <p className="text-[11px] text-slate-600 leading-normal">
                  {isEn ? 'Star satisfaction rating and community demands.' : 'संतुष्टि रेटिंग व दोबारा खोलने का हक।'}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
            <span className="text-xs font-semibold text-slate-500">
              {isEn ? 'Single-Window Public Grievance Redressal • Government of Uttarakhand' : 'एकल खिड़की जन शिकायत निवारण प्रणाली • उत्तराखण्ड शासन'}
            </span>
            <Link
              to="/about"
              className="bg-gov-orange hover:bg-gov-orangeDark text-white font-black text-xs px-5 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>{isEn ? 'Know More' : 'विस्तार से जानें'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Column (45%): Recent Updates & Notifications */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E9E9] shadow-md space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gov-orange animate-pulse"></div>
              <h3 className="font-black text-base sm:text-lg text-slate-900 font-devanagari">
                {isEn ? 'Recent Updates & Notifications' : 'नवीनतम सूचनाएं एवं अपडेट'}
              </h3>
            </div>
            <span className="text-[10px] bg-orange-50 text-gov-orangeDark font-bold px-2 py-0.5 rounded-full border border-orange-200">
              {isEn ? 'Official Bulletins' : 'शासकीय बुलेटिन'}
            </span>
          </div>

          {/* Notifications List with Orange Separators */}
          <div className="divide-y divide-orange-100 space-y-3">
            {notifications.map((item) => (
              <div key={item.id} className="pt-3 first:pt-0 space-y-1 text-xs group">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gov-orange bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                    {isEn ? item.categoryEn : item.categoryHi}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {isEn ? item.dateEn : item.dateHi}
                  </span>
                </div>

                <h4 className="font-black text-slate-900 group-hover:text-gov-orange transition-colors text-xs sm:text-sm leading-snug">
                  <Link to={item.link}>{isEn ? item.headlineEn : item.headlineHi}</Link>
                </h4>

                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  {isEn ? item.descriptionEn : item.descriptionHi}
                </p>

                <div className="flex items-center justify-between pt-1 text-[10px]">
                  <span className="text-slate-400">
                    Source: <strong className="text-slate-600">{item.source}</strong>
                  </span>
                  <Link
                    to={item.link}
                    className="font-bold text-gov-orange hover:text-gov-orangeDark flex items-center gap-1"
                  >
                    <span>{isEn ? 'Read More' : 'विवरण पढ़ें'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 text-center">
            <Link
              to="/help"
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-orange-50 hover:bg-orange-100 text-gov-orangeDark font-bold text-xs transition-colors border border-orange-200"
            >
              <span>{isEn ? 'View All Notifications' : 'समस्त सूचनाएं देखें'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
