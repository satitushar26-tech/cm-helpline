import React, { useState } from 'react';
import {
  UserCheck,
  ShieldAlert,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Wrench,
  AlertCircle,
  FileText,
  RotateCcw,
  Building,
  MapPin,
  Calendar,
  Save,
  X,
  UploadCloud,
  ChevronRight,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { Complaint, ComplaintStatus } from '../types/complaint';
import { OfficerRole } from '../types/officer';
import { UTTARAKHAND_DISTRICTS } from '../data/districts';
import { UTTARAKHAND_DEPARTMENTS } from '../data/departments';

export const OfficerDashboardPage: React.FC = () => {
  const { complaints, officerTakeAction } = useStore();
  const { currentOfficer, switchOfficerRole, allOfficers } = useAuth();
  const { announce } = useAccessibility();
  const { language } = useLanguage();
  const isEn = language === 'en';

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [districtFilter, setDistrictFilter] = useState<string>('ALL');
  const [departmentFilter, setDepartmentFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Selected Complaint for Action Modal
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [actionStatus, setActionStatus] = useState<ComplaintStatus>('ACTION_IN_PROGRESS');
  const [actionRemarks, setActionRemarks] = useState('');
  const [assignedDept, setAssignedDept] = useState('');
  const [atrDocumentName, setAtrDocumentName] = useState('Signed_Field_Inspection_Report.pdf');

  // Filter complaints
  const filteredComplaints = complaints.filter((c) => {
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
    if (districtFilter !== 'ALL' && c.district.toLowerCase() !== districtFilter.toLowerCase()) return false;
    if (departmentFilter !== 'ALL' && c.assignedDepartment !== departmentFilter) return false;
    if (
      searchTerm &&
      !c.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !c.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !c.citizenName.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  const openActionModal = (c: Complaint) => {
    setSelectedComplaint(c);
    setActionStatus(c.status === 'REGISTERED' ? 'ACTION_IN_PROGRESS' : c.status);
    setActionRemarks(
      c.status === 'ACTION_IN_PROGRESS'
        ? isEn
          ? 'On-site technical inspection carried out; repair work is in active progress.'
          : 'मौके पर तकनीकी दल द्वारा निरीक्षण किया गया एवं पाइपलाइन मरम्मत का कार्य गतिमान है।'
        : ''
    );
    setAssignedDept(c.assignedDepartment);
  };

  const handleActionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint || !currentOfficer) return;

    officerTakeAction({
      complaintId: selectedComplaint.id,
      newStatus: actionStatus,
      remarks:
        actionRemarks.trim() ||
        (isEn
          ? `Status updated by Officer ${currentOfficer.name}.`
          : `अधिकारी ${currentOfficer.name} द्वारा स्थिति को अद्यतन किया गया।`),
      officerName: currentOfficer.name,
      officerRole: currentOfficer.role,
      assignedDepartment: assignedDept,
      documentName:
        actionStatus === 'RESOLVED' || actionStatus === 'RESOLUTION_SUBMITTED' ? atrDocumentName : undefined,
    });

    announce(
      isEn
        ? `Status for complaint ${selectedComplaint.id} has been updated.`
        : `शिकायत ${selectedComplaint.id} की स्थिति अद्यतन कर दी गई है।`
    );
    setSelectedComplaint(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12" id="main-content">
      {/* Officer Profile & Demo Role Switcher Strip */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-gov-orange text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 border border-slate-700/60">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 text-gov-orangeDark font-black text-xl flex items-center justify-center flex-shrink-0 shadow-md">
              <UserCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-gov-orange text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                  DEMO OFFICER
                </span>
                <span className="text-xs text-slate-300 font-mono">
                  {currentOfficer?.role}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                {currentOfficer?.name}
              </h1>
              <p className="text-xs text-orange-200 font-semibold">
                {currentOfficer?.designation} • {currentOfficer?.department} {currentOfficer?.district ? `(${currentOfficer.district})` : ''}
              </p>
            </div>
          </div>

          {/* Quick Role Switcher Bar */}
          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 flex flex-col gap-1.5 max-w-xl">
            <span className="text-[11px] font-bold text-orange-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-gov-orange" />
              {isEn
                ? 'Hackathon Demo: Switch Officer Role & Level:'
                : 'हैकाथॉन डेमो: अधिकारी पद/भूमिका बदलें (Switch Role):'}
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {allOfficers.map((off) => (
                <button
                  key={off.id}
                  onClick={() => switchOfficerRole(off.role)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    currentOfficer?.id === off.id
                      ? 'bg-gov-orange text-white font-bold shadow-xs'
                      : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                  }`}
                  title={`${off.designation} (${off.department})`}
                >
                  {off.role === 'LEVEL_1_BLOCK'
                    ? 'Level 1 (Block)'
                    : off.role === 'LEVEL_2_DISTRICT'
                    ? 'Level 2 (Chamoli Nodal)'
                    : off.role === 'LEVEL_3_HOD'
                    ? 'Level 3 (HOD)'
                    : off.role === 'DISTRICT_ADMIN'
                    ? 'ADM Dehradun'
                    : 'State Admin (ITDA)'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Metric Counter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
            <span>{isEn ? 'Total Grievances' : 'कुल केस (Total)'}</span>
            <FileText className="w-4 h-4 text-gov-orange" />
          </div>
          <div className="text-2xl font-black text-slate-900">{complaints.length}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-amber-700 font-semibold mb-1">
            <span>{isEn ? 'Under Review' : 'समीक्षाधीन (Review)'}</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600">
            {complaints.filter((c) => c.status === 'INITIAL_REVIEW' || c.status === 'FORWARDED_TO_DEPT').length}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-orange-700 font-semibold mb-1">
            <span>{isEn ? 'Action In Progress' : 'कार्रवाई जारी (Action)'}</span>
            <Wrench className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-2xl font-black text-orange-600">
            {complaints.filter((c) => c.status === 'ACTION_IN_PROGRESS' || c.status === 'ASSIGNED_TO_OFFICER').length}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-emerald-700 font-semibold mb-1">
            <span>{isEn ? 'Resolved / Closed' : 'निस्तारित (Resolved)'}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-gov-green">
            {complaints.filter((c) => c.status === 'RESOLVED' || c.status === 'RESOLUTION_SUBMITTED').length}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-rose-700 font-semibold mb-1">
            <span>{isEn ? 'Reopened by Citizen' : 'पुनः खुली (Reopened)'}</span>
            <RotateCcw className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-rose-600">
            {complaints.filter((c) => c.status === 'REOPENED').length}
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs mb-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              isEn
                ? 'Case ID, Title or Citizen name...'
                : 'केस ID, शीर्षक या नागरिक नाम...'
            }
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-gov-blue"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
          >
            <option value="ALL">{isEn ? 'All Statuses' : 'समस्त स्थितियां (All Status)'}</option>
            <option value="REGISTERED">{isEn ? 'Registered' : 'दर्ज (Registered)'}</option>
            <option value="INITIAL_REVIEW">{isEn ? 'Under Review' : 'प्रारंभिक समीक्षा (Review)'}</option>
            <option value="ACTION_IN_PROGRESS">{isEn ? 'Action In Progress' : 'कार्रवाई गतिमान (In Progress)'}</option>
            <option value="RESOLVED">{isEn ? 'Resolved' : 'निस्तारित (Resolved)'}</option>
            <option value="REOPENED">{isEn ? 'Reopened' : 'पुनः खुली (Reopened)'}</option>
          </select>

          {/* District Filter */}
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
          >
            <option value="ALL">{isEn ? 'All 13 Districts' : 'समस्त 13 जनपद (All Districts)'}</option>
            {UTTARAKHAND_DISTRICTS.map((d) => (
              <option key={d.id} value={d.nameEn}>
                {isEn ? `${d.nameEn} (${d.nameHi})` : `${d.nameHi} (${d.nameEn})`}
              </option>
            ))}
          </select>

          {/* Department Filter */}
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none max-w-xs truncate"
          >
            <option value="ALL">{isEn ? 'All Departments' : 'समस्त विभाग (All Departments)'}</option>
            {UTTARAKHAND_DEPARTMENTS.map((dept) => (
              <option key={dept.id} value={dept.nameHi}>
                {isEn ? `${dept.nameEn} (${dept.nameHi})` : dept.nameHi}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-extrabold text-base text-gov-navy">
              {isEn ? `Assigned Complaints (${filteredComplaints.length})` : `आवंटित शिकायत सूची (${filteredComplaints.length})`}
            </h2>
            <span className="text-[10px] text-slate-500 hidden sm:inline">
              {isEn
                ? '(Click on any case to review & record official action)'
                : '(किसी भी केस पर क्लिक कर कार्रवाई विवरण अद्यतन करें)'}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">{isEn ? 'Reference ID' : 'रेफरेंस ID'}</th>
                <th className="p-4">{isEn ? 'Citizen & Location' : 'नागरिक एवं जनपद'}</th>
                <th className="p-4">{isEn ? 'Grievance Title & Department' : 'शिकायत शीर्षक एवं विभाग'}</th>
                <th className="p-4">{isEn ? 'Registered Date' : 'पंजीकरण दिनांक'}</th>
                <th className="p-4">{isEn ? 'Current Status' : 'वर्तमान स्थिति'}</th>
                <th className="p-4 text-right">{isEn ? 'Action' : 'कार्रवाई'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredComplaints.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => openActionModal(c)}
                  className="hover:bg-blue-50/60 cursor-pointer transition-colors group"
                >
                  <td className="p-4 font-mono font-bold text-gov-orange">
                    {c.id}
                    {c.priority === 'URGENT' && (
                      <span className="block text-[9px] font-sans font-bold text-red-600 uppercase">
                        ● {isEn ? 'Urgent' : 'अति आवश्यक'}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{c.citizenName}</div>
                    <div className="text-[11px] text-slate-500">
                      {c.district} ({c.villageOrWard})
                    </div>
                  </td>
                  <td className="p-4 max-w-xs">
                    <div className="font-bold text-slate-900 truncate" title={c.title}>
                      {c.title}
                    </div>
                    <div className="text-[11px] text-gov-orangeDark truncate">
                      {c.assignedDepartment}
                    </div>
                  </td>
                  <td className="p-4 text-slate-500 whitespace-nowrap">
                    {new Date(c.registeredAt).toLocaleDateString(isEn ? 'en-IN' : 'hi-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <StatusBadge status={c.status} size="sm" />
                  </td>
                  <td className="p-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openActionModal(c);
                      }}
                      className="bg-gov-orange hover:bg-gov-orangeDark text-white font-bold px-3.5 py-1.5 rounded-lg text-xs shadow-2xs transition-colors"
                    >
                      {isEn ? 'Take Action' : 'कार्रवाई करें'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* OFFICER ACTION MODAL */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-slate-900 border-b border-orange-500/40 text-white p-5 flex items-center justify-between sticky top-0 z-10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-extrabold text-gov-orange text-sm">
                    {selectedComplaint.id}
                  </span>
                  <StatusBadge status={selectedComplaint.status} size="sm" />
                </div>
                <h3 className="font-bold text-base mt-1 text-white">
                  {isEn
                    ? 'Official Redressal Action & ATR Submission'
                    : 'शिकायत निवारण एवं स्थिति अद्यतन (Officer Action)'}
                </h3>
              </div>

              <button
                onClick={() => setSelectedComplaint(null)}
                className="text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleActionSubmit} className="p-6 space-y-5 overflow-y-auto text-xs">
              {/* Complaint Overview Summary */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-bold text-sm text-slate-900">{selectedComplaint.title}</div>
                <p className="text-slate-600 leading-relaxed italic">
                  "{selectedComplaint.description}"
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-slate-500 text-[11px]">
                  <span>{isEn ? 'Citizen:' : 'नागरिक:'} <strong>{selectedComplaint.citizenName}</strong></span>
                  <span>{isEn ? 'District:' : 'जनपद:'} <strong>{selectedComplaint.district}</strong></span>
                </div>
              </div>

              {/* Department Confirmation / Reassignment */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {isEn
                    ? 'Assigned Department Confirmation or Transfer:'
                    : 'आवंटित विभाग की पुष्टि अथवा पुनर्आवंटन (Department Assignment):'}
                </label>
                <select
                  value={assignedDept}
                  onChange={(e) => setAssignedDept(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
                >
                  {UTTARAKHAND_DEPARTMENTS.map((dept) => (
                    <option key={dept.id} value={dept.nameHi}>
                      {isEn ? `${dept.nameEn} (${dept.nameHi})` : dept.nameHi}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-500 mt-1">
                  {isEn
                    ? 'If the grievance pertains to another department, authorized officers may transfer jurisdiction.'
                    : 'यदि नागरिक द्वारा गलत विभाग चुना गया है, तो अधिकृत अधिकारी इसे सही विभाग में अंतरित कर सकते हैं।'}
                </p>
              </div>

              {/* Status Update Choice */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {isEn ? 'Select Redressal Status:' : 'नई स्थिति का चयन करें (Update Status):'}
                </label>
                <select
                  value={actionStatus}
                  onChange={(e) => setActionStatus(e.target.value as ComplaintStatus)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
                >
                  <option value="INITIAL_REVIEW">{isEn ? 'Under Review' : 'प्रारंभिक समीक्षाधीन (Under Review)'}</option>
                  <option value="ASSIGNED_TO_OFFICER">{isEn ? 'Assigned to Field Officer' : 'क्षेत्रीय अधिकारी को आवंटित (Assigned to Officer)'}</option>
                  <option value="ACTION_IN_PROGRESS">{isEn ? 'Action In Progress (Field Work Active)' : 'कार्रवाई गतिमान (Action in Progress - मौके पर कार्य)'}</option>
                  <option value="INFO_REQUIRED">{isEn ? 'Additional Information Required from Citizen' : 'नागरिक से अतिरिक्त जानकारी अपेक्षित (Info Required)'}</option>
                  <option value="RESOLUTION_SUBMITTED">{isEn ? 'Resolution Report Submitted (Pending Verification)' : 'समाधान प्रतिवेदन प्रस्तुत (Resolution Report Submitted)'}</option>
                  <option value="RESOLVED">{isEn ? 'Satisfactorily Resolved' : 'संतुष्टिपूर्वक निस्तारित (Resolved)'}</option>
                  <option value="REJECTED">{isEn ? 'Rejected / Outside Jurisdiction' : 'अस्वीकृत / क्षेत्राधिकार से बाहर (Rejected)'}</option>
                </select>
              </div>

              {/* Officer Remarks */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {isEn
                    ? 'Action Taken Remarks / Field Inspection Notes'
                    : 'अधिकारी की आख्या / स्थलीय टिप्पणी (Official Remarks)'}{' '}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={actionRemarks}
                  onChange={(e) => setActionRemarks(e.target.value)}
                  placeholder={
                    isEn
                      ? 'Enter details of on-site verification, physical work completed, and redressal evidence...'
                      : 'मौके पर की गई कार्रवाई, निरीक्षण आख्या, समाधान विवरण स्पष्ट रूप से दर्ज करें...'
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange leading-relaxed font-medium"
                />
              </div>

              {/* Action Taken Report (ATR) Document simulation */}
              {(actionStatus === 'RESOLVED' || actionStatus === 'RESOLUTION_SUBMITTED') && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold">
                    <FileText className="w-4 h-4 text-emerald-700" />
                    <span>
                      {isEn
                        ? 'Signed Action Taken Report (ATR):'
                        : 'हस्ताक्षरित समाधान प्रतिवेदन (Signed Action Taken Report):'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={atrDocumentName}
                      onChange={(e) => setAtrDocumentName(e.target.value)}
                      className="flex-1 bg-white border border-emerald-300 rounded-lg p-2 text-xs font-mono font-semibold"
                    />
                    <span className="text-[11px] text-emerald-700 font-bold">
                      {isEn ? 'PDF Attached' : 'PDF संलग्न'}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Footer */}
              <div className="border-t border-slate-100 pt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedComplaint(null)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  {isEn ? 'Cancel' : 'रद्द करें'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gov-green hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{isEn ? 'Save & Update Status' : 'कार्रवाई सहेजें (Save & Update Status)'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
