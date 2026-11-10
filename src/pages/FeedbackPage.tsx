import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Star, CheckCircle2, Send, MessageSquare, Sparkles, Search, Building, MapPin, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';

export const FeedbackPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryId = searchParams.get('id') || '';

  const { complaints, getComplaintById, submitFeedback } = useStore();
  const { announce } = useAccessibility();
  const { language } = useLanguage();
  const isEn = language === 'en';

  const defaultId = queryId || complaints[0]?.id || 'DEMO-UK-1905-2026-000001';
  const [complaintId, setComplaintId] = useState(defaultId);
  const [rating, setRating] = useState(5);
  const [isResolved, setIsResolved] = useState(true);
  const [remarks, setRemarks] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (queryId) {
      setComplaintId(queryId);
    }
  }, [queryId]);

  const activeComplaint = getComplaintById(complaintId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFeedback(complaintId, {
      isResolved,
      rating,
      satisfactionLevel: rating >= 4 ? 'VERY_SATISFIED' : rating === 3 ? 'SATISFIED' : 'DISSATISFIED',
      remarks: remarks || (isEn ? 'Satisfied with resolution provided.' : 'समाधान से पूर्णतया संतुष्ट हूँ।'),
    });
    setSubmitted(true);
    announce(
      isEn
        ? 'Feedback recorded successfully. Thank you!'
        : 'फीडबैक सफलता पूर्वक दर्ज हो गया है। धन्यवाद!'
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12" id="main-content">
      <div className="text-center mb-8 space-y-2">
        <span className="text-xs font-black text-gov-orange uppercase tracking-wider bg-orange-50 px-3.5 py-1 rounded-full border border-orange-200">
          {isEn ? 'Citizen Satisfaction & Redressal Quality' : 'नागरिक संतुष्टि एवं सेवा गुणवत्ता'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-devanagari">
          {isEn
            ? 'Citizen Grievance Redressal Feedback'
            : 'नागरिक संतुष्टि फीडबैक (Citizen Feedback)'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          {isEn
            ? 'Share your experience and satisfaction rating on resolved complaints to help enhance public governance'
            : 'अपनी निस्तारित शिकायत पर अनुभव एवं संतुष्टि रेटिंग साझा कर सेवा गुणवत्ता को बेहतर बनाएं'}
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6 text-xs">
        {submitted ? (
          <div className="text-center py-8 space-y-3 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-gov-green flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-black text-slate-900">
              {isEn ? 'Your Feedback Has Been Recorded' : 'आपका फीडबैक दर्ज कर लिया गया है'}
            </h2>
            <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
              {isEn
                ? 'Thank you for your valuable input in helping us strengthen the CM Helpline 1905 service delivery.'
                : 'मुख्यमंत्री हेल्पलाइन 1905 को बेहतर बनाने में आपके बहुमूल्य विचार हेतु हार्दिक धन्यवाद।'}
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <Link
                to={`/track?id=${complaintId}`}
                className="bg-gov-orange hover:bg-gov-orangeDark text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
              >
                <span>{isEn ? 'View Updated Complaint Timeline' : 'अपडेटेड टाइमलाइन देखें'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl transition-colors"
              >
                {isEn ? 'Provide Feedback for Another Grievance' : 'अन्य शिकायत का फीडबैक दें'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                {isEn ? 'Select Registered Grievance' : 'शिकायत का चयन करें (Select Complaint)'}{' '}
                <span className="text-red-500">*</span>
              </label>
              <select
                value={complaintId}
                onChange={(e) => {
                  setComplaintId(e.target.value);
                  setSearchParams({ id: e.target.value });
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
              >
                {complaints.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.id} — {c.title.slice(0, 45)}... ({c.status})
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Complaint Snapshot Card */}
            {activeComplaint && (
              <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100 space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-bold text-slate-900 text-sm">{activeComplaint.title}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-orange-200 text-gov-orangeDark">
                    {activeComplaint.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[11px] text-slate-600 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-gov-orange" />
                    {activeComplaint.assignedDepartment}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    {activeComplaint.district}
                  </span>
                </div>
              </div>
            )}

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                {isEn ? 'Has your grievance been adequately resolved on the ground?' : 'क्या आपकी समस्या का धरातल पर समाधान हो चुका है?'}
              </label>
              <div className="flex gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200">
                  <input
                    type="radio"
                    name="isResolved"
                    checked={isResolved}
                    onChange={() => setIsResolved(true)}
                    className="accent-gov-green"
                  />
                  <span>{isEn ? 'Yes, issue is resolved' : 'हाँ, समस्या हल हो चुकी है'}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-bold text-rose-800 bg-rose-50 px-3.5 py-2 rounded-xl border border-rose-200">
                  <input
                    type="radio"
                    name="isResolved"
                    checked={!isResolved}
                    onChange={() => setIsResolved(false)}
                    className="accent-rose-600"
                  />
                  <span>{isEn ? 'No, issue remains unresolved' : 'नहीं, समस्या अभी बाकी है'}</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                {isEn ? 'Overall Satisfaction Rating (1 to 5 Stars):' : 'समग्र संतुष्टि रेटिंग (1 से 5 स्टार):'}
              </label>
              <div className="flex items-center gap-2 pt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    className="p-1 hover:scale-110 transition-transform"
                    aria-label={`${s} star`}
                  >
                    <Star
                      className={`w-7 h-7 ${
                        s <= rating ? 'text-amber-400 fill-current' : 'text-slate-200'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-black text-gov-orangeDark ml-2 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                  {isEn
                    ? rating === 5
                      ? 'Very Satisfied (5/5)'
                      : rating === 4
                      ? 'Satisfied (4/5)'
                      : rating === 3
                      ? 'Neutral (3/5)'
                      : 'Unsatisfied'
                    : rating === 5
                    ? 'उत्कृष्ट (5/5)'
                    : rating === 4
                    ? 'अच्छा (4/5)'
                    : 'संतोषजनक'}
                </span>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isEn ? 'Remarks & Quality of Resolution:' : 'आपकी टिप्पणी अथवा सुझाव:'}
              </label>
              <textarea
                rows={4}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder={
                  isEn
                    ? 'Enter comments on officer responsiveness, promptness, and quality of work on site...'
                    : 'अधिकारी की कार्यशैली, समयबद्धता अथवा समाधान गुणवत्ता पर अपने विचार लिखें...'
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange leading-relaxed"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-gov-orange hover:bg-gov-orangeDark text-white font-black py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isEn ? 'Submit Citizen Feedback' : 'फीडबैक जमा करें (Submit Feedback)'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
