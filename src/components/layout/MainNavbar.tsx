import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  PlusCircle,
  Search,
  Bell,
  MessageSquare,
  Building,
  MapPin,
  Award,
  ChevronDown,
  LayoutDashboard,
  MessageSquarePlus,
  Lightbulb,
  Phone,
  Info,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export const MainNavbar: React.FC = () => {
  const { t, language } = useLanguage();
  const { citizen } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demandsDropdownOpen, setDemandsDropdownOpen] = useState(false);
  const isEn = language === 'en';

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <nav className="bg-white text-slate-800 sticky top-0 z-40 shadow-xs border-b border-[#E9E9E9]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Desktop Nav Items */}
          <div className="hidden xl:flex items-center space-x-1 text-xs font-bold text-slate-700">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-gov-orange bg-orange-50 font-black'
                    : 'hover:text-gov-orange hover:bg-orange-50/50'
                }`
              }
            >
              {t('navHome')}
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-gov-orange bg-orange-50 font-black'
                    : 'hover:text-gov-orange hover:bg-orange-50/50'
                }`
              }
            >
              {isEn ? 'About Us' : 'हमारे बारे में'}
            </NavLink>

            <NavLink
              to="/register"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-gov-orange text-white font-black shadow-xs'
                    : 'text-gov-orange bg-orange-50 hover:bg-orange-100 font-extrabold'
                }`
              }
            >
              <span>{isEn ? 'Register Complaint' : 'शिकायत दर्ज करें'}</span>
            </NavLink>

            <NavLink
              to="/track"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-gov-orange bg-orange-50 font-black'
                    : 'hover:text-gov-orange hover:bg-orange-50/50'
                }`
              }
            >
              <span>{isEn ? 'Complaint Status' : 'शिकायत की स्थिति'}</span>
            </NavLink>

            <NavLink
              to="/send-reminder"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-gov-orange bg-orange-50 font-black'
                    : 'hover:text-gov-orange hover:bg-orange-50/50'
                }`
              }
            >
              <span>{isEn ? 'Send Reminder' : 'अनुस्मारक भेजें'}</span>
            </NavLink>

            <NavLink
              to="/feedback"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-gov-orange bg-orange-50 font-black'
                    : 'hover:text-gov-orange hover:bg-orange-50/50'
                }`
              }
            >
              <span>{isEn ? 'Your Feedback' : 'अपनी प्रतिक्रिया दें'}</span>
            </NavLink>

            {/* Demands & Suggestions Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setDemandsDropdownOpen(!demandsDropdownOpen)}
                onMouseEnter={() => setDemandsDropdownOpen(true)}
                className="px-3 py-2 rounded-lg text-slate-700 hover:text-gov-orange hover:bg-orange-50/50 transition-colors flex items-center gap-1"
              >
                <span>{isEn ? 'Demand & Suggestions' : 'मांग एवं सुझाव'}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {demandsDropdownOpen && (
                <div
                  onMouseLeave={() => setDemandsDropdownOpen(false)}
                  className="absolute left-0 mt-1 w-64 bg-white text-slate-800 rounded-2xl shadow-xl py-2 z-50 border border-slate-200 animate-in fade-in"
                >
                  <Link
                    to="/public-demand"
                    onClick={() => setDemandsDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-orange-50 text-xs font-bold text-slate-800 transition-colors"
                  >
                    <MessageSquarePlus className="w-4 h-4 text-gov-orange" />
                    <div>
                      <div>{isEn ? 'Public Demand' : 'सार्वजनिक मांग'}</div>
                      <div className="text-[10px] text-slate-500 font-normal">
                        {isEn ? 'Request new roads, tanks, facilities' : 'अवसंरचना व विकास कार्य हेतु'}
                      </div>
                    </div>
                  </Link>
                  <Link
                    to="/public-suggestion"
                    onClick={() => setDemandsDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-orange-50 text-xs font-bold text-slate-800 transition-colors"
                  >
                    <Lightbulb className="w-4 h-4 text-gov-orange" />
                    <div>
                      <div>{isEn ? 'Public Suggestion' : 'सार्वजनिक सुझाव'}</div>
                      <div className="text-[10px] text-slate-500 font-normal">
                        {isEn ? 'Policy ideas & service improvements' : 'सुशासन व सेवा सुधार हेतु'}
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <NavLink
              to="/departments"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-gov-orange bg-orange-50 font-black'
                    : 'hover:text-gov-orange hover:bg-orange-50/50'
                }`
              }
            >
              {isEn ? 'Departments' : 'विभाग'}
            </NavLink>

            <NavLink
              to="/schemes"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-gov-orange bg-orange-50 font-black'
                    : 'hover:text-gov-orange hover:bg-orange-50/50'
                }`
              }
            >
              {isEn ? 'Government Schemes' : 'सरकारी योजनाएं'}
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-gov-orange bg-orange-50 font-black'
                    : 'hover:text-gov-orange hover:bg-orange-50/50'
                }`
              }
            >
              {isEn ? 'Contact Us' : 'संपर्क'}
            </NavLink>
          </div>

          {/* Right Action on Large: Quick Register Button */}
          <div className="hidden xl:flex items-center gap-2.5">
            <Link
              to="/register"
              className="bg-gov-orange hover:bg-gov-orangeDark text-white font-black px-4 py-2 rounded-xl text-xs shadow-xs transition-all flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isEn ? 'Register Now' : 'शिकायत दर्ज करें'}</span>
            </Link>
          </div>

          {/* Mobile Bar Brand & Hamburger Button */}
          <div className="xl:hidden flex items-center justify-between w-full py-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="bg-gov-orange text-white text-xs font-black px-2 py-0.5 rounded shadow-2xs">
                1905
              </span>
              <span className="font-black text-sm tracking-tight text-slate-900">
                {isEn ? 'CM Helpline UK 1905' : 'सीएम हेल्पलाइन उत्तराखण्ड'}
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <Link
                to="/register"
                className="bg-gov-orange text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-2xs"
              >
                {isEn ? 'Register' : 'शिकायत करें'}
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="p-2 text-slate-700 hover:text-gov-orange rounded-lg bg-orange-50 border border-orange-200"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-[#E9E9E9] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 text-xs font-bold text-slate-800 shadow-xl">
          <Link
            to="/"
            onClick={closeMobile}
            className="block py-2.5 px-3 rounded-xl hover:bg-orange-50 hover:text-gov-orange"
          >
            {t('navHome')}
          </Link>
          <Link
            to="/about"
            onClick={closeMobile}
            className="block py-2.5 px-3 rounded-xl hover:bg-orange-50 hover:text-gov-orange"
          >
            {isEn ? 'About Us' : 'हमारे बारे में'}
          </Link>
          <Link
            to="/register"
            onClick={closeMobile}
            className="block py-2.5 px-3 rounded-xl bg-orange-50 text-gov-orange font-black"
          >
            <span>{isEn ? 'Register Complaint' : 'शिकायत दर्ज करें'}</span>
          </Link>
          <Link
            to="/track"
            onClick={closeMobile}
            className="block py-2.5 px-3 rounded-xl hover:bg-orange-50 hover:text-gov-orange"
          >
            <span>{isEn ? 'Complaint Status' : 'शिकायत की स्थिति'}</span>
          </Link>
          <Link
            to="/send-reminder"
            onClick={closeMobile}
            className="block py-2.5 px-3 rounded-xl hover:bg-orange-50 hover:text-gov-orange"
          >
            <span>{isEn ? 'Send Reminder' : 'अनुस्मारक भेजें'}</span>
          </Link>
          <Link
            to="/feedback"
            onClick={closeMobile}
            className="block py-2.5 px-3 rounded-xl hover:bg-orange-50 hover:text-gov-orange"
          >
            <span>{isEn ? 'Your Feedback' : 'अपनी प्रतिक्रिया दें'}</span>
          </Link>
          <Link
            to="/public-demand"
            onClick={closeMobile}
            className="block py-2.5 px-3 rounded-xl hover:bg-orange-50 hover:text-gov-orange"
          >
            {isEn ? 'Public Demand' : 'सार्वजनिक मांग'}
          </Link>
          <Link
            to="/public-suggestion"
            onClick={closeMobile}
            className="block py-2.5 px-3 rounded-xl hover:bg-orange-50 hover:text-gov-orange"
          >
            {isEn ? 'Public Suggestion' : 'सार्वजनिक सुझाव'}
          </Link>
          <Link
            to="/departments"
            onClick={closeMobile}
            className="block py-2.5 px-3 rounded-xl hover:bg-orange-50 hover:text-gov-orange"
          >
            {isEn ? 'Departments' : 'विभाग'}
          </Link>
          <Link
            to="/schemes"
            onClick={closeMobile}
            className="block py-2.5 px-3 rounded-xl hover:bg-orange-50 hover:text-gov-orange"
          >
            {isEn ? 'Government Schemes' : 'सरकारी योजनाएं'}
          </Link>
          <Link
            to="/districts"
            onClick={closeMobile}
            className="block py-2.5 px-3 rounded-xl hover:bg-orange-50 hover:text-gov-orange flex items-center gap-2"
          >
            <MapPin className="w-4 h-4 text-red-500" />
            <span>{isEn ? '13 Districts Portals' : '13 जनपद पोर्टल'}</span>
          </Link>
          <Link
            to="/contact"
            onClick={closeMobile}
            className="block py-2.5 px-3 rounded-xl hover:bg-orange-50 hover:text-gov-orange"
          >
            {isEn ? 'Contact Us' : 'संपर्क'}
          </Link>
          <Link
            to="/officer/dashboard"
            onClick={closeMobile}
            className="block py-2.5 px-3 rounded-xl bg-orange-100/70 text-gov-orangeDark font-black"
          >
            {isEn ? 'Officer Login' : 'अधिकारी लॉगिन'}
          </Link>
        </div>
      )}
    </nav>
  );
};
