import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Award, ArrowRight, ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';
import { HeroCarousel } from '../components/home/HeroCarousel';
import { FourServiceCards } from '../components/home/FourServiceCards';
import { AboutAndNotificationsSection } from '../components/home/AboutAndNotificationsSection';
import { LatestInitiativesBanner } from '../components/home/LatestInitiativesBanner';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { CMSection } from '../components/home/CMSection';
import { SuccessStories } from '../components/home/SuccessStories';
import { FAQSection } from '../components/home/FAQSection';
import { UTTARAKHAND_DISTRICTS } from '../data/districts';
import { UTTARAKHAND_SCHEMES } from '../data/schemes';
import { useLanguage } from '../context/LanguageContext';

export const HomePage: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  return (
    <div className="bg-[#FFFAF5]">
      {/* 1. Homepage Hero Section Carousel */}
      <HeroCarousel />

      {/* 2. Four Main Citizen Service Cards (Delhi CM Jan Sunwai Structure) */}
      <FourServiceCards />

      {/* 3. Second Section: About CM Helpline (55%) & Recent Notifications (45%) */}
      <AboutAndNotificationsSection />

      {/* 4. Latest Government Initiatives & CM Helpline Updates Banner */}
      <LatestInitiativesBanner />

      {/* 5. How CM Helpline Works (Clean 4-step process) */}
      <HowItWorksSection />

      {/* 6. Chief Minister Section (Shri Pushkar Singh Dhami) */}
      <CMSection />

      {/* 7. 13 Districts Showcase Strip */}
      <section className="max-w-7xl mx-auto px-4 my-14" aria-label="13 Districts Helpline Network">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E9E9] shadow-md">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 bg-orange-50 text-gov-orange rounded-xl border border-orange-200">
                  <MapPin className="w-5 h-5" />
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {isEn
                    ? 'Helpline Network Across All 13 Uttarakhand Districts'
                    : 'उत्तराखण्ड के समस्त 13 जनपदों में हेल्पलाइन नेटवर्क'}
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {isEn
                  ? 'Dedicated Nodal Grievance Redressal Cells and round-the-clock monitoring in each district across Garhwal & Kumaon'
                  : 'गढ़वाल एवं कुमाऊँ दोनों मंडलों के प्रत्येक जिले में समर्पित नोडल अधिकारी व नियंत्रण कक्ष'}
              </p>
            </div>

            <Link
              to="/districts"
              className="text-xs font-black text-gov-orange hover:text-gov-orangeDark flex items-center gap-1 hover:underline"
            >
              <span>{isEn ? 'View All 13 Districts Directory' : 'सभी 13 जनपद निर्देशिका देखें'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {UTTARAKHAND_DISTRICTS.map((dist) => (
              <Link
                key={dist.id}
                to={`/districts?district=${dist.id}`}
                className="p-3 bg-orange-50/40 hover:bg-orange-50 border border-orange-100 hover:border-gov-orange rounded-2xl text-center transition-all group"
              >
                <div className="text-xs font-black text-slate-900 group-hover:text-gov-orange truncate">
                  {isEn ? dist.nameEn : dist.nameHi}
                </div>
                <div className="text-[10px] text-slate-400 font-devanagari truncate">
                  {isEn ? dist.nameHi : dist.nameEn}
                </div>
                <div className="mt-1 text-[9px] font-bold text-gov-green bg-emerald-50 rounded-md px-1 py-0.5">
                  {isEn ? `${dist.division} Division` : `${dist.divisionHi} मंडल`}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Flagship State Government Schemes Showcase */}
      <section className="max-w-7xl mx-auto px-4 my-14" aria-label="Welfare Schemes">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E9E9E9] shadow-md">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <div>
              <span className="text-xs font-black text-gov-orange uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                {isEn ? 'Citizen Welfare Programs' : 'जन कल्याणकारी कार्यक्रम'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-devanagari">
                {isEn ? 'Major State Government Schemes' : 'प्रमुख राज्य सरकारी योजनाएं'}
              </h2>
              <p className="text-xs text-slate-500">
                {isEn
                  ? 'Verified official eligibility criteria, entitlements, and direct application guidelines'
                  : 'पात्रता, लाभ एवं आवेदन प्रक्रिया की सत्यापित आधिकारिक जानकारी'}
              </p>
            </div>

            <Link
              to="/schemes"
              className="bg-gov-orange hover:bg-gov-orangeDark text-white text-xs font-black px-5 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>{isEn ? 'View All Schemes' : 'समस्त योजनाएं देखें'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {UTTARAKHAND_SCHEMES.slice(0, 3).map((scheme) => (
              <div
                key={scheme.id}
                className="bg-[#FFFAF5] rounded-2xl p-5 border border-orange-100 hover:border-gov-orange flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div className="space-y-2">
                  <span className="text-[10px] bg-orange-100 text-gov-orangeDark px-2 py-0.5 rounded font-black">
                    {isEn ? scheme.category : scheme.categoryHi}
                  </span>
                  <h3 className="font-black text-base text-slate-900 group-hover:text-gov-orange transition-colors">
                    {isEn ? scheme.nameEn : scheme.nameHi}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {isEn ? scheme.overviewEn : scheme.overviewHi}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-orange-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-bold">{scheme.department}</span>
                  <Link
                    to="/schemes"
                    className="text-gov-orange hover:text-gov-orangeDark font-black flex items-center gap-1"
                  >
                    <span>{isEn ? 'Details' : 'विवरण'}</span> <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Citizen Success Stories */}
      <SuccessStories />

      {/* 10. Frequently Asked Questions */}
      <FAQSection />
    </div>
  );
};
