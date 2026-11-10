import React, { createContext, useContext, useState, useEffect } from 'react';

type TextSize = 'normal' | 'large' | 'larger';

interface AccessibilityContextType {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  increaseTextSize: () => void;
  decreaseTextSize: () => void;
  resetTextSize: () => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  toggleHighContrast: () => void;
  lowBandwidthMode: boolean;
  setLowBandwidthMode: (val: boolean) => void;
  toggleLowBandwidthMode: () => void;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  announcement: string;
  announce: (msg: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [textSize, setTextSizeState] = useState<TextSize>(() => {
    return (localStorage.getItem('uk_cm_text_size') as TextSize) || 'normal';
  });

  const [highContrast, setHighContrastState] = useState<boolean>(() => {
    return localStorage.getItem('uk_cm_high_contrast') === 'true';
  });

  const [lowBandwidthMode, setLowBandwidthModeState] = useState<boolean>(() => {
    return localStorage.getItem('uk_cm_low_bw') === 'true';
  });

  const [announcement, setAnnouncement] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const setTextSize = (size: TextSize) => {
    setTextSizeState(size);
    localStorage.setItem('uk_cm_text_size', size);
  };

  const increaseTextSize = () => {
    if (textSize === 'normal') setTextSize('large');
    else if (textSize === 'large') setTextSize('larger');
  };

  const decreaseTextSize = () => {
    if (textSize === 'larger') setTextSize('large');
    else if (textSize === 'large') setTextSize('normal');
  };

  const resetTextSize = () => setTextSize('normal');

  const setHighContrast = (val: boolean) => {
    setHighContrastState(val);
    localStorage.setItem('uk_cm_high_contrast', String(val));
  };

  const toggleHighContrast = () => setHighContrast(!highContrast);

  const setLowBandwidthMode = (val: boolean) => {
    setLowBandwidthModeState(val);
    localStorage.setItem('uk_cm_low_bw', String(val));
  };

  const toggleLowBandwidthMode = () => setLowBandwidthMode(!lowBandwidthMode);

  const announce = (msg: string) => {
    setAnnouncement(msg);
    setTimeout(() => setAnnouncement(''), 3000);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    if (textSize === 'large') {
      root.style.fontSize = '18px';
    } else if (textSize === 'larger') {
      root.style.fontSize = '20px';
    } else {
      root.style.fontSize = '16px';
    }
  }, [textSize]);

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast-mode');
    } else {
      document.body.classList.remove('high-contrast-mode');
    }
  }, [highContrast]);

  return (
    <AccessibilityContext.Provider
      value={{
        textSize,
        setTextSize,
        increaseTextSize,
        decreaseTextSize,
        resetTextSize,
        highContrast,
        setHighContrast,
        toggleHighContrast,
        lowBandwidthMode,
        setLowBandwidthMode,
        toggleLowBandwidthMode,
        speakText,
        stopSpeaking,
        isSpeaking,
        announcement,
        announce,
      }}
    >
      {/* Live Region for Screen Readers */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return context;
};
