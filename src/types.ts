export type UserRole = 'advocate' | 'legal_specialist' | 'real_estate_agent' | 'admin' | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  licenseNumber?: string; // شماره پروانه وکالت یا نظام صنفی
  organization?: string;
  avatarUrl?: string;
}

export type CaseCategory = 'legal' | 'real_estate';

export type CaseStatus = 'open' | 'under_review' | 'court_pending' | 'closed' | 'appealed';

export type CasePriority = 'high' | 'medium' | 'low';

export interface LegalDetails {
  disputeType: string; // خلع ید، الزام به تنظیم سند رسمی، فسخ مبایعه‌نامه، تخلیه، ...
  courtBranch: string; // شعبه ۱۲ دادگاه عمومی حقوقی تهران
  plaintiff: string; // خواهان / شاکی
  defendant: string; // خوانده / مشتکی عنه
  judgeName?: string;
  claimAmount?: number; // ارزش خواسته به ریال
  filingDate?: string; // تاریخ ثبت دادخواست
  nextHearingDate?: string; // تاریخ جلسه بعدی دادگاه
}

export interface RealEstateDetails {
  propertyType: 'apartment' | 'land' | 'villa' | 'commercial' | 'industrial';
  deedType: 'single_page' | 'booklet' | 'joint_ownership' | 'power_of_attorney' | 'peace_deed' | 'bench_mark'; // تک‌برگ، منگوله‌دار، مشاع، وکالتی، صلح‌نامه، بنچاق
  registrationSection: string; // بخش ثبتی (مثلاً بخش ۱۰ ثبت تهران)
  parcelMainNumber: string; // پلاک ثبتی اصلی
  parcelSubNumber: string; // پلاک ثبتی فرعی
  areaSqMeters: number; // متراژ
  address: string; // آدرس ملک
  postalCode?: string;
  zoning: 'residential' | 'commercial' | 'administrative' | 'agricultural' | 'mixed' | 'industrial';
  estimatedValue?: number; // ارزش برآوردی ملک
  riskScore: number; // 0 - 100 (ریسک حقوقی ثبتی)
  successProbability: number; // 0 - 100% (شاتس پیروزی در دعوا)
}

export interface CaseItem {
  id: string;
  title: string;
  caseNumber: string; // شماره بایگانی یا پرونده
  category: CaseCategory;
  status: CaseStatus;
  priority: CasePriority;
  description: string;
  tags: string[];
  assignedAdvocate: string;
  createdAt: string;
  updatedAt: string;
  legalDetails?: LegalDetails;
  realEstateDetails?: RealEstateDetails;
}

export interface CaseNote {
  id: string;
  caseId: string;
  title: string;
  content: string;
  authorName: string;
  category: 'court_session' | 'internal_note' | 'client_meeting' | 'verdict' | 'deadline';
  date: string;
}

export interface DocumentItem {
  id: string;
  caseId: string;
  title: string;
  category: 'deed' | 'contract' | 'petition' | 'expert_opinion' | 'verdict' | 'id_card' | 'official_notice' | 'other';
  fileType: string;
  fileSize: string; // e.g. "2.4 MB"
  fileUrl?: string;
  uploadedAt: string;
  uploadedBy: string;
  ocrSummary?: string;
  aiKeyFindings?: string[];
}

export interface ChatMessage {
  id: string;
  caseId?: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  referencedDocTitle?: string;
  suggestedActions?: string[];
}

export interface CaseReport {
  id: string;
  caseId: string;
  generatedAt: string;
  summary: string;
  riskAnalysis: {
    score: number;
    level: 'کم' | 'متوسط' | 'بالا' | 'بحرانی';
    keyRisks: string[];
  };
  winningProbability: number;
  recommendedActions: string[];
  relevantLaws: string[];
  verdictForecast: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  target: string;
  ipAddress: string;
  timestamp: string;
  details?: string;
}

export type Language = 'fa' | 'en' | 'ar';
