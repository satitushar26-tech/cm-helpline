import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  FileText,
  Clock,
  CheckCircle2,
  RotateCcw,
  Bell,
  Save,
  Search,
  PlusCircle,
  Phone,
  ShieldCheck,
  Trash2,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { StatusBadge } from '../components/common/StatusBadge';

export const CitizenDashboardPage: React.FC = () => {
  const { citizen, citizenLogin, citizenLogout } = useAuth();
  const { complaints, drafts, notifications, deleteDraft, markNotificationRead } = useStore();
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [activeTab, setActiveTab] = useState<'COMPLAINTS' | 'NOTIFICATIONS' | 'DRAFTS' | 'PROFILE'>('COMPLAINTS');
  const [loginPhone, setLoginPhone] = useState('9876543210');
  const [loginName, setLoginName] = useState(isEn ? 'Harish Chandra Joshi' : 'हरीश चन्द्र जोशी');

  const myComplaints = complaints.filter(
    (c) => citizen && (c.citizenMobile === citizen.mobile || c.citizenName === citizen.name)
  );

  const totalCount = myComplaints.length;
  const inProgressCount = myComplaints.filter((c) => c.status === 'ACTION_IN_PROGRESS' || c.status === 'ASSIGNED_TO_OFFICER').length;
  const resolvedCount = myComplaints.filter((c) => c.status === 'RESOLVED').length;
  const reopenedCount = myComplaints.filter((c) => c.status === 'REOPENED').length;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    citizenLogin(loginPhone, loginName);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12" id="main-content">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-gov-orange text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 border border-slate-700/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 text-gov-orangeDark font-black text-xl flex items-center justify-center flex-shrink-0 shadow-md">
              <User className="w-8 h-8" />
            </div>
            <div>
              <span className="bg-gov-orange text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                {isEn ? 'CITIZEN PORTAL' : 'नागरिक पोर्टल (Citizen Portal)'}
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
                {citizen?.name || (isEn ? 'Citizen Account' : 'नागरिक खाता')}
              </h1>
              <p className="text-xs text-orange-200 font-semibold">
                {isEn
                  ? `Registered Mobile: ${citizen?.mobile ? `${citizen.mobile.slice(0, 2)}****${citizen.mobile.slice(-4)}` : 'Not logged in'} • District: ${citizen?.district || 'Chamoli'}`
                  : `पंजीकृत मोबाइल: ${citizen?.mobile ? `${citizen.mobile.slice(0, 2)}****${citizen.mobile.slice(-4)}` : 'लॉगिन नहीं'} • जनपद: ${citizen?.district || 'चमोली'}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/register"
              className="bg-gov-orange hover:bg-gov-orangeDark text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isEn ? 'Register New Grievance' : 'नई शिकायत दर्ज करें'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
            <span>{isEn ? 'Total Grievances' : 'कुल शिकायतें'}</span>
            <FileText className="w-4 h-4 text-gov-orange" />
          </div>
          <div className="text-2xl font-black text-slate-900">{totalCount}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-orange-700 font-semibold mb-1">
            <span>{isEn ? 'Action In Progress' : 'कार्रवाई गतिमान'}</span>
            <Clock className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-2xl font-black text-orange-600">{inProgressCount}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-emerald-700 font-semibold mb-1">
            <span>{isEn ? 'Resolved' : 'निस्तारित'}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-gov-green">{resolvedCount}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-rose-700 font-semibold mb-1">
            <span>{isEn ? 'Reopened' : 'पुनः खुली'}</span>
            <RotateCcw className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-rose-600">{reopenedCount}</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-2xs mb-6 flex gap-1 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('COMPLAINTS')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'COMPLAINTS' ? 'bg-gov-orange text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{isEn ? `My Grievances (${totalCount})` : `मेरी शिकायतें (${totalCount})`}</span>
        </button>

        <button
          onClick={() => setActiveTab('NOTIFICATIONS')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'NOTIFICATIONS' ? 'bg-gov-orange text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>{isEn ? `Alerts & Updates (${notifications.filter((n) => !n.read).length})` : `सूचनाएं / अलर्ट (${notifications.filter((n) => !n.read).length})`}</span>
        </button>

        <button
          onClick={() => setActiveTab('DRAFTS')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'DRAFTS' ? 'bg-gov-orange text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Save className="w-4 h-4" />
          <span>{isEn ? `Saved Drafts (${drafts.length})` : `सहेजे गए ड्राफ्ट (${drafts.length})`}</span>
        </button>

        <button
          onClick={() => setActiveTab('PROFILE')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'PROFILE' ? 'bg-gov-orange text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <User className="w-4 h-4" />
          <span>{isEn ? 'Account Settings' : 'खाता सेटिंग्स'}</span>
        </button>
      </div>

      {/* TAB CONTENT: MY COMPLAINTS */}
      {activeTab === 'COMPLAINTS' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-extrabold text-base text-slate-900">
              {isEn ? 'Registered Grievances' : 'दर्ज शिकायतों की सूची'}
            </h2>
            <Link to="/register" className="text-xs font-bold text-gov-orange hover:underline">
              {isEn ? '+ Register New Grievance' : '+ नई शिकायत जोड़ें'}
            </Link>
          </div>

          {myComplaints.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {myComplaints.map((c) => (
                <div
                  key={c.id}
                  className="p-5 hover:bg-orange-50/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-gov-orange text-sm">{c.id}</span>
                      <StatusBadge status={c.status} size="sm" />
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">{c.title}</h4>
                    <p className="text-slate-500">
                      {isEn ? 'Department:' : 'विभाग:'} <strong className="text-slate-800">{c.assignedDepartment}</strong> • {isEn ? 'Registered On:' : 'दिनांक:'}{' '}
                      {new Date(c.registeredAt).toLocaleDateString(isEn ? 'en-IN' : 'hi-IN')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link
                      to={`/track?id=${c.id}`}
                      className="bg-gov-orange hover:bg-gov-orangeDark text-white font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1 shadow-2xs"
                    >
                      <span>{isEn ? 'Track Live Status' : 'लाइव स्थिति देखें'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center text-slate-500 text-xs">
              {isEn ? 'No active grievances found in your account.' : 'आपके खाते में वर्तमान में कोई सक्रिय शिकायत नहीं है।'}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: NOTIFICATIONS */}
      {activeTab === 'NOTIFICATIONS' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 space-y-4">
          <h2 className="font-extrabold text-base text-slate-900">
            {isEn ? 'Grievance Notifications & Alerts' : 'आपकी शिकायत संबंधी सूचनाएं'}
          </h2>
          <div className="space-y-3 text-xs">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markNotificationRead(notif.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  notif.read ? 'bg-slate-50 border-slate-200' : 'bg-orange-50/80 border-orange-200 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-slate-900 text-sm">{notif.title}</h4>
                  <span className="text-[10px] text-slate-400">
                    {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed">{notif.message}</p>
                {notif.referenceId && (
                  <Link
                    to={`/track?id=${notif.referenceId}`}
                    className="inline-flex items-center gap-1 text-gov-orange hover:text-gov-orangeDark font-bold mt-2 hover:underline"
                  >
                    {isEn ? 'View Case Timeline' : 'केस टाइमलाइन देखें'} <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: SAVED DRAFTS */}
      {activeTab === 'DRAFTS' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 space-y-4">
          <h2 className="font-extrabold text-base text-slate-900">
            {isEn ? `Saved Grievance Drafts (${drafts.length})` : `सहेजे गए शिकायत ड्राफ्ट (${drafts.length})`}
          </h2>
          {drafts.length > 0 ? (
            <div className="space-y-3 text-xs">
              {drafts.map((d) => (
                <div
                  key={d.id}
                  className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-3 bg-slate-50"
                >
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{d.title || (isEn ? 'Untitled Draft' : 'अनाम ड्राफ्ट')}</h4>
                    <p className="text-slate-500 mt-0.5">
                      {isEn ? 'District:' : 'जनपद:'} {d.district} • {isEn ? 'Category:' : 'श्रेणी:'} {d.category} • {isEn ? 'Saved On:' : 'सहेजा गया:'}{' '}
                      {new Date(d.savedAt).toLocaleDateString(isEn ? 'en-IN' : 'hi-IN')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to="/register"
                      className="bg-gov-orange hover:bg-gov-orangeDark text-white font-bold px-3 py-1.5 rounded-lg transition-colors"
                    >
                      {isEn ? 'Resume' : 'जारी रखें'}
                    </Link>
                    <button
                      onClick={() => deleteDraft(d.id)}
                      className="text-slate-400 hover:text-red-600 p-1.5"
                      title={isEn ? 'Delete Draft' : 'ड्राफ्ट हटाएं'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500">
              {isEn ? 'No saved complaint drafts found.' : 'कोई सहेजा गया ड्राफ्ट नहीं है।'}
            </p>
          )}
        </div>
      )}

      {/* TAB CONTENT: PROFILE */}
      {activeTab === 'PROFILE' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-5 text-xs max-w-xl">
          <h2 className="font-extrabold text-base text-slate-900">
            {isEn ? 'Citizen Account Profile' : 'नागरिक खाता प्रोफ़ाइल'}
          </h2>
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isEn ? 'Citizen Full Name' : 'नागरिक का नाम'}
              </label>
              <input
                type="text"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold focus:ring-2 focus:ring-gov-orange"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isEn ? '10-digit Mobile Number' : 'मोबाइल नंबर'}
              </label>
              <input
                type="tel"
                value={loginPhone}
                onChange={(e) => setLoginPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold focus:ring-2 focus:ring-gov-orange"
              />
            </div>
            <button
              type="submit"
              className="bg-gov-orange hover:bg-gov-orangeDark text-white font-bold px-5 py-2.5 rounded-xl transition-colors"
            >
              {isEn ? 'Update Profile' : 'प्रोफ़ाइल अद्यतन करें'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
