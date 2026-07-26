import { CaseItem, CaseNote, DocumentItem, AuditLog, User, CaseReport, ChatMessage } from '../types';

export const mockUsers: User[] = [
  {
    id: 'usr-1',
    name: 'دکتر محمدرضا صادقی',
    email: 'sadeghi@decisionos.ir',
    role: 'advocate',
    phone: '09121112233',
    licenseNumber: '۱۲۳۴۵ / ک',
    organization: 'کانون وکلای دادگستری مرکز',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-2',
    name: 'مهندس مریم تهرانی',
    email: 'tehrani@decisionos.ir',
    role: 'legal_specialist',
    phone: '09129876543',
    licenseNumber: '۹۸۷۶ / ث',
    organization: 'دپارتمان تحلیل املاک DecisionOS',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  }
];

export const initialCases: CaseItem[] = [
  {
    id: 'case-101',
    title: 'دعوای الزام به تنظیم سند رسمی و خلع ید - برج تجاری آریا',
    caseNumber: '۱۴۰۲/۹۹/۱۲۳۴',
    category: 'real_estate',
    status: 'court_pending',
    priority: 'high',
    description: 'اختلاف ملک تجاری مجتمع آریا پلاک ثبتی ۴۴/۱۲۳ بخش ۱۰ تهران. عدم ایفاء تعهدات فروشنده در تحویل سند تک‌برگ و تصرف عدوانی بخش پارکینگ اختصاصی.',
    tags: ['الزام به تنظیم سند', 'خلع ید', 'ملک تجاری', 'ثبت اسناد'],
    assignedAdvocate: 'دکتر محمدرضا صادقی',
    createdAt: '۱۴۰۲/۰۶/۱۵',
    updatedAt: '۱۴۰۳/۰۴/۲۹',
    legalDetails: {
      disputeType: 'الزام به تنظیم سند رسمی، تسلیم مبیع و مطالبه خسارت تاخیر تادیه',
      courtBranch: 'شعبه ۱۵ دادگاه عمومی حقوقی مجتمع قضایی شهید بهشتی تهران',
      plaintiff: 'شرکت سرمایه‌گذاری پارس امید (موکل)',
      defendant: 'شرکت نوسازی سازه آرا (فروشنده)',
      judgeName: 'جناب آقای دکتر محمدی',
      claimAmount: 150000000000,
      filingDate: '۱۴۰۲/۰۶/۱۵',
      nextHearingDate: '۱۴۰۳/۰۵/۲۰ - ساعت ۱۰:۳۰'
    },
    realEstateDetails: {
      propertyType: 'commercial',
      deedType: 'single_page',
      registrationSection: 'بخش ۱۰ ثبت تهران - حوزه بهشتی',
      parcelMainNumber: '۴۴',
      parcelSubNumber: '۱۲۳',
      areaSqMeters: 450,
      address: 'تهران، خیابان ولیعصر، نرسیده به میدان ونک، برج تجاری آریا، طبقه ۳',
      postalCode: '۱۹۶۸۸۱۴۵۱۲',
      zoning: 'commercial',
      estimatedValue: 350000000000,
      riskScore: 24,
      successProbability: 88
    }
  },
  {
    id: 'case-102',
    title: 'فسخ قرارداد مشارکت در ساخت و مطالبه وجه التزام - پروژه سعادت‌آباد',
    caseNumber: '۱۴۰۳/۱۰۱/۸۸۷',
    category: 'legal',
    status: 'under_review',
    priority: 'high',
    description: 'تاخیر ۲ ساله سازنده در اجرای عملیات گودبرداری و احداث بنا بر روی زمین ۱۰۰۰ متری سعادت‌آباد. درخواست فسخ و دریافت خسارت روزانه ۵۰ میلیون تومان.',
    tags: ['مشارکت در ساخت', 'فسخ قرارداد', 'وجه التزام', 'سعادت‌آباد'],
    assignedAdvocate: 'دکتر محمدرضا صادقی',
    createdAt: '۱۴۰۲/۱۱/۰۴',
    updatedAt: '۱۴۰۳/۰۵/۰۱',
    legalDetails: {
      disputeType: 'تایید فسخ قرارداد مشارکت و مطالبه خسارت عدم انجام تعهد',
      courtBranch: 'شعبه ۷ دادگاه عمومی حقوقی مجتمع قضایی صدر تهران',
      plaintiff: 'آقای حاج علی‌اکبر رضایی (مالک زمین)',
      defendant: 'مهندس کامران خسروی (سازنده)',
      judgeName: 'قاضی حسینی',
      claimAmount: 36500000000,
      filingDate: '۱۴۰۲/۱۱/۰۴',
      nextHearingDate: '۱۴۰۳/۰۶/۱۰ - ساعت ۰۹:۰۰'
    },
    realEstateDetails: {
      propertyType: 'land',
      deedType: 'single_page',
      registrationSection: 'بخش ۱۱ ثبت تهران',
      parcelMainNumber: '۸۸',
      parcelSubNumber: '۴۵۶',
      areaSqMeters: 1000,
      address: 'تهران، سعادت‌آباد، صرافهای شمالی، پلاک ۱۲',
      postalCode: '۱۹۹۸۸۲۳۴۱۱',
      zoning: 'residential',
      estimatedValue: 800000000000,
      riskScore: 42,
      successProbability: 75
    }
  },
  {
    id: 'case-103',
    title: 'ابطال سند رسمی انتقال و ادعای جعل - زمین ۵ هکتاری شهریار',
    caseNumber: '۱۴۰۱/۴۰۲/۵۵۴',
    category: 'real_estate',
    status: 'appealed',
    priority: 'medium',
    description: 'ادعای جعل در وکالت‌نامه رسمی فروش زمین کشاورزی ۵ هکتاری شهریار. اعتراض به رای دادگاه بدوی در شعبه ۴۴ دادگاه تجدیدنظر استان تهران.',
    tags: ['ابطال سند', 'ادعای جعل', 'اراضی کشاورزی', 'تجدیدنظر'],
    assignedAdvocate: 'مهندس مریم تهرانی',
    createdAt: '۱۴۰۱/۰۸/۱۲',
    updatedAt: '۱۴۰۳/۰۴/۱۵',
    legalDetails: {
      disputeType: 'ابطال سند رسمی انتقال، اثبات مالکیت و ادعای جعل وکالت‌نامه',
      courtBranch: 'شعبه ۴۴ دادگاه تجدیدنظر استان تهران',
      plaintiff: 'وراث مرحوم حاج حسین کاظمی',
      defendant: 'آقای حمیدرضا شریفی',
      judgeName: 'جناب آقای احمدی (رئیس شعبه تجدیدنظر)',
      claimAmount: 120000000000,
      filingDate: '۱۴۰۱/۰۸/۱۲',
      nextHearingDate: '۱۴۰۳/۰۵/۲۸ - ساعت ۱۱:۰۰'
    },
    realEstateDetails: {
      propertyType: 'land',
      deedType: 'booklet',
      registrationSection: 'حوزه ثبتی شهریار - پلاک اصلی ۱۲',
      parcelMainNumber: '۱۲',
      parcelSubNumber: '۹۰',
      areaSqMeters: 50000,
      address: 'استان تهران، شهریار، جاده ملارد، ابتدای خیابان باغستان',
      postalCode: '۳۳۵۱۱۲۳۴۵۶',
      zoning: 'agricultural',
      estimatedValue: 250000000000,
      riskScore: 68,
      successProbability: 58
    }
  },
  {
    id: 'case-104',
    title: 'تخلیه عین مستاجره و مطالبه اجور معوقه - سوله صنعتی جاده مخصوص',
    caseNumber: '۱۴۰۳/۸۸/۳۰۲',
    category: 'legal',
    status: 'open',
    priority: 'low',
    description: 'انقضای مدت اجاره سوله ۲۰۰۰ متری صنعتی و عدم تخلیه توسط مستاجر همراه با ۸ ماه اجاره‌بهای معوقه.',
    tags: ['تخلیه ملک', 'اجور معوقه', 'سوله صنعتی', 'سرقفلی'],
    assignedAdvocate: 'دکتر محمدرضا صادقی',
    createdAt: '۱۴۰۳/۰۲/۱۰',
    updatedAt: '۱۴۰۳/۰۵/۰۲',
    legalDetails: {
      disputeType: 'صدور دستور تخلیه و مطالبه اجور معوقه و خسارت دادرسی',
      courtBranch: 'شورای حل اختلاف منطقه ۲۱ تهران - شعبه ۳',
      plaintiff: 'شرکت تولیدی صنعتی البرز',
      defendant: 'کارگاه قطعه‌سازی آرش',
      claimAmount: 1800000000,
      filingDate: '۱۴۰۳/۰۲/۱۰',
      nextHearingDate: '۱۴۰۳/۰۵/۱۸ - ساعت ۰۹:۳۰'
    },
    realEstateDetails: {
      propertyType: 'industrial',
      deedType: 'single_page',
      registrationSection: 'حوزه ثبتی کرج - جاده مخصوص',
      parcelMainNumber: '۱۰۵',
      parcelSubNumber: '۴',
      areaSqMeters: 2000,
      address: 'کیلومتر ۱۶ جاده مخصوص کرج، خیابان ۵ صنعتی، پلاک ۴۴',
      postalCode: '۱۳۸۹۹۰۱۲۳۴',
      zoning: 'industrial',
      estimatedValue: 120000000000,
      riskScore: 12,
      successProbability: 95
    }
  }
];

