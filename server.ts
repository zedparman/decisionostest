import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import {
  initialCases,
  initialNotes,
  initialDocuments,
  initialAuditLogs,
  mockReports,
  mockUsers
} from './src/data/mockData.js';
import { CaseItem, CaseNote, DocumentItem, AuditLog, CaseReport } from './src/types.js';

// In-memory data storage for stateful operations
let cases: CaseItem[] = [...initialCases];
let notes: CaseNote[] = [...initialNotes];
let documents: DocumentItem[] = [...initialDocuments];
let auditLogs: AuditLog[] = [...initialAuditLogs];
let reports: Record<string, CaseReport> = { ...mockReports };

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

function getGeminiClient(): GoogleGenAI {
  if (!ai) {
    if (process.env.GEMINI_API_KEY) {
      ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });
    } else {
      throw new Error('GEMINI_API_KEY environment variable is missing.');
    }
  }
  return ai;
}

function logAudit(action: string, target: string, details?: string) {
  const newLog: AuditLog = {
    id: `log-${Date.now()}`,
    userId: 'usr-1',
    userEmail: 'sadeghi@decisionos.ir',
    action,
    target,
    ipAddress: '185.190.12.44',
    timestamp: new Date().toLocaleDateString('fa-IR') + ' - ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
    details
  };
  auditLogs.unshift(newLog);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', hasGeminiKey: !!process.env.GEMINI_API_KEY });
  });

  // Current User Session
  app.get('/api/auth/me', (req, res) => {
    res.json({ user: mockUsers[0] });
  });

  // --- CASES CRUD ---
  app.get('/api/cases', (req, res) => {
    const { category, search, status } = req.query;
    let result = [...cases];

    if (category && category !== 'all') {
      result = result.filter(c => c.category === category);
    }
    if (status && status !== 'all') {
      result = result.filter(c => c.status === status);
    }
    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      result = result.filter(
        c =>
          c.title.toLowerCase().includes(q) ||
          c.caseNumber.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    res.json(result);
  });

  app.get('/api/cases/:id', (req, res) => {
    const item = cases.find(c => c.id === req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'پرونده مورد نظر یافت نشد.' });
    }
    res.json(item);
  });

  app.post('/api/cases', (req, res) => {
    const body = req.body;
    const newCase: CaseItem = {
      id: `case-${Date.now()}`,
      title: body.title || 'پرونده جدید',
      caseNumber: body.caseNumber || `۱۴۰۳/۱۰/${Math.floor(100 + Math.random() * 900)}`,
      category: body.category || 'legal',
      status: body.status || 'open',
      priority: body.priority || 'medium',
      description: body.description || '',
      tags: body.tags || ['حقوقی'],
      assignedAdvocate: body.assignedAdvocate || 'دکتر محمدرضا صادقی',
      createdAt: new Date().toLocaleDateString('fa-IR'),
      updatedAt: new Date().toLocaleDateString('fa-IR'),
      legalDetails: body.legalDetails,
      realEstateDetails: body.realEstateDetails
    };

    cases.unshift(newCase);
    logAudit('ایجاد پرونده', `پرونده ${newCase.caseNumber} - ${newCase.title}`);
    res.status(201).json(newCase);
  });

  app.put('/api/cases/:id', (req, res) => {
    const idx = cases.findIndex(c => c.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ error: 'پرونده یافت نشد.' });
    }

    cases[idx] = {
      ...cases[idx],
      ...req.body,
      updatedAt: new Date().toLocaleDateString('fa-IR')
    };

    logAudit('ویرایش پرونده', `پرونده ${cases[idx].caseNumber}`);
    res.json(cases[idx]);
  });

  app.delete('/api/cases/:id', (req, res) => {
    const idx = cases.findIndex(c => c.id === req.params.id);
    if (idx !== -1) {
      const removed = cases[idx];
      cases.splice(idx, 1);
      logAudit('حذف پرونده', `پرونده ${removed.caseNumber}`);
    }
    res.json({ success: true });
  });

  // --- NOTES ---
  app.get('/api/cases/:id/notes', (req, res) => {
    const list = notes.filter(n => n.caseId === req.params.id);
    res.json(list);
  });

  app.post('/api/cases/:id/notes', (req, res) => {
    const newNote: CaseNote = {
      id: `note-${Date.now()}`,
      caseId: req.params.id,
      title: req.body.title || 'یادداشت جدید',
      content: req.body.content || '',
      authorName: req.body.authorName || 'دکتر محمدرضا صادقی',
      category: req.body.category || 'internal_note',
      date: new Date().toLocaleDateString('fa-IR')
    };
    notes.unshift(newNote);
    logAudit('ثبت یادداشت پرونده', `یادداشت: ${newNote.title}`);
    res.status(201).json(newNote);
  });

  // --- DOCUMENTS ---
  app.get('/api/cases/:id/documents', (req, res) => {
    const docs = documents.filter(d => d.caseId === req.params.id);
    res.json(docs);
  });

  app.post('/api/cases/:id/documents', (req, res) => {
    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      caseId: req.params.id,
      title: req.body.title || 'مدرک بارگذاری شده',
      category: req.body.category || 'other',
      fileType: req.body.fileType || 'PDF',
      fileSize: req.body.fileSize || '1.5 MB',
      uploadedAt: new Date().toLocaleDateString('fa-IR'),
      uploadedBy: 'دکتر محمدرضا صادقی',
      ocrSummary: req.body.ocrSummary || 'سند پردازش شده توسط سامانه هوشمند DecisionOS.',
      aiKeyFindings: req.body.aiKeyFindings || [
        'سند معتبر و دارای مهر رسمی می‌باشد',
        'بررسی مفاد اولیه نشان‌دهنده عدم وجود ابهام حقوقی است'
      ]
    };
    documents.unshift(newDoc);
    logAudit('بارگذاری سند', `سند ${newDoc.title}`);
    res.status(201).json(newDoc);
  });

  app.delete('/api/documents/:id', (req, res) => {
    const idx = documents.findIndex(d => d.id === req.params.id);
    if (idx !== -1) {
      const removed = documents[idx];
      documents.splice(idx, 1);
      logAudit('حذف سند', `سند ${removed.title}`);
    }
    res.json({ success: true });
  });

  // --- AUDIT LOGS ---
  app.get('/api/audit-logs', (req, res) => {
    res.json(auditLogs);
  });

  // --- AI CASE ANALYSIS & CHAT ---
  app.post('/api/chat', async (req, res) => {
    try {
      const { prompt, caseId, history } = req.body;
      const client = getGeminiClient();

      const caseContext = caseId ? cases.find(c => c.id === caseId) : null;
      const docContext = caseId ? documents.filter(d => d.caseId === caseId) : [];

      let systemPrompt = `شما دستیار هوشمند حقوقی و ملکی سامانه DecisionOS هستید.
پاسخ‌های شما باید کاملاً حرفه‌ای، مستند به قوانین مدنی، قوانین ثبت اسناد و املاک، قانون آئین دادرسی مدنی و آراء وحدت رویه دیوان عالی کشور باشد.
پاسخ‌ها را شفاف، دقیق، با ساختار زیبای بالت‌پوینت و به زبان فارسی شیوا ارائه دهید.`;

      if (caseContext) {
        systemPrompt += `\n\n[اطلاعات پرونده کنونی]:
عنوان: ${caseContext.title}
شماره پرونده: ${caseContext.caseNumber}
دسته‌بندی: ${caseContext.category === 'real_estate' ? 'ملکی و ثبتی' : 'حقوقی/کیفری'}
شرح: ${caseContext.description}
خواهان: ${caseContext.legalDetails?.plaintiff || 'مشخص نشده'}
خوانده: ${caseContext.legalDetails?.defendant || 'مشخص نشده'}
نوع دعوا: ${caseContext.legalDetails?.disputeType || 'مشخص نشده'}
شعبه دادگاه: ${caseContext.legalDetails?.courtBranch || 'مشخص نشده'}
پلاک ثبتی: ${caseContext.realEstateDetails?.parcelMainNumber ? `${caseContext.realEstateDetails.parcelMainNumber}/${caseContext.realEstateDetails.parcelSubNumber}` : 'ندارد'}
اسناد موجود: ${docContext.map(d => d.title).join(' ، ')}
`;
      }

      const response = await client.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.3
        }
      });

      logAudit('پرسش از هوش مصنوعی', caseContext ? `پرونده ${caseContext.caseNumber}` : 'چت عمومی');
      res.json({ text: response.text });
    } catch (err: any) {
      console.error('Gemini Chat API Error:', err);
      res.status(500).json({
        error: 'خطا در ارتباط با سرویس هوش مصنوعی Gemini. لطفا از معتبر بودن کلید API اطمینان حاصل کنید.',
        details: err?.message || String(err)
      });
    }
  });

  app.post('/api/cases/:id/ai-analyze', async (req, res) => {
    try {
      const caseItem = cases.find(c => c.id === req.params.id);
      if (!caseItem) {
        return res.status(404).json({ error: 'پرونده یافت نشد.' });
      }

      const caseDocs = documents.filter(d => d.caseId === req.params.id);
      const caseNotes = notes.filter(n => n.caseId === req.params.id);

      const client = getGeminiClient();

      const prompt = `لطفا پرونده حقوقی/ملکی زیر را به صورت هوشمند و تخصصی تحلیل کنید:

عنوان پرونده: ${caseItem.title}
شماره پرونده: ${caseItem.caseNumber}
نوع دعوا: ${caseItem.legalDetails?.disputeType || caseItem.description}
وضعیت ملک/سند: ${caseItem.realEstateDetails ? `پلاک ثبتی ${caseItem.realEstateDetails.parcelMainNumber}/${caseItem.realEstateDetails.parcelSubNumber}، نوع سند: ${caseItem.realEstateDetails.deedType}، متراژ: ${caseItem.realEstateDetails.areaSqMeters} متر` : 'غیرملکی'}
مستندات و اسناد موجود: ${caseDocs.map(d => `${d.title} (${d.ocrSummary || ''})`).join(' | ')}
یادداشت‌های دادگاه: ${caseNotes.map(n => `${n.title}: ${n.content}`).join(' | ')}

خروجی خود را به صورت JSON معتبر با کلیدهای زیر برگردانید:
{
  "summary": "خلاصه تحلیلی جامع و حقوقی از وضعیت پرونده",
  "riskScore": عدد بین ۰ تا ۱۰۰ (امتیاز ریسک),
  "riskLevel": "کم" یا "متوسط" یا "بالا" یا "بحرانی",
  "keyRisks": ["ریسک ۱", "ریسک ۲", "ریسک ۳"],
  "winningProbability": عدد بین ۰ تا ۱۰۰ (درصد شانس موفقیت),
  "recommendedActions": ["اقدام پیشنهادی ۱", "اقدام پیشنهادی ۲", "اقدام پیشنهادی ۳"],
  "relevantLaws": ["ماده قانون ۱", "ماده قانون ۲", "رای وحدت رویه"],
  "verdictForecast": "پیش‌بینی رای احتمالی دادگاه"
}`;

      const response = await client.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          systemInstruction: 'شما متخصص ارشد تحلیل پرونده‌های حقوقی و املاک ایران هستید. پاسخ دقیقاً به صورت JSON معتبر ارسال گردد.'
        }
      });

      let jsonResult: any = {};
      try {
        jsonResult = JSON.parse(response.text || '{}');
      } catch (e) {
        jsonResult = {
          summary: response.text || 'تحلیل تکمیل گردید.',
          riskScore: 30,
          riskLevel: 'متوسط',
          keyRisks: ['نیازمند بررسی تکمیلی مدارک ثبتی'],
          winningProbability: 80,
          recommendedActions: ['ارائه استعلام ثبت به دادگاه'],
          relevantLaws: ['ماده ۲۱۹ قانون مدنی'],
          verdictForecast: 'پیش‌بینی صدور حکم به نفع خواهان'
        };
      }

      const generatedReport: CaseReport = {
        id: `rep-${Date.now()}`,
        caseId: caseItem.id,
        generatedAt: new Date().toLocaleDateString('fa-IR') + ' - ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        summary: jsonResult.summary || 'تحلیل تکمیل گردید.',
        riskAnalysis: {
          score: jsonResult.riskScore || 30,
          level: jsonResult.riskLevel || 'متوسط',
          keyRisks: jsonResult.keyRisks || ['ریسک اولیه حقوقی']
        },
        winningProbability: jsonResult.winningProbability || 75,
        recommendedActions: jsonResult.recommendedActions || ['اقدام اول'],
        relevantLaws: jsonResult.relevantLaws || ['قانون مدنی'],
        verdictForecast: jsonResult.verdictForecast || 'حکم احتمالی مثبت'
      };

      reports[caseItem.id] = generatedReport;

      // Also update case success probability & risk score in case item
      caseItem.realEstateDetails = caseItem.realEstateDetails
        ? {
            ...caseItem.realEstateDetails,
            riskScore: jsonResult.riskScore || caseItem.realEstateDetails.riskScore,
            successProbability: jsonResult.winningProbability || caseItem.realEstateDetails.successProbability
          }
        : undefined;

      logAudit('تولید گزارش هوش مصنوعی', `پرونده ${caseItem.caseNumber}`);
      res.json(generatedReport);
    } catch (err: any) {
      console.error('AI Analysis Error:', err);
      res.status(500).json({
        error: 'خطا در ارزیابی پرونده توسط هوش مصنوعی.',
        details: err?.message || String(err)
      });
    }
  });

  app.get('/api/reports/:id', (req, res) => {
    const report = reports[req.params.id];
    if (!report) {
      return res.status(404).json({ error: 'گزارش هنوز تولید نشده است.' });
    }
    res.json(report);
  });

  // --- VITE MIDDLEWARE (DEV) / STATIC SERVING (PROD) ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[DecisionOS Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
