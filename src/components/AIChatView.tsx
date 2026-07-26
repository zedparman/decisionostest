import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Bot,
  Send,
  Sparkles,
  Scale,
  Gavel,
  Copy,
  Check,
  RefreshCw,
  FileText
} from 'lucide-react';
import { CaseItem, ChatMessage } from '../types';

interface AIChatViewProps {
  cases: CaseItem[];
  selectedCaseId?: string;
  onSelectCaseId: (id: string) => void;
}

export const AIChatView: React.FC<AIChatViewProps> = ({
  cases,
  selectedCaseId,
  onSelectCaseId
}) => {
  const { t } = useLanguage();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `سلام و احترام. من دستیار هوشمند حقوقی و ملکی سامانه DecisionOS هستم.
می‌توانم در زمینه تحلیل ادله پرونده، استخراج تعارضات اسناد ثبتی، پیش‌نویس دادخواست یا اظهارنامه و استعلام مواد قانونی به شما کمک کنم.

لطفاً پرونده مورد نظر را از منوی بالا انتخاب کنید یا سوال حقوقی خود را مطرح فرمایید.`,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const currentCase = cases.find((c) => c.id === selectedCaseId);

  const handleSend = async (textToSend?: string) => {
    const prompt = textToSend || inputPrompt;
    if (!prompt.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      caseId: selectedCaseId,
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputPrompt('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          caseId: selectedCaseId
        })
      });

      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        caseId: selectedCaseId,
        sender: 'ai',
        text: data.text || 'پاسخ دریافتی خالی می‌باشد.',
        timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: 'خطا در برقراری ارتباط با سرویس هوش مصنوعی Gemini. لطفا اتصال اینترنت و کلید API را بررسی فرمایید.',
        timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const presetPrompts = [
    'ارزیابی شانس پیروزی و تحلیل شواهد این پرونده',
    'استخراج تناقضات احتمالی در مبایعه‌نامه و سند تک‌برگ',
    'تنظیم پیش‌نویس اظهارنامه رسمی الزام به تنظیم سند',
    'استعلام مواد قانونی مرتبط با خلع ید و تصرف عدوانی'
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden font-vazirmatn text-right">
      {/* Top Bar / Case Selector */}
      <div className="bg-slate-900 text-white p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold flex items-center gap-1.5">
              <span>چت هوشمند حقوقی و تحلیل اسناد</span>
              <span className="text-[10px] bg-blue-900/60 text-blue-300 border border-blue-700/40 px-2 py-0.5 rounded">
                Gemini 3.6 Flash
              </span>
            </h2>
            <p className="text-[10px] text-slate-400">تحلیل متنی، استخراج بندهای قانونی و ارزیابی ادله</p>
          </div>
        </div>

        {/* Case Context Selector */}
        <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-md border border-slate-700">
          <Gavel className="w-4 h-4 text-blue-400 shrink-0 mr-1" />
          <select
            value={selectedCaseId || ''}
            onChange={(e) => onSelectCaseId(e.target.value)}
            className="bg-transparent text-white text-xs font-semibold focus:outline-hidden cursor-pointer"
          >
            <option value="" className="bg-slate-900 text-slate-200">
              -- چت عمومی (بدون بافت پرونده) --
            </option>
            {cases.map((c) => (
              <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                پرونده: {c.title} (#{c.caseNumber})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected Case Banner */}
      {currentCase && (
        <div className="bg-blue-50 p-2.5 border-b border-blue-200 flex items-center justify-between text-xs text-blue-900">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-blue-700 shrink-0" />
            <span>
              بافت فعال: <strong>{currentCase.title}</strong> (شماره: {currentCase.caseNumber})
            </span>
          </div>

          <span className="text-[10px] bg-white text-blue-900 border border-blue-300 px-2 py-0.5 rounded font-bold">
            درصد پیروزی: {currentCase.realEstateDetails?.successProbability || 85}٪
          </span>
        </div>
      )}

      {/* Preset Action Pills */}
      <div className="p-2.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-[10px] text-slate-500 font-bold shrink-0 uppercase">پیشنهادات:</span>
        {presetPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            disabled={isLoading}
            className="bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-900 border border-slate-200 hover:border-blue-300 text-[11px] font-semibold px-2.5 py-1 rounded whitespace-nowrap transition-colors shrink-0"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
        {messages.map((m) => {
          const isUser = m.sender === 'user';

          return (
            <div
              key={m.id}
              className={`flex gap-2.5 max-w-3xl ${isUser ? 'mr-auto flex-row-reverse' : 'ml-auto'}`}
            >
              {/* Avatar */}
              <div
                className={`w-7 h-7 rounded flex items-center justify-center font-bold text-xs shrink-0 ${
                  isUser
                    ? 'bg-slate-900 text-blue-400'
                    : 'bg-blue-600 text-white shadow-2xs'
                }`}
              >
                {isUser ? <Scale className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`rounded-lg p-3 text-xs leading-relaxed border space-y-1.5 relative group ${
                  isUser
                    ? 'bg-slate-900 text-white border-slate-800 rounded-tl-none'
                    : 'bg-white text-slate-900 border-slate-200 shadow-2xs rounded-tr-none'
                }`}
              >
                <div className="flex items-center justify-between gap-4 border-b pb-1 border-slate-200/20 text-[10px] opacity-70">
                  <span>{isUser ? 'وکیل محترم' : 'دستیار DecisionOS'}</span>
                  <span>{m.timestamp}</span>
                </div>

                <div className="whitespace-pre-line text-xs font-vazirmatn">{m.text}</div>

                {/* Copy Button */}
                <button
                  onClick={() => handleCopyText(m.id, m.text)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 left-2 p-1 text-slate-400 hover:text-slate-600 bg-slate-100 rounded"
                  title="کپی متن"
                >
                  {copiedId === m.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-blue-900 bg-blue-50 p-2.5 rounded border border-blue-200 max-w-md animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" />
            <span>هوش مصنوعی در حال تحلیل متون و تدوین پاسخ حقوقی است...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <textarea
          rows={1}
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="سوال حقوقی خود را بنویسید یا درخواست تنظیم اظهارنامه/لایحه کنید..."
          className="flex-1 bg-slate-100 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-md px-3 py-2 text-xs text-slate-900 focus:outline-hidden resize-none"
        />

        <button
          type="submit"
          disabled={!inputPrompt.trim() || isLoading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold p-2.5 rounded-md transition-colors shadow-2xs shrink-0"
        >
          <Send className="w-4 h-4 rotate-180" />
        </button>
      </form>
    </div>
  );
};
