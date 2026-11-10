import React from 'react';
import { Star, CheckCircle, Clock, MapPin, Sparkles } from 'lucide-react';
import { DEMO_SUCCESS_STORIES } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';

export const SuccessStories: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 my-14" aria-label="Citizen Success Stories">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-devanagari">
              {language === 'en'
                ? 'Citizen Success Stories — Grievance Redressal in Action'
                : 'जनता की समस्याओं का समाधान — सफलता की कहानियां'}
            </h2>
            <span className="bg-orange-100 text-gov-orangeDark border border-orange-200 text-[10px] font-black px-2 py-0.5 rounded-full">
              DEMO CASE
            </span>
          </div>
          <p className="text-xs text-slate-500">
            {language === 'en'
              ? 'Illustrative examples of prompt redressal across Uttarakhand districts'
              : 'विभिन्न जनपदों से त्वरित निस्तारण के कुछ प्रमुख उदाहरणात्मक मामले'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {DEMO_SUCCESS_STORIES.map((story) => (
          <div
            key={story.id}
            className="bg-white rounded-2xl p-6 border border-[#E9E9E9] shadow-2xs hover:shadow-md hover:border-orange-200 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="bg-emerald-50 text-gov-green border border-emerald-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> {story.tag}
                </span>

                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: story.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-1">5.0</span>
                </div>
              </div>

              <h3 className="font-extrabold text-base text-slate-900">
                {language === 'en' ? story.titleEn : story.titleHi}
              </h3>

              <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gov-orange" />
                  {story.district}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gov-orange" />
                  {language === 'en' ? 'Resolution Time: ' : 'समाधान समय: '}
                  {story.timeTaken}
                </span>
              </div>

              {/* Problem & Action */}
              <div className="space-y-2 pt-2 text-xs border-t border-slate-100">
                <div className="bg-[#FFFAF5] p-2.5 rounded-lg border border-orange-100">
                  <strong className="text-slate-800 font-bold block mb-0.5">
                    {language === 'en' ? 'Grievance Reported:' : 'समस्या:'}
                  </strong>
                  <p className="text-slate-600">{story.problemHi}</p>
                </div>
                <div className="bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100">
                  <strong className="text-emerald-900 font-bold block mb-0.5">
                    {language === 'en' ? 'Department Action:' : 'विभागीय कार्रवाई:'}
                  </strong>
                  <p className="text-emerald-800">{story.actionHi}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-gov-green flex items-center justify-between">
              <span>{language === 'en' ? 'Outcome: ' : 'परिणाम: '}{story.resultHi}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
