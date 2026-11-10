export type ComplaintStatus =
  | 'REGISTERED'
  | 'INITIAL_REVIEW'
  | 'FORWARDED_TO_DEPT'
  | 'ASSIGNED_TO_OFFICER'
  | 'ACTION_IN_PROGRESS'
  | 'INFO_REQUIRED'
  | 'RESOLUTION_SUBMITTED'
  | 'RESOLVED'
  | 'REOPENED'
  | 'REJECTED';

export type PriorityLevel = 'NORMAL' | 'URGENT' | 'EMERGENCY';

export interface TimelineEvent {
  id: string;
  stage: ComplaintStatus;
  title: string;
  description: string;
  timestamp: string;
  officerName?: string;
  officerRole?: string;
  department?: string;
  remarks?: string;
  documentUrl?: string;
}

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: 'image' | 'pdf';
  url: string;
}

export interface CitizenFeedback {
  id: string;
  complaintId: string;
  isResolved: boolean;
  rating: number; // 1 to 5
  satisfactionLevel: 'VERY_SATISFIED' | 'SATISFIED' | 'NEUTRAL' | 'DISSATISFIED' | 'VERY_DISSATISFIED';
  remarks: string;
  submittedAt: string;
}

export interface Complaint {
  id: string; // e.g., DEMO-UK-1905-2026-000001
  citizenName: string;
  citizenMobile: string; // Masked for display: e.g. 98****3210
  citizenEmail?: string;
  district: string; // One of the 13 UK districts
  tehsil?: string;
  block?: string;
  villageOrWard: string;
  category: string;
  title: string;
  description: string;
  suggestedDepartment: string;
  assignedDepartment: string;
  status: ComplaintStatus;
  priority: PriorityLevel;
  registeredAt: string;
  updatedAt: string;
  assignedOfficer?: string;
  assignedOfficerRole?: string;
  actionTakenReport?: {
    summary: string;
    submittedAt: string;
    officerName: string;
    documentName?: string;
  };
  attachments: Attachment[];
  timeline: TimelineEvent[];
  feedback?: CitizenFeedback;
  reopenReason?: string;
  isDemo: true;
}

export interface PublicDemand {
  id: string; // DEMO-UK-DEM-2026-000001
  citizenName: string;
  citizenMobile: string;
  district: string;
  category: string;
  title: string;
  description: string;
  expectedBeneficiaries?: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'FEASIBILITY_STUDY' | 'APPROVED' | 'IN_ANNUAL_PLAN';
  submittedAt: string;
  isDemo: true;
}

export interface PublicSuggestion {
  id: string; // DEMO-UK-SUG-2026-000001
  citizenName: string;
  citizenMobile: string;
  district: string;
  serviceCategory: string;
  title: string;
  suggestion: string;
  impactArea: string;
  status: 'SUBMITTED' | 'REVIEWED' | 'APPRECIATED' | 'UNDER_CONSIDERATION';
  submittedAt: string;
  isDemo: true;
}
