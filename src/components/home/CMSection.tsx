import React from 'react';
import { ExternalLink, CheckCircle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const CMSection: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  return (
    <section className="max-w-7xl mx-auto px-4 my-14" aria-label="Hon'ble Chief Minister Uttarakhand">
      <div className="bg-gradient-to-br from-[#FFF3E7] via-[#FFFAF5] to-white rounded-3xl p-6 sm:p-10 border-2 border-orange-200/90 shadow-md overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Portrait Column (Desktop: Left, Mobile: Above) */}
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            <div className="relative w-52 h-64 sm:w-60 sm:h-72 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-gradient-to-b from-orange-100 to-white flex items-end justify-center">
              <img
                src="/images/cm-pushkar-dhami.png"
                alt="Shri Pushkar Singh Dhami"
                className="w-full h-full object-contain object-bottom"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-4 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent">
                <span className="bg-gov-orange text-white font-black text-[10px] px-2.5 py-0.5 rounded-full mb-1">
                  उत्तराखण्ड शासन
                </span>
                <p className="text-xs font-bold text-white">Hon'ble Chief Minister</p>
                <p className="text-sm font-black text-amber-300">Shri Pushkar Singh Dhami</p>
              </div>
            </div>

            <div className="mt-3">
              <h3 className="font-black text-base text-slate-900 font-devanagari">
                माननीय मुख्यमंत्री श्री पुष्कर सिंह धामी
              </h3>
              <p className="text-xs text-gov-orange font-bold">
                Hon'ble Chief Minister, Uttarakhand
              </p>
            </div>
          </div>

          {/* Factual Information Column */}
          <div className="lg:col-span-8 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full text-xs font-bold text-gov-orange border border-orange-200 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-gov-orange" />
              <span>
                {isEn
                  ? 'Citizen Dialogue & Good Governance Initiative'
                  : 'जन-संवाद एवं सुशासन पहल'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {isEn
                ? 'Simplification, Solution, Redressal, and Satisfaction — CM Helpline 1905'
                : 'सरलीकरण, समाधान, निस्तारण और संतुष्टि — मुख्यमंत्री हेल्पलाइन 1905'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {isEn
                ? 'The Government of Uttarakhand has continually strengthened the Chief Minister Helpline 1905 to ensure that the grievance of every citizen from remote Himalayan valleys to urban centers is heard at the highest level of state administration with transparent, time-bound redressal.'
                : 'उत्तराखण्ड सरकार द्वारा राज्य के प्रत्येक नागरिक की समस्या को शासन के उच्चतम स्तर तक पहुंचाने और पारदर्शी समयसीमा में समाधान सुनिश्चित करने के उद्देश्य से मुख्यमंत्री हेल्पलाइन 1905 का निरंतर सुदृढ़ीकरण किया गया है।'}
            </p>

            {/* Feature Cards in White Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="bg-white p-4 rounded-2xl border border-orange-100 shadow-2xs flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-gov-orange flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-slate-900">
                    {isEn ? 'Seamless Grievance Access' : 'सुलभ जन समाधान'}
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    {isEn
                      ? 'Register any government service grievance from home with real-time tracking.'
                      : 'घर बैठे किसी भी नागरिक समस्या का ऑनलाइन पंजीकरण एवं पारदर्शी निगरानी।'}
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-orange-100 shadow-2xs flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-gov-green flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-slate-900">
                    {isEn ? 'Monthly Samadhan Diwas' : 'मासिक समाधान दिवस'}
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    {isEn
                      ? 'Continuous high-level monthly reviews by Chief Secretary and Chief Minister Secretariat.'
                      : 'मुख्य सचिव व मुख्यमंत्री स्तर पर निरंतर समीक्षा एवं विभागवार रैंकिंग।'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://cm.uk.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gov-orange hover:bg-gov-orangeDark text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-xs transition-all hover:shadow-md"
              >
                <span>{isEn ? 'Visit CM Official Website' : 'मुख्यमंत्री आधिकारिक पोर्टल देखें'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
