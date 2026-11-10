import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Calendar, ExternalLink, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface InitiativeItem {
  id: string;
  badgeEn: string;
  badgeHi: string;
  dateEn: string;
  dateHi: string;
  headlineEn: string;
  headlineHi: string;
  descriptionEn: string;
  descriptionHi: string;
  imageUrl: string;
  link: string;
}

export const LatestInitiativesBanner: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const [currentIndex, setCurrentIndex] = useState(0);

  const initiatives: InitiativeItem[] = [
    {
      id: 'init-1',
      badgeEn: 'Service Modernization',
      badgeHi: 'सेवा आधुनिकीकरण',
      dateEn: 'February 2026',
      dateHi: 'फरवरी 2026',
      headlineEn: 'Smart CM Helpline 1905: AI-Driven Grievance Categorization & Single-Window Redressal',
      headlineHi: 'स्मार्ट सीएम हेल्पलाइन 1905: एआई-सक्षम समस्या वर्गीकरण एवं त्वरित सिंगल-विंडो निवारण',
      descriptionEn:
        'Implementation of intelligent automated routing to directly connect citizen complaints with the designated field officer across all 14 state public service departments.',
      descriptionHi:
        'नागरिकों की शिकायतों को स्वतः सही विभाग एवं क्षेत्रीय नोडल अधिकारी तक पहुंचाने हेतु उन्नत डिजिटल व्यवस्था।',
      imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=80',
      link: '/about',
    },
    {
      id: 'init-2',
      badgeEn: 'Citizen Empowerment',
      badgeHi: 'नागरिक सशक्तिकरण',
      dateEn: 'January 2026',
      dateHi: 'जनवरी 2026',
      headlineEn: 'Right to Reopen: Empowering Citizens to Request Re-inspection of Unresolved Issues',
      headlineHi: 'पुनः खोलने का अधिकार: असंतुष्ट होने पर नागरिक द्वारा दोबारा स्थलीय निरीक्षण का अनुरोध',
      descriptionEn:
        'A landmark accountability workflow enabling citizens to reject incomplete field repairs and escalate the case directly to Level 3 HOD and District Administration.',
      descriptionHi:
        'यदि मौके पर कार्य अधूरा या गुणवत्ताहीन पाया जाता है, तो नागरिक एक क्लिक पर शिकायत दोबारा खोल सकते हैं।',
      imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=700&q=80',
      link: '/help',
    },
    {
      id: 'init-3',
      badgeEn: 'Hill Region Access',
      badgeHi: 'पर्वतीय पहुंच',
      dateEn: 'January 2026',
      dateHi: 'जनवरी 2026',
      headlineEn: 'Low-Bandwidth 2G/3G Data Saver Mode for Remote Himalayan Villages',
      headlineHi: 'सुदूर पर्वतीय गांवों हेतु कम-बैंडविड्थ 2जी/3जी डेटा सेवर मोड सक्रिय',
      descriptionEn:
        'Optimized text-first responsive architecture designed to function smoothly across hilly terrains with intermittent network coverage.',
      descriptionHi:
        'कमजोर नेटवर्क वाले दुर्गम क्षेत्रों में भी नागरिक बिना रुकावट के अपनी शिकायत दर्ज एवं ट्रैक कर सकते हैं।',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80',
      link: '/about',
    },
  ];

  const next = () => setCurrentIndex((prev) => (prev + 1) % initiatives.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + initiatives.length) % initiatives.length);

  return (
    <section className="max-w-7xl mx-auto px-4 my-14" aria-label="Latest Government Initiatives">
      <div className="bg-gradient-to-r from-orange-50 via-white to-orange-50/60 rounded-3xl p-6 sm:p-10 border-2 border-orange-200/80 shadow-md">
        {/* Section Heading & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-gov-orange text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {isEn ? 'Government Initiatives' : 'नवीनतम पहल'}
              </span>
              <span className="text-xs text-slate-400">PRAYAS 2026</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 font-devanagari">
              {isEn
                ? 'Latest Government Initiatives & CM Helpline Updates'
                : 'मुख्यमंत्री हेल्पलाइन – नवीनतम सरकारी पहल एवं अपडेट'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEn
                ? 'Key state governance innovations, grievance management enhancements, and citizen outreach drives'
                : 'सुशासन, जन शिकायत निवारण सुदृढ़ीकरण एवं नागरिक कल्याण की प्रमुख शासकीय योजनाएं'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Previous initiative"
              className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-gov-orange text-slate-700 hover:text-gov-orange transition-colors shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              aria-label="Next initiative"
              className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-gov-orange text-slate-700 hover:text-gov-orange transition-colors shadow-2xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Initiatives 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {initiatives.map((item, index) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between group ${
                index === currentIndex ? 'border-gov-orange shadow-lg ring-2 ring-orange-100' : 'border-slate-200 shadow-2xs'
              }`}
            >
              <div className="space-y-3">
                <div className="relative h-44 rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={isEn ? item.headlineEn : item.headlineHi}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="bg-gov-orange text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-2xs uppercase tracking-wider">
                      {isEn ? item.badgeEn : item.badgeHi}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-gov-orange" />
                  <span>{isEn ? item.dateEn : item.dateHi}</span>
                </div>

                <h3 className="font-black text-sm text-slate-900 group-hover:text-gov-orange transition-colors leading-snug">
                  {isEn ? item.headlineEn : item.headlineHi}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {isEn ? item.descriptionEn : item.descriptionHi}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100">
                <Link
                  to={item.link}
                  className="inline-flex items-center gap-1.5 text-xs font-black text-gov-orange hover:text-gov-orangeDark transition-colors"
                >
                  <span>{isEn ? 'Read Initiative Details' : 'पहल का विवरण पढ़ें'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
