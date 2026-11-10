import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake, Award, Users, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AboutPage: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12" id="main-content">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-black text-gov-orange uppercase tracking-wider bg-orange-50 px-3.5 py-1 rounded-full border border-orange-200">
          {isEn ? 'Overview & Mission' : 'परिचय एवं उद्देश्य'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-devanagari">
          {isEn
            ? 'About Smart CM Helpline Uttarakhand 1905'
            : 'मुख्यमंत्री हेल्पलाइन उत्तराखण्ड 1905 के बारे में'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          {isEn
            ? 'Your Voice, Our Priority • A Smarter, More Accessible and Responsive Uttarakhand'
            : 'आपकी समस्या, हमारी प्राथमिकता • एक बेहतर उत्तराखण्ड, हर नागरिक की आवाज़ के साथ'}
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6 text-xs text-slate-700 leading-relaxed">
        {/* Core Vision */}
        <div className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 font-devanagari">
            {isEn ? '1. Vision & Mandate' : '1. दृष्टि एवं संकल्प (Vision & Mission)'}
          </h2>
          <p>
            {isEn ? (
              <>
                <strong>Smart Chief Minister Helpline Uttarakhand 1905</strong> is the state government's unified citizen grievance redressal and public service monitoring platform. It embodies a revolutionary commitment to transparent, accessible, citizen-first governance across Uttarakhand's 13 districts—from remote Himalayan villages in Garhwal and Kumaon to dynamic urban centers.
              </>
            ) : (
              <>
                <strong>मुख्यमंत्री हेल्पलाइन उत्तराखण्ड 1905</strong> राज्य सरकार का एक एकीकृत जन शिकायत निवारण मंच है, जो नागरिक-केंद्रित सुशासन की दिशा में एक क्रांतिकारी कदम है। इसका मुख्य उद्देश्य उत्तराखण्ड के सुदूर पर्वतीय क्षेत्रों से लेकर मैदानी भागों तक प्रत्येक नागरिक को शासन के साथ सीधा संवाद स्थापित करने की सुविधा प्रदान करना है।
              </>
            )}
          </p>
          <p>
            {isEn ? (
              <>
                Citizens can voice their concerns regarding road connectivity, drinking water pipelines, electricity supply, public healthcare, social pensions, or school infrastructure without traveling to distant district headquarters. By dialing toll-free 1905 or submitting complaints online, citizens receive real-time SMS tracking, designated officer accountability, and transparent resolution reports.
              </>
            ) : (
              <>
                राज्य में किसी भी सरकारी सेवा, विकास कार्य, सड़क, पेयजल, बिजली, स्वास्थ्य या शिक्षा से संबंधित समस्या के समाधान हेतु नागरिक बिना किसी कार्यालय के चक्कर काटे, घर बैठे 1905 पर कॉल अथवा ऑनलाइन पोर्टल के माध्यम से शिकायत दर्ज करा सकते हैं।
              </>
            )}
          </p>
        </div>

        {/* PRAYAS 2026 Hackathon Context */}
        <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50/40 p-5 rounded-2xl border border-orange-200 space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-gov-orange" />
            <span>
              {isEn
                ? 'PRAYAS 2026 Hackathon — Digital Public Services Innovation'
                : 'PRAYAS 2026 हैकाथॉन — डिजिटल जन सेवा नवाचार'}
            </span>
          </div>
          <p className="text-slate-800 text-xs">
            {isEn ? (
              <>
                This application has been engineered as a showcase demonstration prototype for the <strong>PRAYAS 2026</strong> state hackathon. It reimagines citizen grievance workflows with next-generation technologies: automated AI grievance drafting, multi-dialect voice input (Garhwali, Kumaoni, Jaunsari), high-contrast accessibility controls, low-bandwidth mode for rural 2G/3G connectivity, and multi-tier officer dashboards with Action Taken Reports (ATR).
              </>
            ) : (
              <>
                यह प्रोटोटाइप <strong>PRAYAS 2026</strong> राज्य स्तरीय हैकाथॉन हेतु विकसित किया गया है। इसका उद्देश्य मौजूदा हेल्पलाइन प्रणाली को अत्याधुनिक तकनीकी नवाचारों—जैसे AI-आधारित समस्या ड्राफ्टिंग, क्षेत्रीय बोलियों (गढ़वाली, कुमाऊँनी, जौनसारी) में वॉयस इनपुट, कम-बैंडविड्थ ग्रामीण डेटा सेवर मोड तथा 13 जनपदों के एकीकृत अधिकारी वर्कफ़्लो—से सशक्त बनाना है।
              </>
            )}
          </p>
          <div className="text-[11px] text-amber-900 font-bold pt-1">
            {isEn
              ? '* Transparent Notice: This is a hackathon demonstration prototype, not an officially deployed government website.'
              : '* पारदर्शी सूचना: यह एक प्रदर्शन प्रोटोटाइप (Demonstration Prototype) है, आधिकारिक सरकारी वेबसाइट नहीं।'}
          </div>
        </div>

        {/* Core Pillars */}
        <div className="space-y-3 pt-2">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 font-devanagari">
            {isEn ? '2. Core Strategic Pillars' : '2. प्रमुख आधार स्तंभ'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div className="p-4 bg-orange-50/40 rounded-2xl border border-orange-100 space-y-1">
              <ShieldCheck className="w-5 h-5 text-gov-orange" />
              <h4 className="font-bold text-slate-900">
                {isEn ? 'Simplification & Transparency' : 'सरलीकरण व पारदर्शिता'}
              </h4>
              <p className="text-[11px] text-slate-500">
                {isEn
                  ? 'An 8-stage interactive visual audit timeline allows citizens to track the exact officer reviewing their case.'
                  : '8-चरणीय लाइव टाइमलाइन से नागरिक जान सकते हैं कि उनकी फाइल किस अधिकारी के पास है।'}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <HeartHandshake className="w-5 h-5 text-gov-green" />
              <h4 className="font-bold text-slate-900">
                {isEn ? 'Citizen Satisfaction & Reopen' : 'नागरिक संतुष्टि'}
              </h4>
              <p className="text-[11px] text-slate-500">
                {isEn
                  ? 'Resolution is validated through citizen star feedback, with an immediate right to reopen unresolved complaints.'
                  : 'समाधान के उपरांत नागरिक फीडबैक व असंतुष्ट होने पर तुरंत री-ओपनिंग का अधिकार।'}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <Users className="w-5 h-5 text-gov-saffron" />
              <h4 className="font-bold text-slate-900">
                {isEn ? 'Last-Mile Mountain Inclusion' : 'अंतिम छोर तक पहुंच'}
              </h4>
              <p className="text-[11px] text-slate-500">
                {isEn
                  ? 'Dialect-aware voice recognition, text-to-speech, and data-saver mode empower citizens across rural hills.'
                  : 'कम-बैंडविड्थ पर्वतीय मोड व स्थानीय बोलियों में वॉयस इनपुट से ग्रामीण समावेशन।'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
