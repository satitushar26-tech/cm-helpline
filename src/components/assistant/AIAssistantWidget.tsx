import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  MessageSquare,
  X,
  Send,
  ArrowRight,
  Bot,
  Building,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  FileEdit,
} from 'lucide-react';
import { GRIEVANCE_CATEGORIES } from '../../data/categories';
import { UTTARAKHAND_DEPARTMENTS } from '../../data/departments';
import { useLanguage } from '../../context/LanguageContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  categorySuggestion?: {
    categoryId: string;
    categoryName: string;
    departmentId: string;
    departmentName: string;
    confidence: number;
    reason: string;
    draftTitle: string;
    draftDescription: string;
  };
  timestamp: string;
}

export const AIAssistantWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const { language, t } = useLanguage();

  const welcomeText =
    language === 'en'
      ? 'Namaste! I am Sarathi, your Smart AI Assistant for CM Helpline 1905. Describe your issue (e.g., "Drinking water pipeline broken in my village for 5 days" or "Potholes on the main road"). I will recommend the right department and draft a formal grievance for you.'
      : 'नमस्ते! मैं सीएम हेल्पलाइन 1905 का स्मार्ट सहायक "सारथी" हूँ। अपनी समस्या बताएं — जैसे "गांव में 5 दिन से पानी नहीं आ रहा" या "सड़क पर भारी गड्ढे हैं"। मैं आपको सही विभाग एवं औपचारिक शिकायत तैयार करने में मदद करूंगा।';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-welcome',
      sender: 'assistant',
      text: welcomeText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMessages([
      {
        id: 'm-welcome',
        sender: 'assistant',
        text: welcomeText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, [language]);

  const quickPromptsEn = [
    'Drinking water pipeline broken in village',
    'Deep potholes and damaged link road',
    'Electricity transformer burnt for 3 days',
    'Doctor absent at primary health clinic',
    'Uncollected garbage and dark streetlights',
  ];

  const quickPromptsHi = [
    'गांव में पेयजल पाइपलाइन टूट गई है',
    'सड़क पर गहरे गड्ढे व डामर उखड़ गया है',
    'बिजली का ट्रांसफार्मर जल गया है',
    'अस्पताल में डॉक्टर नहीं हैं व दवा की कमी है',
    'वार्ड में कचरा नहीं उठा व स्ट्रीट लाइट बंद है',
  ];

  const quickPrompts = language === 'en' ? quickPromptsEn : quickPromptsHi;

  const analyzeGrievance = (userInput: string) => {
    const lower = userInput.toLowerCase();

    let bestDept = UTTARAKHAND_DEPARTMENTS[1]; // default drinking water
    let bestCat = GRIEVANCE_CATEGORIES[1];
    let maxMatches = 0;

    UTTARAKHAND_DEPARTMENTS.forEach((dept) => {
      let matches = 0;
      dept.serviceKeywords.forEach((kw) => {
        if (lower.includes(kw.toLowerCase())) matches += 2;
      });
      if (matches > maxMatches) {
        maxMatches = matches;
        bestDept = dept;
        const matchedCat = GRIEVANCE_CATEGORIES.find((c) => c.suggestedDepartmentId === dept.id);
        if (matchedCat) bestCat = matchedCat;
      }
    });

    const isEng = language === 'en';
    const draftTitle = isEng
      ? `${bestCat.nameEn} - Issue regarding ${userInput.slice(0, 45)}...`
      : `${bestCat.nameHi} - ${userInput.slice(0, 50)}...`;

    const draftDescription = isEng
      ? `Sir/Madam, I respectfully submit that in our locality, ${userInput}. This has caused substantial distress and disruption to local residents and families. Kindly arrange an on-site field inspection by the concerned authority (${bestDept.nameEn}) to resolve this public matter promptly.`
      : `महोदय, प्रार्थी निवेदन करता है कि हमारे क्षेत्र में ${userInput}। इस कारण आम नागरिकों एवं परिवारों को भारी असुविधा का सामना करना पड़ रहा है। अतः अनुरोध है कि संबंधित विभाग (${bestDept.nameHi}) द्वारा स्थलीय निरीक्षण कराकर जनहित में त्वरित समाधान की कृपा करें।`;

    return {
      categoryId: bestCat.id,
      categoryName: isEng ? bestCat.nameEn : bestCat.nameHi,
      departmentId: bestDept.id,
      departmentName: isEng ? bestDept.nameEn : bestDept.nameHi,
      confidence: maxMatches > 0 ? 94 : 84,
      reason: isEng
        ? `Based on key service terms in your query, this matter falls directly under the jurisdiction of "${bestDept.nameEn}".`
        : `आपकी समस्या में उल्लिखित मुख्य शब्दों के आधार पर यह विषय "${bestDept.nameHi}" के कार्यक्षेत्र में आता है।`,
      draftTitle,
      draftDescription,
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const suggestion = analyzeGrievance(query);
      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text:
          language === 'en'
            ? `I have analyzed your issue. I recommend the following department and have drafted a formal grievance application:`
            : `मैंने आपकी समस्या का विश्लेषण किया है। इसके समाधान हेतु उपयुक्त श्रेणी एवं विभाग का चयन कर एक औपचारिक ड्राफ्ट तैयार किया गया है:`,
        categorySuggestion: suggestion,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleUseDraft = (draftTitle: string, draftDescription: string, categoryId: string) => {
    sessionStorage.setItem(
      'uk_cm_ai_draft',
      JSON.stringify({
        title: draftTitle,
        description: draftDescription,
        category: categoryId,
      })
    );
    setIsOpen(false);
    navigate('/register');
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-20 lg:bottom-6 right-5 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Smart AI Assistant Sarathi"
          className="relative bg-gradient-to-r from-gov-navy to-gov-blue text-white p-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border-2 border-amber-400 group"
        >
          <Sparkles className="w-6 h-6 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="font-bold text-xs pr-1 hidden sm:inline">
            {language === 'en' ? 'Smart AI Assistant' : 'स्मार्ट सहायक सारथी'}
          </span>
          <span className="absolute -top-1.5 -right-1.5 bg-gov-saffron text-slate-950 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full border border-white">
            AI
          </span>
        </button>
      </div>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 lg:bottom-20 right-4 sm:right-6 z-50 w-[95vw] sm:w-[420px] max-h-[600px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-3">
          {/* Header */}
          <div className="bg-gradient-to-r from-gov-navy via-slate-900 to-gov-blue text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm">
                    {language === 'en' ? 'CM Helpline Sarathi (AI)' : 'सीएम हेल्पलाइन सारथी'}
                  </h3>
                  <span className="bg-amber-400 text-slate-950 text-[9px] font-extrabold px-1.5 rounded">
                    DEMO AI
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  {language === 'en'
                    ? 'Smart Grievance Drafting & Department Routing'
                    : 'स्मार्ट शिकायत ड्राफ्टिंग व विभाग अनुसंशा'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs bg-slate-50/70 max-h-[380px]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 shadow-2xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-gov-blue text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  <p>{m.text}</p>

                  {/* Recommendation Card */}
                  {m.categorySuggestion && (
                    <div className="mt-3 p-3 bg-blue-50/80 rounded-xl border border-blue-200 space-y-2 text-slate-900 text-left">
                      <div className="flex items-center justify-between text-[11px] font-bold text-gov-blue">
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          {language === 'en' ? 'Suggested Department' : 'अनुशंसित विभाग'}
                        </span>
                        <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded text-[10px]">
                          {m.categorySuggestion.confidence}% Match
                        </span>
                      </div>

                      <div className="font-bold text-xs text-gov-navy">
                        {m.categorySuggestion.departmentName}
                      </div>

                      <p className="text-[11px] text-slate-600 leading-normal">
                        {m.categorySuggestion.reason}
                      </p>

                      <div className="bg-white p-2 rounded border border-blue-100 space-y-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">
                          {language === 'en' ? 'Draft Grievance Text:' : 'तैयार औपचारिक ड्राफ्ट:'}
                        </span>
                        <p className="text-[11px] font-medium text-slate-800 italic">
                          "{m.categorySuggestion.draftDescription}"
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          handleUseDraft(
                            m.categorySuggestion!.draftTitle,
                            m.categorySuggestion!.draftDescription,
                            m.categorySuggestion!.categoryId
                          )
                        }
                        className="w-full mt-1 bg-gov-saffron hover:bg-amber-600 text-slate-950 font-bold py-1.5 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                      >
                        <FileEdit className="w-3.5 h-3.5" />
                        <span>
                          {language === 'en' ? 'Fill in Complaint Form' : 'शिकायत फॉर्म में भरें'}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">{m.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-slate-500 text-xs italic">
                <Bot className="w-4 h-4 text-gov-blue animate-bounce" />
                <span>
                  {language === 'en'
                    ? 'Sarathi is analyzing your issue...'
                    : 'सारथी समस्या का विश्लेषण कर रहा है...'}
                </span>
              </div>
            )}
          </div>

          {/* Quick Prompts Suggestions */}
          <div className="px-3 py-2 bg-slate-100 border-t border-slate-200 overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickPrompts.slice(0, 3).map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap bg-white hover:bg-blue-50 border border-slate-300 text-slate-700 text-[11px] px-2.5 py-1 rounded-full font-medium transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={language === 'en' ? 'Describe your problem here...' : 'अपनी समस्या यहाँ टाइप करें...'}
              className="flex-1 bg-slate-100 text-slate-800 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-gov-blue"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputText.trim()}
              className="bg-gov-blue hover:bg-gov-navy disabled:opacity-40 text-white p-2.5 rounded-xl transition-colors"
              title={language === 'en' ? 'Send' : 'भेजें'}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Safety Notice */}
          <div className="bg-slate-50 px-3 py-1 text-[10px] text-slate-500 text-center border-t border-slate-200">
            {language === 'en'
              ? 'AI recommendations are suggestions only; official department decisions are confirmed by authorized officers.'
              : 'एआई सुझाव केवल मार्गदर्शन हेतु हैं; विभाग का अंतिम निर्णय अधिकृत अधिकारी द्वारा मान्य होता है।'}
          </div>
        </div>
      )}
    </>
  );
};
