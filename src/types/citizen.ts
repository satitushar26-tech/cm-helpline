import { LanguageCode } from './language';

export interface CitizenProfile {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  district: string;
  tehsil?: string;
  block?: string;
  villageOrWard?: string;
  preferredLanguage: LanguageCode;
  isAuthenticated: boolean;
}

export interface ComplaintDraft {
  id: string;
  savedAt: string;
  currentStep: number;
  citizenName: string;
  citizenMobile: string;
  district: string;
  tehsil: string;
  block: string;
  villageOrWard: string;
  category: string;
  title: string;
  description: string;
  suggestedDepartment: string;
}
