import React from 'react';
import {
  FileText,
  Clock,
  Send,
  UserCheck,
  Wrench,
  AlertCircle,
  CheckCircle2,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import { ComplaintStatus } from '../../types/complaint';
import { useLanguage } from '../../context/LanguageContext';

interface StatusBadgeProps {
  status: ComplaintStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const { language } = useLanguage();

  const configMap: Record<
    ComplaintStatus,
    { labelHi: string; labelEn: string; bg: string; text: string; border: string; icon: React.ReactNode }
  > = {
    REGISTERED: {
      labelHi: 'दर्ज (Registered)',
      labelEn: 'Registered',
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      icon: <FileText className="w-3.5 h-3.5" />,
    },
    INITIAL_REVIEW: {
      labelHi: 'प्रारंभिक समीक्षा (Under Review)',
      labelEn: 'Under Review',
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
      icon: <Clock className="w-3.5 h-3.5" />,
    },
    FORWARDED_TO_DEPT: {
      labelHi: 'विभाग को प्रेषित (Forwarded)',
      labelEn: 'Forwarded to Dept',
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
      border: 'border-indigo-200',
      icon: <Send className="w-3.5 h-3.5" />,
    },
    ASSIGNED_TO_OFFICER: {
      labelHi: 'अधिकारी को आवंटित (Assigned)',
      labelEn: 'Assigned to Officer',
      bg: 'bg-sky-50',
      text: 'text-sky-700',
      border: 'border-sky-200',
      icon: <UserCheck className="w-3.5 h-3.5" />,
    },
    ACTION_IN_PROGRESS: {
      labelHi: 'कार्रवाई गतिमान (In Progress)',
      labelEn: 'Action in Progress',
      bg: 'bg-orange-50',
      text: 'text-orange-700',
      border: 'border-orange-200',
      icon: <Wrench className="w-3.5 h-3.5 animate-spin" />,
    },
    INFO_REQUIRED: {
      labelHi: 'विवरण अपेक्षित (Info Required)',
      labelEn: 'Info Required',
      bg: 'bg-yellow-50',
      text: 'text-yellow-800',
      border: 'border-yellow-200',
      icon: <AlertCircle className="w-3.5 h-3.5" />,
    },
    RESOLUTION_SUBMITTED: {
      labelHi: 'समाधान प्रस्तुत (Resolution Ready)',
      labelEn: 'Resolution Ready',
      bg: 'bg-teal-50',
      text: 'text-teal-700',
      border: 'border-teal-200',
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    },
    RESOLVED: {
      labelHi: 'निस्तारित (Resolved)',
      labelEn: 'Resolved',
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    },
    REOPENED: {
      labelHi: 'पुनः खुली (Reopened)',
      labelEn: 'Reopened',
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200',
      icon: <RotateCcw className="w-3.5 h-3.5" />,
    },
    REJECTED: {
      labelHi: 'अस्वीकृत (Rejected)',
      labelEn: 'Rejected',
      bg: 'bg-gray-100',
      text: 'text-gray-700',
      border: 'border-gray-300',
      icon: <XCircle className="w-3.5 h-3.5" />,
    },
  };

  const item = configMap[status] || configMap.REGISTERED;

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border shadow-2xs ${item.bg} ${item.text} ${item.border} ${sizeClasses[size]}`}
    >
      {item.icon}
      <span>{language === 'en' ? item.labelEn : item.labelHi}</span>
    </span>
  );
};
