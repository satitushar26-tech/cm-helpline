import React, { useState } from 'react';
import {
  HelpCircle,
  FileText,
  Search,
  Mic,
  Camera,
  RotateCcw,
  PhoneCall,
  CheckCircle2,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { FAQSection } from '../components/home/FAQSection';

export const HelpFaqPage: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const [selectedGuide, setSelectedGuide] = useState<string>('register');

  const guides = [
    {
      id: 'register',
      titleEn: 'How to Register a Grievance',
      titleHi: 'शिकायत कैसे दर्ज करें?',
      stepsEn: [
        'Click the "Register Complaint" button on the top navigation bar or homepage.',
        'Step 1: Enter your full name, 10-digit mobile number, and select your affected district (e.g. Chamoli) and locality.',
        'Step 2: Choose the appropriate service category (Drinking water, PWD roads, Power/UPCL, Health, etc.). Intelligent recommendations will auto-suggest the department.',
        'Step 3: Enter grievance title and description, or use the "Voice Input" microphone to speak in English, Hindi, or Garhwali/Kumaoni. Attach photos or PDF evidence.',
        'Step 4: Review your details, check the confirmation declaration, and click "Submit Grievance". You will receive an instant Reference ID (DEMO-UK-1905-2026-XXXXXX).',
      ],
      stepsHi: [
        'पोर्टल के मुख्य पृष्ठ पर "शिकायत दर्ज करें" बटन पर क्लिक करें।',
        'चरण 1 में अपना नाम, 10 अंकों का मोबाइल नंबर एवं प्रभावित जनपद व स्थान चुनें।',
        'चरण 2 में समस्या की उचित श्रेणी चुनें (जैसे सड़क, पेयजल, बिजली आदि)।',
        'चरण 3 में समस्या का स्पष्ट विवरण लिखें एवं फोटो या पीडीएफ साक्ष्य संलग्न करें।',
        'चरण 4 में पुष्टि चेकबॉक्स पर टिक कर "शिकायत जमा करें" पर क्लिक करें। आपको तुरंत संदर्भ संख्या (DEMO-UK-1905-2026-XXXXXX) प्राप्त होगी।',
      ],
    },
    {
      id: 'track',
      titleEn: 'How to Track Grievance Status',
      titleHi: 'शिकायत की स्थिति कैसे ट्रैक करें?',
      stepsEn: [
        'Navigate to the "Track Complaint" page from the main menu.',
        'Enter your complaint Reference Number or registered 10-digit mobile number.',
        'Inspect the 8-stage interactive visual audit timeline showing the designated officer, timestamped status, and current field action.',
        'Once resolved, read and download the official departmental Action Taken Report (ATR).',
      ],
      stepsHi: [
        '"शिकायत की स्थिति देखें" पेज पर जाएं।',
        'अपनी शिकायत संदर्भ संख्या (Reference ID) अथवा पंजीकृत मोबाइल नंबर दर्ज करें।',
        '8-चरणीय इंटरएक्टिव टाइमलाइन पर देखें कि केस किस अधिकारी को आवंटित है एवं वर्तमान में क्या कार्रवाई चल रही है।',
        'समाधान के उपरांत आप विभागीय आख्या (Action Taken Report) भी देख व डाउनलोड कर सकते हैं।',
      ],
    },
    {
      id: 'voice',
      titleEn: 'Voice-Based Complaint Registration',
      titleHi: 'बोलकर शिकायत (वॉयस इनपुट) कैसे दर्ज करें?',
      stepsEn: [
        'In Step 3 of the complaint form, tap the "Voice Input / बोलकर बताएं" button.',
        'Select your preferred dialect (English, Hindi, Garhwali, Kumaoni, or Jaunsari).',
        'Tap the microphone button and describe your issue naturally in your own words.',
        'The speech recognition engine converts your speech into standard text. Click "Add to Grievance" to populate the form.',
      ],
      stepsHi: [
        'शिकायत फॉर्म के चरण 3 में "बोलकर बताएं / Voice Input" बटन पर क्लिक करें।',
        'अपनी सुविधा अनुसार भाषा/बोली चुनें (हिन्दी, अंग्रेजी, गढ़वाली, कुमाऊँनी, अथवा जौनसारी)।',
        'माइक आइकॉन पर टैप कर अपनी समस्या सामान्य रूप से बोलें।',
        'सिस्टम आपकी बोली गई बात को मानक लिखित ड्राफ्ट में परिवर्तित कर देगा। समीक्षा के बाद "शिकायत में जोड़ें" पर क्लिक करें।',
      ],
    },
    {
      id: 'reopen',
      titleEn: 'How to Reopen an Unresolved Grievance',
      titleHi: 'असंतुष्ट होने पर शिकायत दोबारा कैसे खोलें?',
      stepsEn: [
        'Open your complaint on the Track Grievance page.',
        'If the officer reported the issue as resolved but on-site work is incomplete, click "Request Grievance Reopening".',
        'State clearly why you are unsatisfied and describe the ongoing problem on site.',
        'The case will be escalated to Level 3 / District Administrator for senior review and site re-inspection.',
      ],
      stepsHi: [
        'ट्रैकिंग पेज पर अपनी शिकायत खोलें।',
        'यदि अधिकारी द्वारा दर्ज समाधान से आप संतुष्ट नहीं हैं, तो नीचे दिए गए "पुनः खोलने का अनुरोध (Request Reopening)" पर क्लिक करें।',
        'स्पष्ट कारण लिखें कि समस्या अभी भी क्यों विद्यमान है।',
        'अनुरोध जमा होते ही केस को उच्चाधिकारी (Level 3 / District Admin) के संज्ञान में पुनः प्रेषित किया जाएगा।',
      ],
    },
  ];

  const currentGuideObj = guides.find((g) => g.id === selectedGuide) || guides[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12" id="main-content">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-black text-gov-orange uppercase tracking-wider bg-orange-50 px-3.5 py-1 rounded-full border border-orange-200">
          {isEn ? 'Citizen User Guides' : 'नागरिक मार्गदर्शिका'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-devanagari">
          {isEn
            ? 'Help Center & Citizen User Guides'
            : 'सहायता केंद्र एवं उपयोग मार्गदर्शिका (Help Center)'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          {isEn
            ? 'Step-by-step instructions for registering grievances, tracking live status, multi-dialect voice input, and requesting reopening'
            : 'मुख्यमंत्री हेल्पलाइन उत्तराखण्ड 1905 के समस्त नागरिक मॉड्यूल के उपयोग हेतु चरणबद्ध दिशा-निर्देश'}
        </p>
      </div>

      {/* Guide Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8 text-xs font-bold">
        {guides.map((g) => (
          <button
            key={g.id}
            onClick={() => setSelectedGuide(g.id)}
            className={`p-3.5 rounded-2xl border text-center transition-all ${
              selectedGuide === g.id
                ? 'bg-gov-orange text-white border-gov-orange shadow-md'
                : 'bg-white hover:bg-orange-50/50 border-slate-200 text-slate-700'
            }`}
          >
            <span className="block font-sans text-xs font-extrabold">
              {isEn ? g.titleEn : g.titleHi}
            </span>
            <span className="block text-[10px] opacity-80 font-normal font-sans mt-0.5">
              {isEn ? g.titleHi : g.titleEn}
            </span>
          </button>
        ))}
      </div>

      {/* Selected Guide Details */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl mb-12 space-y-4">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3 font-devanagari">
          {isEn ? currentGuideObj.titleEn : currentGuideObj.titleHi}
        </h2>

        <div className="space-y-3 pt-2 text-xs">
          {(isEn ? currentGuideObj.stepsEn : currentGuideObj.stepsHi).map((st, i) => (
            <div key={i} className="flex items-start gap-3 bg-orange-50/40 p-3.5 rounded-2xl border border-orange-100">
              <span className="w-6 h-6 rounded-full bg-gov-orange text-white flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-slate-700 leading-relaxed font-medium">{st}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs Section */}
      <FAQSection />
    </div>
  );
};
