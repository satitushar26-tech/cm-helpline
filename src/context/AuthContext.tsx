import React, { createContext, useContext, useState } from 'react';
import { CitizenProfile } from '../types/citizen';
import { OfficerProfile, OfficerRole } from '../types/officer';

export const DEMO_OFFICER_PROFILES: OfficerProfile[] = [
  {
    id: 'off-1',
    name: 'इंजी. विक्रम सिंह रावत (Er. V.S. Rawat)',
    designation: 'सहायक अभियंता (नोडल अधिकारी)',
    role: 'LEVEL_2_DISTRICT',
    department: 'पेयजल एवं स्वच्छता विभाग (जल संस्थान / पेयजल निगम)',
    district: 'Chamoli',
  },
  {
    id: 'off-2',
    name: 'इंजी. राजेश चौहान (Er. Rajesh Chauhan)',
    designation: 'सहायक अभियंता (लो.नि.वि.)',
    role: 'LEVEL_1_BLOCK',
    department: 'लोक निर्माण विभाग (लो.नि.वि.)',
    district: 'Pauri Garhwal',
  },
  {
    id: 'off-3',
    name: 'डॉ. आर.के. ध्यानी (Dr. R.K. Dhyani)',
    designation: 'अपर निदेशक (स्वास्थ्य सेवा)',
    role: 'LEVEL_3_HOD',
    department: 'चिकित्सा स्वास्थ्य एवं परिवार कल्याण विभाग',
  },
  {
    id: 'off-4',
    name: 'श्री आनंद स्वरूप (Anand Swaroop)',
    designation: 'अपर जिलाधिकारी (ADM Grievance)',
    role: 'DISTRICT_ADMIN',
    department: 'राजस्व एवं जन शिकायत निवारण',
    district: 'Dehradun',
  },
  {
    id: 'off-5',
    name: 'श्री शैलेश बगोली, IAS (State Nodal Officer)',
    designation: 'सचिव, मुख्यमंत्री सचिवालय एवं आईटीडीए',
    role: 'STATE_ADMIN',
    department: 'मुख्यमंत्री हेल्पलाइन 1905 राज्य प्रकोष्ठ',
  },
];

interface AuthContextType {
  // Citizen
  citizen: CitizenProfile | null;
  citizenLogin: (mobile: string, name?: string, district?: string) => boolean;
  citizenLogout: () => void;
  // Officer
  currentOfficer: OfficerProfile | null;
  isOfficerLoggedIn: boolean;
  officerLogin: (officerId: string) => boolean;
  officerLogout: () => void;
  switchOfficerRole: (role: OfficerRole) => void;
  allOfficers: OfficerProfile[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Citizen state
  const [citizen, setCitizen] = useState<CitizenProfile | null>(() => {
    const saved = localStorage.getItem('uk_cm_citizen');
    return saved ? JSON.parse(saved) : {
      id: 'cit-demo-01',
      name: 'हरीश चन्द्र जोशी',
      mobile: '9876543210',
      district: 'Chamoli',
      tehsil: 'Joshimath',
      block: 'Dasholi',
      villageOrWard: 'ग्राम सेमा',
      preferredLanguage: 'hi',
      isAuthenticated: true,
    };
  });

  // Officer state (default to Level 2 Chamoli Nodal Officer for rich testing)
  const [currentOfficer, setCurrentOfficer] = useState<OfficerProfile | null>(() => {
    const saved = localStorage.getItem('uk_cm_officer');
    return saved ? JSON.parse(saved) : DEMO_OFFICER_PROFILES[0];
  });

  const citizenLogin = (mobile: string, name = 'नागरिक (Citizen)', district = 'Dehradun') => {
    const profile: CitizenProfile = {
      id: `cit-${Date.now().toString().slice(-4)}`,
      name,
      mobile,
      district,
      preferredLanguage: 'hi',
      isAuthenticated: true,
    };
    setCitizen(profile);
    localStorage.setItem('uk_cm_citizen', JSON.stringify(profile));
    return true;
  };

  const citizenLogout = () => {
    setCitizen(null);
    localStorage.removeItem('uk_cm_citizen');
  };

  const officerLogin = (officerId: string) => {
    const found = DEMO_OFFICER_PROFILES.find((o) => o.id === officerId) || DEMO_OFFICER_PROFILES[0];
    setCurrentOfficer(found);
    localStorage.setItem('uk_cm_officer', JSON.stringify(found));
    return true;
  };

  const switchOfficerRole = (role: OfficerRole) => {
    const found = DEMO_OFFICER_PROFILES.find((o) => o.role === role) || DEMO_OFFICER_PROFILES[0];
    setCurrentOfficer(found);
    localStorage.setItem('uk_cm_officer', JSON.stringify(found));
  };

  const officerLogout = () => {
    setCurrentOfficer(null);
    localStorage.removeItem('uk_cm_officer');
  };

  return (
    <AuthContext.Provider
      value={{
        citizen,
        citizenLogin,
        citizenLogout,
        currentOfficer,
        isOfficerLoggedIn: !!currentOfficer,
        officerLogin,
        officerLogout,
        switchOfficerRole,
        allOfficers: DEMO_OFFICER_PROFILES,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
