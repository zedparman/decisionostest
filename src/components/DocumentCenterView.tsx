import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FileText, Upload, Search, Filter, Trash2, Eye, FileCheck, CheckCircle2 } from 'lucide-react';
import { DocumentItem, CaseItem } from '../types';

interface DocumentCenterViewProps {
  documents: DocumentItem[];
  cases: CaseItem[];
  onSelectCase: (caseId: string) => void;
  onDeleteDocument: (docId: string) => void;
}

export const DocumentCenterView: React.FC<DocumentCenterViewProps> = ({
  documents,
  cases,
  onSelectCase,
  onDeleteDocument
}) => {
  const { t } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const filteredDocs = documents.filter((d) => {
    if (selectedCategory !== 'all' && d.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return d.title.toLowerCase().includes(q) || d.ocrSummary?.toLowerCase().includes(q);
    }
    return true;
  });

  const getCaseTitle = (caseId: string) => {
    const found = cases.find((c) => c.id === caseId);
    return found ? found.title : 'پرونده ناشناخته';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    alert('فایل دریافت شد. پردازش خودکار OCR و هوش مصنوعی آغاز گردید.');
  };

  return (
    <div className="space-y-6 text-right font-vazirmatn">
      {/* Header */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>مرکز مدیریت اسناد و مدارک ثبتی</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            آرشیو یکپارچه کلیه اسناد مالکیت، مبایعه‌نامه‌ها، دادخواست‌ها و آراء دادگاه با پردازش هوشمند
          </p>
        </div>

        <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-200 self-start sm:self-auto">
          تعداد کل اسناد: {documents.length}
        </span>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`p-6 rounded-lg border-2 border-dashed text-center transition-all cursor-pointer ${
          isDragging
            ? 'border-blue-500 bg-blue-50/50'
            : 'border-slate-300 bg-white hover:border-blue-400'
        }`}
      >
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-2 border border-blue-200 shadow-2xs">
          <Upload className="w-5 h-5" />
        </div>
        <h3 className="text-xs font-bold text-slate-800">بارگذاری سریع اسناد حقوقی و ملکی</h3>
        <p className="text-[11px] text-slate-500 mt-1 max-w-md mx-auto">
          فایل‌های تصویر سند تک‌برگ، مبایعه‌نامه یا دادخواست (PDF, PNG, JPG) را کشیده و در اینجا رها کنید.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2 relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="جستجو در عنوان یا متن خلاصه مدرک..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md pr-9 pl-3 py-1.5 text-xs focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-xs focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-hidden font-medium"
            >
              <option value="all">همه دسته‌بندی‌ها</option>
              <option value="deed">اسناد مالکیت (تک‌برگ/منگوله‌دار)</option>
              <option value="contract">قراردادها و مبایعه‌نامه‌ها</option>
              <option value="petition">دادخواست‌ها و لوایح</option>
              <option value="verdict">آراء و دادنامه‌های دادگاه</option>
              <option value="official_notice">اظهارنامه‌های رسمی</option>
            </select>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-lg border border-slate-200 p-4 hover:border-blue-400 shadow-sm transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                  نوع: {doc.category}
                </span>

                <span className="text-[10px] text-slate-400 font-mono">
                  حجم: {doc.fileSize}
                </span>
              </div>

              <h3 className="text-xs font-bold text-slate-800">{doc.title}</h3>

              <div className="text-[10px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-200">
                <span className="font-bold text-slate-700 block">مرتبط با پرونده:</span>
                <span className="text-slate-800 font-medium">{getCaseTitle(doc.caseId)}</span>
              </div>

              {doc.ocrSummary && (
                <p className="text-[11px] text-slate-600 line-clamp-2">
                  <strong className="text-slate-700">خلاصه OCR:</strong> {doc.ocrSummary}
                </p>
              )}

              {doc.aiKeyFindings && (
                <div className="space-y-1 pt-0.5">
                  <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    نتایج کلیدی استخراج‌شده توسط هوش مصنوعی:
                  </span>
                  <ul className="text-[11px] text-slate-600 list-disc pr-4 space-y-0.5">
                    {doc.aiKeyFindings.map((f, idx) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono">تاریخ: {doc.uploadedAt}</span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onDeleteDocument(doc.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="حذف سند"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onSelectCase(doc.caseId)}
                  className="bg-blue-600 text-white text-[11px] font-semibold px-2.5 py-1 rounded hover:bg-blue-700 transition-colors flex items-center gap-1"
                >
                  <Eye className="w-3 h-3" />
                  <span>بررسی</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
