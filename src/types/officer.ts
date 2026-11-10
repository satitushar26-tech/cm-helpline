export type OfficerRole =
  | 'LEVEL_1_BLOCK'
  | 'LEVEL_2_DISTRICT'
  | 'LEVEL_3_HOD'
  | 'LEVEL_4_SECRETARIAT'
  | 'DISTRICT_ADMIN'
  | 'STATE_ADMIN';

export interface OfficerProfile {
  id: string;
  name: string;
  designation: string;
  role: OfficerRole;
  department: string;
  district?: string;
  avatar?: string;
}

export interface DemoNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'INFO' | 'ACTION' | 'RESOLVED' | 'REOPENED';
  referenceId?: string;
}
