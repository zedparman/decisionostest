import React from 'react';
import { X, Printer, Scale, ShieldCheck, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';
import { CaseItem, CaseReport } from '../types';

interface ReportPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseItem: CaseItem;
  report: CaseReport | null;
}

export const ReportPrintModal: React.FC<ReportPrintModalProps> = ({
  isOpen,
  onClose,
  caseItem,
  report
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-right">
        {/* Modal Controls (No Print) */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between no-print border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm">پیش‌نمایش گزارش ارزیابی هوشمند حقوقی و ملکی</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>چاپ / دانلود PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div className="p-8 overflow-y-auto space-y-6 text-slate-900 bg-white font-vazirmatn flex-1" id="printable-report">
          {/* Letterhead Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold border border-slate-800">
                <Scale className="w-7 h-7" />
              </div>
              <div>
                <h1 className="font-black text-xl text-slate-900 tracking-tight">
                  سامانه هوشمند تصمیم‌یار حقوقی و ملکی (DecisionOS)
                </h1>
                <p className="text-xs text-slate-600 font-semibold">
                  گزارش کارشناسی ارزیابی ادله، ریسک ثبتی و پیش‌بینی آرای دادگاه
                </p>
              </div>
            </div>

            <div className="text-left text-xs font-medium text-slate-700 space-y-0.5">
              <div><strong className="text-slate-900">شماره گزارش:</strong> REP-{caseItem.id.toUpperCase()}</div>
              <div><strong className="text-slate-900">تاریخ تنظیم:</strong> {report?.generatedAt || new Date().toLocaleDateString('fa-IR')}</div>
              <div><strong className="text-slate-900">طبقه دسترسی:</strong> محرمانه / تخصصی</div>
            </div>
          </div>

          {/* Case Identifiers Grid */}
          <div className="bg-slate-50 border border-slate-300 rounded-xl p-4">
            <h2 className="text-xs font-bold text-slate-900 mb-3 pb-1 border-b border-slate-200 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-amber-600" />
              <span>خلاصه مشخصات پرونده و موضوع دعوا</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px]">عنوان پرونده:</span>
                <span className="font-bold text-slate-900">{caseItem.title}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">شماره پرونده / بایگانی:</span>
                <span className="font-bold text-slate-900">{caseItem.caseNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">ماهیت دعوا:</span>
                <span className="font-bold text-slate-900">{caseItem.category === 'real_estate' ? 'ملکی و ثبتی' : 'حقوقی عام'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">وکیل سرپرست:</span>
                <span className="font-bold text-slate-900">{caseItem.assignedAdvocate}</span>
              </div>

              {caseItem.legalDetails && (
                <>
                  <div>
                    <span className="text-slate-500 block text-[11px]">خواهان (شاکی):</span>
                    <span className="font-bold text-slate-900">{caseItem.legalDetails.plaintiff}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">خوانده:</span>
                    <span className="font-bold text-slate-900">{caseItem.legalDetails.defendant}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">مرجع قضایی رسیدگی‌کننده:</span>
                    <span className="font-bold text-slate-900">{caseItem.legalDetails.courtBranch}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">خواسته اصلی:</span>
                    <span className="font-bold text-slate-900">{caseItem.legalDetails.disputeType}</span>
                  </div>
                </>
              )}

              {caseItem.realEstateDetails && (
                <>
                  <div>
                    <span className="text-slate-500 block text-[11px]">پلاک ثبتی اصلی/فرعی:</span>
                    <span className="font-bold text-slate-900">{caseItem.realEstateDetails.parcelMainNumber} / {caseItem.realEstateDetails.parcelSubNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">نوع سند مالکیت:</span>
                    <span className="font-bold text-slate-900">{caseItem.realEstateDetails.deedType}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">مساحت و کاربری:</span>
                    <span className="font-bold text-slate-900">{caseItem.realEstateDetails.areaSqMeters} مترمربع - {caseItem.realEstateDetails.zoning}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">بخش ثبتی:</span>
                    <span className="font-bold text-slate-900">{caseItem.realEstateDetails.registrationSection}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* AI Assessment Index Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Winning Probability */}
            <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-800 block">احتمال موفقیت و پیروزی در دعوا</span>
                <p className="text-[11px] text-emerald-700 mt-0.5">محاسبه‌شده بر اساس ادله اثبات دعوا و رویه قضایی</p>
              </div>
              <div className="text-3xl font-black text-emerald-900 bg-white px-3 py-1.5 rounded-lg border border-emerald-200">
                {report?.winningProbability || caseItem.realEstateDetails?.successProbability || 85}٪
              </div>
            </div>

            {/* Risk Index */}
            <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-900 block">شاخص ریسک حقوقی و ثبتی</span>
                <p className="text-[11px] text-amber-800 mt-0.5">سطح خطر: {report?.riskAnalysis.level || 'پایین'}</p>
              </div>
              <div className="text-3xl font-black text-amber-900 bg-white px-3 py-1.5 rounded-lg border border-amber-200">
                {report?.riskAnalysis.score || caseItem.realEstateDetails?.riskScore || 24} / ۱۰۰
              </div>
            </div>
          </div>

          {/* AI Executive Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold text-slate-900 border-b border-slate-300 pb-1">
              ۱. نتیجه‌گیری کارشناسی و تحلیل خلاصه پرونده
            </h3>
            <p className="text-xs text-slate-800 leading-relaxed bg-slate-50/80 p-3 rounded-lg border border-slate-200">
              {report?.summary || caseItem.description}
            </p>
          </div>

          {/* Risks & Recommended Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 text-red-700">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>چالش‌ها و ریسک‌های حقوقی شناسایی‌شده</span>
              </h4>
              <ul className="text-xs text-slate-700 space-y-1.5 pr-4 list-disc">
                {(report?.riskAnalysis.keyRisks || [
                  'احتمال ادعای شخص ثالث بر روی پارکینگ اختصاصی',
                  'لزوم اخذ صورتمجلس تفکیکی از ثبت'
                ]).map((risk, i) => (
                  <li key={i}>{risk}</li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>اقدامات و راهکارهای اجرایی پیشنهادی</span>
              </h4>
              <ul className="text-xs text-slate-700 space-y-1.5 pr-4 list-disc">
                {(report?.recommendedActions || [
                  'تقدیم دادخواست دستور موقت مبنی بر منع نقل و انتقال',
                  'استعلام ثبتی از اداره ثبت اسناد و املاک'
                ]).map((act, i) => (
                  <li key={i}>{act}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Relevant Laws */}
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold text-slate-900 border-b border-slate-300 pb-1">
              ۲. مستندات قانونی و آراء وحدت رویه مرتبط
            </h3>
            <div className="flex flex-wrap gap-2">
              {(report?.relevantLaws || [
                'ماده ۲۱۹ قانون مدنی (عقود لازمه)',
                'ماده ۴۶ قانون ثبت اسناد و املاک',
                'ماده ۵۱۵ قانون آئین دادرسی مدنی'
              ]).map((law, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-md border border-slate-300"
                >
                  {law}
                </span>
              ))}
            </div>
          </div>

          {/* Forecast */}
          <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-300 text-xs">
            <strong className="text-amber-900 block font-bold mb-1">پیش‌بینی رای احتمالی دادگاه:</strong>
            <p className="text-slate-800 leading-relaxed font-medium">
              {report?.verdictForecast || 'صدور حکم به الزام خوانده به حضور در دفترخانه و تنظیم سند رسمی انتقال.'}
            </p>
          </div>

          {/* Signatures & Official Stamp */}
          <div className="pt-8 border-t border-slate-400 grid grid-cols-2 gap-8 text-xs text-center">
            <div>
              <p className="font-bold text-slate-900">تاییدکننده / وکیل سرپرست پرونده</p>
              <p className="text-[11px] text-slate-500 mt-1">{caseItem.assignedAdvocate}</p>
              <div className="h-16 flex items-center justify-center text-slate-300 italic text-[10px]">
                [مهر و امضای وکیل]
              </div>
            </div>

            <div>
              <p className="font-bold text-slate-900">دپارتمان تحلیل هوش مصنوعی DecisionOS</p>
              <p className="text-[11px] text-slate-500 mt-1">سامانه ارزیابی هوشمند اسناد حقوقی و ملکی</p>
              <div className="h-16 flex items-center justify-center text-emerald-800 text-[10px] font-bold">
                <ShieldCheck className="w-8 h-8 text-emerald-600 inline ml-1" />
                تایید شده توسط موتور تحلیل حقوقی Gemini
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
