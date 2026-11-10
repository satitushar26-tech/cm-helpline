import React from 'react';
import { Link } from 'react-router-dom';

export const BrandingHeader: React.FC = () => {
  return (
    <div className="bg-[#F76401] py-2 sm:py-2.5 px-4 shadow-sm border-b border-[#E05B01]">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        {/* Official Uttarakhand CM Helpline Logo Banner Centered */}
        <Link
          to="/"
          className="flex items-center justify-center group transition-transform hover:scale-[1.01]"
          title="1905 उत्तराखंड सीएम हेल्पलाइन - होम"
        >
          <img
            src="/images/cm-helpline-logo.png"
            alt="1905 उत्तराखंड सीएम हेल्पलाइन - सूचना प्रौद्योगिकी विकास एजेंसी (ITDA)"
            className="h-14 sm:h-16 md:h-20 w-auto max-w-full object-contain"
          />
        </Link>
      </div>
    </div>
  );
};
