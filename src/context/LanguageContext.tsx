import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  dir: 'rtl' | 'ltr';
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  fa: {
    appName: 'سامانه تصمیم‌یار حقوقی و ملکی (DecisionOS)',
    shortName: 'DecisionOS',
    tagline: 'مدیریت و تحلیل هوشمند پرونده‌های حقوقی و ملکی با هوش مصنوعی',
    dashboard: 'داشبورد اصلی',
    cases: 'پرونده‌های حقوقی و ملکی',
    aiAssistant: 'گفتگوی هوشمند و تحلیل اسناد',
    documents: 'مدیریت اسناد و مدارک',
    auditLogs: 'لاگ‌های امنیتی و دسترسی',
    pricing: 'تعرفه خدمات',
    aboutUs: 'درباره ما',
    newCase: 'ایجاد پرونده جدید',
    searchPlaceholder: 'جستجو بر اساس عنوان، شماره پرونده، پلاک ثبتی یا برچسب...',
    filterAll: 'همه پرونده‌ها',
    filterLegal: 'پرونده‌های حقوقی',
    filterRealEstate: 'پرونده‌های ملکی و ثبتی',
    statusOpen: 'در جریان',
    statusUnderReview: 'در حال بررسی',
    statusCourtPending: 'در انتظار وقت دادگاه',
    statusClosed: 'مختومه',
    statusAppealed: 'تجدیدنظر خواهی',
    priorityHigh: 'فوری / بالا',
    priorityMedium: 'متوسط',
    priorityLow: 'عادی',
    successRate: 'احتمال پیروزی حقوقی',
    riskScore: 'شاخص ریسک حقوقی و ثبتی',
    login: 'ورود به سامانه',
    register: 'ثبت‌نام وکلای محترم',
    logout: 'خروج از حساب',
    totalCases: 'کل پرونده‌ها',
    activeRealEstate: 'پرونده‌های فعال ملکی',
    avgWinningChance: 'میانگین شانس پیروزی',
    docsUploaded: 'اسناد ثبت‌شده',
    aiAnalysis: 'تحلیل هوشمند هوش مصنوعی',
    generalSpecs: 'مشخصات عمومی و ثبتی',
    notesAndTimeline: 'یادداشت‌ها و روند دادرسى',
    printReport: 'دریافت و چاپ گزارش رسمی',
    reAnalyzeAI: 'بازتحلیل مجدد هوش مصنوعی',
    addNote: 'ثبت یادداشت جدید',
    uploadDoc: 'بارگذاری سند جدید',
    plaintiff: 'خواهان / شاکی',
    defendant: 'خوانده / مشتکی عنه',
    courtBranch: 'شعبه و مجتمع قضایی',
    disputeType: 'نوع دعوا',
    parcelNumber: 'پلاک ثبتی (اصلی/فرعی)',
    deedType: 'نوع سند مالکیت',
    areaSqMeters: 'متراژ (متر مربع)',
    address: 'آدرس ملک',
    zoning: 'کاربری ملک',
    estimatedValue: 'ارزش برآوردی (ریال)',
    welcomeUser: 'خوش آمدید،'
  },
  en: {
    appName: 'DecisionOS - Legal & Real Estate AI System',
    shortName: 'DecisionOS',
    tagline: 'Intelligent Management & AI Analysis for Legal and Real Estate Cases',
    dashboard: 'Main Dashboard',
    cases: 'Legal & Real Estate Cases',
    aiAssistant: 'AI Chat & Document Analysis',
    documents: 'Document Center',
    auditLogs: 'Audit & Security Logs',
    pricing: 'Pricing Plans',
    aboutUs: 'About Us',
    newCase: 'Create New Case',
    searchPlaceholder: 'Search by title, case number, parcel ID, or tags...',
    filterAll: 'All Cases',
    filterLegal: 'Legal Disputes',
    filterRealEstate: 'Real Estate Cases',
    statusOpen: 'In Progress',
    statusUnderReview: 'Under Review',
    statusCourtPending: 'Court Pending',
    statusClosed: 'Closed',
    statusAppealed: 'Under Appeal',
    priorityHigh: 'High / Urgent',
    priorityMedium: 'Medium',
    priorityLow: 'Normal',
    successRate: 'Legal Success Rate',
    riskScore: 'Legal & Registration Risk Score',
    login: 'Log In',
    register: 'Attorney Registration',
    logout: 'Log Out',
    totalCases: 'Total Cases',
    activeRealEstate: 'Active Real Estate',
    avgWinningChance: 'Avg Success Rate',
    docsUploaded: 'Uploaded Documents',
    aiAnalysis: 'AI Analysis',
    generalSpecs: 'General & Registration Specs',
    notesAndTimeline: 'Notes & Court Timeline',
    printReport: 'Print Executive Report',
    reAnalyzeAI: 'Re-Analyze with AI',
    addNote: 'Add New Note',
    uploadDoc: 'Upload Document',
    plaintiff: 'Plaintiff / Claimant',
    defendant: 'Defendant / Respondent',
    courtBranch: 'Court Branch & Division',
    disputeType: 'Dispute Type',
    parcelNumber: 'Parcel ID (Main/Sub)',
    deedType: 'Title Deed Type',
    areaSqMeters: 'Area (sq meters)',
    address: 'Property Address',
    zoning: 'Zoning Code',
    estimatedValue: 'Estimated Value (IRR)',
    welcomeUser: 'Welcome,'
  },
  ar: {
    appName: 'نظام DecisionOS الذكي للقضايا القانونية والعقارية',
    shortName: 'DecisionOS',
    tagline: 'الإدارة والتحليل الذكي للقضايا القانونية والعقارية بالذكاء الاصطناعي',
    dashboard: 'لوحة التحكم الرئيسية',
    cases: 'القضايا القانونية والعقارية',
    aiAssistant: 'المساعد الذكي وتحليل المستندات',
    documents: 'مركز المستندات',
    auditLogs: 'سجلات الأمان والوصول',
    pricing: 'أسعار الخدمات',
    aboutUs: 'من نحن',
    newCase: 'إنشاء قضية جديدة',
    searchPlaceholder: 'البحث بالعنوان، رقم القضية، رقم العقار...',
    filterAll: 'جميع القضايا',
    filterLegal: 'القضايا القانونية',
    filterRealEstate: 'القضايا العقارية',
    statusOpen: 'قيد النظر',
    statusUnderReview: 'قيد المراجعة',
    statusCourtPending: 'في انتظار المحكمة',
    statusClosed: 'مغلقة',
    statusAppealed: 'تحت الاستئناف',
    priorityHigh: 'عاجل جداً',
    priorityMedium: 'متوسط',
    priorityLow: 'عادي',
    successRate: 'نسبة النجاح القانوني',
    riskScore: 'مؤشر المخاطر العقارية',
    login: 'تسجيل الدخول',
    register: 'تسجيل المحامين',
    logout: 'تسجيل الخروج',
    totalCases: 'إجمالي القضايا',
    activeRealEstate: 'القضايا العقارية النشطة',
    avgWinningChance: 'متوسط نسبة النجاح',
    docsUploaded: 'المستندات المسجلة',
    aiAnalysis: 'التحليل الذكي',
    generalSpecs: 'المواصفات العامة والعقارية',
    notesAndTimeline: 'الملاحظات والجدول الزمني',
    printReport: 'طباعة التقرير الرسمي',
    reAnalyzeAI: 'إعادة التحليل بالذكاء الاصطناعي',
    addNote: 'إضافة ملاحظة جديدة',
    uploadDoc: 'تحميل مستند جديد',
    plaintiff: 'المدعي',
    defendant: 'المدعى عليه',
    courtBranch: 'دائرة المحكمة',
    disputeType: 'نوع النزاع',
    parcelNumber: 'رقم القطعة العقارية',
    deedType: 'نوع سند الملكية',
    areaSqMeters: 'المساحة (متر مربع)',
    address: 'عنوان العقار',
    zoning: 'نوع الاستخدام',
    estimatedValue: 'القيمة التقديرية (ريال)',
    welcomeUser: 'مرحباً بك،'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('fa');

  const dir = lang === 'en' ? 'ltr' : 'rtl';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations['fa']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, dir, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
