import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Download,
  Printer,
  Calendar,
  Filter,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Clock,
  Layers,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';
import { UTTARAKHAND_DISTRICTS } from '../data/districts';

export const StateAdminDashboardPage: React.FC = () => {
  const { complaints } = useStore();
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [selectedDivision, setSelectedDivision] = useState<'ALL' | 'Garhwal' | 'Kumaon'>('ALL');
  const [timeRange, setTimeRange] = useState('2026-Q1');

  // 13 Districts Recharts dataset combining baseline demo + live additions
  const districtData = UTTARAKHAND_DISTRICTS.filter(
    (d) => selectedDivision === 'ALL' || d.division === selectedDivision
  ).map((d) => {
    const liveDistrictComplaints = complaints.filter(
      (c) => c.district.toLowerCase() === d.nameEn.toLowerCase()
    ).length;

    return {
      name: isEn ? d.nameEn : d.nameHi,
      nameEn: d.nameEn,
      nameHi: d.nameHi,
      total: d.demoStats.totalComplaints + liveDistrictComplaints,
      resolved: d.demoStats.resolved,
      pending: d.demoStats.inProgress + liveDistrictComplaints,
    };
  });

  // Department-wise breakdown
  const departmentData = [
    { name: isEn ? 'Drinking Water (Peyjal)' : 'पेयजल (Peyjal)', value: 4230, fill: '#145DA0' },
    { name: isEn ? 'PWD (Roads & Bridges)' : 'लो.नि.वि. (PWD)', value: 3890, fill: '#1D70B8' },
    { name: isEn ? 'Power / Energy (UPCL)' : 'ऊर्जा (UPCL)', value: 3120, fill: '#E68A2E' },
    { name: isEn ? 'Health & Family Welfare' : 'स्वास्थ्य (Health)', value: 2450, fill: '#26734D' },
    { name: isEn ? 'Urban Development' : 'शहरी निकाय (Urban)', value: 2180, fill: '#6B46C1' },
    { name: isEn ? 'Rural Development' : 'ग्राम्य विकास (Rural)', value: 1940, fill: '#319795' },
    { name: isEn ? 'Revenue & Land Records' : 'राजस्व (Revenue)', value: 1650, fill: '#D69E2E' },
  ];

  // Monthly trends dataset
  const monthlyTrends = [
    { month: isEn ? 'Aug 2025' : 'अगस्त 2025', registered: 4200, resolved: 3950 },
    { month: isEn ? 'Sep 2025' : 'सितंबर 2025', registered: 4850, resolved: 4610 },
    { month: isEn ? 'Oct 2025' : 'अक्टूबर 2025', registered: 5120, resolved: 4890 },
    { month: isEn ? 'Nov 2025' : 'नवंबर 2025', registered: 4680, resolved: 4520 },
    { month: isEn ? 'Dec 2025' : 'दिसंबर 2025', registered: 5340, resolved: 5120 },
    { month: isEn ? 'Jan 2026' : 'जनवरी 2026', registered: 5780, resolved: 5540 },
    { month: isEn ? 'Feb 2026 (Live)' : 'फरवरी 2026 (Live)', registered: 3410 + complaints.length, resolved: 3230 },
  ];

  // Status Distribution Pie
  const statusPieData = [
    { name: isEn ? 'Resolved' : 'निस्तारित (Resolved)', value: 236470, color: '#26734D' },
    { name: isEn ? 'Action In Progress' : 'कार्रवाई गतिमान (In Progress)', value: 8940, color: '#145DA0' },
    { name: isEn ? 'Under Review' : 'समीक्षाधीन (Under Review)', value: 2340, color: '#E68A2E' },
    { name: isEn ? 'Reopened' : 'पुनः खुली (Reopened)', value: 1170, color: '#E53E3E' },
  ];

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'District,Total_Complaints,Resolved,Pending\n' +
      districtData.map((d) => `${d.nameEn},${d.total},${d.resolved},${d.pending}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Uttarakhand_CM_Helpline_Report_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12" id="main-content">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              DEMO DATA — Illustrative Statistics
            </span>
            <span className="text-xs text-slate-400">PRAYAS 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-devanagari mt-1">
            {isEn
              ? 'State Grievance Redressal Monitoring & Analytics Dashboard'
              : 'राज्य स्तरीय जन शिकायत निगरानी एवं विश्लेषण डैशबोर्ड'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            {isEn
              ? 'Real-Time Governance Oversight & Analytics — Chief Minister Helpline Uttarakhand 1905'
              : 'State-Level Grievance Monitoring & Analytics — Chief Minister Helpline Uttarakhand 1905'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleExportCSV}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <Download className="w-4 h-4 text-gov-orange" />
            <span>{isEn ? 'Export CSV' : 'CSV रिपोर्ट निर्यात'}</span>
          </button>
          <button
            onClick={() => window.print()}
            className="bg-gov-orange hover:bg-gov-orangeDark text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>{isEn ? 'Print Dashboard' : 'डैशबोर्ड प्रिंट करें'}</span>
          </button>
        </div>
      </div>

      {/* State-Level Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 mb-1">
            {isEn ? 'Total Grievances' : 'कुल शिकायतें'}
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900">
            {(248920 + complaints.length).toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-emerald-600 font-bold mt-1">
            {isEn ? '↑ 8.4% YoY Growth' : '↑ 8.4% वृद्धि'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-semibold text-emerald-700 mb-1">
            {isEn ? 'Total Resolved' : 'कुल निस्तारित'}
          </div>
          <div className="text-xl sm:text-2xl font-black text-gov-green">236,470</div>
          <div className="text-[10px] text-slate-400 mt-1">
            {isEn ? 'Redressed Cases' : 'सफलता दर'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-semibold text-gov-orangeDark mb-1">
            {isEn ? 'Disposal Rate' : 'निस्तारण प्रतिशत'}
          </div>
          <div className="text-xl sm:text-2xl font-black text-gov-orange">95.0%</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-1">
            {isEn ? 'Target: >95%' : 'लक्ष्य: 95%+'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-semibold text-amber-700 mb-1">
            {isEn ? 'Avg Redressal Time' : 'औसत समाधान दिन'}
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-600">
            {isEn ? '5.2 Days' : '5.2 दिन'}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            {isEn ? 'SLA Standard: 7 Days' : 'मानक: 7 दिन'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-semibold text-indigo-700 mb-1">
            {isEn ? 'Citizen Satisfaction' : 'नागरिक संतुष्टि'}
          </div>
          <div className="text-xl sm:text-2xl font-black text-indigo-700">94.6%</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-1">★ 4.7 / 5.0</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-semibold text-rose-700 mb-1">
            {isEn ? 'Reopen Rate' : 'पुनः खुली दर'}
          </div>
          <div className="text-xl sm:text-2xl font-black text-rose-600">1.8%</div>
          <div className="text-[10px] text-slate-400 mt-1">
            {isEn ? 'Lowest in Region' : 'निम्नतम स्तर'}
          </div>
        </div>
      </div>

      {/* Row 1 Charts: 13 Districts Bar Chart & Status Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* District-wise Bar Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-extrabold text-base text-slate-900 font-devanagari">
                {isEn
                  ? 'District-Wise Grievance & Disposal Performance'
                  : 'जनपद-वार शिकायत एवं समाधान वितरण (District Distribution)'}
              </h2>
              <p className="text-xs text-slate-500">
                {isEn
                  ? 'Comparative breakdown of registered vs resolved complaints across Uttarakhand'
                  : 'समस्त 13 जनपदों में कुल दर्ज एवं निस्तारित शिकायतों का तुलनात्मक ग्राफ'}
              </p>
            </div>

            {/* Division Filter */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setSelectedDivision('ALL')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedDivision === 'ALL' ? 'bg-gov-orange text-white shadow-xs font-bold' : 'text-slate-600'
                }`}
              >
                {isEn ? 'All 13' : 'सभी 13'}
              </button>
              <button
                onClick={() => setSelectedDivision('Garhwal')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedDivision === 'Garhwal' ? 'bg-gov-orange text-white shadow-xs font-bold' : 'text-slate-600'
                }`}
              >
                {isEn ? 'Garhwal (7)' : 'गढ़वाल (7)'}
              </button>
              <button
                onClick={() => setSelectedDivision('Kumaon')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedDivision === 'Kumaon' ? 'bg-gov-orange text-white shadow-xs font-bold' : 'text-slate-600'
                }`}
              >
                {isEn ? 'Kumaon (6)' : 'कुमाऊँ (6)'}
              </button>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" angle={-30} textAnchor="end" tick={{ fontSize: 10 }} interval={0} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#243044', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="total" name={isEn ? 'Total Grievances' : 'कुल दर्ज (Total)'} fill="#F58220" radius={[4, 4, 0, 0]} />
                <Bar dataKey="resolved" name={isEn ? 'Resolved' : 'निराकृत (Resolved)'} fill="#277A50" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Donut Chart */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-lg space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="font-extrabold text-base text-slate-900 font-devanagari">
              {isEn ? 'Complaint Status Breakdown' : 'शिकायत स्थिति विभाजन (Status Breakdown)'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEn ? 'Statewide distribution across lifecycle stages' : 'राज्य भर में वर्तमान विभिन्न चरणों का अनुपात'}
            </p>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#243044', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {statusPieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span>{item.name}</span>
                </span>
                <span className="font-bold text-slate-900">{item.value.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 Charts: Monthly Trend Line Chart & Department Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Trend */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-lg space-y-4">
          <div>
            <h2 className="font-extrabold text-base text-slate-900 font-devanagari">
              {isEn ? 'Monthly Registration & Redressal Trends' : 'मासिक शिकायत एवं निस्तारण रुझान (Monthly Trends)'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEn
                ? 'Volume of incoming complaints and disposal rates over the last 7 months'
                : 'पिछले 7 महीनों में हेल्पलाइन 1905 पर प्राप्त केस व समाधान गति'}
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrends} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#243044', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line
                  type="monotone"
                  dataKey="registered"
                  name={isEn ? 'Registered Cases' : 'प्राप्त शिकायतें'}
                  stroke="#F58220"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="resolved"
                  name={isEn ? 'Resolved Cases' : 'निराकृत शिकायतें'}
                  stroke="#277A50"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Departments */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-lg space-y-4">
          <div>
            <h2 className="font-extrabold text-base text-slate-900 font-devanagari">
              {isEn ? 'Departmental Workload Distribution' : 'विभाग-वार कार्यभार (Department Load)'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEn
                ? 'Public service departments receiving highest citizen grievance volume'
                : 'सर्वाधिक जन समस्याएं प्राप्त करने वाले प्रमुख राज्य विभाग'}
            </p>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            {departmentData.map((dept) => {
              const pct = ((dept.value / 4230) * 100).toFixed(0);
              return (
                <div key={dept.name} className="space-y-1">
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="font-semibold">{dept.name}</span>
                    <span className="font-bold text-slate-900">
                      {dept.value.toLocaleString('en-IN')} {isEn ? 'cases' : 'केस'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: dept.fill }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
