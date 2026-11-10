import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  CheckCircle2,
  Clock,
  Send,
  UserCheck,
  Wrench,
  AlertCircle,
  RotateCcw,
  Star,
  FileText,
  Printer,
  Download,
  Building,
  MapPin,
  Calendar,
  Phone,
  ShieldCheck,
  MessageSquare,
  AlertTriangle,
  ArrowRight,
  Bell,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { ComplaintStatus } from '../types/complaint';

export const TrackComplaintPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryId = searchParams.get('id') || 'DEMO-UK-1905-2026-000001';

  const [searchInput, setSearchInput] = useState(queryId);
  const [activeComplaintId, setActiveComplaintId] = useState(queryId);

  const { getComplaintById, getComplaintsByMobile, submitFeedback, requestReopening } = useStore();
  const { announce } = useAccessibility();
  const { language } = useLanguage();
  const isEn = language === 'en';

  // Reopen Modal state
  const [isReopenModalOpen, setIsReopenModalOpen] = useState(false);
  const [reopenReason, setReopenReason] = useState('');

  // Feedback State
  const [rating, setRating] = useState(5);
  const [feedbackRemarks, setFeedbackRemarks] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    if (queryId) {
      setSearchInput(queryId);
      setActiveComplaintId(queryId);
    }
  }, [queryId]);

  const complaint = getComplaintById(activeComplaintId);

  const daysElapsed = complaint
    ? Math.max(1, Math.floor((Date.now() - new Date(complaint.registeredAt).getTime()) / (1000 * 60 * 60 * 24)))
    : 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    // Check if input is phone number
    if (/^\d{10}$/.test(searchInput.trim())) {
      const results = getComplaintsByMobile(searchInput.trim());
      if (results.length > 0) {
        setActiveComplaintId(results[0].id);
        setSearchParams({ id: results[0].id });
        announce(
          isEn
            ? `Found ${results.length} grievances registered with this mobile number.`
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

    setActiveComplaintId(searchInput.trim());
    setSearchParams({ id: searchParams.get('id') || searchInput.trim() });
  };

  const handleReopenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reopenReason.trim() || !complaint) return;
    requestReopening(complaint.id, reopenReason.trim());
    setIsReopenModalOpen(false);
    setReopenReason('');
    announce(
      isEn
        ? 'Grievance reopening request submitted successfully.'
        : 'शिकायत पुनः खोलने का अनुरोध दर्ज कर लिया गया है।'
    );
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaint) return;

    submitFeedback(complaint.id, {
      isResolved: rating >= 3,
      rating,
      satisfactionLevel: rating >= 4 ? 'VERY_SATISFIED' : rating === 3 ? 'SATISFIED' : 'DISSATISFIED',
      remarks: feedbackRemarks || (isEn ? 'Satisfied with resolution provided.' : 'समाधान से संतुष्ट हूँ।'),
    });

    setFeedbackSubmitted(true);
    announce(
      isEn
        ? 'Citizen feedback recorded successfully. Thank you!'
        : 'नागरिक फीडबैक सफलता पूर्वक दर्ज हो गया है।'
    );
  };

  // 8 standard stages representation
  const STAGES_ORDER: ComplaintStatus[] = [
    'REGISTERED',
    'INITIAL_REVIEW',
    'FORWARDED_TO_DEPT',
    'ASSIGNED_TO_OFFICER',
    'ACTION_IN_PROGRESS',
    'RESOLUTION_SUBMITTED',
    'RESOLVED',
  ];

  const getStageIndex = (status: ComplaintStatus) => {
    if (status === 'REOPENED') return 4;
    const idx = STAGES_ORDER.indexOf(status);
    return idx >= 0 ? idx : 0;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12" id="main-content">
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <span className="text-xs font-black text-gov-orange uppercase tracking-wider bg-orange-50 px-3.5 py-1 rounded-full border border-orange-200">
          {isEn ? 'Transparent Grievance Tracking' : 'पारदर्शी निगरानी'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black font-devanagari text-slate-900">
          {isEn ? 'Track Grievance Status' : 'शिकायत की स्थिति जांचें (Track Grievance)'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          {isEn
            ? 'Enter your Reference ID (e.g. DEMO-UK-1905-2026-000001) or 10-digit registered mobile number to view real-time progress'
            : 'अपनी संदर्भ संख्या (Reference Number) अथवा मोबाइल नंबर दर्ज कर वास्तविक-समय प्रगति देखें'}
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-10">
        <div className="bg-white rounded-2xl p-2 sm:p-2.5 border-2 border-slate-200 hover:border-gov-orange focus-within:border-gov-orange shadow-lg flex items-center gap-2 transition-all">
          <Search className="w-5 h-5 text-gov-orange ml-2 flex-shrink-0" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={
              isEn
                ? 'e.g. DEMO-UK-1905-2026-000001 or 9876543210...'
                : 'उदा. DEMO-UK-1905-2026-000001 अथवा 9876543210...'
            }
            className="flex-1 text-xs sm:text-sm font-semibold bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-gov-orange hover:bg-gov-orangeDark text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition-colors shadow-sm flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>{isEn ? 'Track Status' : 'स्थिति देखें'}</span>
          </button>
        </div>

        {/* Quick Demo Search Chips */}
        <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] text-slate-500 flex-wrap">
          <span>{isEn ? 'Quick Demo Cases:' : 'त्वरित डेमो केस:'}</span>
          {['DEMO-UK-1905-2026-000001', 'DEMO-UK-1905-2026-000002', 'DEMO-UK-1905-2026-000005'].map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setSearchInput(id);
                setActiveComplaintId(id);
                setSearchParams({ id });
              }}
              className="bg-orange-50 hover:bg-orange-100 text-gov-orangeDark px-2 py-0.5 rounded font-mono font-bold border border-orange-200 transition-colors"
            >
              {id.slice(-6)}
            </button>
          ))}
        </div>
      </form>

      {/* Complaint Result Body */}
      {complaint ? (
        <div className="space-y-8 animate-in fade-in">
          {/* Top Status & Summary Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    {isEn ? 'Grievance Reference Number:' : 'शिकायत संदर्भ संख्या:'}
                  </span>
                  <span className="font-mono font-black text-gov-orange text-base sm:text-lg">
                    {complaint.id}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                  {complaint.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge status={complaint.status} size="lg" />
                <button
                  onClick={() => window.print()}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                  title={isEn ? 'Print Acknowledgment Slip' : 'प्रिंट करें'}
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Key Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="bg-orange-50/40 p-3.5 rounded-2xl border border-orange-100 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
                  <Building className="w-3.5 h-3.5 text-gov-orange" />
                  <span>{isEn ? 'Assigned Department' : 'संबंधित विभाग'}</span>
                </div>
                <div className="font-bold text-slate-900">{complaint.assignedDepartment}</div>
              </div>

              <div className="bg-orange-50/40 p-3.5 rounded-2xl border border-orange-100 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  <span>{isEn ? 'District & Location' : 'जनपद एवं स्थल'}</span>
                </div>
                <div className="font-bold text-slate-900">
                  {complaint.district} ({complaint.villageOrWard})
                </div>
              </div>

              <div className="bg-orange-50/40 p-3.5 rounded-2xl border border-orange-100 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isEn ? 'Registration & Elapsed' : 'पंजीकरण एवं व्यतीत दिवस'}</span>
                </div>
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>
                    {new Date(complaint.registeredAt).toLocaleDateString(isEn ? 'en-IN' : 'hi-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="text-[10px] bg-orange-100 text-gov-orangeDark px-1.5 py-0.5 rounded font-black">
                    {daysElapsed}d {isEn ? 'elapsed' : 'व्यतीत'}
                  </span>
                </div>
              </div>

              <div className="bg-orange-50/40 p-3.5 rounded-2xl border border-orange-100 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
                  <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{isEn ? 'Nodal / Field Officer' : 'नोडल / क्षेत्रीय अधिकारी'}</span>
                </div>
                <div className="font-bold text-slate-900">
                  {complaint.assignedOfficer || (isEn ? 'Initial assignment in progress' : 'प्रारंभिक आवंटन प्रक्रियाधीन')}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="text-xs space-y-1.5 bg-orange-50/30 p-4 rounded-2xl border border-orange-100">
              <strong className="text-slate-900 font-bold block">
                {isEn ? 'Grievance Description Registered by Citizen:' : 'नागरिक द्वारा दर्ज समस्या विवरण:'}
              </strong>
              <p className="text-slate-700 leading-relaxed italic">
                "{complaint.description}"
              </p>
            </div>

            {/* Attachments if any */}
            {complaint.attachments.length > 0 && (
              <div className="text-xs space-y-2">
                <span className="font-bold text-slate-700">
                  {isEn ? `Attached Evidence (${complaint.attachments.length}):` : `संलग्न साक्ष्य (${complaint.attachments.length}):`}
                </span>
                <div className="flex gap-2 flex-wrap">
                  {complaint.attachments.map((att) => (
                    <div
                      key={att.id}
                      className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200"
                    >
                      <FileText className="w-4 h-4 text-gov-orange" />
                      <span className="font-medium text-slate-800">{att.name}</span>
                      <span className="text-[10px] text-slate-400">({att.size})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Citizen Action Quick Bar (Delhi CM Jan Sunwai Style Direct Actions) */}
            <div className="p-4 bg-orange-50/60 rounded-2xl border border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">
                  {isEn ? 'Citizen Action Options' : 'नागरिक सेवा विकल्प'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {complaint.status === 'RESOLVED'
                    ? (isEn ? 'Grievance is resolved. Share feedback or request reopening if unsatisfied.' : 'शिकायत निस्तारित है। फीडबैक दें अथवा पुनः खोलने का अनुरोध करें।')
                    : (isEn ? 'Facing delay? Send an official reminder to escalate to nodal supervisor.' : 'देरी होने पर संबंधित नोडल अधिकारी को अनुस्मारक (Reminder) प्रेषित करें।')}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
                {complaint.status !== 'RESOLVED' && (
                  <Link
                    to={`/send-reminder?id=${complaint.id}`}
                    className="bg-gov-orange hover:bg-gov-orangeDark text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Send Reminder' : 'अनुस्मारक भेजें'}</span>
                  </Link>
                )}

                <Link
                  to={`/feedback?id=${complaint.id}`}
                  className="bg-white hover:bg-orange-50 text-gov-orangeDark border border-orange-300 text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                  <span>{isEn ? 'Submit Feedback' : 'फीडबैक दें'}</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsReopenModalOpen(true)}
                  className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Reopen Request' : 'पुनः खोलें'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* 8-Stage Interactive Visual Status Timeline */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 font-devanagari">
                  {isEn ? 'Redressal Action & Status Timeline' : 'कार्रवाई एवं स्थिति टाइमलाइन (Redressal Timeline)'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isEn
                    ? 'Official chronological audit trail from registration to on-field redressal and verification'
                    : 'पंजीकरण से लेकर अंतिम निस्तारण तक प्रत्येक चरण का आधिकारिक रिकॉर्ड'}
                </p>
              </div>
              <span className="text-xs font-bold text-gov-green bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {isEn ? `${complaint.timeline.length} Official Updates` : `${complaint.timeline.length} अद्यतन (Updates)`}
              </span>
            </div>

            {/* Timeline Events List */}
            <div className="relative pl-6 sm:pl-8 border-l-2 border-orange-200 space-y-6 my-4">
              {complaint.timeline.map((event, idx) => {
                const isLatest = idx === complaint.timeline.length - 1;
                return (
                  <div key={event.id} className="relative group">
                    {/* Timeline Node Dot */}
                    <div
                      className={`absolute -left-[31px] sm:-left-[39px] top-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                        isLatest
                          ? 'bg-gov-orange ring-4 ring-orange-200 animate-pulse'
                          : 'bg-emerald-500'
                      }`}
                    >
                      {idx + 1}
                    </div>

                    <div
                      className={`p-4 rounded-2xl border transition-all ${
                        isLatest
                          ? 'bg-orange-50/70 border-gov-orange shadow-2xs'
                          : 'bg-slate-50/70 border-slate-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                        <h4 className="font-bold text-sm text-slate-900">
                          {event.title}
                        </h4>
                        <span className="text-[11px] font-medium text-slate-500">
                          {new Date(event.timestamp).toLocaleString(isEn ? 'en-IN' : 'hi-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed">
                        {event.description}
                      </p>

                      {/* Officer Remarks or Attached Report */}
                      {(event.officerName || event.remarks || event.documentUrl) && (
                        <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between flex-wrap gap-2 text-[11px]">
                          {event.officerName && (
                            <span className="text-slate-600 font-semibold flex items-center gap-1">
                              <UserCheck className="w-3.5 h-3.5 text-gov-orange" />
                              <span>{isEn ? `Officer: ${event.officerName}` : `अधिकारी: ${event.officerName}`}</span>
                            </span>
                          )}

                          {event.documentUrl && (
                            <span className="bg-white px-2 py-0.5 rounded border border-orange-200 text-gov-orangeDark font-semibold flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              <span>{isEn ? `Report: ${event.documentUrl}` : `आख्या: ${event.documentUrl}`}</span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Taken Report (ATR) Card if available */}
          {complaint.actionTakenReport && (
            <div className="bg-emerald-50/80 rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-md space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gov-green text-white rounded-xl">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-emerald-950">
                      {isEn ? 'Departmental Action Taken Report (ATR)' : 'विभागीय आख्या / समाधान प्रतिवेदन (Action Taken Report)'}
                    </h3>
                    <p className="text-xs text-emerald-700">
                      {isEn ? 'Official resolution summary submitted by designated nodal officer' : 'संबंधित अधिकारी द्वारा प्रस्तुत आधिकारिक समाधान विवरण'}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  {isEn ? 'ATR Verified & Attached' : 'समाधान रिपोर्ट संलग्न'}
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-emerald-200 text-xs text-slate-800 space-y-2">
                <p className="leading-relaxed font-medium">
                  {complaint.actionTakenReport.summary}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                  <span>{isEn ? 'Reporting Officer:' : 'प्रतिवेदक:'} <strong>{complaint.actionTakenReport.officerName}</strong></span>
                  <span>{isEn ? 'Submitted On:' : 'दिनांक:'} {new Date(complaint.actionTakenReport.submittedAt).toLocaleDateString(isEn ? 'en-IN' : 'hi-IN')}</span>
                </div>
              </div>
            </div>
          )}

          {/* Citizen Feedback & Reopening Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Feedback Box */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg space-y-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-current" />
                <h3 className="font-bold text-base text-slate-900">
                  {isEn ? 'Citizen Satisfaction Feedback' : 'नागरिक संतुष्टि फीडबैक (Citizen Feedback)'}
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                {isEn
                  ? 'Has your grievance been adequately resolved? Share your rating and feedback to help improve public service delivery.'
                  : 'क्या आपकी समस्या का समाधान हो चुका है? अपनी रेटिंग एवं समीक्षा साझा करें।'}
              </p>

              {complaint.feedback || feedbackSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs space-y-2">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: complaint.feedback?.rating || rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    <span className="text-xs font-bold text-emerald-900 ml-1">
                      {isEn ? `${complaint.feedback?.rating || rating}/5 Satisfaction` : `${complaint.feedback?.rating || rating}/5 संतुष्टि`}
                    </span>
                  </div>
                  <p className="text-emerald-800 italic">
                    "{complaint.feedback?.remarks || feedbackRemarks}"
                  </p>
                  <span className="text-[10px] text-emerald-600 block pt-1">
                    {isEn ? 'Citizen feedback has been successfully recorded. Thank you!' : 'फीडबैक दर्ज किया जा चुका है। आपका धन्यवाद!'}
                  </span>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {isEn ? 'Select Satisfaction Rating:' : 'स्टार रेटिंग चुनें (Select Rating):'}
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setRating(num)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              num <= rating
                                ? 'text-amber-400 fill-current'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-slate-700 ml-2">
                        {isEn
                          ? rating === 5
                            ? 'Very Satisfied'
                            : rating === 4
                            ? 'Satisfied'
                            : rating === 3
                            ? 'Neutral'
                            : 'Unsatisfied'
                          : rating === 5
                          ? 'अति संतुष्ट'
                          : rating === 4
                          ? 'संतुष्ट'
                          : rating === 3
                          ? 'सामान्य'
                          : 'असंतोषजनक'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {isEn ? 'Feedback Remarks / Comments:' : 'टिप्पणी / विचार (Remarks):'}
                    </label>
                    <textarea
                      rows={2}
                      value={feedbackRemarks}
                      onChange={(e) => setFeedbackRemarks(e.target.value)}
                      placeholder={
                        isEn
                          ? 'Enter comments on the helpline promptness and officer action...'
                          : 'हेल्पलाइन की त्वरित कार्रवाई पर अपने विचार लिखें...'
                      }
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gov-orange hover:bg-gov-orangeDark text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors shadow-2xs"
                  >
                    {isEn ? 'Submit Citizen Feedback' : 'फीडबैक सबमिट करें (Submit Feedback)'}
                  </button>
                </form>
              )}
            </div>

            {/* Reopening Request Box */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-rose-600" />
                  <h3 className="font-bold text-base text-slate-900">
                    {isEn ? 'Request Grievance Reopening' : 'पुनः खोलने का अनुरोध (Request Reopening)'}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {isEn
                    ? 'If the departmental resolution was inadequate, incomplete, or the issue resurfaced on the ground.'
                    : 'यदि विभागीय कार्रवाई से आपकी समस्या का वास्तविक समाधान नहीं हुआ है अथवा काम अधूरा छोड़ा गया है।'}
                </p>

                {complaint.status === 'REOPENED' ? (
                  <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 space-y-1">
                    <span className="font-bold flex items-center gap-1">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      {isEn ? 'This complaint is currently REOPENED.' : 'शिकायत वर्तमान में पुनः खुली (Reopened) है।'}
                    </span>
                    <p className="text-[11px] text-rose-700">
                      {isEn ? 'Reason:' : 'कारण:'} "{complaint.reopenReason || (isEn ? 'Citizen requested review of work.' : 'नागरिक द्वारा पुनः जांच का अनुरोध किया गया।')}"
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600">
                    {isEn
                      ? 'Reopening escalates this grievance to Level 3 / District Administrator for senior review and site re-inspection.'
                      : 'शिकायत दोबारा खोलने पर केस उच्चाधिकारी (Level 3/District Admin) के संज्ञान में प्रस्तुत किया जाएगा।'}
                  </div>
                )}
              </div>

              {complaint.status !== 'REOPENED' && (
                <button
                  type="button"
                  onClick={() => setIsReopenModalOpen(true)}
                  className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{isEn ? 'Apply to Reopen Grievance' : 'शिकायत पुनः खोलने हेतु आवेदन करें'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-lg text-center max-w-md mx-auto space-y-3">
          <div className="w-16 h-16 rounded-full bg-orange-50 text-gov-orange flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h2 className="font-bold text-lg text-slate-900">
            {isEn ? 'No Grievance Record Found' : 'कोई शिकायत प्राप्त नहीं हुई'}
          </h2>
          <p className="text-xs text-slate-500">
            {isEn
              ? 'Please verify your Reference Number (e.g. DEMO-UK-1905-2026-000001) or register a new grievance online.'
              : 'कृपया सही शिकायत संदर्भ संख्या दर्ज करें (जैसे DEMO-UK-1905-2026-000001) अथवा नई शिकायत दर्ज करें।'}
          </p>
          <div className="pt-2">
            <Link
              to="/register"
              className="inline-flex items-center gap-1.5 bg-gov-orange hover:bg-gov-orangeDark text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors shadow-xs"
            >
              {isEn ? 'Register New Grievance' : 'नई शिकायत दर्ज करें'}
            </Link>
          </div>
        </div>
      )}

      {/* Reopening Modal */}
      {isReopenModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-rose-700">
                <RotateCcw className="w-5 h-5" />
                <h3 className="font-bold text-base">
                  {isEn ? 'Reason for Reopening Grievance' : 'शिकायत पुनः खोलने का कारण'}
                </h3>
              </div>
              <button
                onClick={() => setIsReopenModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReopenSubmit} className="space-y-4 text-xs">
              <p className="text-slate-600">
                {isEn
                  ? 'Please explain why you are dissatisfied with the resolution so senior departmental nodal officers can arrange a re-inspection:'
                  : 'कृपया बताएं कि आप समाधान से क्यों असंतुष्ट हैं ताकि संबंधित विभाग के वरिष्ठ नोडल अधिकारी स्थल का पुनः निरीक्षण करा सकें:'}
              </p>

              <textarea
                rows={4}
                required
                value={reopenReason}
                onChange={(e) => setReopenReason(e.target.value)}
                placeholder={
                  isEn
                    ? 'e.g. Drinking water pipeline is still leaking on site; only temporary patchwork was done...'
                    : 'उदा. मौके पर अभी भी पाइपलाइन से पानी लीक हो रहा है, केवल अस्थाई काम किया गया...'
                }
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReopenModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl"
                >
                  {isEn ? 'Cancel' : 'रद्द करें'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-xs"
                >
                  {isEn ? 'Submit Reopening Request' : 'पुनः खोलने का अनुरोध भेजें'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
