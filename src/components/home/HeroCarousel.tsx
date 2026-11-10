import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, PlusCircle, Search, ExternalLink, Pause, Play } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useLanguage } from '../../context/LanguageContext';

interface CarouselSlide {
  id: string;
  badgeHi: string;
  badgeEn: string;
  headlineHi: string;
  headlineEn: string;
  descriptionHi: string;
  descriptionEn: string;
  primaryCtaTextEn: string;
  primaryCtaTextHi: string;
  primaryCtaLink: string;
  secondaryCtaTextEn?: string;
  secondaryCtaTextHi?: string;
  secondaryCtaLink?: string;
  isExternal?: boolean;
}

export const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { lowBandwidthMode } = useAccessibility();
  const { language } = useLanguage();
  const isEn = language === 'en';

  const slides: CarouselSlide[] = [
    {
      id: 'slide-1',
      badgeEn: 'Smart CM Helpline 1905',
      badgeHi: 'मुख्यमंत्री हेल्पलाइन उत्तराखण्ड 1905',
      headlineHi: 'आपकी समस्या, हमारी प्राथमिकता।',
      headlineEn: 'Your Voice, Our Priority.',
      descriptionEn:
        'A citizen-first grievance redressal platform helping the people of Uttarakhand register complaints, track progress and access public grievance services 24x7 across all 13 districts.',
      descriptionHi:
        'उत्तराखण्ड शासन की एक पारदर्शी, जवाबदेह और नागरिक-हितैषी जन शिकायत निवारण प्रणाली। घर बैठे 24x7 शिकायत दर्ज करें एवं वास्तविक समय में स्थिति ट्रैक करें।',
      primaryCtaTextEn: 'Register Complaint',
      primaryCtaTextHi: 'शिकायत दर्ज करें',
      primaryCtaLink: '/register',
      secondaryCtaTextEn: 'Track Complaint',
      secondaryCtaTextHi: 'शिकायत की स्थिति देखें',
      secondaryCtaLink: '/track',
    },
    {
      id: 'slide-2',
      badgeEn: 'Hon’ble Chief Minister, Uttarakhand',
      badgeHi: 'माननीय मुख्यमंत्री उत्तराखण्ड',
      headlineHi: 'सुशासन एवं जनसेवा को समर्पित उत्तराखण्ड',
      headlineEn: 'Dedicated to Good Governance & Citizen Welfare',
      descriptionEn:
        'Under the dynamic leadership of Shri Pushkar Singh Dhami, leveraging technology, empathy, and strict accountability to ensure no grievance is left unaddressed.',
      descriptionHi:
        'श्री पुष्कर सिंह धामी के कुशल नेतृत्व में सरलीकरण, समाधान, निस्तारण और संतुष्टि के मंत्र के साथ जनसमस्याओं का त्वरित निवारण।',
      primaryCtaTextEn: 'Visit CM Official Website',
      primaryCtaTextHi: 'मुख्यमंत्री आधिकारिक पोर्टल',
      primaryCtaLink: 'https://cm.uk.gov.in/',
      isExternal: true,
      secondaryCtaTextEn: 'Register Complaint',
      secondaryCtaTextHi: 'शिकायत दर्ज करें',
      secondaryCtaLink: '/register',
    },
    {
      id: 'slide-3',
      badgeEn: 'Digital Uttarakhand • 13 Districts',
      badgeHi: 'डिजिटल उत्तराखण्ड • 13 जनपद',
      headlineHi: 'हर नागरिक तक पारदर्शी डिजिटल जन सेवाएं',
      headlineEn: 'Digital Services for Every Citizen',
      descriptionEn:
        'Connecting all 13 hill and plain districts—from Chamoli and Pithoragarh to Dehradun and Haridwar—with real-time officer accountability, departmental tracking, and digital ATRs.',
      descriptionHi:
        'गढ़वाल एवं कुमाऊँ मंडल के सभी 13 जनपदों में एकीकृत जन समाधान नेटवर्क। 14 प्रमुख राज्य विभागों की त्वरित ऑनलाइन निगरानी।',
      primaryCtaTextEn: 'Explore 13 Districts',
      primaryCtaTextHi: '13 जनपद निर्देशिका',
      primaryCtaLink: '/districts',
      secondaryCtaTextEn: 'Track Complaint',
      secondaryCtaTextHi: 'शिकायत ट्रैक करें',
      secondaryCtaLink: '/track',
    },
    {
      id: 'slide-4',
      badgeEn: 'Bilingual Citizen Voice & Web Support',
      badgeHi: 'द्विभाषी नागरिक सहायता (हिन्दी एवं अंग्रेजी)',
      headlineHi: 'हर नागरिक की भाषा में, हर नागरिक के लिए।',
      headlineEn: 'In English & Hindi, Dedicated to Every Citizen.',
      descriptionEn:
        'Register grievances seamlessly in English or Hindi through guided web forms or voice input. Low-bandwidth data saver mode ensures rapid access across all 13 hill and plain districts.',
      descriptionHi:
        'हिन्दी अथवा अंग्रेजी में सरलता से शिकायत दर्ज करें। पर्वतीय व ग्रामीण क्षेत्रों हेतु 2G/3G डेटा सेवर मोड के साथ निर्बाध जन सेवा।',
      primaryCtaTextEn: 'Register with Voice Input',
      primaryCtaTextHi: 'बोलकर शिकायत दर्ज करें',
      primaryCtaLink: '/register',
      secondaryCtaTextEn: 'How Helpline Works',
      secondaryCtaTextHi: 'कार्यप्रणाली देखें',
      secondaryCtaLink: '/help',
    },
  ];

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const slide = slides[currentSlide];

  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label="Chief Minister Helpline Banner Carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background: User-Uploaded Uttarakhand Nanda Devi Mountain Peaks in Full Vivid Colors */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <img
          src="/images/nanda-devi-peaks.jpg"
          alt="Uttarakhand Nanda Devi Himalayan Mountain Peaks"
          className="w-full h-full object-cover object-[center_35%]"
        />
        {/* Soft directional contrast gradient on the left so white text is crystal clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
        {/* Feathered multi-stop easing gradient on the bottom for an ultra-soft, seamless fade into page background */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 sm:h-56 md:h-64 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(255, 250, 245, 1) 0%, rgba(255, 250, 245, 0.98) 10%, rgba(255, 250, 245, 0.92) 22%, rgba(255, 250, 245, 0.82) 34%, rgba(255, 250, 245, 0.67) 46%, rgba(255, 250, 245, 0.50) 58%, rgba(255, 250, 245, 0.33) 70%, rgba(255, 250, 245, 0.18) 80%, rgba(255, 250, 245, 0.08) 89%, rgba(255, 250, 245, 0.02) 95%, rgba(255, 250, 245, 0) 100%)',
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[380px]">
          {/* Left Column: Text & Primary Actions directly on background with crisp WHITE typography */}
          <div className="lg:col-span-8 space-y-4 text-left">
            {/* Main Title & Subtitle in White */}
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-lg">
                {isEn ? slide.headlineEn : slide.headlineHi}
              </h1>
              <p className="text-lg sm:text-2xl font-black text-amber-300 font-devanagari drop-shadow-md">
                {isEn ? slide.headlineHi : slide.headlineEn}
              </p>
            </div>

            {/* Description in White */}
            <p className="text-xs sm:text-sm md:text-base text-white/95 max-w-2xl leading-relaxed font-medium drop-shadow-md">
              {isEn ? slide.descriptionEn : slide.descriptionHi}
            </p>

            {/* Main CTA Buttons */}
            <div className="flex items-center gap-3.5 pt-3 flex-wrap">
              {slide.isExternal ? (
                <a
                  href={slide.primaryCtaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gov-orange hover:bg-gov-orangeDark text-white font-black px-6 py-3.5 rounded-2xl text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                >
                  <span>{isEn ? slide.primaryCtaTextEn : slide.primaryCtaTextHi}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <Link
                  to={slide.primaryCtaLink}
                  className="bg-gov-orange hover:bg-gov-orangeDark text-white font-black px-6 py-3.5 rounded-2xl text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{isEn ? slide.primaryCtaTextEn : slide.primaryCtaTextHi}</span>
                </Link>
              )}

              {slide.secondaryCtaTextEn && (
                <Link
                  to={slide.secondaryCtaLink || '/track'}
                  className="bg-white/95 hover:bg-white text-slate-900 hover:text-gov-orange font-black px-6 py-3.5 rounded-2xl text-xs sm:text-sm shadow-xl transition-all flex items-center gap-2"
                >
                  <Search className="w-4 h-4 text-gov-orange" />
                  <span>{isEn ? slide.secondaryCtaTextEn : slide.secondaryCtaTextHi}</span>
                </Link>
              )}
            </div>
          </div>

          {/* Right Column: Hon'ble Chief Minister Shri Pushkar Singh Dhami Card (Photo on Top of Card) */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl border-2 border-orange-200/90 shadow-2xl overflow-hidden max-w-[290px] w-full text-center transform hover:scale-[1.01] transition-all">
              {/* Photo on Top of Card */}
              <div className="bg-gradient-to-b from-orange-100/60 via-orange-50/40 to-white pt-4 px-3 flex items-end justify-center">
                <img
                  src="/images/cm-pushkar-dhami.png"
                  alt="Shri Pushkar Singh Dhami, Hon'ble Chief Minister Uttarakhand"
                  className="h-60 sm:h-68 w-auto object-contain object-bottom filter drop-shadow-md"
                />
              </div>

              {/* Nameplate & Principles directly below the photo */}
              <div className="p-3.5 pt-1.5 border-t border-orange-100 space-y-1 bg-white">
                <span className="inline-block bg-orange-100 text-gov-orangeDark text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  उत्तराखण्ड शासन
                </span>
                <h3 className="font-black text-base text-slate-900 font-devanagari">
                  श्री पुष्कर सिंह धामी
                </h3>
                <p className="text-xs font-bold text-gov-orange">
                  {isEn ? "Hon'ble Chief Minister, Uttarakhand" : 'माननीय मुख्यमंत्री, उत्तराखण्ड'}
                </p>
                <p className="text-[11px] text-slate-600 font-serif italic mt-0.5 bg-orange-50/70 py-1 px-2 rounded-lg border border-orange-100">
                  "सरलीकरण, समाधान, निस्तारण और संतुष्टि"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-between pt-4 mt-6">
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-white/20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === currentSlide ? 'w-8 bg-gov-orange' : 'w-2.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-white/20">
            <button
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? 'Play slide rotation' : 'Pause slide rotation'}
              className="p-1.5 rounded-xl hover:bg-white/10 text-white transition-colors"
              title={isPaused ? 'Play' : 'Pause'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-amber-300" /> : <Pause className="w-3.5 h-3.5 text-white" />}
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              aria-label="Previous slide"
              className="p-1.5 rounded-xl hover:bg-white/10 text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              aria-label="Next slide"
              className="p-1.5 rounded-xl hover:bg-white/10 text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
