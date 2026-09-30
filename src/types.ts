export interface ResumeSubmission {
  name: string;
  email: string;
  targetRole: string;
  notes?: string;
  files: File[];
}

export interface WorkflowInfo {
  name: string;
  url: string;
  provider: string;
  fields: {
    id: string;
    name: string;
    type: string;
    label: string;
    required: boolean;
    multiple?: boolean;
  }[];
  status: string;
  verifiedAt: string;
}

export interface SubmissionResult {
  success: boolean;
  message: string;
  n8nStatus?: number;
  submittedAt: string;
  details?: {
    confirmation?: string;
    formSubmittedText?: string;
    [key: string]: any;
  };
}

export interface PreFlightScore {
  overallScore: number;
  atsCompatibility: number;
  actionVerbStrength: number;
  quantifiedImpact: number;
  structureScore: number;
  detectedSections: {
    name: string;
    found: boolean;
  }[];
  keyStrengths: string[];
  recommendations: string[];
  detectedKeywords: string[];
  wordCount: number;
}
