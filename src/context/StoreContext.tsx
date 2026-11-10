import React, { createContext, useContext, useState, useEffect } from 'react';
import { Complaint, ComplaintStatus, TimelineEvent, PublicDemand, PublicSuggestion, CitizenFeedback, Attachment } from '../types/complaint';
import { ComplaintDraft } from '../types/citizen';
import { DemoNotification } from '../types/officer';
import { INITIAL_DEMO_COMPLAINTS, INITIAL_DEMO_DEMANDS, INITIAL_DEMO_SUGGESTIONS } from '../data/mockData';

interface RegisterComplaintInput {
  citizenName: string;
  citizenMobile: string;
  citizenEmail?: string;
  district: string;
  tehsil?: string;
  block?: string;
  villageOrWard: string;
  category: string;
  title: string;
  description: string;
  suggestedDepartment: string;
  priority?: 'NORMAL' | 'URGENT' | 'EMERGENCY';
  attachments?: Attachment[];
}

interface OfficerActionInput {
  complaintId: string;
  newStatus: ComplaintStatus;
  remarks: string;
  officerName: string;
  officerRole: string;
  assignedDepartment?: string;
  documentName?: string;
}

interface StoreContextType {
  complaints: Complaint[];
  demands: PublicDemand[];
  suggestions: PublicSuggestion[];
  drafts: ComplaintDraft[];
  notifications: DemoNotification[];
  // Complaint Actions
  registerComplaint: (data: RegisterComplaintInput) => Complaint;
  getComplaintById: (id: string) => Complaint | undefined;
  getComplaintsByMobile: (mobile: string) => Complaint[];
  officerTakeAction: (input: OfficerActionInput) => void;
  submitFeedback: (complaintId: string, feedback: Omit<CitizenFeedback, 'id' | 'complaintId' | 'submittedAt'>) => void;
  requestReopening: (complaintId: string, reason: string) => void;
  sendReminder: (complaintId: string, message?: string) => boolean;
  // Demands & Suggestions
  submitPublicDemand: (data: Omit<PublicDemand, 'id' | 'submittedAt' | 'isDemo' | 'status'>) => PublicDemand;
  submitPublicSuggestion: (data: Omit<PublicSuggestion, 'id' | 'submittedAt' | 'isDemo' | 'status'>) => PublicSuggestion;
  // Drafts
  saveDraft: (draft: Omit<ComplaintDraft, 'id' | 'savedAt'>) => void;
  deleteDraft: (id: string) => void;
  markNotificationRead: (id: string) => void;
  resetDemoStore: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  COMPLAINTS: 'uk_cm_helpline_complaints_v1',
  DEMANDS: 'uk_cm_helpline_demands_v1',
  SUGGESTIONS: 'uk_cm_helpline_suggestions_v1',
  DRAFTS: 'uk_cm_helpline_drafts_v1',
  NOTIFICATIONS: 'uk_cm_helpline_notifications_v1',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COMPLAINTS);
    return saved ? JSON.parse(saved) : INITIAL_DEMO_COMPLAINTS;
  });

  const [demands, setDemands] = useState<PublicDemand[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DEMANDS);
    return saved ? JSON.parse(saved) : INITIAL_DEMO_DEMANDS;
  });

  const [suggestions, setSuggestions] = useState<PublicSuggestion[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SUGGESTIONS);
    return saved ? JSON.parse(saved) : INITIAL_DEMO_SUGGESTIONS;
  });

  const [drafts, setDrafts] = useState<ComplaintDraft[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DRAFTS);
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState<DemoNotification[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'notif-1',
            title: 'शिकायत पर कार्रवाई (Action Update)',
            message: 'शिकायत DEMO-UK-1905-2026-000001 पर जल संस्थान चमोली द्वारा नई पाइपलाइन बिछाने की कार्रवाई प्रगति पर है।',
            timestamp: new Date().toISOString(),
            read: false,
            type: 'ACTION',
            referenceId: 'DEMO-UK-1905-2026-000001',
          },
          {
            id: 'notif-2',
            title: 'शिकायत निस्तारित (Complaint Resolved)',
            message: 'शिकायत DEMO-UK-1905-2026-000005 (स्ट्रीट लाइट देहरादून) सफलता पूर्वक निस्तारित कर दी गई है।',
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            read: true,
            type: 'RESOLVED',
            referenceId: 'DEMO-UK-1905-2026-000005',
          },
        ];
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DEMANDS, JSON.stringify(demands));
  }, [demands]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUGGESTIONS, JSON.stringify(suggestions));
  }, [suggestions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts));
  }, [drafts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  // Register New Complaint
  const registerComplaint = (data: RegisterComplaintInput): Complaint => {
    const nextSeq = (complaints.length + 1).toString().padStart(6, '0');
    const newId = `DEMO-UK-1905-2026-${nextSeq}`;
    const now = new Date().toISOString();

    const initialTimeline: TimelineEvent[] = [
      {
        id: `tl-${Date.now()}-1`,
        stage: 'REGISTERED',
        title: 'शिकायत सफलता पूर्वक दर्ज की गई (Complaint Registered)',
        description: `नागरिक ${data.citizenName} द्वारा ऑनलाइन पोर्टल के माध्यम से शिकायत दर्ज की गई। संदर्भ संख्या ${newId} आवंटित की गई।`,
        timestamp: now,
      },
      {
        id: `tl-${Date.now()}-2`,
        stage: 'INITIAL_REVIEW',
        title: 'स्वचालित समीक्षा एवं विभाग अनुसंशा (Automated Routing)',
        description: `शिकायत श्रेणी "${data.category}" के आधार पर अनुशंसित विभाग: "${data.suggestedDepartment}" को प्रारंभिक समीक्षा हेतु अग्रेषित किया जा रहा है।`,
        timestamp: new Date(Date.now() + 1000).toISOString(),
        department: data.suggestedDepartment,
      },
    ];

    const newComplaint: Complaint = {
      id: newId,
      citizenName: data.citizenName,
      citizenMobile: data.citizenMobile,
      citizenEmail: data.citizenEmail,
      district: data.district,
      tehsil: data.tehsil,
      block: data.block,
      villageOrWard: data.villageOrWard,
      category: data.category,
      title: data.title,
      description: data.description,
      suggestedDepartment: data.suggestedDepartment,
      assignedDepartment: data.suggestedDepartment,
      status: 'INITIAL_REVIEW',
      priority: data.priority || 'NORMAL',
      registeredAt: now,
      updatedAt: now,
      attachments: data.attachments || [],
      timeline: initialTimeline,
      isDemo: true,
    };

    setComplaints((prev) => [newComplaint, ...prev]);

    // Create Notification
    const newNotif: DemoNotification = {
      id: `notif-${Date.now()}`,
      title: 'नई शिकायत दर्ज (Complaint Registered)',
      message: `आपकी शिकायत संदर्भ संख्या ${newId} दर्ज कर ली गई है। आप इसे 1905 पोर्टल पर ट्रैक कर सकते हैं।`,
      timestamp: now,
      read: false,
      type: 'INFO',
      referenceId: newId,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return newComplaint;
  };

  const getComplaintById = (id: string): Complaint | undefined => {
    const cleanId = id.trim().toUpperCase();
    return complaints.find((c) => c.id.toUpperCase() === cleanId);
  };

  const getComplaintsByMobile = (mobile: string): Complaint[] => {
    const cleanMob = mobile.trim();
    return complaints.filter((c) => c.citizenMobile.includes(cleanMob) || cleanMob.includes(c.citizenMobile));
  };

  // Officer Action
  const officerTakeAction = (input: OfficerActionInput) => {
    const now = new Date().toISOString();

    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== input.complaintId) return c;

        const stageTitleMap: Record<ComplaintStatus, string> = {
          REGISTERED: 'शिकायत दर्ज (Registered)',
          INITIAL_REVIEW: 'प्रारंभिक समीक्षा (Under Review)',
          FORWARDED_TO_DEPT: 'संबंधित विभाग को प्रेषित (Forwarded to Department)',
          ASSIGNED_TO_OFFICER: 'क्षेत्रीय अधिकारी को आवंटित (Assigned to Field Officer)',
          ACTION_IN_PROGRESS: 'मौके पर कार्रवाई गतिमान (Action in Progress)',
          INFO_REQUIRED: 'अतिरिक्त जानकारी अपेक्षित (Additional Info Required)',
          RESOLUTION_SUBMITTED: 'समाधान प्रतिवेदन प्रस्तुत (Resolution Report Submitted)',
          RESOLVED: 'शिकायत निस्तारित (Grievance Resolved)',
          REOPENED: 'शिकायत पुनः खोली गई (Reopened for Re-inspection)',
          REJECTED: 'शिकायत अस्वीकृत / अन्य विभाग अंतरित (Rejected with Remarks)',
        };

        const newTimelineEvent: TimelineEvent = {
          id: `tl-${Date.now()}`,
          stage: input.newStatus,
          title: stageTitleMap[input.newStatus] || input.newStatus,
          description: input.remarks || `अधिकारी द्वारा स्थिति को "${input.newStatus}" में अद्यतन किया गया।`,
          timestamp: now,
          officerName: input.officerName,
          officerRole: input.officerRole,
          department: input.assignedDepartment || c.assignedDepartment,
          remarks: input.remarks,
          documentUrl: input.documentName,
        };

        const updatedATR =
          input.newStatus === 'RESOLVED' || input.newStatus === 'RESOLUTION_SUBMITTED'
            ? {
                summary: input.remarks,
                submittedAt: now,
                officerName: input.officerName,
                documentName: input.documentName || 'Action_Report_Signed.pdf',
              }
            : c.actionTakenReport;

        return {
          ...c,
          status: input.newStatus,
          updatedAt: now,
          assignedDepartment: input.assignedDepartment || c.assignedDepartment,
          assignedOfficer: input.officerName,
          assignedOfficerRole: input.officerRole,
          actionTakenReport: updatedATR,
          timeline: [...c.timeline, newTimelineEvent],
        };
      })
    );

    // Create notification for citizen
    const notif: DemoNotification = {
      id: `notif-${Date.now()}`,
      title: `शिकायत अपडेट: ${input.complaintId}`,
      message: `${input.officerName} ने आपकी शिकायत पर नया अपडेट दर्ज किया: "${input.remarks.slice(0, 80)}..."`,
      timestamp: now,
      read: false,
      type: input.newStatus === 'RESOLVED' ? 'RESOLVED' : 'ACTION',
      referenceId: input.complaintId,
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  // Submit Feedback
  const submitFeedback = (
    complaintId: string,
    feedback: Omit<CitizenFeedback, 'id' | 'complaintId' | 'submittedAt'>
  ) => {
    const now = new Date().toISOString();
    const fbRecord: CitizenFeedback = {
      id: `fb-${Date.now()}`,
      complaintId,
      submittedAt: now,
      ...feedback,
    };

    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== complaintId) return c;
        const timelineEvent: TimelineEvent = {
          id: `tl-${Date.now()}`,
          stage: 'RESOLVED',
          title: 'नागरिक फीडबैक दर्ज (Citizen Feedback Submitted)',
          description: `नागरिक द्वारा ${feedback.rating} स्टार रेटिंग एवं समीक्षा दर्ज की गई: "${feedback.remarks}"`,
          timestamp: now,
        };
        return {
          ...c,
          feedback: fbRecord,
          status: feedback.isResolved ? 'RESOLVED' : c.status,
          updatedAt: now,
          timeline: [...c.timeline, timelineEvent],
        };
      })
    );
  };

  // Request Reopening
  const requestReopening = (complaintId: string, reason: string) => {
    const now = new Date().toISOString();
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== complaintId) return c;
        const timelineEvent: TimelineEvent = {
          id: `tl-${Date.now()}`,
          stage: 'REOPENED',
          title: 'नागरिक द्वारा पुनः खोलने का अनुरोध (Reopening Requested)',
          description: `नागरिक ने असंतुष्ट होकर शिकायत पुनः खोलने का अनुरोध किया। कारण: "${reason}"`,
          timestamp: now,
          remarks: reason,
        };
        return {
          ...c,
          status: 'REOPENED',
          reopenReason: reason,
          updatedAt: now,
          timeline: [...c.timeline, timelineEvent],
        };
      })
    );

    const notif: DemoNotification = {
      id: `notif-${Date.now()}`,
      title: `शिकायत पुनः खोली गई: ${complaintId}`,
      message: `नागरिक द्वारा असंतुष्टि दर्ज कर शिकायत को दोबारा जांच हेतु भेजा गया है।`,
      timestamp: now,
      read: false,
      type: 'REOPENED',
      referenceId: complaintId,
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  // Send Reminder
  const sendReminder = (complaintId: string, message?: string): boolean => {
    const target = complaints.find((c) => c.id === complaintId);
    if (!target) return false;

    const now = new Date().toISOString();
    const newTimelineEvent: TimelineEvent = {
      id: `tl-${Date.now()}`,
      stage: target.status,
      title: 'नागरिक अनुस्मारक प्रेषित (Reminder Sent by Citizen)',
      description: message || 'नागरिक द्वारा शिकायत के त्वरित निस्तारण हेतु अनुस्मारक (Reminder) प्रेषित किया गया।',
      timestamp: now,
      officerName: target.assignedOfficer || 'संबंधित नोडल अधिकारी',
    };

    setComplaints((prev) =>
      prev.map((c) =>
        c.id === complaintId
          ? {
              ...c,
              updatedAt: now,
              timeline: [...c.timeline, newTimelineEvent],
            }
          : c
      )
    );

    const notif: DemoNotification = {
      id: `notif-${Date.now()}`,
      title: `अनुस्मारक प्राप्त: ${complaintId}`,
      message: `नागरिक द्वारा शिकायत ${complaintId} पर त्वरित कार्रवाई हेतु अनुस्मारक भेजा गया है।`,
      timestamp: now,
      read: false,
      type: 'ACTION',
      referenceId: complaintId,
    };
    setNotifications((prev) => [notif, ...prev]);
    return true;
  };

  // Public Demand
  const submitPublicDemand = (data: Omit<PublicDemand, 'id' | 'submittedAt' | 'isDemo' | 'status'>): PublicDemand => {
    const nextSeq = (demands.length + 1).toString().padStart(6, '0');
    const newDemand: PublicDemand = {
      id: `DEMO-UK-DEM-2026-${nextSeq}`,
      submittedAt: new Date().toISOString(),
      status: 'SUBMITTED',
      isDemo: true,
      ...data,
    };
    setDemands((prev) => [newDemand, ...prev]);
    return newDemand;
  };

  // Public Suggestion
  const submitPublicSuggestion = (
    data: Omit<PublicSuggestion, 'id' | 'submittedAt' | 'isDemo' | 'status'>
  ): PublicSuggestion => {
    const nextSeq = (suggestions.length + 1).toString().padStart(6, '0');
    const newSuggestion: PublicSuggestion = {
      id: `DEMO-UK-SUG-2026-${nextSeq}`,
      submittedAt: new Date().toISOString(),
      status: 'SUBMITTED',
      isDemo: true,
      ...data,
    };
    setSuggestions((prev) => [newSuggestion, ...prev]);
    return newSuggestion;
  };

  // Drafts
  const saveDraft = (draftData: Omit<ComplaintDraft, 'id' | 'savedAt'>) => {
    const newDraft: ComplaintDraft = {
      id: `draft-${Date.now()}`,
      savedAt: new Date().toISOString(),
      ...draftData,
    };
    setDrafts((prev) => [newDraft, ...prev.filter((d) => d.title !== draftData.title)]);
  };

  const deleteDraft = (id: string) => {
    setDrafts((prev) => prev.filter((d) => d.id !== id));
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const resetDemoStore = () => {
    setComplaints(INITIAL_DEMO_COMPLAINTS);
    setDemands(INITIAL_DEMO_DEMANDS);
    setSuggestions(INITIAL_DEMO_SUGGESTIONS);
    setDrafts([]);
    localStorage.removeItem(STORAGE_KEYS.COMPLAINTS);
    localStorage.removeItem(STORAGE_KEYS.DEMANDS);
    localStorage.removeItem(STORAGE_KEYS.SUGGESTIONS);
    localStorage.removeItem(STORAGE_KEYS.DRAFTS);
  };

  return (
    <StoreContext.Provider
      value={{
        complaints,
        demands,
        suggestions,
        drafts,
        notifications,
        registerComplaint,
        getComplaintById,
        getComplaintsByMobile,
        officerTakeAction,
        submitFeedback,
        requestReopening,
        sendReminder,
        submitPublicDemand,
        submitPublicSuggestion,
        saveDraft,
        deleteDraft,
        markNotificationRead,
        resetDemoStore,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
