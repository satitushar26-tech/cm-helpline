import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  MapPin,
  Building,
  Phone,
  Mail,
  ExternalLink,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Layers,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { UTTARAKHAND_DISTRICTS } from '../data/districts';

export const DistrictDirectoryPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialDist = searchParams.get('district') || '';
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [divisionFilter, setDivisionFilter] = useState<'ALL' | 'Garhwal' | 'Kumaon'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrictId, setSelectedDistrictId] = useState(initialDist);

  const filteredDistricts = UTTARAKHAND_DISTRICTS.filter((d) => {
    if (divisionFilter !== 'ALL' && d.division !== divisionFilter) return false;
    if (
      searchTerm &&
      !d.nameHi.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !d.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !d.headquarters.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12" id="main-content">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-black text-gov-orange uppercase tracking-wider bg-orange-50 px-3.5 py-1 rounded-full border border-orange-200">
          {isEn ? 'Administrative Network' : 'प्रशासनिक नेटवर्क'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-devanagari">
          {isEn
            ? 'Uttarakhand 13 Districts Administrative Directory'
            : 'उत्तराखण्ड के समस्त 13 जनपद निर्देशिका (Districts)'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          {isEn
            ? 'Nodal grievance officers, district control rooms, and verified official NIC portals across Garhwal and Kumaon divisions'
            : 'गढ़वाल एवं कुमाऊँ मंडल के सभी 13 जनपदों के नोडल अधिकारी, संपर्क नंबर एवं आधिकारिक एनआईसी पोर्टल'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gov-orange absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isEn ? 'Search district or headquarters...' : 'जनपद अथवा मुख्यालय खोजें...'}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
          />
        </div>

        {/* Division Filter Buttons */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 hidden sm:inline">
            {isEn ? 'Division:' : 'मंडल (Division):'}
          </span>
          <button
            onClick={() => setDivisionFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              divisionFilter === 'ALL'
                ? 'bg-gov-orange text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {isEn ? 'All 13 Districts' : 'सभी 13 जनपद'}
          </button>
          <button
            onClick={() => setDivisionFilter('Garhwal')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              divisionFilter === 'Garhwal'
                ? 'bg-gov-orangeDark text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {isEn ? 'Garhwal Division (7)' : 'गढ़वाल मंडल (7)'}
          </button>
          <button
            onClick={() => setDivisionFilter('Kumaon')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              divisionFilter === 'Kumaon'
                ? 'bg-gov-green text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {isEn ? 'Kumaon Division (6)' : 'कुमाऊँ मंडल (6)'}
          </button>
        </div>
      </div>

      {/* Districts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDistricts.map((d) => {
          const isSelected = selectedDistrictId === d.id;
          return (
            <div
              key={d.id}
              className={`bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? 'border-gov-orange ring-2 ring-orange-200 shadow-xl'
                  : 'border-slate-200 shadow-2xs hover:shadow-lg hover:border-gov-orange'
              }`}
            >
              <div className="space-y-4">
                {/* District Name & Division Badge */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-black text-xl text-slate-900 font-devanagari">
                      {isEn ? d.nameEn : d.nameHi}
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold font-sans">
                      {isEn ? d.nameHi : d.nameEn}
                    </p>
                  </div>

                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      d.division === 'Garhwal'
                        ? 'bg-orange-50 text-gov-orangeDark border border-orange-200'
                        : 'bg-emerald-50 text-gov-green border border-emerald-200'
                    }`}
                  >
                    {isEn ? `${d.division} Division` : `${d.divisionHi} मंडल`}
                  </span>
                </div>

                {/* Headquarters & Area */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">{isEn ? 'Headquarters' : 'मुख्यालय (HQ)'}</span>
                    <strong className="text-slate-800">{isEn ? d.headquarters : d.headquartersHi}</strong>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">{isEn ? 'Area' : 'क्षेत्रफल'}</span>
                    <strong className="text-slate-800">{d.areaSqKm.toLocaleString()} {isEn ? 'sq km' : 'वर्ग किमी'}</strong>
                  </div>
                </div>

                {/* Nodal Officer Contact */}
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <Building className="w-3.5 h-3.5 text-gov-orange flex-shrink-0 mt-0.5" />
                    <span>
                      {isEn ? 'Nodal Officer:' : 'नोडल अधिकारी:'} <strong className="text-slate-800">{d.nodalOfficer}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gov-green flex-shrink-0" />
                    <span>{isEn ? 'Control Room:' : 'कंट्रोल रूम:'} <strong>{d.helplinePhone}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-gov-orange flex-shrink-0" />
                    <span className="truncate">{d.helplineEmail}</span>
                  </div>
                </div>

                {/* Tehsils Pills */}
                <div className="pt-2 text-[11px]">
                  <span className="text-slate-400 font-semibold block mb-1">
                    {isEn ? `Major Tehsils (${d.tehsils.length}):` : `प्रमुख तहसीलें (${d.tehsils.length}):`}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {d.tehsils.slice(0, 4).map((t) => (
                      <span key={t} className="bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                        {t}
                      </span>
                    ))}
                    {d.tehsils.length > 4 && (
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-bold">
                        +{d.tehsils.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Demo Statistics & Portal Link */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="text-[11px]">
                  <span className="text-slate-400">{isEn ? 'Disposal Rate: ' : 'निस्तारण दर: '}</span>
                  <strong className="text-emerald-700 font-bold">
                    {((d.demoStats.resolved / d.demoStats.totalComplaints) * 100).toFixed(1)}%
                  </strong>
                </div>

                <a
                  href={d.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-gov-orange hover:text-gov-orangeDark font-bold hover:underline"
                >
                  <span>{isEn ? 'District Portal' : 'जिला पोर्टल'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
