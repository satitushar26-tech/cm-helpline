import React, { useState } from 'react';
import { Phone, Mail, Building, Clock, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ContactPage: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12" id="main-content">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-black text-gov-orange uppercase tracking-wider bg-orange-50 px-3.5 py-1 rounded-full border border-orange-200">
          {isEn ? 'Contact Directory' : 'संपर्क निर्देशिका'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-devanagari">
          {isEn
            ? 'Contact Chief Minister Helpline 1905'
            : 'संपर्क करें (Contact Helpline 1905)'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          {isEn
            ? 'State Control Room, ITDA Uttarakhand, and essential emergency helpline numbers'
            : 'मुख्यमंत्री हेल्पलाइन उत्तराखण्ड 1905 राज्य नियंत्रण कक्ष एवं महत्वपूर्ण आपातकालीन संपर्क'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#F58220] to-[#D96816] text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-bold text-amber-100 uppercase tracking-wide">
              {isEn ? 'Toll-Free Helpline' : 'टोल-फ्री हेल्पलाइन'}
            </span>
            <div className="text-4xl font-black tracking-wider text-white mt-1">1905</div>
            <p className="text-xs text-orange-100 mt-1">
              {isEn ? '24x7 Citizen Call Center' : '24x7 निःशुल्क जन समाधान कॉल सेंटर'}
            </p>
          </div>

          <div className="space-y-4 text-xs border-t border-white/20 pt-5">
            <div className="flex items-start gap-3">
              <Building className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">
                  {isEn ? 'State Control Room Address:' : 'राज्य नियंत्रण कक्ष पता:'}
                </strong>
                <p className="text-orange-100">
                  {isEn
                    ? 'Information Technology Development Agency (ITDA) Building, IT Park, Sahastradhara Road, Dehradun - 248001'
                    : 'सूचना प्रौद्योगिकी विकास एजेंसी (ITDA) भवन, आईटी पार्क, सहस्त्रधारा रोड, देहरादून - 248001'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">
                  {isEn ? 'Official Email Contact:' : 'ईमेल संपर्क:'}
                </strong>
                <p className="text-orange-100">cmhelpline-uk@gov.in</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">
                  {isEn ? 'Operating Hours:' : 'कार्य समय:'}
                </strong>
                <p className="text-slate-300">
                  {isEn
                    ? 'Helpline Call Center: 24 Hours, 365 Days a Year'
                    : 'हेल्पलाइन कॉल सेंटर: 24 घंटे, 365 दिन सेवारत'}
                </p>
              </div>
            </div>
          </div>

          {/* Emergency numbers list */}
          <div className="border-t border-white/15 pt-5 space-y-2 text-xs">
            <strong className="text-amber-300 block font-bold">
              {isEn ? 'Essential State Emergency Helplines:' : 'राज्य आवश्यक आपातकालीन सेवाएं:'}
            </strong>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-white/10 p-2 rounded-lg">
                {isEn ? 'Police / Emergency: ' : 'पुलिस / आपातकाल: '}<strong>112</strong>
              </div>
              <div className="bg-white/10 p-2 rounded-lg">
                {isEn ? 'Ambulance: ' : 'एंबुलेंस: '}<strong>108</strong>
              </div>
              <div className="bg-white/10 p-2 rounded-lg">
                {isEn ? 'Women Helpline: ' : 'महिला सुरक्षा: '}<strong>1090</strong>
              </div>
              <div className="bg-white/10 p-2 rounded-lg">
                {isEn ? 'Power Grievance: ' : 'बिजली शिकायत: '}<strong>1912</strong>
              </div>
            </div>
          </div>
        </div>

        {/* General Inquiry Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-5">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 font-devanagari">
            {isEn ? 'General Inquiry / Send Message' : 'सामान्य पूछताछ / संदेश भेजें (General Inquiry)'}
          </h2>

          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-gov-green mx-auto" />
              <h3 className="font-bold text-base text-slate-900">
                {isEn ? 'Message Sent Successfully' : 'संदेश सफलता पूर्वक प्रेषित'}
              </h3>
              <p className="text-xs text-slate-600">
                {isEn
                  ? 'Your message has been recorded. Our helpline support team will get back to you shortly.'
                  : 'आपकी पूछताछ दर्ज कर ली गई है। हेल्पलाइन दल शीघ्र आपसे संपर्क करेगा।'}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-gov-orange hover:bg-gov-orangeDark text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
              >
                {isEn ? 'Send Another Message' : 'अन्य संदेश भेजें'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {isEn ? 'Full Name' : 'आपका नाम'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isEn ? 'Your full name' : 'पूरा नाम'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {isEn ? 'Mobile Number' : 'मोबाइल नंबर'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder={isEn ? '10-digit mobile' : '10 अंकों का मोबाइल'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {isEn ? 'Subject' : 'विषय (Subject)'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={isEn ? 'Subject of your inquiry' : 'संदेश का मुख्य विषय'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {isEn ? 'Message' : 'संदेश (Message)'} <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={isEn ? 'Write your inquiry or question here...' : 'अपनी पूछताछ अथवा संदेश विस्तार से लिखें...'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-orange leading-relaxed"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gov-orange hover:bg-gov-orangeDark text-white font-black py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isEn ? 'Send Message' : 'संदेश भेजें (Send Inquiry)'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
