import React, { useState } from 'react';
import {
  Award,
  Search,
  CheckCircle2,
  FileText,
  ExternalLink,
  ChevronDown,
  Building,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { UTTARAKHAND_SCHEMES, GovtScheme } from '../data/schemes';

export const SchemesPage: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSchemeId, setExpandedSchemeId] = useState<string | null>(UTTARAKHAND_SCHEMES[0].id);

  const categories = [
    { id: 'ALL', labelEn: 'All Schemes', labelHi: 'समस्त योजनाएं' },
    { id: 'Health', labelEn: 'Health & Medical', labelHi: 'स्वास्थ्य' },
    { id: 'Women', labelEn: 'Women Welfare', labelHi: 'महिला कल्याण' },
    { id: 'Agriculture', labelEn: 'Agriculture & Farmers', labelHi: 'कृषि' },
    { id: 'Employment', labelEn: 'Employment & Skills', labelHi: 'रोजगार व उद्यम' },
    { id: 'Social Welfare', labelEn: 'Social Security', labelHi: 'सामाजिक सुरक्षा' },
    { id: 'Tourism', labelEn: 'Tourism & Homestay', labelHi: 'पर्यटन' },
  ];

  const filteredSchemes = UTTARAKHAND_SCHEMES.filter((s) => {
    if (selectedCategory !== 'ALL' && s.category !== selectedCategory) return false;
    if (
      searchTerm &&
      !s.nameHi.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !s.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !s.department.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12" id="main-content">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-black text-gov-orange uppercase tracking-wider bg-orange-50 px-3.5 py-1 rounded-full border border-orange-200">
          {isEn ? 'Flagship Welfare Programs' : 'जन कल्याणकारी योजनाएं'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-devanagari">
          {isEn
            ? 'Uttarakhand Government Welfare Schemes'
            : 'उत्तराखण्ड सरकारी योजनाएं (Govt Schemes)'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          {isEn
            ? 'Verified eligibility criteria, financial entitlements, application guidelines, and official portals for major state welfare schemes'
            : 'आयुष्मान कार्ड, गौरा कन्या, किसान कल्याण, स्वरोजगार एवं पेंशन योजनाओं की सत्यापित आधिकारिक पात्रता एवं लाभ'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-2xs mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 text-gov-orange absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              isEn
                ? 'Search scheme by name or department (e.g. Ayushman, Gaura Devi, Farmer, Self-Employment, Pension)...'
                : 'योजना का नाम अथवा विभाग खोजें (उदा. आयुष्मान, गौरा कन्या, किसान, स्वरोजगार, पेंशन)...'
            }
            className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-gov-orange text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {isEn ? cat.labelEn : cat.labelHi}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes List with Accordion Details */}
      <div className="space-y-4">
        {filteredSchemes.map((scheme) => {
          const isExpanded = expandedSchemeId === scheme.id;
          return (
            <div
              key={scheme.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition-all overflow-hidden"
            >
              {/* Header Bar */}
              <div
                onClick={() => setExpandedSchemeId(isExpanded ? null : scheme.id)}
                className="p-5 sm:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-orange-50/20 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-emerald-50 text-gov-green text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {isEn ? scheme.category : scheme.categoryHi}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {isEn ? 'Department:' : 'विभाग:'} <strong className="text-slate-800">{scheme.department}</strong>
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-slate-900 font-devanagari">
                    {isEn ? scheme.nameEn : scheme.nameHi}
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold font-sans">
                    {isEn ? scheme.nameHi : scheme.nameEn}
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-1 pt-1">
                    {isEn ? scheme.overviewEn : scheme.overviewHi}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end md:self-auto flex-shrink-0">
                  <div
                    className={`w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center transition-transform ${
                      isExpanded ? 'rotate-180 bg-orange-100 text-gov-orange' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Accordion Expanded Content */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-5 text-xs bg-slate-50/50 animate-in fade-in">
                  {/* Overview */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                    <strong className="text-slate-900 text-sm font-bold block">
                      {isEn ? 'Scheme Purpose & Overview:' : 'योजना का उद्देश्य एवं विवरण:'}
                    </strong>
                    <p className="text-slate-700 leading-relaxed">
                      {isEn ? scheme.overviewEn : scheme.overviewHi}
                    </p>
                  </div>

                  {/* 2 Column: Benefits & Eligibility */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Benefits */}
                    <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-2">
                      <strong className="text-emerald-950 font-bold block flex items-center gap-1.5 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-gov-green" />
                        {isEn ? 'Key Benefits & Entitlements:' : 'प्रमुख लाभ एवं वित्तीय सहायता (Benefits):'}
                      </strong>
                      <ul className="space-y-1.5 text-emerald-900 list-disc pl-4 leading-relaxed">
                        {(isEn ? scheme.benefitsEn : scheme.benefitsHi).map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Eligibility */}
                    <div className="bg-orange-50/70 p-4 rounded-2xl border border-orange-200 space-y-2">
                      <strong className="text-slate-900 font-bold block flex items-center gap-1.5 text-sm">
                        <Award className="w-4 h-4 text-gov-orange" />
                        {isEn ? 'Eligibility Criteria:' : 'पात्रता मापदंड (Eligibility Criteria):'}
                      </strong>
                      <ul className="space-y-1.5 text-slate-800 list-disc pl-4 leading-relaxed">
                        {(isEn ? scheme.eligibilityEn : scheme.eligibilityHi).map((e, i) => (
                          <li key={i}>{e}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Required Documents */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                    <strong className="text-slate-900 font-bold block">
                      {isEn ? 'Mandatory Documents:' : 'आवश्यक दस्तावेज (Required Documents):'}
                    </strong>
                    <div className="flex flex-wrap gap-2">
                      {(isEn ? scheme.requiredDocsEn : scheme.requiredDocsHi).map((doc, i) => (
                        <span key={i} className="bg-slate-100 text-slate-800 px-3 py-1 rounded-lg border border-slate-200 font-medium">
                          ✓ {doc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* How to Apply & Verified Link */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                    <div className="text-slate-600">
                      <strong>{isEn ? 'Application Process:' : 'आवेदन प्रक्रिया:'}</strong>{' '}
                      {isEn ? scheme.howToApplyEn : scheme.howToApplyHi}
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <a
                        href={scheme.officialPortal}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gov-orange hover:bg-gov-orangeDark text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
                      >
                        <span>{isEn ? 'Apply on Official Portal' : 'आधिकारिक पोर्टल पर आवेदन करें'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
