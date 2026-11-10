import React, { useState } from 'react';
import {
  MessageSquarePlus,
  CheckCircle2,
  Send,
  Building,
  MapPin,
  Users,
  AlertTriangle,
  FileText,
  Printer,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { UTTARAKHAND_DISTRICTS } from '../data/districts';
import { PublicDemand } from '../types/complaint';

export const PublicDemandPage: React.FC = () => {
  const { submitPublicDemand, demands } = useStore();
  const { announce } = useAccessibility();
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [citizenName, setCitizenName] = useState(isEn ? 'Gram Pradhan & Residents' : 'ग्राम प्रधान एवं ग्रामवासी');
  const [citizenMobile, setCitizenMobile] = useState('9876543210');
  const [district, setDistrict] = useState('chamoli');
  const [category, setCategory] = useState('Drinking Water & Sanitation');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expectedBeneficiaries, setExpectedBeneficiaries] = useState('');
  const [submittedDemand, setSubmittedDemand] = useState<PublicDemand | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert(isEn ? 'Please fill in the subject and description.' : 'कृपया विषय एवं विवरण भरें।');
      return;
    }

    const dObj = UTTARAKHAND_DISTRICTS.find((d) => d.id === district) || UTTARAKHAND_DISTRICTS[2];
    const created = submitPublicDemand({
      citizenName,
      citizenMobile,
      district: isEn ? dObj.nameEn : dObj.nameHi,
      category,
      title,
      description,
      expectedBeneficiaries: expectedBeneficiaries || (isEn ? 'All local residents' : 'समस्त स्थानीय ग्रामीण'),
    });

    setSubmittedDemand(created);
    announce(
      isEn
        ? `Public demand submitted successfully. Reference ID: ${created.id}`
        : `सार्वजनिक मांग सफलता पूर्वक दर्ज हो गई है। संदर्भ संख्या ${created.id}`
    );
  };

  if (submittedDemand) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
          <div className="text-center space-y-2 border-b border-slate-100 pb-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-gov-green flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
              {isEn ? 'Demand Registered' : 'सार्वजनिक मांग दर्ज (Demand Registered)'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-devanagari">
              {isEn ? 'Your Public Demand Has Been Recorded' : 'आपकी विकास मांग दर्ज कर ली गई है'}
            </h1>
            <p className="text-xs text-slate-500">
              {isEn
                ? 'Chief Minister Helpline Uttarakhand 1905 — Public Participation Cell'
                : 'मुख्यमंत्री हेल्पलाइन उत्तराखण्ड 1905 — जन सहभागिता'}
            </p>
          </div>

          <div className="bg-orange-50/70 p-6 rounded-2xl border border-orange-200 space-y-3 text-xs">
            <div>
              <span className="text-slate-500 font-semibold">{isEn ? 'Demand Reference ID:' : 'मांग संदर्भ संख्या:'}</span>
              <div className="text-xl font-black text-gov-orange font-mono">{submittedDemand.id}</div>
            </div>
            <div>
              <span className="text-slate-500 font-semibold">{isEn ? 'Subject:' : 'विषय:'}</span>
              <div className="font-bold text-slate-900 text-sm">{submittedDemand.title}</div>
            </div>
            <div>
              <span className="text-slate-500 font-semibold">{isEn ? 'District:' : 'जनपद:'}</span>
              <div className="font-bold text-slate-800">{submittedDemand.district}</div>
            </div>
            <div>
              <span className="text-slate-500 font-semibold">{isEn ? 'Expected Beneficiaries:' : 'अनुमानित लाभार्थी:'}</span>
              <div className="font-bold text-slate-800">{submittedDemand.expectedBeneficiaries}</div>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>{isEn ? 'PRAYAS 2026 Prototype Notice:' : 'प्रयास 2026 प्रोटोटाइप सूचना:'}</strong>{' '}
              {isEn
                ? 'This public demand is saved in the demonstration database. In the live portal, it is forwarded to the District Development Officer (DDO) for review in the annual district plan.'
                : 'यह मांग प्रदर्शन डेटाबेस में सहेजी गई है। योजना वार्षिक कार्ययोजना परीक्षण हेतु संबंधित जिला विकास अधिकारी को अग्रेषित की जाती है।'}
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
              onClick={() => setSubmittedDemand(null)}
              className="px-5 py-2 bg-gov-orange hover:bg-gov-orangeDark text-white text-xs font-bold rounded-xl transition-colors"
            >
              {isEn ? 'Register Another Demand' : 'एक और मांग दर्ज करें'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12" id="main-content">
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <span className="text-xs font-black text-gov-orange uppercase tracking-wider bg-orange-50 px-3.5 py-1 rounded-full border border-orange-200">
          {isEn ? 'Infrastructure & Community Development' : 'अवसंरचना एवं विकास'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-devanagari">
          {isEn ? 'Register Public Demand' : 'सार्वजनिक मांग पंजीकरण (Public Demand)'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          {isEn
            ? 'Submit collective community demands (new roads, bridges, drinking water schemes, health centers, school buildings) directly to the government'
            : 'अपने क्षेत्र में सड़क, पेयजल, स्कूल, चिकित्सालय या सामुदायिक विकास कार्यों की नई मांग शासन को भेजें'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Container */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {isEn ? 'Representative / Proponent Name' : 'प्रस्तावक का नाम / संस्था'}{' '}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  placeholder={isEn ? 'e.g. Gram Pradhan / Village Council' : 'उदा. ग्राम प्रधान / समस्त ग्रामवासी'}
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
                  {isEn ? 'Category of Demand' : 'मांग की श्रेणी (Category)'}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
                >
                  <option value="Roads & Infrastructure">
                    {isEn ? 'Roads & Bridges Construction' : 'सड़क एवं पुलिया निर्माण (Roads & Bridges)'}
                  </option>
                  <option value="Drinking Water & Sanitation">
                    {isEn ? 'Overhead Tank & Pipeline (Drinking Water)' : 'पेयजल जलाशय एवं पाइपलाइन (Drinking Water)'}
                  </option>
                  <option value="Health Services">
                    {isEn ? 'Health Sub-Center / Clinic' : 'स्वास्थ्य उपकेंद्र / डिस्पेंसरी (Health Center)'}
                  </option>
                  <option value="Public Transport & Roadways">
                    {isEn ? 'Roadways Bus Service' : 'रोडवेज बस सेवा (Public Transport)'}
                  </option>
                  <option value="Electricity">
                    {isEn ? 'Solar Street Lights & Electrification' : 'सोलर स्ट्रीट लाइट व विद्युतीकरण (Power)'}
                  </option>
                  <option value="Education">
                    {isEn ? 'School Building & Playground' : 'स्कूल भवन व खेल मैदान (School Infrastructure)'}
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isEn ? 'Subject / Project Title' : 'प्रस्तावित मांग का विषय / शीर्षक'}{' '}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={
                  isEn
                    ? 'e.g. Construction of 50,000 litre overhead drinking water reservoir in Village Toshi'
                    : 'उदा. ग्राम तोषी में 50,000 लीटर का नया ओवरहेड टैंक निर्माण'
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isEn ? 'Detailed Demand Description & Justification' : 'मांग का विस्तृत विवरण एवं औचित्य'}{' '}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={
                  isEn
                    ? 'Explain why this facility is needed, current hardship faced by the village, and proposed location...'
                    : 'विस्तार से लिखें कि इस योजना की क्यों आवश्यकता है, वर्तमान में क्या कठिनाई है...'
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isEn ? 'Estimated Number of Beneficiaries' : 'अनुमानित लाभान्वित जनसंख्या (Expected Beneficiaries)'}
              </label>
              <input
                type="text"
                value={expectedBeneficiaries}
                onChange={(e) => setExpectedBeneficiaries(e.target.value)}
                placeholder={isEn ? 'e.g. Approx 2,500 residents across 4 Gram Panchayats' : 'उदा. 4 ग्राम पंचायतों के लगभग 2,500 ग्रामीण'}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-gov-orange hover:bg-gov-orangeDark text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isEn ? 'Submit Public Demand' : 'सार्वजनिक मांग प्रस्तुत करें (Submit Demand)'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Information & Recent Demo Demands */}
        <div className="lg:col-span-4 space-y-5 text-xs">
          <div className="bg-orange-50/60 rounded-3xl p-5 border border-orange-200 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5 font-devanagari">
              <Sparkles className="w-4 h-4 text-gov-orange" />
              {isEn ? 'Difference: Grievance vs Demand' : 'मांग और शिकायत में अंतर'}
            </h3>
            <p className="text-slate-700 leading-relaxed text-[11px]">
              <strong>{isEn ? 'Grievance (शिकायत):' : 'शिकायत:'}</strong>{' '}
              {isEn
                ? 'Filed when an existing public service fails (e.g., broken pipe, power outage, delayed pension).'
                : 'किसी चालू सरकारी सेवा की खराबी (जैसे पानी न आना या बिजली कटना) हेतु होती है।'}
            </p>
            <p className="text-slate-700 leading-relaxed text-[11px]">
              <strong>{isEn ? 'Public Demand (सार्वजनिक मांग):' : 'सार्वजनिक मांग:'}</strong>{' '}
              {isEn
                ? 'Requested for a brand-new public asset or community infrastructure (e.g., new bridge, new bus line).'
                : 'किसी नई सरकारी सुविधा (जैसे नया ओवरहेड टैंक, नई सड़क, बस सेवा) की स्वीकृति हेतु होती है।'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-slate-900 font-devanagari">
              {isEn ? 'Recently Recorded Public Demands' : 'हाल ही में दर्ज सार्वजनिक मांगें'}
            </h3>
            <div className="space-y-3">
              {demands.map((dem) => (
                <div key={dem.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-gov-orangeDark font-bold">
                    <span>{dem.id}</span>
                    <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-sans">
                      {dem.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 line-clamp-1">{dem.title}</h4>
                  <p className="text-[11px] text-slate-500">{dem.district} • {dem.expectedBeneficiaries}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
