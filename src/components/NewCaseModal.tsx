import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Scale, Building2, AlertCircle } from 'lucide-react';
import { CaseCategory, CasePriority, CaseStatus } from '../types';

interface NewCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const NewCaseModal: React.FC<NewCaseModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useLanguage();

  const [category, setCategory] = useState<CaseCategory>('real_estate');
  const [title, setTitle] = useState('');
  const [caseNumber, setCaseNumber] = useState('');
  const [priority, setPriority] = useState<CasePriority>('medium');
  const [status, setStatus] = useState<CaseStatus>('open');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  // Legal Specs
  const [disputeType, setDisputeType] = useState('الزام به تنظیم سند رسمی و خلع ید');
  const [courtBranch, setCourtBranch] = useState('شعبه ۱۵ دادگاه عمومی حقوقی تهران');
  const [plaintiff, setPlaintiff] = useState('');
  const [defendant, setDefendant] = useState('');
  const [claimAmount, setClaimAmount] = useState<number | ''>('');

  // Real Estate Specs
  const [propertyType, setPropertyType] = useState<'apartment' | 'land' | 'villa' | 'commercial' | 'industrial'>('apartment');
  const [deedType, setDeedType] = useState<'single_page' | 'booklet' | 'joint_ownership' | 'power_of_attorney' | 'peace_deed' | 'bench_mark'>('single_page');
  const [registrationSection, setRegistrationSection] = useState('بخش ۱۰ ثبت تهران');
  const [parcelMainNumber, setParcelMainNumber] = useState('');
  const [parcelSubNumber, setParcelSubNumber] = useState('');
  const [areaSqMeters, setAreaSqMeters] = useState<number | ''>('');
  const [address, setAddress] = useState('');
  const [zoning, setZoning] = useState<'residential' | 'commercial' | 'administrative' | 'agricultural' | 'mixed'>('residential');
  const [estimatedValue, setEstimatedValue] = useState<number | ''>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const tags = tagsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const newCasePayload: any = {
      title: title || (category === 'real_estate' ? 'پرونده ملکی جدید' : 'پرونده حقوقی جدید'),
      caseNumber: caseNumber || `۱۴۰۳/۱۰/${Math.floor(100 + Math.random() * 900)}`,
      category,
      status,
      priority,
      description,
      tags: tags.length > 0 ? tags : [category === 'real_estate' ? 'ملکی' : 'حقوقی'],
      assignedAdvocate: 'دکتر محمدرضا صادقی',
      legalDetails: {
        disputeType,
        courtBranch,
        plaintiff: plaintiff || 'خواهان مشخص نشده',
        defendant: defendant || 'خوانده مشخص نشده',
        claimAmount: typeof claimAmount === 'number' ? claimAmount : undefined
      },
      realEstateDetails: category === 'real_estate' ? {
        propertyType,
        deedType,
        registrationSection,
        parcelMainNumber: parcelMainNumber || '۱۲',
        parcelSubNumber: parcelSubNumber || '۳۴',
        areaSqMeters: typeof areaSqMeters === 'number' ? areaSqMeters : 100,
        address: address || 'تهران',
        zoning,
        estimatedValue: typeof estimatedValue === 'number' ? estimatedValue : undefined,
        riskScore: 30,
        successProbability: 75
      } : undefined
    };

    onSubmit(newCasePayload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base font-vazirmatn">ایجاد و ثبت پرونده حقوقی / ملکی جدید</h3>
              <p className="text-xs text-slate-400">ثبت اطلاعات ثبتی، حقوقی و مشخصات اسناد</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-right">
          {/* Category Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">نوع و ماهیت پرونده</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCategory('real_estate')}
                className={`p-3.5 rounded-xl border-2 flex items-center gap-3 transition-all text-right ${
                  category === 'real_estate'
                    ? 'border-amber-500 bg-amber-50/50 text-slate-900 font-bold'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <Building2 className={`w-5 h-5 ${category === 'real_estate' ? 'text-amber-600' : 'text-slate-400'}`} />
                <div>
                  <div className="text-xs font-bold">پرونده ملکی و ثبتی</div>
                  <div className="text-[10px] text-slate-500">سند تک‌برگ، زمین، خلع ید، الزام به تنظیم سند</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setCategory('legal')}
                className={`p-3.5 rounded-xl border-2 flex items-center gap-3 transition-all text-right ${
                  category === 'legal'
                    ? 'border-amber-500 bg-amber-50/50 text-slate-900 font-bold'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <Scale className={`w-5 h-5 ${category === 'legal' ? 'text-amber-600' : 'text-slate-400'}`} />
                <div>
                  <div className="text-xs font-bold">پرونده حقوقی و قراردادها</div>
                  <div className="text-[10px] text-slate-500">فسخ قرارداد، مطالبه وجه، دادرسی عام</div>
                </div>
              </button>
            </div>
          </div>

          {/* General Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">عنوان پرونده *</label>
              <input
                type="text"
                required
                placeholder="مثال: دعوای الزام به تنظیم سند رسمی برج آریا"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:bg-white focus:border-amber-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">شماره پرونده / بایگانی *</label>
              <input
                type="text"
                placeholder="مثال: ۱۴۰۳/۱۰۱/۸۸۷"
                value={caseNumber}
                onChange={(e) => setCaseNumber(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:bg-white focus:border-amber-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">اولیت پرونده</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as CasePriority)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:bg-white focus:border-amber-500 focus:outline-hidden"
              >
                <option value="high">فوری / بالا</option>
                <option value="medium">متوسط</option>
                <option value="low">عادی</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">وضعیت دادرسی</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as CaseStatus)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:bg-white focus:border-amber-500 focus:outline-hidden"
              >
                <option value="open">در جریان (Open)</option>
                <option value="under_review">در حال بررسی حقوقی (Under Review)</option>
                <option value="court_pending">در انتظار وقت دادگاه (Court Pending)</option>
                <option value="appealed">تجدیدنظر خواهی (Appealed)</option>
                <option value="closed">مختومه (Closed)</option>
              </select>
            </div>
          </div>

          {/* Legal Specs Sub-Section */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 border-b border-slate-200 pb-2">
              <Scale className="w-4 h-4 text-amber-600" />
              <span>اطلاعات قضایی و طرفین دعوا</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">خواهان / شاکی (موکل)</label>
                <input
                  type="text"
                  placeholder="نام خواهان..."
                  value={plaintiff}
                  onChange={(e) => setPlaintiff(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:border-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">خوانده / مشتکی عنه</label>
                <input
                  type="text"
                  placeholder="نام خوانده..."
                  value={defendant}
                  onChange={(e) => setDefendant(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:border-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">عنوان دقیق خواسته‌ها / نوع دعوا</label>
                <input
                  type="text"
                  placeholder="مثال: الزام به تنظیم سند و خلع ید..."
                  value={disputeType}
                  onChange={(e) => setDisputeType(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:border-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">شعبه و مجتمع قضایی</label>
                <input
                  type="text"
                  placeholder="مثال: شعبه ۱۵ دادگاه عمومی حقوقی..."
                  value={courtBranch}
                  onChange={(e) => setCourtBranch(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:border-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">ارزش خواسته (ریال)</label>
                <input
                  type="number"
                  placeholder="مثال: ۱۵۰۰۰۰۰۰۰۰۰۰"
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(e.target.value ? Number(e.target.value) : '')}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:border-amber-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Real Estate Specifics */}
          {category === 'real_estate' && (
            <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200/80 space-y-4">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 border-b border-amber-200 pb-2">
                <Building2 className="w-4 h-4 text-amber-600" />
                <span>مشخصات ثبتی و ملکی</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">نوع سند مالکیت</label>
                  <select
                    value={deedType}
                    onChange={(e) => setDeedType(e.target.value as any)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:border-amber-500 focus:outline-hidden"
                  >
                    <option value="single_page">تک‌برگ الکترونیکی</option>
                    <option value="booklet">منگوله‌دار دفترچه‌ای</option>
                    <option value="joint_ownership">مشاعی</option>
                    <option value="power_of_attorney">وکالتی / عادی</option>
                    <option value="peace_deed">صلح‌نامه</option>
                    <option value="bench_mark">بنچاق</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">پلاک ثبتی اصلی</label>
                  <input
                    type="text"
                    placeholder="مثال: ۴۴"
                    value={parcelMainNumber}
                    onChange={(e) => setParcelMainNumber(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:border-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">پلاک ثبتی فرعی</label>
                  <input
                    type="text"
                    placeholder="مثال: ۱۲۳"
                    value={parcelSubNumber}
                    onChange={(e) => setParcelSubNumber(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:border-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">بخش ثبتی</label>
                  <input
                    type="text"
                    placeholder="مثال: بخش ۱۰ ثبت تهران"
                    value={registrationSection}
                    onChange={(e) => setRegistrationSection(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:border-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">متراژ (متر مربع)</label>
                  <input
                    type="number"
                    placeholder="مثال: ۴۵۰"
                    value={areaSqMeters}
                    onChange={(e) => setAreaSqMeters(e.target.value ? Number(e.target.value) : '')}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:border-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">کاربری ملک</label>
                  <select
                    value={zoning}
                    onChange={(e) => setZoning(e.target.value as any)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:border-amber-500 focus:outline-hidden"
                  >
                    <option value="residential">مسکونی</option>
                    <option value="commercial">تجاری</option>
                    <option value="administrative">اداری</option>
                    <option value="industrial">صنعتی / سوله</option>
                    <option value="agricultural">کشاورزی / باغ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">آدرس دقیق ملک</label>
                <input
                  type="text"
                  placeholder="خیابان، پلاک، طبقه..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:border-amber-500 focus:outline-hidden"
                />
              </div>
            </div>
          )}

          {/* Description & Tags */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">شرح خلاصه پرونده و موضوع ادعا</label>
            <textarea
              rows={3}
              placeholder="توضیحات و خلاصه سابقه پرونده..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-xs focus:bg-white focus:border-amber-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">برچسب‌ها (با کاما جدا کنید)</label>
            <input
              type="text"
              placeholder="الزام به تنظیم سند, خلع ید, برج تجاری"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:bg-white focus:border-amber-500 focus:outline-hidden"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>اطلاعات پرونده پس از ذخیره‌سازی، توسط هوش مصنوعی ارزیابی می‌شود.</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                انصراف
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 transition-all shadow-md"
              >
                ثبت و ایجاد پرونده
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
