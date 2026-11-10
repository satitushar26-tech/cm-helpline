import React, { useState } from 'react';
import {
  Lightbulb,
  CheckCircle2,
  Send,
  Building,
  MapPin,
  Sparkles,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { UTTARAKHAND_DISTRICTS } from '../data/districts';
import { PublicSuggestion } from '../types/complaint';

export const PublicSuggestionPage: React.FC = () => {
  const { submitPublicSuggestion, suggestions } = useStore();
  const { announce } = useAccessibility();
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [citizenName, setCitizenName] = useState(isEn ? 'Dr. Anjali Painuly' : 'डॉ. अंजलि पैन्यूली');
  const [citizenMobile, setCitizenMobile] = useState('9897111222');
  const [district, setDistrict] = useState('dehradun');
  const [serviceCategory, setServiceCategory] = useState(
    isEn ? 'Digital Citizen Services' : 'डिजिटल जन सेवाएं (Digital Citizen Services)'
  );
  const [title, setTitle] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [impactArea, setImpactArea] = useState('');
  const [submittedSuggestion, setSubmittedSuggestion] = useState<PublicSuggestion | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !suggestion.trim()) {
      alert(isEn ? 'Please fill in the subject and suggestion details.' : 'कृपया विषय एवं सुझाव का विवरण भरें।');
      return;
    }

    const dObj = UTTARAKHAND_DISTRICTS.find((d) => d.id === district) || UTTARAKHAND_DISTRICTS[0];
    const created = submitPublicSuggestion({
      citizenName,
      citizenMobile,
      district: isEn ? dObj.nameEn : dObj.nameHi,
      serviceCategory,
      title,
      suggestion,
      impactArea: impactArea || (isEn ? 'Statewide public administration & citizen ease' : 'समग्र राज्य प्रशासन एवं नागरिक सुविधा'),
    });

    setSubmittedSuggestion(created);
    announce(
      isEn
        ? `Public suggestion submitted successfully. Reference ID: ${created.id}`
        : `सार्वजनिक सुझाव सफलता पूर्वक दर्ज हो गया है। संदर्भ संख्या ${created.id}`
    );
  };

  if (submittedSuggestion) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
          <div className="text-center space-y-2 border-b border-slate-100 pb-6">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-gov-saffron flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="bg-amber-50 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
              {isEn ? 'Suggestion Received' : 'सुझाव प्राप्त हुआ (Suggestion Received)'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-devanagari">
              {isEn ? 'Thank You for Your Valuable Ideas for Good Governance' : 'सुशासन हेतु आपके विचार के लिए धन्यवाद'}
            </h1>
            <p className="text-xs text-slate-500">
              {isEn
                ? 'Chief Minister Helpline Uttarakhand 1905 — Citizen Participation Cell'
                : 'मुख्यमंत्री हेल्पलाइन उत्तराखण्ड 1905 — जन सहभागिता प्रकोष्ठ'}
            </p>
          </div>

          <div className="bg-orange-50/70 p-6 rounded-2xl border border-orange-200 space-y-3 text-xs">
            <div>
              <span className="text-slate-500 font-semibold">{isEn ? 'Suggestion Reference ID:' : 'सुझाव संदर्भ संख्या:'}</span>
              <div className="text-xl font-black text-gov-orange font-mono">{submittedSuggestion.id}</div>
            </div>
            <div>
              <span className="text-slate-500 font-semibold">{isEn ? 'Subject:' : 'सुझाव विषय:'}</span>
              <div className="font-bold text-slate-900 text-sm">{submittedSuggestion.title}</div>
            </div>
            <div>
              <span className="text-slate-500 font-semibold">{isEn ? 'Impact Area:' : 'प्रभाव क्षेत्र:'}</span>
              <div className="font-bold text-slate-800">{submittedSuggestion.impactArea}</div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-gov-orange flex-shrink-0 mt-0.5" />
            <span>
              <strong>{isEn ? 'PRAYAS 2026 Prototype Notice:' : 'प्रयास 2026 प्रोटोटाइप:'}</strong>{' '}
              {isEn
                ? 'Citizen suggestions are evaluated by the Good Governance and Policy Reform Cell for potential policy integration.'
                : 'नागरिक सुझावों का मूल्यांकन सुशासन एवं नीति सुधार प्रकोष्ठ द्वारा किया जाता है।'}
            </span>
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-300"
            >
              {isEn ? 'Print Acknowledgment' : 'प्रिंट करें'}
            </button>
            <button
              onClick={() => setSubmittedSuggestion(null)}
              className="px-5 py-2 bg-gov-orange hover:bg-gov-orangeDark text-white text-xs font-bold rounded-xl transition-colors"
            >
              {isEn ? 'Submit Another Suggestion' : 'एक और सुझाव दें'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12" id="main-content">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <span className="text-xs font-black text-gov-orange uppercase tracking-wider bg-orange-50 px-3.5 py-1 rounded-full border border-orange-200">
          {isEn ? 'Good Governance & Policy Reform' : 'सुशासन एवं नीति सुधार'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-devanagari">
          {isEn ? 'Register Public Suggestion' : 'सार्वजनिक सुझाव पंजीकरण (Public Suggestion)'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          {isEn
            ? 'Share innovative ideas, policy recommendations, and procedural improvements to make public delivery smarter, transparent, and citizen-friendly'
            : 'सरकारी सेवाओं को अधिक पारदर्शी, डिजिटल एवं नागरिक-अनुकूल बनाने हेतु अपने नवाचारी विचार साझा करें'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {isEn ? 'Proponent / Citizen Name' : 'सुझावकर्ता का नाम'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  placeholder={isEn ? 'Enter your full name' : 'अपना नाम दर्ज करें'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {isEn ? '10-digit Mobile Number' : 'मोबाइल नंबर'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={citizenMobile}
                  onChange={(e) => setCitizenMobile(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {isEn ? 'Concerned District' : 'जनपद (District)'} <span className="text-red-500">*</span>
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
                >
                  {UTTARAKHAND_DISTRICTS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {isEn ? `${d.nameEn} (${d.nameHi})` : `${d.nameHi} (${d.nameEn})`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {isEn ? 'Sector / Service Category' : 'क्षेत्र / सेवा श्रेणी (Category)'}
                </label>
                <select
                  value={serviceCategory}
                  onChange={(e) => setServiceCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
                >
                  <option value={isEn ? 'Digital Citizen Services' : 'डिजिटल जन सेवाएं (Digital Citizen Services)'}>
                    {isEn ? 'Digital Citizen Services' : 'डिजिटल जन सेवाएं (Digital Citizen Services)'}
                  </option>
                  <option value={isEn ? 'Healthcare Innovations' : 'स्वास्थ्य सुधार (Healthcare Innovations)'}>
                    {isEn ? 'Healthcare Innovations & Tele-medicine' : 'स्वास्थ्य सुधार (Healthcare Innovations)'}
                  </option>
                  <option value={isEn ? 'Tourism & Homestay' : 'पर्वतीय पर्यटन व होमस्टे (Tourism & Homestay)'}>
                    {isEn ? 'Mountain Tourism & Homestay Promotion' : 'पर्वतीय पर्यटन व होमस्टे (Tourism & Homestay)'}
                  </option>
                  <option value={isEn ? 'Agriculture & Horticulture' : 'कृषि व बागवानी (Agriculture & Horticulture)'}>
                    {isEn ? 'Himalayan Agriculture & Organic Farming' : 'कृषि व बागवानी (Agriculture & Horticulture)'}
                  </option>
                  <option value={isEn ? 'Forest & Environment' : 'पर्यावरण व वनाग्नि रोकथाम (Forest & Environment)'}>
                    {isEn ? 'Forest Fire Prevention & Ecology' : 'पर्यावरण व वनाग्नि रोकथाम (Forest & Environment)'}
                  </option>
                  <option value={isEn ? 'Education & Skills' : 'शिक्षा एवं युवा रोजगार (Education & Skills)'}>
                    {isEn ? 'Education, Youth Employment & Skills' : 'शिक्षा एवं युवा रोजगार (Education & Skills)'}
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isEn ? 'Primary Subject / Key Idea' : 'सुझाव का मुख्य विषय'}{' '}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={
                  isEn
                    ? 'e.g. Enabling regional dialect voice input (Garhwali/Kumaoni) on CM Helpline 1905'
                    : 'उदा. सीएम हेल्पलाइन में स्थानीय बोलियों में वॉयस इनपुट की सुविधा'
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isEn ? 'Detailed Proposal / Execution Idea' : 'विस्तृत सुझाव (Detailed Suggestion)'}{' '}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                placeholder={
                  isEn
                    ? 'Describe the current challenge, your proposed solution, and how it can be implemented practically...'
                    : 'वर्तमान प्रक्रिया में क्या कमी है और इसे किस प्रकार बेहतर व सुगम बनाया जा सकता है...'
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isEn ? 'Expected Impact Area / Beneficiaries' : 'अपेक्षित प्रभाव क्षेत्र (Impact Area)'}
              </label>
              <input
                type="text"
                value={impactArea}
                onChange={(e) => setImpactArea(e.target.value)}
                placeholder={
                  isEn
                    ? 'e.g. Improved digital accessibility for elderly rural citizens in remote mountain villages'
                    : 'उदा. पर्वतीय बुजुर्ग नागरिकों की डिजिटल पहुंच में सुधार'
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-gov-orange hover:bg-gov-orangeDark text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Lightbulb className="w-4 h-4" />
                <span>{isEn ? 'Submit Suggestion' : 'सुझाव प्रस्तुत करें (Submit Suggestion)'}</span>
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-4 space-y-5 text-xs">
          <div className="bg-orange-50/60 rounded-3xl p-5 border border-orange-200 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5 font-devanagari">
              <Sparkles className="w-4 h-4 text-gov-orange" />
              {isEn ? 'Value of Citizen Feedback' : 'नागरिक सुझावों का महत्व'}
            </h3>
            <p className="text-slate-700 leading-relaxed text-[11px]">
              {isEn
                ? 'The Government of Uttarakhand actively encourages participatory governance. High-impact citizen suggestions are reviewed by departments for inclusion in upcoming public policy reforms.'
                : 'उत्तराखण्ड सरकार नागरिकों के नवाचारी विचारों को अत्यधिक महत्व देती है। उत्कृष्ट सुझावों को संबंधित विभागीय नीतियों में सम्मिलित किया जाता है।'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-slate-900 font-devanagari">
              {isEn ? 'Commendable Citizen Suggestions' : 'सराहनीय नागरिक सुझाव'}
            </h3>
            <div className="space-y-3">
              {suggestions.map((sug) => (
                <div key={sug.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-gov-orangeDark font-bold">
                    <span>{sug.id}</span>
                    <span className="bg-orange-100 text-gov-orangeDark px-1.5 py-0.2 rounded font-sans">
                      {sug.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 line-clamp-1">{sug.title}</h4>
                  <p className="text-[11px] text-slate-500">{sug.impactArea}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