export const initialNotes: CaseNote[] = [
  {
    id: 'note-1',
    caseId: 'case-101',
    title: 'برگزاری جلسه اول دادرسی و تقدیم لایحه دفاعیه',
    content: 'در جلسه امروز دادگاه، اصل مبایعه‌نامه و رسیدهای واریزی وجه ثمن معامله به دادگاه ارائه گردید. نماینده خوانده درخواست مهلت برای بررسی گواهی عدم حضور دفترخانه کرد.',
    authorName: 'دکتر محمدرضا صادقی',
    category: 'court_session',
    date: '۱۴۰۳/۰۳/۱۴'
  },
  {
    id: 'note-2',
    caseId: 'case-101',
    title: 'بررسی آخرین وضعیت ثبتی از طریق استعلام ثبت',
    content: 'استعلام ثبتی نشان می‌دهد ملک فاقد بازداشت اجرایی یا رهن بانکی بوده و آماده صدور سند تک‌برگ پس از تفکیک صورتمجلس مجلس تفکیکی است.',
    authorName: 'مهندس مریم تهرانی',
    category: 'internal_note',
    date: '۱۴۰۳/۰۴/۰۲'
  },
  {
    id: 'note-3',
    caseId: 'case-102',
    title: 'جلسه هماهنگی با موکل و کارشناس رسمی دادگستری',
    content: 'عکس‌های هوایی و تامین دلیل تامین شده توسط کارشناس رسمی، توقف کامل پروژه را تایید می‌کند.',
    authorName: 'دکتر محمدرضا صادقی',
    category: 'client_meeting',
    date: '۱۴۰۳/۰۴/۲۰'
  }
];

