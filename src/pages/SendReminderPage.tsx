import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Bell,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Building,
  MapPin,
  Calendar,
  Send,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { StatusBadge } from '../components/common/StatusBadge';

export const SendReminderPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialId = searchParams.get('id') || 'DEMO-UK-1905-2026-000001';

  const [searchInput, setSearchInput] = useState(initialId);
  const [activeId, setActiveId] = useState(initialId);
  const [reminderNote, setReminderNote] = useState('');
  const [reminderSubmitted, setReminderSubmitted] = useState(false);

  const { getComplaintById, getComplaintsByMobile, sendReminder } = useStore();
  const { announce } = useAccessibility();
  const { language } = useLanguage();
  const isEn = language === 'en';

  const complaint = getComplaintById(activeId);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    if (/^\d{10}$/.test(searchInput.trim())) {
      const results = getComplaintsByMobile(searchInput.trim());
      if (results.length > 0) {
        setActiveId(results[0].id);
        setSearchParams({ id: results[0].id });
        setReminderSubmitted(false);
        announce(
          isEn
            ? `Found ${results.length} grievances linked to mobile number.`
            : `मोबाइल से संबंधित ${results.length} शिकायतें प्राप्त हुईं।`
        );
      } else {
        alert(
          isEn
            ? 'No grievance found for this mobile number.'
            : 'इस मोबाइल नंबर पर कोई शिकायत दर्ज नहीं मिली।'
        );
      }
      return;
    }

    setActiveId(searchInput.trim());
    setSearchParams({ id: searchInput.trim() });
    setReminderSubmitted(false);
  };

  const handleSendReminderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaint) return;

    const message = reminderNote.trim() || (isEn
      ? 'Citizen sent an official reminder regarding pending on-site action.'
      : 'नागरिक द्वारा लंबित स्थल कार्रवाई हेतु अनुस्मारक (Reminder) प्रेषित किया गया।');

    const success = sendReminder(complaint.id, message);
    if (success) {
      setReminderSubmitted(true);
      announce(
        isEn
          ? `Reminder sent successfully for Complaint ${complaint.id}.`
          : `शिकायत ${complaint.id} पर अनुस्मारक सफलता पूर्वक प्रेषित कर दिया गया है।`
      );
    }
  };

  // Calculate days elapsed since registration
  const daysElapsed = complaint
    ? Math.max(1, Math.floor((Date.now() - new Date(complaint.registeredAt).getTime()) / (1000 * 60 * 60 * 24)))
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12" id="main-content">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <span className="text-xs font-bold text-gov-orange uppercase tracking-wider bg-orange-50 px-3.5 py-1 rounded-full border border-orange-200">
          {isEn ? 'Citizen Reminder Service' : 'नागरिक अनुस्मारक सेवा'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          {isEn ? 'Send Grievance Reminder' : 'अनुस्मारक भेजें (Send Reminder)'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          {isEn
            ? 'Submit an official reminder for your registered complaint to expedite departmental redressal'
            : 'अपनी पूर्व में दर्ज शिकायत के त्वरित निस्तारण हेतु संबंधित विभाग एवं नोडल अधिकारी को आधिकारिक अनुस्मारक प्रेषित करें'}
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-8">
        <div className="bg-white rounded-2xl p-2 sm:p-2.5 border-2 border-slate-200 hover:border-gov-orange focus-within:border-gov-orange shadow-md flex items-center gap-2 transition-all">
          <Search className="w-5 h-5 text-gov-orange ml-2 flex-shrink-0" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={
              isEn
                ? 'Enter Reference ID or 10-digit Mobile...'
                : 'शिकायत संदर्भ संख्या अथवा 10 अंकों का मोबाइल दर्ज करें...'
            }
            className="flex-1 text-xs sm:text-sm font-semibold bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-gov-orange hover:bg-gov-orangeDark text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition-colors shadow-xs flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>{isEn ? 'Find Complaint' : 'शिकायत खोजें'}</span>
          </button>
        </div>

        {/* Demo chips */}
        <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] text-slate-500 flex-wrap">
          <span>{isEn ? 'Quick Demo Cases:' : 'त्वरित डेमो केस:'}</span>
          {['DEMO-UK-1905-2026-000001', 'DEMO-UK-1905-2026-000002'].map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setSearchInput(id);
                setActiveId(id);
                setSearchParams({ id });
                setReminderSubmitted(false);
              }}
              className="bg-orange-50 hover:bg-orange-100 text-gov-orangeDark px-2 py-0.5 rounded font-mono font-bold border border-orange-200 transition-colors"
            >
              {id.slice(-6)}
            </button>
          ))}
        </div>
      </form>

      {/* Complaint Found & Reminder Form */}
      {complaint ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  {isEn ? 'Grievance Reference:' : 'शिकायत संदर्भ संख्या:'}
                </span>
                <span className="font-mono font-extrabold text-gov-orange text-base sm:text-lg">
                  {complaint.id}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                {complaint.title}
              </h2>
            </div>
            <StatusBadge status={complaint.status} size="lg" />
          </div>

          {/* Grievance Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-orange-50/50 p-3.5 rounded-2xl border border-orange-100 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
                <Building className="w-3.5 h-3.5 text-gov-orange" />
                <span>{isEn ? 'Department' : 'संबंधित विभाग'}</span>
              </div>
              <div className="font-bold text-slate-900">{complaint.assignedDepartment}</div>
            </div>

            <div className="bg-orange-50/50 p-3.5 rounded-2xl border border-orange-100 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                <span>{isEn ? 'District' : 'जनपद'}</span>
              </div>
              <div className="font-bold text-slate-900">{complaint.district}</div>
            </div>

            <div className="bg-orange-50/50 p-3.5 rounded-2xl border border-orange-100 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isEn ? 'Registered On' : 'पंजीकरण दिनांक'}</span>
              </div>
              <div className="font-bold text-slate-900">
                {new Date(complaint.registeredAt).toLocaleDateString(isEn ? 'en-IN' : 'hi-IN')}
              </div>
            </div>

            {/* Days Elapsed & SLA Indicator */}
            <div className="bg-orange-50/50 p-3.5 rounded-2xl border border-orange-100 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>{isEn ? 'Days Elapsed / SLA' : 'व्यतीत दिवस / समयसीमा'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-gov-orangeDark">{daysElapsed} {isEn ? 'Days' : 'दिन'}</span>
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${
                  daysElapsed >= 3
                    ? 'bg-amber-100 text-amber-900 border border-amber-200'
                    : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                }`}>
                  {daysElapsed >= 3
                    ? (isEn ? 'Eligible (>3d)' : 'पात्र (>3 दिन)')
                    : (isEn ? 'Active SLA' : 'प्रक्रियाधीन')}
                </span>
              </div>
            </div>
          </div>

          {/* If already resolved */}
          {complaint.status === 'RESOLVED' ? (
            <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-bold">
                <CheckCircle2 className="w-5 h-5 text-gov-green" />
                <span>
                  {isEn
                    ? 'This grievance has already been resolved by the department.'
                    : 'यह शिकायत विभाग द्वारा पहले ही निस्तारित की जा चुकी है।'}
                </span>
              </div>
              <p className="text-emerald-800">
                {isEn
                  ? 'If you are dissatisfied with the on-ground resolution, you can apply to reopen this grievance or submit your satisfaction feedback.'
                  : 'यदि आप धरातलीय समाधान से संतुष्ट नहीं हैं, तो आप शिकायत को पुनः खोलने (Reopen) का अनुरोध कर सकते हैं अथवा फीडबैक दे सकते हैं।'}
              </p>
              <div className="flex gap-2 flex-wrap pt-1">
                <Link
                  to={`/track?id=${complaint.id}`}
                  className="bg-gov-green hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl transition-colors"
                >
                  {isEn ? 'View Action Taken Report' : 'समाधान रिपोर्ट देखें'}
                </Link>
                <Link
                  to={`/feedback?id=${complaint.id}`}
                  className="bg-white border border-emerald-300 text-emerald-900 font-bold px-4 py-2 rounded-xl hover:bg-emerald-100 transition-colors"
                >
                  {isEn ? 'Submit Feedback' : 'फीडबैक दें'}
                </Link>
              </div>
            </div>
          ) : reminderSubmitted ? (
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 text-center space-y-3 animate-in fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-emerald-950">
                {isEn ? 'Official Reminder Dispatched Successfully' : 'अनुस्मारक सफलता पूर्वक प्रेषित हो चुका है'}
              </h3>
              <p className="text-xs text-emerald-800 max-w-lg mx-auto leading-relaxed">
                {isEn
                  ? `Your reminder for Grievance ${complaint.id} has been logged in the audit trail and escalated to ${complaint.assignedOfficer || 'the Nodal Officer'}.`
                  : `आपकी शिकायत ${complaint.id} पर अनुस्मारक दर्ज कर संबंधित अधिकारी ${complaint.assignedOfficer || 'नोडल अधिकारी'} को प्रेषित कर दिया गया है।`}
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <Link
                  to={`/track?id=${complaint.id}`}
                  className="bg-gov-orange hover:bg-gov-orangeDark text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-xs flex items-center gap-1"
                >
                  <span>{isEn ? 'View Live Timeline' : 'लाइव टाइमलाइन देखें'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => setReminderSubmitted(false)}
                  className="bg-white text-slate-700 text-xs font-semibold px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50"
                >
                  {isEn ? 'Send Another Note' : 'अन्य टिप्पणी भेजें'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSendReminderSubmit} className="space-y-4 pt-2">
              <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <Bell className="w-4 h-4 text-gov-orange flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-bold">
                    {isEn ? 'Reminder Escalation Policy:' : 'अनुस्मारक प्रेषण नियम:'}
                  </strong>
                  <p className="text-slate-700 mt-0.5">
                    {isEn
                      ? 'Citizens may send an official reminder if action is pending beyond reasonable service timeframes. The reminder is recorded in the case timeline and alerts the designated officer.'
                      : 'यदि आपकी शिकायत पर अपेक्षित समयसीमा में कार्रवाई नहीं हुई है तो आप रिमाइंडर भेज सकते हैं। यह अधिकारी के डैशबोर्ड में फ्लैग किया जाता है।'}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isEn ? 'Reason for Reminder / Specific Note (Optional):' : 'अनुस्मारक का कारण / विशेष विवरण (वैकल्पिक):'}
                </label>
                <textarea
                  rows={3}
                  value={reminderNote}
                  onChange={(e) => setReminderNote(e.target.value)}
                  placeholder={
                    isEn
                      ? 'e.g., Water supply is still disrupted for 85 families, please expedite repair...'
                      : 'उदा. मौके पर अभी भी पेयजल संकट बना हुआ है, कृपया कार्य को त्वरित गति से पूर्ण कराएं...'
                  }
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Link
                  to={`/track?id=${complaint.id}`}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  {isEn ? 'Check Status First' : 'पहले स्थिति देखें'}
                </Link>
                <button
                  type="submit"
                  className="bg-gov-orange hover:bg-gov-orangeDark text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>{isEn ? 'Submit Official Reminder' : 'आधिकारिक अनुस्मारक भेजें'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-md text-center max-w-md mx-auto space-y-3">
          <div className="w-14 h-14 rounded-full bg-orange-50 text-gov-orange flex items-center justify-center mx-auto">
            <Search className="w-7 h-7" />
          </div>
          <h2 className="font-bold text-base text-slate-900">
            {isEn ? 'No Complaint Selected' : 'कोई शिकायत चयनित नहीं'}
          </h2>
          <p className="text-xs text-slate-500">
            {isEn
              ? 'Please enter your Complaint Reference Number (e.g. DEMO-UK-1905-2026-000001) above to send an official reminder.'
              : 'अनुस्मारक भेजने हेतु कृपया ऊपर अपनी शिकायत संदर्भ संख्या दर्ज करें।'}
          </p>
        </div>
      )}
    </div>
  );
};
