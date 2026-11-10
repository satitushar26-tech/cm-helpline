import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  User,
  Layers,
  FileText,
  CheckCircle2,
  Mic,
  Sparkles,
  Save,
  Download,
  Printer,
  Search,
  AlertTriangle,
  Building,
  MapPin,
  Calendar,
  Phone,
  FileCheck,
  ArrowRight,
  Trash2,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { UTTARAKHAND_DISTRICTS } from '../data/districts';
import { GRIEVANCE_CATEGORIES } from '../data/categories';
import { UTTARAKHAND_DEPARTMENTS } from '../data/departments';
import { Attachment, Complaint } from '../types/complaint';
import { EvidenceUploader } from '../components/common/EvidenceUploader';
import { VoiceInputModal } from '../components/common/VoiceInputModal';

export const RegisterComplaintPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { registerComplaint, saveDraft, drafts, deleteDraft } = useStore();
  const { t, language } = useLanguage();
  const { announce } = useAccessibility();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isEn = language === 'en';

  // Step 1: Citizen Info
  const [citizenName, setCitizenName] = useState(isEn ? 'Harish Chandra Joshi' : 'हरीश चन्द्र जोशी');
  const [citizenMobile, setCitizenMobile] = useState('9876543210');
  const [citizenEmail, setCitizenEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(true); // default true for seamless demo
  const [district, setDistrict] = useState('chamoli');
  const [tehsil, setTehsil] = useState('Joshimath');
  const [block, setBlock] = useState('Dasholi');
  const [villageOrWard, setVillageOrWard] = useState(isEn ? 'Village Sema, Dasholi' : 'ग्राम सेमा (Village Sema)');
  const [contactMethod, setContactMethod] = useState<'SMS' | 'CALL' | 'WHATSAPP'>('SMS');

  // Step 2: Category
  const [selectedCategory, setSelectedCategory] = useState('drinking-water');
  const [categorySearch, setCategorySearch] = useState('');

  // Step 3: Grievance Details
  const [title, setTitle] = useState(
    isEn
      ? 'Drinking water pipeline broken in village causing acute supply shortage for 5 days'
      : 'गांव में पेयजल आपूर्ति पाइपलाइन टूटने से 5 दिनों से जलापूर्ति ठप'
  );
  const [description, setDescription] = useState(
    isEn
      ? 'Our village Sema in Dasholi block of Chamoli district has been without clean drinking water for the last 5 days due to a burst main pipeline. Over 85 families are facing severe difficulty and are forced to fetch water from distant natural springs. Kindly arrange immediate pipeline repairs and restore regular tap water supply.'
      : 'हमारे ग्राम सेमा (दशोली ब्लॉक, चमोली) में पिछले 5 दिनों से मुख्य पेयजल पाइपलाइन क्षतिग्रस्त होने के कारण स्वच्छ जल आपूर्ति पूर्णतया बंद है। लगभग 85 परिवारों को 2 किमी दूर प्राकृतिक स्रोत से पानी लाना पड़ रहा है। कृपया तत्काल मरम्मत करवाकर जलापूर्ति बहाल की जाए।'
  );
  const [dateOfIssue, setDateOfIssue] = useState('2026-02-05');
  const [priority, setPriority] = useState<'NORMAL' | 'URGENT' | 'EMERGENCY'>('URGENT');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [suggestedDept, setSuggestedDept] = useState(
    isEn
      ? 'Drinking Water & Sanitation (Jal Sansthan / Peyjal Nigam)'
      : 'पेयजल एवं स्वच्छता विभाग (जल संस्थान / पेयजल निगम)'
  );

  // Step 4: Submission Confirmation & Result
  const [confirmed, setConfirmed] = useState(false);
  const [submittedComplaint, setSubmittedComplaint] = useState<Complaint | null>(null);

  // Voice Modal
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // Check for AI Assistant draft pre-fill
  useEffect(() => {
    const aiDraftStr = sessionStorage.getItem('uk_cm_ai_draft');
    if (aiDraftStr) {
      try {
        const aiDraft = JSON.parse(aiDraftStr);
        if (aiDraft.title) setTitle(aiDraft.title);
        if (aiDraft.description) setDescription(aiDraft.description);
        if (aiDraft.category) setSelectedCategory(aiDraft.category);
        sessionStorage.removeItem('uk_cm_ai_draft');
        announce(isEn ? 'Draft from AI Assistant loaded successfully into form.' : 'एआई सहायक द्वारा तैयार ड्राफ्ट फॉर्म में भर दिया गया है।');
      } catch (e) {}
    }
  }, [announce, isEn]);

  // Update selected district's tehsils and blocks
  const selectedDistrictObj = UTTARAKHAND_DISTRICTS.find((d) => d.id === district) || UTTARAKHAND_DISTRICTS[2];

  const handleDistrictChange = (distId: string) => {
    setDistrict(distId);
    const dObj = UTTARAKHAND_DISTRICTS.find((d) => d.id === distId);
    if (dObj) {
      setTehsil(dObj.tehsils[0] || '');
      setBlock(dObj.blocks[0] || '');
    }
  };

  // Automatically update suggested department when category changes
  useEffect(() => {
    const cat = GRIEVANCE_CATEGORIES.find((c) => c.id === selectedCategory);
    if (cat) {
      const dept = UTTARAKHAND_DEPARTMENTS.find((d) => d.id === cat.suggestedDepartmentId);
      if (dept) {
        setSuggestedDept(isEn ? dept.nameEn : dept.nameHi);
      }
    }
  }, [selectedCategory, isEn]);

  const handleSendOtp = () => {
    if (!citizenMobile || citizenMobile.length < 10) {
      alert(isEn ? 'Please enter a valid 10-digit mobile number.' : 'कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें।');
      return;
    }
    setOtpSent(true);
    setEnteredOtp('1905');
  };

  const handleVerifyOtp = () => {
    if (enteredOtp === '1905' || enteredOtp.length === 4) {
      setOtpVerified(true);
      announce(isEn ? 'Demo OTP 1905 verified successfully.' : 'डेमो ओटीपी सफलता पूर्वक सत्यापित हो गया।');
    } else {
      alert(isEn ? 'Invalid OTP! Please enter demo code 1905.' : 'अमान्य ओटीपी! कृपया 1905 दर्ज करें।');
    }
  };

  const handleSaveDraft = () => {
    saveDraft({
      currentStep,
      citizenName,
      citizenMobile,
      district: isEn ? selectedDistrictObj.nameEn : selectedDistrictObj.nameHi,
      tehsil,
      block,
      villageOrWard,
      category: selectedCategory,
      title,
      description,
      suggestedDepartment: suggestedDept,
    });
    alert(isEn ? 'Grievance draft saved successfully in browser storage!' : 'शिकायत ड्राफ्ट सफलता पूर्वक सहेज लिया गया है।');
  };

  const handleResumeDraft = (d: any) => {
    setCitizenName(d.citizenName);
    setCitizenMobile(d.citizenMobile);
    setTitle(d.title);
    setDescription(d.description);
    setSelectedCategory(d.category);
    setCurrentStep(d.currentStep || 2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmed) {
      alert(isEn ? 'Please check the declaration box before submitting.' : 'कृपया पुष्टि करें कि दर्ज जानकारी सत्य है।');
      return;
    }

    const catObj = GRIEVANCE_CATEGORIES.find((c) => c.id === selectedCategory);
    const categoryName = isEn ? (catObj?.nameEn || selectedCategory) : (catObj?.nameHi || selectedCategory);

    const created = registerComplaint({
      citizenName,
      citizenMobile,
      citizenEmail,
      district: isEn ? selectedDistrictObj.nameEn : selectedDistrictObj.nameHi,
      tehsil,
      block,
      villageOrWard,
      category: categoryName,
      title,
      description,
      suggestedDepartment: suggestedDept,
      priority,
      attachments,
    });

    setSubmittedComplaint(created);
    announce(isEn ? `Grievance registered successfully. Reference ID ${created.id}` : `शिकायत सफलता पूर्वक दर्ज हो गई है। संदर्भ संख्या ${created.id}`);
  };

  // If already submitted, display the success certificate/acknowledgment slip
  if (submittedComplaint) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-2 border-b border-slate-100 pb-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-gov-green flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="inline-block bg-emerald-50 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-200">
              {isEn ? 'Registration Successful' : 'पंजीकरण सफल (Registration Successful)'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-devanagari">
              {isEn
                ? 'Your Grievance Has Been Successfully Registered'
                : 'आपकी शिकायत सफलतापूर्वक दर्ज कर ली गई है'}
            </h1>
            <p className="text-xs text-slate-500">
              {isEn
                ? 'Chief Minister Helpline Uttarakhand 1905 — Citizen Redressal System'
                : 'मुख्यमंत्री हेल्पलाइन उत्तराखण्ड 1905 — जन समाधान प्रणाली'}
            </p>
          </div>

          {/* Reference Card with QR Code Simulation */}
          <div className="bg-gradient-to-br from-slate-50 to-orange-50/50 p-6 rounded-2xl border border-orange-200/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {isEn ? 'Complaint Reference Number:' : 'शिकायत संदर्भ संख्या (Reference Number):'}
                </span>
                <div className="text-xl sm:text-2xl font-black text-gov-orange font-mono mt-0.5 tracking-wide">
                  {submittedComplaint.id}
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  {isEn ? 'Registered On: ' : 'दर्ज दिनांक: '}
                  {new Date(submittedComplaint.registeredAt).toLocaleString(isEn ? 'en-IN' : 'hi-IN')}
                </p>
              </div>

              {/* QR Code Graphic Representation */}
              <div className="flex flex-col items-center p-2 bg-white rounded-xl border border-slate-200 shadow-2xs self-start sm:self-auto">
                <div className="w-20 h-20 bg-slate-900 rounded p-1 flex items-center justify-center">
                  <div className="w-full h-full bg-white p-1 grid grid-cols-4 gap-0.5">
                    <div className="bg-black col-span-2 row-span-2"></div>
                    <div className="bg-black"></div>
                    <div className="bg-black"></div>
                    <div className="bg-black col-span-2"></div>
                    <div className="bg-black"></div>
                    <div className="bg-black"></div>
                    <div className="bg-black"></div>
                    <div className="bg-black"></div>
                  </div>
                </div>
                <span className="text-[9px] text-slate-500 font-bold mt-1 font-mono">1905-QR-DEMO</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs border-t border-orange-100 pt-3">
              <div>
                <span className="text-slate-500 font-semibold">{isEn ? 'Citizen Name:' : 'नागरिक का नाम:'}</span>
                <div className="font-bold text-slate-800">{submittedComplaint.citizenName}</div>
              </div>
              <div>
                <span className="text-slate-500 font-semibold">{isEn ? 'District & Location:' : 'जनपद व स्थान:'}</span>
                <div className="font-bold text-slate-800">
                  {submittedComplaint.villageOrWard}, {submittedComplaint.district}
                </div>
              </div>
              <div>
                <span className="text-slate-500 font-semibold">{isEn ? 'Category:' : 'शिकायत श्रेणी:'}</span>
                <div className="font-bold text-slate-800">{submittedComplaint.category}</div>
              </div>
              <div>
                <span className="text-slate-500 font-semibold">{isEn ? 'Suggested Department:' : 'अनुशंसित विभाग:'}</span>
                <div className="font-bold text-gov-orangeDark">{submittedComplaint.suggestedDepartment}</div>
              </div>
            </div>
          </div>

          {/* Prototype Transparency Notice */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong>{isEn ? 'PRAYAS 2026 Demonstration Notice:' : 'प्रयास 2026 हैकाथॉन प्रदर्शन सूचना:'}</strong>{' '}
              {isEn
                ? 'This complaint has been registered in the demonstration system only. It has not been submitted to the Government of Uttarakhand production servers. You can track this exact record live using the button below.'
                : 'यह शिकायत केवल प्रदर्शन प्रणाली (Demonstration System) में दर्ज हुई है। यह वास्तविक उत्तराखण्ड शासन को प्रेषित नहीं की गई है। आप इसे तुरंत नीचे दिए गए ट्रैकिंग बटन द्वारा लाइव ट्रैक कर सकते हैं।'}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-slate-300"
            >
              <Printer className="w-4 h-4" />
              <span>{isEn ? 'Print / Download Acknowledgment' : 'पावती प्रिंट / डाउनलोड करें'}</span>
            </button>

            <button
              onClick={() => navigate(`/track?id=${submittedComplaint.id}`)}
              className="w-full sm:w-auto px-6 py-2.5 bg-gov-orange hover:bg-gov-orangeDark text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-all hover:scale-102"
            >
              <span>{isEn ? 'Track Live Status' : 'शिकायत की स्थिति ट्रैक करें'}</span>
              <ArrowRight className="w-4 h-4" />
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
          {isEn ? 'Citizen Grievance Redressal' : 'जन समस्या निवारण'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-devanagari">
          {isEn ? 'Online Grievance Registration' : 'ऑनलाइन शिकायत पंजीकरण'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          {isEn
            ? 'Submit your problem to the concerned department in 4 simple steps and receive an instant reference number'
            : '4 सरल चरणों में अपनी समस्या संबंधित विभाग को भेजें एवं तुरंत संदर्भ संख्या प्राप्त करें'}
        </p>
      </div>

      {/* Saved Drafts Bar if available */}
      {drafts.length > 0 && currentStep === 1 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2 text-amber-900">
            <Save className="w-4 h-4 text-amber-600" />
            <span>
              {isEn ? (
                <>You have <strong>{drafts.length} saved complaint draft(s)</strong> available.</>
              ) : (
                <>आपके पास <strong>{drafts.length} सहेजा गया ड्राफ्ट</strong> उपलब्ध है।</>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleResumeDraft(drafts[0])}
              className="bg-amber-600 text-white font-bold px-3 py-1 rounded-lg hover:bg-amber-700 transition-colors"
            >
              {isEn ? 'Resume Draft' : 'ड्राफ्ट जारी रखें'}
            </button>
            <button
              onClick={() => deleteDraft(drafts[0].id)}
              className="text-slate-500 hover:text-red-600 p-1"
              title="Delete draft"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 4-Step Stepper Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs mb-8">
        <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold">
          {[
            { num: 1, labelEn: 'Citizen Info', labelHi: 'नागरिक विवरण' },
            { num: 2, labelEn: 'Category', labelHi: 'समस्या श्रेणी' },
            { num: 3, labelEn: 'Details & Evidence', labelHi: 'विवरण व साक्ष्य' },
            { num: 4, labelEn: 'Review & Submit', labelHi: 'पुष्टि व जमा' },
          ].map((st) => (
            <div
              key={st.num}
              onClick={() => st.num < currentStep && setCurrentStep(st.num)}
              className={`flex flex-col items-center py-1 rounded-xl cursor-pointer transition-all ${
                currentStep === st.num
                  ? 'text-gov-orange font-black'
                  : currentStep > st.num
                  ? 'text-gov-green font-bold'
                  : 'text-slate-400 font-medium'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 text-xs font-bold transition-all ${
                  currentStep === st.num
                    ? 'bg-gov-orange text-white shadow-md ring-4 ring-orange-200'
                    : currentStep > st.num
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {currentStep > st.num ? <Check className="w-4 h-4" /> : st.num}
              </div>
              <span className="text-xs">{isEn ? st.labelEn : st.labelHi}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Form Container */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
        {/* STEP 1: CITIZEN INFORMATION */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-in fade-in">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 font-devanagari">
                  {isEn ? 'Step 1: Citizen Information' : 'चरण 1: नागरिक विवरण (Citizen Information)'}
                </h2>
                <p className="text-xs text-slate-500">
                  {isEn
                    ? 'Please enter your name, contact details, and affected district location'
                    : 'कृपया अपना नाम, संपर्क विवरण एवं प्रभावित जनपद का चयन करें'}
                </p>
              </div>
              <span className="text-xs font-bold bg-orange-50 text-gov-orangeDark px-2.5 py-1 rounded-full border border-orange-200">
                {isEn ? 'Step 1 of 4' : 'चरण 1 / 4'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isEn ? 'Full Name' : 'पूरा नाम (Full Name)'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  placeholder={isEn ? 'Enter your full name' : 'अपना नाम दर्ज करें'}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isEn ? 'Mobile Number' : 'मोबाइल नंबर (Mobile Number)'} <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={citizenMobile}
                    onChange={(e) => setCitizenMobile(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
                  />
                  {!otpVerified ? (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="bg-gov-orange text-white text-xs font-semibold px-3 py-2 rounded-xl hover:bg-gov-orangeDark transition-colors whitespace-nowrap"
                    >
                      {otpSent ? (isEn ? 'Resend' : 'पुनः भेजें') : (isEn ? 'Send OTP' : 'ओटीपी भेजें')}
                    </button>
                  ) : (
                    <span className="bg-emerald-50 text-gov-green text-xs font-bold px-3 py-2 rounded-xl border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> {isEn ? 'Verified' : 'सत्यापित'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Demo OTP Verification Box if OTP was sent */}
            {otpSent && !otpVerified && (
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">
                    {isEn ? 'Demo OTP Verification:' : 'डेमो ओटीपी सत्यापन:'}
                  </span>
                  <span className="text-slate-500">
                    {isEn ? 'Demo Code:' : 'डेमो कोड:'} <strong>1905</strong>
                  </span>
                </div>
                <div className="flex gap-2 max-w-xs">
                  <input
                    type="text"
                    maxLength={4}
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    placeholder="1905"
                    className="w-32 text-center text-sm font-mono tracking-widest bg-white border border-orange-300 rounded-xl p-2 font-bold focus:ring-2 focus:ring-gov-orange"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="bg-gov-green text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors"
                  >
                    {isEn ? 'Verify' : 'सत्यापित करें'}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500">
                  {isEn
                    ? 'Hackathon Demonstration: Code 1905 is automatically pre-filled for rapid testing.'
                    : 'हैकाथॉन प्रोटोटाइप: त्वरित परीक्षण हेतु कोड स्वतः 1905 भर दिया गया है।'}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isEn ? 'Email Address (Optional)' : 'ईमेल पता (वैकल्पिक)'}
                </label>
                <input
                  type="email"
                  value={citizenEmail}
                  onChange={(e) => setCitizenEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isEn ? 'District' : 'जनपद (District)'} <span className="text-red-500">*</span>
                </label>
                <select
                  value={district}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
                >
                  {UTTARAKHAND_DISTRICTS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {isEn ? `${d.nameEn} (${d.nameHi}) — ${d.division} Division` : `${d.nameHi} (${d.nameEn}) — ${d.divisionHi} मंडल`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tehsil & Block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isEn ? 'Tehsil' : 'तहसील (Tehsil)'}
                </label>
                <select
                  value={tehsil}
                  onChange={(e) => setTehsil(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
                >
                  {selectedDistrictObj.tehsils.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isEn ? 'Development Block' : 'विकासखंड / ब्लॉक (Block)'}
                </label>
                <select
                  value={block}
                  onChange={(e) => setBlock(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
                >
                  {selectedDistrictObj.blocks.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Locality */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isEn ? 'Village / Ward / Locality Address' : 'ग्राम / वार्ड / मोहल्ला / पता'} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={villageOrWard}
                onChange={(e) => setVillageOrWard(e.target.value)}
                placeholder={isEn ? 'e.g. Village Sema, PO Gopeshwar, Dasholi' : 'उदा. ग्राम सेमा, पोस्ट गोपेश्वर, दशोली'}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
              />
            </div>
          </div>
        )}

        {/* STEP 2: PROBLEM CATEGORY */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-in fade-in">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 font-devanagari">
                  {isEn ? 'Step 2: Problem Category' : 'चरण 2: समस्या की श्रेणी'}
                </h2>
                <p className="text-xs text-slate-500">
                  {isEn
                    ? 'Select the relevant category matching your government grievance'
                    : 'अपनी समस्या से संबंधित उचित श्रेणी का चयन करें'}
                </p>
              </div>
              <span className="text-xs font-bold bg-orange-50 text-gov-orangeDark px-2.5 py-1 rounded-full border border-orange-200">
                {isEn ? 'Step 2 of 4' : 'चरण 2 / 4'}
              </span>
            </div>

            {/* Search filter for categories */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                placeholder={isEn ? 'Search category (e.g. roads, water, electricity, hospital, school, ration)...' : 'श्रेणी खोजें (उदा. सड़क, पानी, बिजली, अस्पताल)...'}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
              />
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[420px] overflow-y-auto pr-1">
              {GRIEVANCE_CATEGORIES.filter(
                (c) =>
                  c.nameHi.toLowerCase().includes(categorySearch.toLowerCase()) ||
                  c.nameEn.toLowerCase().includes(categorySearch.toLowerCase()) ||
                  c.descriptionHi.toLowerCase().includes(categorySearch.toLowerCase()) ||
                  c.descriptionEn.toLowerCase().includes(categorySearch.toLowerCase())
              ).map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-orange-50/80 border-gov-orange ring-2 ring-orange-200 shadow-sm'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-900">
                          {isEn ? cat.nameEn : cat.nameHi}
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-gov-orange flex-shrink-0" />}
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans mb-1">
                        {isEn ? cat.nameHi : cat.nameEn}
                      </p>
                      <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                        {isEn ? cat.descriptionEn : cat.descriptionHi}
                      </p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-gov-orange font-bold">
                      {isEn ? 'Dept Code: ' : 'विभाग: '}{cat.suggestedDepartmentId.toUpperCase()}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: GRIEVANCE DETAILS & EVIDENCE */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-in fade-in">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 font-devanagari">
                  {isEn ? 'Step 3: Grievance Details & Evidence' : 'चरण 3: शिकायत विवरण एवं साक्ष्य'}
                </h2>
                <p className="text-xs text-slate-500">
                  {isEn
                    ? 'Describe your problem clearly and attach supporting photos or PDF documents'
                    : 'अपनी समस्या का स्पष्ट विवरण लिखें एवं साक्ष्य फोटो जोड़ें'}
                </p>
              </div>
              <span className="text-xs font-bold bg-orange-50 text-gov-orangeDark px-2.5 py-1 rounded-full border border-orange-200">
                {isEn ? 'Step 3 of 4' : 'चरण 3 / 4'}
              </span>
            </div>

            {/* Smart Assistance / Voice Input Action Strip */}
            <div className="bg-gradient-to-r from-orange-50 via-slate-50 to-amber-50 p-3.5 rounded-2xl border border-orange-200 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gov-orange" />
                <span className="text-xs font-bold text-slate-900">
                  {isEn
                    ? 'Feature: Speak in your voice or use AI drafted text'
                    : 'सुविधा: बोलकर बताएं अथवा AI ड्राफ्ट का उपयोग करें'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsVoiceModalOpen(true)}
                  className="bg-gov-orange hover:bg-gov-orangeDark text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <Mic className="w-4 h-4" />
                  <span>{isEn ? 'Voice Input' : 'बोलकर दर्ज करें'}</span>
                </button>
              </div>
            </div>

            {/* Suggested Department Badge */}
            <div className="p-3 bg-orange-50/70 border border-orange-200 rounded-xl flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-gov-orange" />
                <span className="text-xs text-slate-700">
                  {isEn ? 'Suggested Department:' : 'अनुशंसित विभाग:'}
                </span>
                <strong className="text-xs text-slate-900">{suggestedDept}</strong>
              </div>
              <span className="text-[10px] bg-white border border-orange-200 text-gov-orangeDark px-2 py-0.5 rounded-full font-bold">
                {isEn ? 'Auto-Matched' : 'ऑटो-मैच्ड'}
              </span>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isEn ? 'Brief Complaint Title' : 'शिकायत का संक्षिप्त शीर्षक'} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={isEn ? 'e.g. Drinking water pipeline burst in village' : 'उदा. गांव में मुख्य पाइपलाइन टूटने से पानी की समस्या'}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange font-semibold"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isEn ? 'Detailed Problem Description' : 'समस्या का पूर्ण व स्पष्ट विवरण'} <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={isEn ? 'Please describe when the problem started, affected number of households, prior departmental follow-up...' : 'कृपया समस्या कब से है, कितने नागरिक प्रभावित हैं, क्या पहले संबंधित विभाग से संपर्क किया गया था आदि विस्तार से लिखें...'}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isEn ? 'Date of Issue' : 'समस्या शुरू होने की तिथि'}
                </label>
                <input
                  type="date"
                  value={dateOfIssue}
                  onChange={(e) => setDateOfIssue(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isEn ? 'Priority Level' : 'प्राथमिकता (Priority Level)'}
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange font-bold"
                >
                  <option value="NORMAL">{isEn ? 'Normal (7 Working Days)' : 'सामान्य (Normal - 7 दिन)'}</option>
                  <option value="URGENT">{isEn ? 'Urgent (48 Hours Target)' : 'अति आवश्यक (Urgent - 48 घंटे)'}</option>
                  <option value="EMERGENCY">{isEn ? 'Emergency (24 Hours Target)' : 'आपातकालीन (Emergency - 24 घंटे)'}</option>
                </select>
              </div>
            </div>

            {/* Evidence Uploader */}
            <div className="pt-2">
              <EvidenceUploader attachments={attachments} onChange={setAttachments} />
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & CONFIRMATION */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-in fade-in">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 font-devanagari">
                  {isEn ? 'Step 4: Review & Confirmation' : 'चरण 4: विवरण समीक्षा एवं पुष्टि'}
                </h2>
                <p className="text-xs text-slate-500">
                  {isEn
                    ? 'Please review your grievance summary carefully before final submission'
                    : 'कृपया जमा करने से पूर्व सभी प्रविष्टियों की सावधानीपूर्वक जांच करें'}
                </p>
              </div>
              <span className="text-xs font-bold bg-gov-orange text-white px-3 py-1 rounded-full shadow-xs">
                {isEn ? 'Final Step' : 'अंतिम चरण'}
              </span>
            </div>

            {/* Summary Box */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-3 border-b border-slate-200">
                <div>
                  <span className="text-slate-500 font-semibold">{isEn ? 'Citizen Name:' : 'नागरिक का नाम:'}</span>
                  <div className="font-bold text-slate-900 text-sm">{citizenName}</div>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold">{isEn ? 'Registered Mobile:' : 'पंजीकृत मोबाइल:'}</span>
                  <div className="font-bold text-slate-900 text-sm">{citizenMobile}</div>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold">{isEn ? 'District & Block:' : 'जनपद व ब्लॉक:'}</span>
                  <div className="font-bold text-slate-900">
                    {isEn ? selectedDistrictObj.nameEn : selectedDistrictObj.nameHi} (Tehsil: {tehsil}, Block: {block})
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold">{isEn ? 'Affected Location:' : 'प्रभावित स्थान:'}</span>
                  <div className="font-bold text-slate-900">{villageOrWard}</div>
                </div>
              </div>

              <div className="space-y-2 pb-3 border-b border-slate-200">
                <div>
                  <span className="text-slate-500 font-semibold">{isEn ? 'Category:' : 'समस्या श्रेणी:'}</span>
                  <div className="font-bold text-gov-orange">
                    {isEn
                      ? GRIEVANCE_CATEGORIES.find((c) => c.id === selectedCategory)?.nameEn
                      : GRIEVANCE_CATEGORIES.find((c) => c.id === selectedCategory)?.nameHi}
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold">{isEn ? 'Suggested Department:' : 'अनुशंसित विभाग:'}</span>
                  <div className="font-bold text-slate-900">{suggestedDept}</div>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold">{isEn ? 'Grievance Title:' : 'शिकायत शीर्षक:'}</span>
                  <div className="font-bold text-slate-900">{title}</div>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold">{isEn ? 'Detailed Description:' : 'विस्तृत विवरण:'}</span>
                  <p className="text-slate-700 bg-white p-3 rounded-lg border border-slate-200 leading-relaxed italic">
                    "{description}"
                  </p>
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-semibold">{isEn ? 'Attached Evidence:' : 'संलग्न साक्ष्य:'}</span>
                <div className="font-bold text-slate-800">
                  {attachments.length > 0
                    ? (isEn ? `${attachments.length} file(s) attached` : `${attachments.length} फ़ाइलें संलग्न हैं`)
                    : (isEn ? 'No evidence attached' : 'कोई साक्ष्य संलग्न नहीं है')}
                </div>
              </div>
            </div>

            {/* Explicit Confirmation Checkbox */}
            <div className="p-4 bg-orange-50/70 border border-orange-200 rounded-2xl">
              <label className="flex items-start gap-3 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  required
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-gov-orange rounded border-slate-300 focus:ring-gov-orange accent-gov-orange"
                />
                <span className="text-slate-800 leading-relaxed">
                  {isEn
                    ? 'I hereby declare that the information provided is true and correct to the best of my knowledge. I understand that this grievance is registered for demonstration in the PRAYAS 2026 Hackathon Prototype.'
                    : 'मैं एतद्द्वारा घोषणा करता/करती हूँ कि मेरे द्वारा प्रदान किया गया विवरण मेरी सर्वोत्तम जानकारी में पूर्णतया सत्य है। मुझे ज्ञात है कि यह PRAYAS 2026 हैकाथॉन प्रोटोटाइप में परीक्षण हेतु दर्ज किया जा रहा है।'}
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Stepper Navigation Buttons */}
        <div className="border-t border-slate-100 pt-5 flex items-center justify-between gap-3 flex-wrap">
          <div>
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{isEn ? 'Previous Step' : 'पिछला चरण'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
                title="Save Draft"
              >
                <Save className="w-4 h-4" />
                <span>{isEn ? 'Save Draft' : 'ड्राफ्ट सहेजें'}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => {
                  if (currentStep === 1 && !citizenName.trim()) {
                    alert(isEn ? 'Please enter your name.' : 'कृपया अपना नाम दर्ज करें।');
                    return;
                  }
                  setCurrentStep(currentStep + 1);
                }}
                className="px-6 py-2.5 bg-gov-orange hover:bg-gov-orangeDark text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md transition-all hover:scale-102"
              >
                <span>{isEn ? 'Next Step' : 'अगला चरण'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!confirmed}
                className="px-8 py-3 bg-gov-green hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-extrabold rounded-xl flex items-center gap-2 shadow-lg transition-all hover:scale-102"
              >
                <FileCheck className="w-4 h-4" />
                <span>{isEn ? 'Submit Grievance' : 'शिकायत जमा करें'}</span>
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Voice Input Modal */}
      <VoiceInputModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        defaultLang={language}
        onApplyTranscript={(text) => {
          setDescription((prev) => (prev ? `${prev}\n${text}` : text));
          announce(isEn ? 'Voice text added to description successfully.' : 'वॉयस इनपुट विवरण में जोड़ दिया गया है।');
        }}
      />
    </div>
  );
};