export const initialDocuments: DocumentItem[] = [
  {
    id: 'doc-101',
    caseId: 'case-101',
    title: 'تصویر سند مالکیت تک‌برگ و بنچاق اصلی',
    category: 'deed',
    fileType: 'PDF',
    fileSize: '4.2 MB',
    uploadedAt: '۱۴۰۲/۰۶/۱۶',
    uploadedBy: 'دکتر محمدرضا صادقی',
    ocrSummary: 'سند تک‌برگ پلاک ثبتی ۴۴/۱۲۳ اصلی، حوزه ثبتی تهران بخش ۱۰. مالک اولیه: شرکت سازه آرا.',
    aiKeyFindings: [
      'سند آزاد و فاقد رهن بانکی است',
      'تطابق پلاک ثبتی با کروکی شهرداری تایید شد',
      'صورتمجلس تفکیکی نیازمند اخذ از ثبت است'
    ]
  },
  {
    id: 'doc-102',
    caseId: 'case-101',
    title: 'مبایعه‌نامه رسمی و گواهی عدم حضور دفترخانه',
    category: 'contract',
    fileType: 'PDF',
    fileSize: '2.8 MB',
    uploadedAt: '۱۴۰۲/۰۶/۱۸',
    uploadedBy: 'دکتر محمدرضا صادقی',
    ocrSummary: 'مبایعه‌نامه شماره ۹۹۸۲۱ مورخ ۱۴۰۰/۱۰/۰۵ به مبلغ ۳۵ میلیارد تومان. گواهی عدم حضور دفترخانه ۱۲۴ تهران.',
    aiKeyFindings: [
      'حق فسخ خریدار در صورت عدم تنظیم سند محرز است',
      'وجه التزام روزانه ۵۰ میلیون تومان تصریح شده است',
      'تمام اقساط ثمن توسط خریدار تسویه شده است'
    ]
  },
  {
    id: 'doc-103',
    caseId: 'case-101',
    title: 'دادخواست اولیه و لایحه تکمیلی وکیل',
    category: 'petition',
    fileType: 'DOCX',
    fileSize: '1.1 MB',
    uploadedAt: '۱۴۰۲/۰۶/۲۰',
    uploadedBy: 'دکتر محمدرضا صادقی',
    ocrSummary: 'دادخواست الزام به تنظیم سند رسمی، تسلیم مبیع و مطالبه خسارت عدم انجام تعهد.',
    aiKeyFindings: [
      'خواسته به میزان ارزیابی منطبق بر تعرفه قانونی است',
      'ضمائم دادخواست کامل و مستند به استعلام دفترخانه است'
    ]
  },
  {
    id: 'doc-201',
    caseId: 'case-102',
    title: 'قرارداد مشارکت در ساخت پروژه سعادت‌آباد',
    category: 'contract',
    fileType: 'PDF',
    fileSize: '5.6 MB',
    uploadedAt: '۱۴۰۲/۱۱/۰۵',
    uploadedBy: 'مهندس مریم تهرانی',
    ocrSummary: 'قرارداد مشارکت مورخ ۱۳۹۹/۰۵/۱۰ بین مالک (رضایی) و سازنده (خسروی) با قدرالسهم ۵۵ به ۴۵.',
    aiKeyFindings: [
      'مهلت گودبرداری ۶ ماه تعیین شده بود',
      'بند داوری در قرارداد پیش‌بینی نشده و مرجع صالح دادگاه حقوقی است'
    ]
  }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    userId: 'usr-1',
    userEmail: 'sadeghi@decisionos.ir',
    action: 'ایجاد پرونده حقوقی',
    target: 'پرونده ۱۴۰۲/۹۹/۱۲۳۴',
    ipAddress: '185.190.12.44',
    timestamp: '۱۴۰۲/۰۶/۱۵ - ۱۴:۳۰'
  },
  {
    id: 'log-2',
    userId: 'usr-1',
    userEmail: 'sadeghi@decisionos.ir',
    action: 'بارگذاری سند ثبتی',
    target: 'سند تک‌برگ برج آریا',
    ipAddress: '185.190.12.44',
    timestamp: '۱۴۰۲/۰۶/۱۶ - ۰۹:۱۵'
  },
  {
    id: 'log-3',
    userId: 'usr-2',
    userEmail: 'tehrani@decisionos.ir',
    action: 'اجرای تحلیل هوش مصنوعی',
    target: 'تحلیل ریسک پرونده سعادت‌آباد',
    ipAddress: '5.202.14.89',
    timestamp: '۱۴۰۳/۰۵/۰۱ - ۱۱:۰۵'
  }
];

