import React from 'react';
import { FileEdit, CheckCircle2, Wrench, Star, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const HowItWorksSection: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const steps = [
    {
      num: '01',
      titleEn: 'Register Complaint',
      titleHi: 'शिकायत दर्ज करें',
      descEn: 'Citizens submit their complaint online through the portal or by calling toll-free 1905 with supporting evidence.',
      descHi: 'वेब पोर्टल अथवा 1905 टोल-फ्री कॉल सेंटर के माध्यम से अपनी समस्या एवं फोटो साक्ष्य दर्ज करें।',
      icon: <FileEdit className="w-6 h-6 text-gov-orange" />,
    },
    {
      num: '02',
      titleEn: 'Department Review',
      titleHi: 'विभागीय समीक्षा व आवंटन',
      descEn: 'The grievance is systematically reviewed and routed to the designated nodal officer of the concerned department.',
      descHi: 'हेल्पलाइन दल एवं एआई द्वारा केस का परीक्षण कर सीधे संबंधित विभाग व क्षेत्रीय अधिकारी को आवंटन।',
      icon: <CheckCircle2 className="w-6 h-6 text-gov-orange" />,
    },
    {
      num: '03',
      titleEn: 'Action & Tracking',
      titleHi: 'स्थलीय कार्रवाई व ट्रैकिंग',
      descEn: 'Responsible officials inspect on the ground, record field repairs, and citizens track real-time status updates.',
      descHi: 'अधिकारी मौके पर जाकर समस्या का समाधान करते हैं और नागरिक 8-चरणीय टाइमलाइन पर प्रगति देखते हैं।',
      icon: <Wrench className="w-6 h-6 text-gov-orange" />,
    },
    {
      num: '04',
      titleEn: 'Resolution & Feedback',
      titleHi: 'समाधान व नागरिक फीडबैक',
      descEn: 'Citizens review the official Action Taken Report (ATR), submit satisfaction ratings, or request reopening.',
      descHi: 'समाधान आख्या (ATR) देखें, संतुष्टि रेटिंग दें अथवा असंतुष्ट होने पर पुनः खोलने का अनुरोध करें।',
      icon: <Star className="w-6 h-6 text-gov-orange" />,
    },
  ];

  return (
    <section className="bg-white border-y border-[#E9E9E9] py-16 my-12" aria-label="How it works">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-black text-gov-orange uppercase tracking-wider bg-orange-50 px-3.5 py-1 rounded-full border border-orange-200">
            {isEn ? 'Redressal Lifecycle' : 'सरल एवं पारदर्शी प्रक्रिया'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-devanagari">
            {isEn ? 'How CM Helpline 1905 Works' : 'मुख्यमंत्री हेल्पलाइन कैसे काम करती है?'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {isEn
              ? 'A transparent 4-step journey ensuring every citizen grievance is tracked to its logical resolution'
              : 'शिकायत दर्ज करने से लेकर अंतिम स्थलीय समाधान एवं नागरिक फीडबैक तक की 4-चरणीय कार्यप्रणाली'}
          </p>
        </div>

        {/* 4-Step Cards Connected with Orange Progress Line */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="bg-[#FFFAF5] rounded-3xl p-6 border-2 border-orange-100 hover:border-gov-orange shadow-xs hover:shadow-md transition-all duration-300 relative flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white border-2 border-orange-200 flex items-center justify-center shadow-2xs group-hover:bg-gov-orange transition-colors">
                    <div className="group-hover:text-white transition-colors">
                      {React.cloneElement(step.icon as React.ReactElement, {
                        className: 'w-6 h-6 text-gov-orange group-hover:text-white transition-colors',
                      })}
                    </div>
                  </div>
                  <span className="text-2xl font-black text-orange-200 font-mono group-hover:text-gov-orange transition-colors">
                    {step.num}
                  </span>
                </div>

                <h3 className="font-black text-base text-slate-900 group-hover:text-gov-orange transition-colors">
                  {isEn ? step.titleEn : step.titleHi}
                </h3>
                <p className="text-xs font-semibold text-slate-400 mb-2 font-devanagari">
                  {isEn ? step.titleHi : step.titleEn}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {isEn ? step.descEn : step.descHi}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1.5 border-2 border-orange-200 text-gov-orange shadow-xs">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
