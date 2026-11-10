import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface FaqItem {
  qHi: string;
  qEn: string;
  aHi: string;
  aEn: string;
}

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { language } = useLanguage();

  const faqs: FaqItem[] = [
    {
      qEn: 'How do I register a grievance on CM Helpline 1905?',
      qHi: 'मुख्यमंत्री हेल्पलाइन 1905 पर शिकायत कैसे दर्ज करें?',
      aEn: 'Click the "Register Complaint" button on this portal and complete the 4 simple steps (Citizen Info, Problem Category, Grievance Details with Photo Evidence, and Review). Alternatively, you can dial toll-free 1905 anytime 24x7 from any telephone in Uttarakhand.',
      aHi: 'आप पोर्टल पर "शिकायत दर्ज करें" बटन पर क्लिक करके 4 सरल चरणों में अपनी शिकायत दर्ज कर सकते हैं। इसके अतिरिक्त आप किसी भी फोन से टोल-फ्री 1905 डायल करके भी अपनी शिकायत लिखवा सकते हैं।',
    },
    {
      qEn: 'How can I track the live progress of my complaint?',
      qHi: 'शिकायत दर्ज करने के बाद उसकी स्थिति (Status) कैसे देखें?',
      aEn: 'Visit the "Track Complaint" page and enter your Complaint Reference Number (e.g., DEMO-UK-1905-2026-000001) or registered 10-digit mobile number. You can inspect the complete 8-stage interactive visual timeline with officer remarks and field action reports.',
      aHi: '"शिकायत की स्थिति देखें" विकल्प पर जाएं और अपनी शिकायत संदर्भ संख्या (जैसे DEMO-UK-1905-2026-000001) अथवा पंजीकृत मोबाइल नंबर दर्ज करें। आपको 8-चरणीय लाइव टाइमलाइन पर अधिकारी की टिप्पणी दिखाई देगी।',
    },
    {
      qEn: 'Can I reopen my complaint if I am not satisfied with the resolution?',
      qHi: 'यदि मैं समाधान से संतुष्ट नहीं हूँ तो क्या शिकायत दोबारा खुल सकती है?',
      aEn: 'Yes! After receiving the resolution report, if your grievance has not been genuinely resolved on the ground, click "Request Reopening" on the tracking page, enter your reason, and the case will be escalated to a senior nodal authority for re-inspection.',
      aHi: 'हाँ! समाधान मिलने के उपरांत यदि आपकी समस्या का पूर्ण निवारण नहीं हुआ है, तो आप ट्रैकिंग पेज पर जाकर "पुनः खोलने का अनुरोध (Request Reopening)" पर क्लिक कर कारण सहित शिकायत को उच्च स्तर पर पुनः जांच हेतु भेज सकते हैं।',
    },
    {
      qEn: 'What is the difference between a Complaint, a Demand, and a Suggestion?',
      qHi: 'शिकायत (Complaint), सार्वजनिक मांग (Demand) और सुझाव (Suggestion) में क्या अंतर है?',
      aEn: 'A Complaint reports an existing service breakdown (such as disrupted drinking water, burnt transformer, road potholes). A Public Demand requests new civic infrastructure (such as a new overhead water reservoir or bus route). A Public Suggestion proposes policy or digital improvements to governance.',
      aHi: 'शिकायत व्यक्तिगत या स्थानीय सरकारी सेवा में खराबी हेतु होती है। मांग किसी नए विकास कार्य या अवसंरचना के लिए होती है। सुझाव सरकारी प्रक्रिया या नीतिगत सुधार हेतु दिया जाता है।',
    },
    {
      qEn: 'Can I speak in Hindi, Garhwali, Kumaoni, or Jaunsari?',
      qHi: 'क्या गढ़वाली, कुमाऊँनी या जौनसारी बोली में शिकायत दर्ज हो सकती है?',
      aEn: 'Yes! The PRAYAS 2026 prototype features regional voice input assistance. You can select English, Hindi, Garhwali, Kumaoni, or Jaunsari in the voice input modal and speak naturally; the system transcribes and structures your grievance draft.',
      aHi: 'हाँ, PRAYAS 2026 प्रोटोटाइप में भाषिणी-प्रेरित वॉयस इनपुट जोड़ा गया है। आप अपनी स्थानीय बोली चुनकर बोल सकते हैं; प्रणाली उसका औपचारिक प्रारूप तैयार कर देती है।',
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 my-14" aria-label="Frequently Asked Questions">
      <div className="text-center mb-10 space-y-2">
        <span className="text-xs font-black text-gov-orange uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
          {language === 'en' ? 'Citizen Help Center' : 'नागरिक सहायता'}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-devanagari">
          {language === 'en'
            ? 'Frequently Asked Questions (FAQs)'
            : 'अक्सर पूछे जाने वाले प्रश्न (FAQs)'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          {language === 'en'
            ? 'Essential guidance on registering complaints, live status tracking, and helpline services'
            : 'हेल्पलाइन 1905 के उपयोग, शिकायत ट्रैकिंग एवं सेवाओं से संबंधित मुख्य जानकारियां'}
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#E9E9E9] overflow-hidden shadow-2xs hover:border-orange-200 transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 hover:bg-orange-50/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 text-gov-orange border border-orange-200 flex items-center justify-center flex-shrink-0 font-black text-xs">
                    Q{idx + 1}
                  </div>
                  <div>
                    <h3 className="font-black text-sm sm:text-base text-slate-900">
                      {language === 'en' ? faq.qEn : faq.qHi}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-devanagari">
                      {language === 'en' ? faq.qHi : faq.qEn}
                    </p>
                  </div>
                </div>

                <div
                  className={`p-1.5 rounded-full bg-slate-100 text-slate-600 transition-transform ${
                    isOpen ? 'rotate-180 bg-orange-100 text-gov-orange' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-700 border-t border-orange-100/60 bg-orange-50/20 space-y-1.5 leading-relaxed animate-in fade-in">
                  <p className="font-medium text-slate-800">
                    {language === 'en' ? faq.aEn : faq.aHi}
                  </p>
                  <p className="text-xs text-slate-500 font-devanagari pt-1 border-t border-orange-100">
                    {language === 'en' ? faq.aHi : faq.aEn}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center p-4 bg-white rounded-2xl border border-orange-200 shadow-2xs flex items-center justify-center flex-wrap gap-3">
        <span className="text-xs text-slate-600 font-medium">
          {language === 'en'
            ? 'Have an urgent inquiry or require departmental guidance?'
            : 'क्या आपके पास कोई विशेष प्रश्न है अथवा विभागीय मार्गदर्शन चाहते हैं?'}
        </span>
        <a
          href="/contact"
          className="inline-flex items-center gap-1.5 bg-gov-orange hover:bg-gov-orangeDark text-white text-xs font-black px-4 py-2 rounded-xl transition-all shadow-xs"
        >
          <span>{language === 'en' ? 'Contact Grievance Help Desk' : 'नागरिक सहायता केंद्र से संपर्क करें'}</span>
        </a>
      </div>
    </section>
  );
};
