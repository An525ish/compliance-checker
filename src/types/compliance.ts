export type ComplianceStatus = 'passing' | 'failing' | 'unknown';

export interface User {
  id: string;
  email: string;
  hasMFA: boolean;
  lastLogin?: string;
}

export interface Table {
  id: string;
  name: string;
  hasRLS: boolean;
  schema: string;
}

export interface Project {
  id: string;
  name: string;
  hasPITR: boolean;
  lastBackup?: string;
}

export interface ComplianceDetails {
  users?: User[];
  tables?: Table[];
  projects?: Project[];
  lastUpdated?: string;
  errorMessage?: string;
}

export interface ComplianceCheck {
  id: string;
  name: string;
  description: string;
  status: ComplianceStatus;
  lastChecked: string | null;
  category: 'security' | 'backup' | 'configuration';
  impact: 'high' | 'medium' | 'low';
  autoFixAvailable: boolean;
  details?: ComplianceDetails;
}

export interface ComplianceResult {
  users?: User[];
  tables?: Table[];
  projects?: Project[];
  totalChecks: number;
  passingChecks: number;
  lastScanTime: string;
}

export interface ComplianceError {
  code: string;
  message: string;
  details?: unknown;
}