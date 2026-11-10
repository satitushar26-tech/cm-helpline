import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, PlusCircle, Search, Bell, User } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const MobileBottomBar: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  return (
    <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E9E9E9] px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around text-[10px] font-bold text-slate-600">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
              isActive ? 'text-gov-orange' : 'hover:text-gov-orange'
            }`
          }
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>{isEn ? 'Home' : 'होम'}</span>
        </NavLink>

        <NavLink
          to="/track"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
              isActive ? 'text-gov-orange' : 'hover:text-gov-orange'
            }`
          }
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span>{isEn ? 'Status' : 'स्थिति'}</span>
        </NavLink>

        {/* Center Prominent Register Action */}
        <NavLink
          to="/register"
          className="flex flex-col items-center -mt-5"
        >
          <div className="w-12 h-12 rounded-full bg-gov-orange text-white flex items-center justify-center shadow-lg border-2 border-white mb-0.5">
            <PlusCircle className="w-6 h-6" />
          </div>
          <span className="text-gov-orange font-black">{isEn ? 'Register' : 'शिकायत'}</span>
        </NavLink>

        <NavLink
          to="/send-reminder"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
              isActive ? 'text-gov-orange' : 'hover:text-gov-orange'
            }`
          }
        >
          <Bell className="w-5 h-5 mb-0.5" />
          <span>{isEn ? 'Remind' : 'रिमाइंडर'}</span>
        </NavLink>

        <NavLink
          to="/citizen/dashboard"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
              isActive ? 'text-gov-orange' : 'hover:text-gov-orange'
            }`
          }
        >
          <User className="w-5 h-5 mb-0.5" />
          <span>{isEn ? 'Portal' : 'पोर्टल'}</span>
        </NavLink>
      </div>
    </div>
  );
};
