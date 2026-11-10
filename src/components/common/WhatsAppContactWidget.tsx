import React, { useState } from 'react';
import { Phone, ExternalLink, X, MessageCircle, ShieldCheck, CheckCircle2, QrCode } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const WhatsAppContactWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const isEn = language === 'en';

  return (
    <>
      {/* Floating Circular WhatsApp Button */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isEn ? 'Open WhatsApp & Helpline Contact Assistance' : 'व्हाट्सएप एवं हेल्पलाइन सहायता खोलें'}
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-200 group relative"
        >
          {/* Pulsing ring indicator */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 group-hover:opacity-60 animate-ping"></span>
          {/* Custom crisp SVG WhatsApp icon */}
          <svg
            className="w-8 h-8 fill-current relative z-10"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </button>
      </div>

      {/* Contact Panel Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-end sm:justify-end p-4 sm:p-6 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full border border-slate-200 overflow-hidden text-slate-800 animate-in slide-in-from-bottom-4 sm:mr-4 mb-16 sm:mb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-gov-orange to-gov-orangeDark p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center font-bold text-white text-base">
                  1905
                </div>
                <div>
                  <h3 className="font-extrabold text-sm leading-tight text-white">
                    {isEn ? 'CM Helpline Uttarakhand' : 'मुख्यमंत्री हेल्पलाइन उत्तराखण्ड'}
                  </h3>
                  <p className="text-[11px] text-orange-100 font-medium">
                    {isEn ? 'Citizen Contact Assistance' : 'नागरिक संपर्क सहायता'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-5 space-y-4 text-xs">
              {/* WhatsApp Official Support */}
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 font-bold">
                  <div className="w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </div>
                  <span>{isEn ? 'WhatsApp Citizen Assistance' : 'व्हाट्सएप नागरिक सहायता'}</span>
                </div>
                <p className="text-emerald-800 text-[11px] leading-relaxed">
                  {isEn
                    ? 'Connect with the official Uttarakhand CM Helpline portal on WhatsApp to inquire about grievances and state services.'
                    : 'सीएम हेल्पलाइन उत्तराखण्ड से व्हाट्सएप पर जुड़कर अपनी शिकायत एवं शासकीय सेवाओं की जानकारी प्राप्त करें।'}
                </p>

                <div className="pt-1">
                  <a
                    href="https://cmhelpline.uk.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs text-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{isEn ? 'Connect via Official Portal' : 'पोर्टल से व्हाट्सएप जोड़ें'}</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
                  </a>
                </div>
              </div>

              {/* Toll-Free Call Direct */}
              <div className="bg-orange-50/70 rounded-2xl p-4 border border-orange-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900 font-bold">
                    <Phone className="w-4 h-4 text-gov-orange" />
                    <span>{isEn ? 'Toll-Free Call Center' : 'टोल-फ्री कॉल सेंटर'}</span>
                  </div>
                  <span className="text-[10px] bg-gov-orange text-white font-black px-2 py-0.5 rounded-full">
                    24x7
                  </span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  {isEn
                    ? 'Speak directly to a trained citizen service operator on 1905 toll-free.'
                    : 'हेल्पलाइन ऑपरेटर से सीधे बात करने हेतु 1905 डायल करें।'}
                </p>

                <div className="pt-1">
                  <a
                    href="tel:1905"
                    className="w-full bg-gov-orange hover:bg-gov-orangeDark text-white font-bold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs text-xs"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{isEn ? 'Dial Toll-Free 1905' : '1905 पर कॉल करें'}</span>
                  </a>
                </div>
              </div>

              {/* Official Portal Link */}
              <div className="pt-1">
                <a
                  href="https://cmhelpline.uk.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 text-xs border border-slate-200"
                >
                  <span>{isEn ? 'Visit Official Portal (cmhelpline.uk.gov.in)' : 'आधिकारिक पोर्टल (cmhelpline.uk.gov.in)'}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>
            </div>

            {/* Verified Footer note */}
            <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-100 text-[10px] text-slate-500 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-gov-green" />
                <span>{isEn ? 'Government of Uttarakhand' : 'उत्तराखण्ड शासन'}</span>
              </span>
              <span>PRAYAS 2026 Demo</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
