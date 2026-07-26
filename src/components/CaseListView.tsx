import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Gavel,
  Building2,
  Scale,
  Plus,
  Search,
  Filter,
  Eye,
  Trash2,
  Sparkles,
  ChevronLeft,
  Grid,
  List
} from 'lucide-react';
import { CaseItem, CaseCategory, CaseStatus } from '../types';

interface CaseListViewProps {
  cases: CaseItem[];
  onSelectCase: (id: string) => void;
  onDeleteCase: (id: string) => void;
  onOpenNewCaseModal: () => void;
}

export const CaseListView: React.FC<CaseListViewProps> = ({
  cases,
  onSelectCase,
  onDeleteCase,
  onOpenNewCaseModal
}) => {
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'all' | CaseCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredCases = cases.filter((c) => {
    if (activeTab !== 'all' && c.category !== activeTab) return false;
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = c.title.toLowerCase().includes(q);
      const matchNumber = c.caseNumber.toLowerCase().includes(q);
      const matchParcel = c.realEstateDetails?.parcelMainNumber?.toLowerCase().includes(q) || false;
      const matchTag = c.tags.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchNumber || matchParcel || matchTag;
    }
    return true;
  });

  return (
    <div className="space-y-6 text-right font-vazirmatn">
      {/* Header & Main Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Gavel className="w-5 h-5 text-blue-600" />
            <span>مدیریت پرونده‌های حقوقی و ملکی</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            مشاهده، فیلتر و ارزیابی هوشمند تمامی پرونده‌ها همراه با شاخص‌های ریسک ثبتی
          </p>
        </div>

        <button
          onClick={onOpenNewCaseModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-3.5 py-2 rounded-md transition-colors shadow-xs flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{t('newCase')}</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t('filterAll')} ({cases.length})
            </button>

            <button
              onClick={() => setActiveTab('real_estate')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'real_estate'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{t('filterRealEstate')} ({cases.filter((c) => c.category === 'real_estate').length})</span>
            </button>

            <button
              onClick={() => setActiveTab('legal')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'legal'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{t('filterLegal')} ({cases.filter((c) => c.category === 'legal').length})</span>
            </button>
          </div>

          {/* Grid / Table Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-md shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded text-xs font-bold transition-all ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
              }`}
              title="نمایش کارت شبکه"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1 rounded text-xs font-bold transition-all ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
              }`}
              title="نمایش جدول"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search & Status Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2 relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="جستجو بر اساس عنوان پرونده، شماره بایگانی، پلاک ثبتی یا برچسب‌ها..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md pr-9 pl-3 py-1.5 text-xs focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-xs focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-hidden font-medium"
            >
              <option value="all">همه وضعیت‌ها</option>
              <option value="open">در جریان (Open)</option>
              <option value="under_review">در حال بررسی (Under Review)</option>
              <option value="court_pending">در انتظار وقت دادگاه (Court Pending)</option>
              <option value="appealed">تجدیدنظر خواهی (Appealed)</option>
              <option value="closed">مختومه (Closed)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cases Output */}
      {filteredCases.length === 0 ? (
        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center space-y-3">
          <Gavel className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-700">هیچ پرونده‌ای با این مشخصات یافت نشد</h3>
          <p className="text-xs text-slate-500">لطفا عبارت جستجو یا فیلتر را تغییر دهید یا پرونده جدید ثبت کنید.</p>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {filteredCases.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-lg border border-slate-200 hover:border-blue-400 shadow-sm transition-all p-4 flex flex-col justify-between space-y-3 group"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        c.category === 'real_estate'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {c.category === 'real_estate' ? 'ملکی و ثبتی' : 'حقوقی عام'}
                    </span>

                    <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      #{c.caseNumber}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      c.priority === 'high'
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    اولویت {c.priority === 'high' ? 'فوری' : 'عادی'}
                  </span>
                </div>

                {/* Title */}
                <h3
                  onClick={() => onSelectCase(c.id)}
                  className="text-xs font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors leading-snug line-clamp-2"
                >
                  {c.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
                  {c.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-2.5">
                  {c.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-slate-50 text-slate-600 text-[10px] font-medium px-1.5 py-0.5 rounded border border-slate-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Real Estate / Legal Bar */}
              <div className="pt-2.5 border-t border-slate-100 space-y-2.5">
                {c.realEstateDetails && (
                  <div className="bg-slate-50 p-2 rounded border border-slate-200/80 grid grid-cols-2 gap-2 text-[10px]">
                    <div>
                      <span className="text-slate-500 block text-[9px]">پلاک ثبتی:</span>
                      <span className="font-bold text-slate-800 font-mono">
                        {c.realEstateDetails.parcelMainNumber} / {c.realEstateDetails.parcelSubNumber}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 block text-[9px]">نوع سند:</span>
                      <span className="font-bold text-slate-800">{c.realEstateDetails.deedType}</span>
                    </div>
                  </div>
                )}

                {/* Bottom Indicators & Actions */}
                <div className="flex items-center justify-between gap-2 pt-0.5">
                  <div className="flex items-center gap-3 text-xs">
                    <div>
                      <span className="text-[9px] text-slate-400 block">شانس موفقیت</span>
                      <span className="font-extrabold text-emerald-600">
                        {c.realEstateDetails?.successProbability || 80}٪
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] text-slate-400 block">ریسک ثبتی</span>
                      <span className="font-extrabold text-blue-700">
                        {c.realEstateDetails?.riskScore || 25} / ۱۰۰
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onDeleteCase(c.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="حذف پرونده"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onSelectCase(c.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>مشاهده</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="p-3">عنوان پرونده</th>
                  <th className="p-3">شماره بایگانی</th>
                  <th className="p-3">ماهیت</th>
                  <th className="p-3">طرف دعوا</th>
                  <th className="p-3">شانس موفقیت</th>
                  <th className="p-3">وضعیت</th>
                  <th className="p-3 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCases.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-bold text-slate-800 max-w-xs truncate">
                      {c.title}
                    </td>
                    <td className="p-3 font-mono font-semibold text-slate-700">{c.caseNumber}</td>
                    <td className="p-3">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          c.category === 'real_estate'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {c.category === 'real_estate' ? 'ملکی' : 'حقوقی'}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600 text-[11px]">
                      {c.legalDetails?.plaintiff || 'مشخص نشده'}
                    </td>
                    <td className="p-3 font-bold text-emerald-600">
                      {c.realEstateDetails?.successProbability || 80}٪
                    </td>
                    <td className="p-3">
                      <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3 text-center space-x-1">
                      <button
                        onClick={() => onSelectCase(c.id)}
                        className="bg-blue-600 text-white text-[11px] font-semibold px-2.5 py-1 rounded hover:bg-blue-700 transition-colors inline-flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>بررسی</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
