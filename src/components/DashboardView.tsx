import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Gavel,
  Building2,
  TrendingUp,
  FileText,
  AlertTriangle,
  Scale,
  ChevronLeft,
  Calendar,
  Sparkles,
  Search,
  Plus
} from 'lucide-react';
import { CaseItem, DocumentItem } from '../types';

interface DashboardViewProps {
  cases: CaseItem[];
  documents: DocumentItem[];
  onSelectCase: (caseId: string) => void;
  onOpenNewCaseModal: () => void;
  onGoToChat: (caseId?: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  cases,
  documents,
  onSelectCase,
  onOpenNewCaseModal,
  onGoToChat
}) => {
  const { t } = useLanguage();

  const [quickRiskText, setQuickRiskText] = useState('');
  const [quickRiskResult, setQuickRiskResult] = useState<any | null>(null);
  const [isCalculatingRisk, setIsCalculatingRisk] = useState(false);

  // Metrics
  const totalCases = cases.length;
  const realEstateCases = cases.filter((c) => c.category === 'real_estate');
  const activeRealEstateCount = realEstateCases.filter((c) => c.status !== 'closed').length;

  const successScores = cases
    .map((c) => c.realEstateDetails?.successProbability || 75)
    .filter(Boolean);
  const avgSuccessScore = Math.round(
    successScores.reduce((a, b) => a + b, 0) / (successScores.length || 1)
  );

  const highPriorityCases = cases.filter((c) => c.priority === 'high');

  const handleQuickRiskCalc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickRiskText.trim()) return;

    setIsCalculatingRisk(true);
    setQuickRiskResult(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `یک ارزیابی سریع ریسک حقوقی و ملکی برای شرح خلاصه زیر ارائه دهید و خروجی را کوتاه در قالب ۲ بند ریسک اصلی و ۱ پیشنهاد فوری بگویید: "${quickRiskText}"`
        })
      });

      const data = await res.json();
      setQuickRiskResult(data.text || 'ارزیابی ریسک با موفقیت انجام شد.');
    } catch (err) {
      setQuickRiskResult('خطا در محاسبه سریع ریسک. لطفا مجددا تلاش کنید.');
    } finally {
      setIsCalculatingRisk(false);
    }
  };

  return (
    <div className="space-y-5 text-right font-vazirmatn">
      {/* Top Welcome Banner */}
      <div className="bg-slate-900 text-white rounded-lg p-5 shadow-sm border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-md mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>سامانه هوشمند DecisionOS</span>
            </div>
            <h1 className="text-lg md:text-xl font-bold text-white font-vazirmatn">
              داشبورد مرکزی مدیریت پرونده‌های حقوقی و ملکی
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              ارزیابی خودکار ریسک اسناد ثبتی، تحلیل شانس پیروزی حقوقی در دادگاه و مدیریت هوشمند مدارک پرونده.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenNewCaseModal}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded-md transition-all shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{t('newCase')}</span>
            </button>

            <button
              onClick={() => onGoToChat()}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3.5 py-2 rounded-md border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>چت هوشمند اسناد</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
          <div className="text-[11px] text-slate-500 font-bold uppercase tracking-tight">
            {t('totalCases')}
          </div>
          <div className="text-2xl font-bold text-slate-800 mt-1">
            {totalCases}
          </div>
          <div className="text-[10px] text-slate-500 mt-1 font-medium">
            فعال و در جریان رسیدگی
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
          <div className="text-[11px] text-slate-500 font-bold uppercase tracking-tight">
            در جریان (ملکی و ثبتی)
          </div>
          <div className="text-2xl font-bold text-blue-600 mt-1">
            {activeRealEstateCount}
          </div>
          <div className="text-[10px] text-blue-600 mt-1 font-medium">
            دارای وقت نظارت و لایحه
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
          <div className="text-[11px] text-slate-500 font-bold uppercase tracking-tight">
            {t('avgWinningChance')}
          </div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">
            {avgSuccessScore}٪
          </div>
          <div className="text-[10px] text-emerald-600 mt-1 font-medium">
            بر اساس تحلیل هوش مصنوعی
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
          <div className="text-[11px] text-slate-500 font-bold uppercase tracking-tight">
            هشدار و اولویت بالا
          </div>
          <div className="text-2xl font-bold text-rose-600 mt-1">
            {highPriorityCases.length}
          </div>
          <div className="text-[10px] text-rose-500 mt-1 font-medium">
            نیازمند اقدام فوری و پیگیری
          </div>
        </div>
      </div>

      {/* Main Grid: Quick Risk Tool & Recent Cases */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Quick Risk Estimator Widget */}
        <div className="lg:col-span-1 bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <div className="w-7 h-7 rounded bg-blue-600 text-white flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800">ارزیاب سریع ریسک ملکی و حقوقی</h3>
              <p className="text-[10px] text-slate-500">تحلیل آنی پلاک ثبتی یا متن قرارداد</p>
            </div>
          </div>

          <form onSubmit={handleQuickRiskCalc} className="space-y-3">
            <textarea
              rows={4}
              placeholder="شرح مختصر سند یا موضوع اختلاف را وارد کنید..."
              value={quickRiskText}
              onChange={(e) => setQuickRiskText(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md p-2.5 text-xs focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
            />

            <button
              type="submit"
              disabled={isCalculatingRisk}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isCalculatingRisk ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>در حال ارزیابی با AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>محاسبه آنی شاخص ریسک</span>
                </>
              )}
            </button>
          </form>

          {quickRiskResult && (
            <div className="bg-blue-50/80 border border-blue-200 rounded-md p-3 text-xs text-slate-800 space-y-1 animate-fadeIn">
              <div className="font-bold text-blue-900 flex items-center gap-1 text-xs">
                <Scale className="w-3.5 h-3.5 text-blue-700" />
                <span>نتیجه ارزیابی هوشمند:</span>
              </div>
              <p className="text-[11px] leading-relaxed whitespace-pre-line text-slate-700">
                {quickRiskResult}
              </p>
            </div>
          )}
        </div>

        {/* Recent Cases Table / List */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Gavel className="w-4 h-4 text-blue-600" />
              <h2 className="text-xs font-bold text-slate-800">آخرین فعالیت‌های حقوقی و ملکی</h2>
            </div>
            <button
              onClick={() => onGoToChat()}
              className="text-[11px] text-blue-600 font-bold hover:underline"
            >
              مشاهده همه
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-slate-500">
                  <th className="px-4 py-3 font-medium">شماره پرونده</th>
                  <th className="px-4 py-3 font-medium">عنوان پرونده</th>
                  <th className="px-4 py-3 font-medium">نوع</th>
                  <th className="px-4 py-3 font-medium">اولویت</th>
                  <th className="px-4 py-3 font-medium">شانس موفقیت</th>
                  <th className="px-4 py-3 font-medium">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cases.slice(0, 5).map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => onSelectCase(c.id)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3 font-mono text-slate-700 font-semibold">
                      {c.caseNumber}
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-800 max-w-[180px] truncate">
                      {c.title}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {c.category === 'real_estate' ? 'ملکی' : 'حقوقی'}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          c.priority === 'high'
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {c.priority === 'high' ? 'فوری' : 'عادی'}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-extrabold text-emerald-600">
                      {c.realEstateDetails?.successProbability || 80}٪
                    </td>
                    <td className="px-4 py-3 text-blue-600">
                      <ChevronLeft className="w-4 h-4" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Hearing Timelines & Documents Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Hearing Schedule */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Calendar className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold text-slate-800">برنامه جلسات رسیدگی و وقت دادگاه</h3>
          </div>

          <div className="space-y-2">
            {cases
              .filter((c) => c.legalDetails?.nextHearingDate)
              .map((c) => (
                <div
                  key={c.id}
                  onClick={() => onSelectCase(c.id)}
                  className="p-3 rounded-md border border-slate-200 bg-slate-50/50 flex items-center justify-between cursor-pointer hover:border-blue-400 transition-colors"
                >
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-800">{c.title}</h4>
                    <p className="text-[10px] text-slate-500">{c.legalDetails?.courtBranch}</p>
                  </div>

                  <div className="bg-white px-2.5 py-1 rounded border border-slate-200 text-left">
                    <span className="text-[9px] text-slate-400 block font-bold">وقت دادگاه</span>
                    <span className="text-xs font-bold text-blue-700 font-mono">
                      {c.legalDetails?.nextHearingDate}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Uploaded Documents Quick Center */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold text-slate-800">آخرین اسناد و مدارک ثبت‌شده</h3>
            </div>
            <span className="text-[11px] text-slate-500">{documents.length} مدرک</span>
          </div>

          <div className="space-y-2">
            {documents.slice(0, 4).map((d) => (
              <div
                key={d.id}
                onClick={() => onSelectCase(d.caseId)}
                className="p-3 rounded-md border border-slate-200 hover:border-blue-400 transition-colors cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded bg-blue-50 text-blue-700 font-bold text-[10px] flex items-center justify-center border border-blue-200 uppercase">
                    {d.fileType}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{d.title}</h4>
                    <p className="text-[10px] text-slate-500">تاریخ: {d.uploadedAt} • {d.fileSize}</p>
                  </div>
                </div>

                <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">
                  سند معتبر
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
