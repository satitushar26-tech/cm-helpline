import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ServiceCardData {
  number: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  ctaTextEn: string;
  ctaTextHi: string;
  link: string;
}

export const FourServiceCards: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const cards: ServiceCardData[] = [
    {
      number: '01',
      titleEn: 'Register Complaint',
      titleHi: 'शिकायत दर्ज करें',
      descriptionEn: 'Register a grievance through a simple, guided 4-step online process.',
      descriptionHi: 'एक सरल, चरणबद्ध ऑनलाइन प्रक्रिया के माध्यम से अपनी समस्या दर्ज करें।',
      ctaTextEn: 'Register Now',
      ctaTextHi: 'शिकायत दर्ज करें',
      link: '/register',
    },
    {
      number: '02',
      titleEn: 'Complaint Status',
      titleHi: 'शिकायत की स्थिति',
      descriptionEn: 'Track grievance progress using your verified Reference ID or mobile number.',
      descriptionHi: 'अपनी संदर्भ संख्या अथवा मोबाइल नंबर दर्ज कर वास्तविक-समय प्रगति देखें।',
      ctaTextEn: 'Track Status',
      ctaTextHi: 'स्थिति देखें',
      link: '/track',
    },
    {
      number: '03',
      titleEn: 'Send Reminder',
      titleHi: 'अनुस्मारक भेजें',
      descriptionEn: 'Submit an official reminder for an existing pending grievance.',
      descriptionHi: 'लंबित समस्या के त्वरित समाधान हेतु संबंधित विभाग को अनुस्मारक भेजें।',
      ctaTextEn: 'Send Reminder',
      ctaTextHi: 'अनुस्मारक भेजें',
      link: '/send-reminder',
    },
    {
      number: '04',
      titleEn: 'Your Feedback',
      titleHi: 'अपनी प्रतिक्रिया दें',
      descriptionEn: 'Provide feedback and satisfaction ratings on grievance resolution.',
      descriptionHi: 'समस्या के समाधान पर अपनी रेटिंग एवं बहुमूल्य अनुभव साझा करें।',
      ctaTextEn: 'Give Feedback',
      ctaTextHi: 'प्रतिक्रिया दें',
      link: '/feedback',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 -mt-6 sm:-mt-8 relative z-20 mb-12" aria-label="Main Citizen Services">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {cards.map((card) => (
          <Link
            key={card.number}
            to={card.link}
            className="bg-white rounded-3xl p-6 border border-[#E9E9E9] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-gov-orange transform hover:-translate-y-1 relative overflow-hidden"
          >
            {/* Top Light Accent bar on hover */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gov-orange opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div>
              {/* Header: Large Serial Number without icon */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl sm:text-4xl font-black text-gov-orange font-mono tracking-tight group-hover:scale-105 transition-transform">
                  {card.number}
                </span>
                <span className="w-8 h-1 bg-orange-100 group-hover:bg-gov-orange rounded-full transition-colors"></span>
              </div>

              {/* Headings */}
              <h3 className="text-lg font-black text-slate-900 group-hover:text-gov-orange transition-colors">
                {isEn ? card.titleEn : card.titleHi}
              </h3>
              <p className="text-xs font-semibold text-slate-400 mb-2 font-devanagari">
                {isEn ? card.titleHi : card.titleEn}
              </p>

              {/* Short Description */}
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {isEn ? card.descriptionEn : card.descriptionHi}
              </p>
            </div>

            {/* CTA Link */}
            <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-gov-orange group-hover:text-gov-orangeDark">
              <span>{isEn ? card.ctaTextEn : card.ctaTextHi}</span>
              <div className="w-7 h-7 rounded-full bg-orange-50 group-hover:bg-gov-orange group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
