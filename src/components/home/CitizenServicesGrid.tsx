import React from 'react';
import { Link } from 'react-router-dom';
import {
  FilePlus,
  Search,
  MessageSquarePlus,
  Lightbulb,
  History,
  Building2,
  Award,
  Star,
  PhoneCall,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ServiceItem {
  id: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  link: string;
}

export const CitizenServicesGrid: React.FC = () => {
  const { language } = useLanguage();

  const services: ServiceItem[] = [
    {
      id: 'srv-1',
      titleEn: 'Register Complaint',
      titleHi: 'शिकायत दर्ज करें',
      descriptionEn: 'Submit public grievances directly to concerned state departments online.',
      descriptionHi: 'अपनी जन समस्या को संबंधित विभाग को ऑनलाइन भेजें।',
      icon: <FilePlus className="w-6 h-6" />,
      iconBg: 'bg-blue-50',
      iconColor: 'text-gov-blue',
      link: '/register',
    },
    {
      id: 'srv-2',
      titleEn: 'Track Complaint',
      titleHi: 'शिकायत की स्थिति देखें',
      descriptionEn: 'Check real-time 8-stage progress using your Reference ID or mobile.',
      descriptionHi: 'रेफरेंस नंबर से 8-चरणीय लाइव टाइमलाइन प्रगति देखें।',
      icon: <Search className="w-6 h-6" />,
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-600',
      link: '/track',
    },
    {
      id: 'srv-3',
      titleEn: 'Register Public Demand',
      titleHi: 'सार्वजनिक मांग दर्ज करें',
      descriptionEn: 'Request new infrastructure: drinking water tanks, roads, schools, bus routes.',
      descriptionHi: 'सड़क, पानी, अस्पताल जैसी नई अवसंरचना की मांग करें।',
      icon: <MessageSquarePlus className="w-6 h-6" />,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-gov-green',
      link: '/public-demand',
    },
    {
      id: 'srv-4',
      titleEn: 'Submit Public Suggestion',
      titleHi: 'सार्वजनिक सुझाव भेजें',
      descriptionEn: 'Propose policy or digital enhancements to improve government service delivery.',
      descriptionHi: 'सरकारी नीतियों व जन सेवा सुधार हेतु अपने विचार दें।',
      icon: <Lightbulb className="w-6 h-6" />,
      iconBg: 'bg-amber-50',
      iconColor: 'text-gov-saffron',
      link: '/public-suggestion',
    },
    {
      id: 'srv-5',
      titleEn: 'Complaint History',
      titleHi: 'शिकायत इतिहास',
      descriptionEn: 'View all previously registered grievances and their historical resolution records.',
      descriptionHi: 'मोबाइल नंबर से अपनी पूर्व दर्ज सभी शिकायतों की सूची देखें।',
      icon: <History className="w-6 h-6" />,
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      link: '/citizen/dashboard',
    },
    {
      id: 'srv-6',
      titleEn: 'Department Directory',
      titleHi: 'विभाग निर्देशिका',
      descriptionEn: 'Explore 14 state departments, jurisdictions, nodal officers, and contacts.',
      descriptionHi: 'राज्य के प्रमुख विभागों के कार्य व संपर्क अधिकारी देखें।',
      icon: <Building2 className="w-6 h-6" />,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      link: '/departments',
    },
    {
      id: 'srv-7',
      titleEn: 'Government Schemes',
      titleHi: 'सरकारी योजनाएं',
      descriptionEn: 'Eligibility, benefits, and verified portals for Atal Ayushman, MSY, pensions, etc.',
      descriptionHi: 'आयुष्मान, किसान व महिला कल्याणकारी योजनाओं की पात्रता।',
      icon: <Award className="w-6 h-6" />,
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-600',
      link: '/schemes',
    },
    {
      id: 'srv-8',
      titleEn: 'Citizen Feedback',
      titleHi: 'नागरिक फीडबैक',
      descriptionEn: 'Rate resolution quality with 1-5 stars or review satisfaction.',
      descriptionHi: 'निराकृत शिकायतों पर संतुष्टि रेटिंग व विचार साझा करें।',
      icon: <Star className="w-6 h-6" />,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      link: '/feedback',
    },
    {
      id: 'srv-9',
      titleEn: 'Important Contacts',
      titleHi: 'महत्वपूर्ण संपर्क व हेल्पलाइन',
      descriptionEn: 'Emergency numbers (112, 108, 1090, 1912) and 13 District control rooms.',
      descriptionHi: 'राज्य आपातकालीन नंबर एवं 13 जनपदों के नियंत्रण कक्ष।',
      icon: <PhoneCall className="w-6 h-6" />,
      iconBg: 'bg-teal-50',
      iconColor: 'text-teal-600',
      link: '/contact',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 my-14" aria-label="Citizen Services Grid">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-bold text-gov-blue uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          {language === 'en' ? 'Comprehensive Citizen Services' : 'एक ही पोर्टल पर सम्पूर्ण समाधान'}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-gov-navy">
          {language === 'en' ? 'Key Citizen Services' : 'प्रमुख नागरिक सेवाएं (Citizen Services)'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          {language === 'en'
            ? 'Transparent, fast, and accessible digital governance services for citizens of Uttarakhand'
            : 'उत्तराखण्ड के नागरिकों के लिए त्वरित, पारदर्शी और सुलभ जन सेवाएं'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((srv) => (
          <Link
            key={srv.id}
            to={srv.link}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-lg hover:border-gov-blue transition-all duration-300 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div
                  className={`w-12 h-12 rounded-xl ${srv.iconBg} ${srv.iconColor} flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  {srv.icon}
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-50 text-slate-400 group-hover:bg-gov-blue group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-gov-navy group-hover:text-gov-blue transition-colors">
                  {language === 'en' ? srv.titleEn : srv.titleHi}
                </h3>
                <p className="text-xs font-semibold text-slate-400 font-devanagari">
                  {language === 'en' ? srv.titleHi : srv.titleEn}
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'en' ? srv.descriptionEn : srv.descriptionHi}
              </p>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-100 flex items-center text-xs font-bold text-gov-blue group-hover:text-gov-navy transition-colors">
              <span>{language === 'en' ? 'Access Service' : 'सेवा का उपयोग करें'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