export const mockReports: Record<string, CaseReport> = {
  'case-101': {
    id: 'rep-101',
    caseId: 'case-101',
    generatedAt: '۱۴۰۳/۰۵/۰۲ - ۱۰:۰۰',
    summary: 'پرونده الزام به تنظیم سند رسمی برج تجاری آریا بر اساس مستندات ارائه شده (مبایعه‌نامه معتبر، گواهی عدم حضور دفترخانه و تسویه کامل ثمن) از منظر حقوقی در وضعیت بسیار مطلوب قرار دارد.',
    riskAnalysis: {
      score: 24,
      level: 'کم',
      keyRisks: [
        'احتمال ادعای معارض از سوی شخص ثالث بر روی کد تفکیکی پارکینگ',
        'لزوم اخذ پایان‌کار و صورتمجلس تفکیکی از شهرداری منطقه ۳ قبل از اجرای حکم'
      ]
    },
    winningProbability: 88,
    recommendedActions: [
      'درخواست دستور موقت مبنی بر منع فروش و نقل و انتقال پلاک ثبتی ۴۴/۱۲۳',
      'استعلام از اداره ثبت برای تایید صدور صورتمجلس تفکیکی',
      'مطالبه وجه التزام روزانه تا تاریخ اجرای حکم در لایحه بعدی'
    ],
    relevantLaws: [
      'ماده ۲۱۹ و ۲۲۰ قانون مدنی (لزوم اتباع از عقود و تعهدات)',
      'ماده ۴۶ و ۴۷ قانون ثبت اسناد و املاک (الزامی بودن ثبت معاملات اموال غیرمنقول)',
      'ماده ۵۱۵ قانون آئین دادرسی دادگاه‌های عمومی و انقلاب در امور مدنی (جبران خسارت دادرسی)'
    ],
    verdictForecast: 'صدور حکم به الزام خوانده به حضور در دفترخانه و تنظیم سند رسمی انتقال به نام خواهان همراه با محکومیت به پرداخت خسارت تاخیر تادیه و هزینه‌های دادرسی.'
  }
};
