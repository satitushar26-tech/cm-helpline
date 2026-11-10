import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Phone,
  Mail,
  ExternalLink,
  Search,
  PlusCircle,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { UTTARAKHAND_DEPARTMENTS } from '../data/departments';

export const DepartmentDirectoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { language } = useLanguage();
  const isEn = language === 'en';

  const filteredDepts = UTTARAKHAND_DEPARTMENTS.filter(
    (d) =>
      d.nameHi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.serviceKeywords.some((k) => k.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12" id="main-content">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-black text-gov-orange uppercase tracking-wider bg-orange-50 px-3.5 py-1 rounded-full border border-orange-200">
          {isEn ? 'Government Sectors' : 'शासकीय संवर्ग'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-devanagari">
          {isEn
            ? 'Uttarakhand State Departments Directory'
            : 'उत्तराखण्ड राज्य विभाग निर्देशिका (Departments)'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          {isEn
            ? 'Public Works, Drinking Water, Energy, Health, Revenue, Education, and all major public service departments'
            : 'लोक निर्माण, पेयजल, ऊर्जा, स्वास्थ्य, शिक्षा सहित सभी प्रमुख विभागों के संपर्क एवं कार्यक्षेत्र'}
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-10">
        <div className="relative">
          <Search className="w-5 h-5 text-gov-orange absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              isEn
                ? 'Search department name or service keyword (e.g. roads, water, power, health, ration)...'
                : 'विभाग का नाम अथवा सेवा खोजें (उदा. सड़क, पानी, बिजली, राशन, पेंशन)...'
            }
            className="w-full text-xs sm:text-sm bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 shadow-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-gov-orange"
          />
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepts.map((dept) => (
          <div
            key={dept.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-lg hover:border-gov-orange transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="bg-orange-50 text-gov-orangeDark border border-orange-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full font-mono">
                  {dept.code}
                </span>
                <a
                  href={dept.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 hover:text-gov-orange flex items-center gap-1 font-semibold"
                >
                  <span>{isEn ? 'Official Portal' : 'विभागीय पोर्टल'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-slate-900 font-devanagari">
                  {isEn ? dept.nameEn : dept.nameHi}
                </h3>
                <p className="text-xs text-slate-400 font-semibold font-sans mt-0.5">
                  {isEn ? dept.nameHi : dept.nameEn}
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {isEn ? dept.descriptionEn : dept.descriptionHi}
              </p>

              {/* Contacts */}
              <div className="bg-orange-50/40 p-3 rounded-2xl border border-orange-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gov-green flex-shrink-0" />
                  <span>{isEn ? 'Helpline:' : 'हेल्पलाइन:'} <strong className="text-slate-800">{dept.contactNumber}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-gov-orange flex-shrink-0" />
                  <span className="truncate">{dept.contactEmail}</span>
                </div>
              </div>

              {/* Keywords */}
              <div className="flex flex-wrap gap-1">
                {dept.serviceKeywords.slice(0, 5).map((kw, i) => (
                  <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100">
              <Link
                to="/register"
                className="w-full bg-orange-50 hover:bg-gov-orange text-gov-orangeDark hover:text-white font-bold py-2 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 border border-orange-200"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>{isEn ? 'Register Grievance with this Dept' : 'इस विभाग से संबंधित शिकायत करें'}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
