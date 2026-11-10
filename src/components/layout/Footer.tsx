import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, ExternalLink, ShieldAlert, Heart, Building, Award, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const isEn = language === 'en';

  return (
    <footer className="bg-gov-navy text-slate-300 pt-12 pb-20 lg:pb-12 border-t border-gov-navyDark text-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Emergency Strip */}
        <div className="bg-slate-800/90 rounded-xl p-4 mb-10 border border-slate-700/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded tracking-wide uppercase flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" /> {isEn ? 'Emergency Helplines' : 'आपातकालीन हेल्पलाइन'}
            </span>
            <span className="text-xs text-slate-200 hidden sm:inline">
              {isEn ? 'Government of Uttarakhand Essential Emergency Contacts:' : 'उत्तराखण्ड राज्य आवश्यक सहायता नंबर:'}
            </span>
          </div>

          <div className="flex items-center gap-3 md:gap-6 flex-wrap text-xs font-semibold">
            <span className="hover:text-amber-400 cursor-pointer">
              {isEn ? 'CM Helpline:' : 'सीएम हेल्पलाइन:'} <strong className="text-amber-400 text-sm">1905</strong>
            </span>
            <span className="hover:text-amber-400 cursor-pointer">
              {isEn ? 'Police / Emergency:' : 'पुलिस / आपातकाल:'} <strong className="text-amber-400 text-sm">112</strong>
            </span>
            <span className="hover:text-amber-400 cursor-pointer">
              {isEn ? 'Ambulance / Health:' : 'स्वास्थ्य / एंबुलेंस:'} <strong className="text-amber-400 text-sm">108</strong>
            </span>
            <span className="hover:text-amber-400 cursor-pointer">
              {isEn ? 'Women Safety:' : 'महिला हेल्पलाइन:'} <strong className="text-amber-400 text-sm">1090</strong>
            </span>
            <span className="hover:text-amber-400 cursor-pointer">
              {isEn ? 'Electricity:' : 'विद्युत शिकायत:'} <strong className="text-amber-400 text-sm">1912</strong>
            </span>
          </div>
        </div>

        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Government Identity */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/images/cm-helpline-logo.png"
                alt="1905 उत्तराखंड सीएम हेल्पलाइन - ITDA"
                className="h-11 w-auto object-contain rounded-lg shadow-sm"
              />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn
                ? 'Smart CM Helpline 1905 is an integrated, transparent, and citizen-first grievance redressal platform operated by the Government of Uttarakhand.'
                : 'मुख्यमंत्री हेल्पलाइन 1905 उत्तराखण्ड सरकार की एक पारदर्शी, जवाबदेह और नागरिक-हितैषी जन शिकायत निवारण प्रणाली है।'}
            </p>
            <div className="text-xs space-y-1.5 text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gov-saffron" />
                <span>{isEn ? 'Toll-Free: 1905 (24x7 Free Service)' : 'टोल-फ्री: 1905 (24x7 निःशुल्क)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gov-saffron" />
                <span>cmhelpline-uk@gov.in ({isEn ? 'Official' : 'आधिकारिक'})</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-gov-saffron" />
                <span>
                  {isEn
                    ? 'ITDA Building, Sahastradhara Road, Dehradun'
                    : 'आईटीडीए भवन, सहस्त्रधारा रोड, देहरादून'}
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Citizen Services */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 border-b border-slate-700 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gov-blue"></span>
              {isEn ? 'Citizen Public Services' : 'नागरिक सेवाएं (Citizen Services)'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/register" className="hover:text-amber-400 transition-colors">
                  {isEn ? 'Register Grievance' : 'शिकायत दर्ज करें (Register Complaint)'}
                </Link>
              </li>
              <li>
                <Link to="/track" className="hover:text-amber-400 transition-colors">
                  {isEn ? 'Track Grievance Status' : 'शिकायत की स्थिति जांचें (Track Complaint)'}
                </Link>
              </li>
              <li>
                <Link to="/public-demand" className="hover:text-amber-400 transition-colors">
                  {isEn ? 'Register Public Demand' : 'सार्वजनिक मांग प्रस्तुत करें (Public Demand)'}
                </Link>
              </li>
              <li>
                <Link to="/public-suggestion" className="hover:text-amber-400 transition-colors">
                  {isEn ? 'Submit Public Suggestion' : 'सरकारी सुधार हेतु सुझाव दें (Public Suggestion)'}
                </Link>
              </li>
              <li>
                <Link to="/schemes" className="hover:text-amber-400 transition-colors">
                  {isEn ? 'Uttarakhand Government Schemes' : 'उत्तराखण्ड सरकारी योजनाएं (Govt Schemes)'}
                </Link>
              </li>
              <li>
                <Link to="/districts" className="hover:text-amber-400 transition-colors">
                  {isEn ? '13 Districts Directory & Portals' : '13 जनपद पोर्टल व अधिकारी (13 Districts)'}
                </Link>
              </li>
              <li>
                <Link to="/departments" className="hover:text-amber-400 transition-colors">
                  {isEn ? 'State Departments Directory' : 'राज्य विभाग निर्देशिका (Departments)'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Official State Portals */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 border-b border-slate-700 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gov-green"></span>
              {isEn ? 'Official Government Portals' : 'महत्वपूर्ण सरकारी पोर्टल (Verified Links)'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://uk.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 flex items-center justify-between"
                >
                  <span>{isEn ? 'Govt of Uttarakhand (uk.gov.in)' : 'उत्तराखण्ड शासन (uk.gov.in)'}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://cm.uk.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 flex items-center justify-between"
                >
                  <span>{isEn ? 'Hon’ble Chief Minister Portal' : 'माननीय मुख्यमंत्री पोर्टल (cm.uk.gov.in)'}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://cmhelpline.uk.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 flex items-center justify-between"
                >
                  <span>{isEn ? 'Live CM Helpline (cmhelpline.uk.gov.in)' : 'लाइव सीएम हेल्पलाइन पोर्टल (cmhelpline.uk)'}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://apunsarkar.uk.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 flex items-center justify-between"
                >
                  <span>{isEn ? 'Apuni Sarkar Portal (E-District)' : 'अपुणि सरकार पोर्टल (E-District)'}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://itda.uk.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 flex items-center justify-between"
                >
                  <span>{isEn ? 'ITDA Uttarakhand (itda.uk.gov.in)' : 'आईटीडीए उत्तराखण्ड (ITDA)'}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://bhashini.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 flex items-center justify-between"
                >
                  <span>{isEn ? 'Bhashini Language Mission (Gov of India)' : 'भाषिणी भाषा मिशन (Bhashini)'}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Hackathon Prototype Notice & Policies */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm mb-4 border-b border-slate-700 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gov-saffron"></span>
              {isEn ? 'PRAYAS 2026 Context' : 'प्रयास 2026 हैकाथॉन संदर्भ'}
            </h4>
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/80 text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                <Sparkles className="w-3.5 h-3.5" /> PRAYAS 2026
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                {isEn
                  ? 'This web application is an interactive prototype developed for the PRAYAS 2026 Government Digital Services Innovation Hackathon.'
                  : 'यह वेब एप्लीकेशन प्रयास 2026 हैकाथॉन (PRAYAS 2026 Hackathon) नवाचार प्रतियोगिता हेतु विकसित एक प्रोटोटाइप है।'}
              </p>
              <div className="pt-1 text-[10px] text-amber-400/90 font-medium border-t border-slate-700">
                {isEn
                  ? 'Note: Test grievances are demonstration-only and not transmitted to live government databases.'
                  : 'नोट: कोई वास्तविक शिकायत आधिकारिक सरकारी रिकॉर्ड में प्रेषित नहीं की जाती है।'}
              </div>
            </div>

            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-400 pt-1">
              <Link to="/about" className="hover:text-white">{isEn ? 'About Us' : 'हमारे बारे में'}</Link>
              <span>•</span>
              <Link to="/help" className="hover:text-white">{isEn ? 'Help & FAQs' : 'FAQs'}</Link>
              <span>•</span>
              <Link to="/privacy" className="hover:text-white">{isEn ? 'Privacy Policy' : 'गोपनीयता नीति'}</Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-white">{isEn ? 'Terms' : 'नियम व शर्तें'}</Link>
              <span>•</span>
              <Link to="/sitemap" className="hover:text-white">{isEn ? 'Sitemap' : 'साइटमैप'}</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="border-t border-slate-800 pt-6 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>
            {isEn
              ? '© 2026 Information Technology Development Agency (ITDA), Government of Uttarakhand. All rights reserved.'
              : '© 2026 सूचना प्रौद्योगिकी विकास एजेंसी (ITDA), उत्तराखण्ड शासन। सर्वाधिकार सुरक्षित।'}
          </p>
          <p className="text-[11px] text-slate-400 font-semibold">
            PRAYAS 2026 HACKATHON DEMONSTRATION PROTOTYPE — NOT AN OFFICIAL GOVERNMENT PORTAL.
          </p>
        </div>
      </div>
    </footer>
  );
};
