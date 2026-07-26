import React from 'react';
import { Scale, Building2, ShieldCheck, Cpu, Award, Sparkles } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-8 text-right font-vazirmatn max-w-4xl mx-auto">
      {/* Hero */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 space-y-4 relative overflow-hidden">
        <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
          <Scale className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-black text-white">درباره سامانه تصمیم‌یار DecisionOS</h1>
        <p className="text-xs text-slate-300 leading-relaxed">
          سامانه هوشمند DecisionOS پلتفرمی پیشرو در تحلیل، مدیریت و ارزیابی پرونده‌های حقوقی، ثبتی و ملکی کشور است. با تلفیق دانش حقوقدانان برجسته، وکلای سرپرست و مدل‌های پیشرفته هوش مصنوعی Gemini، هدف ما افزایش سرعت، دقت و شفافیت در فرایند تصمیم‌گیری قضایی و ملکی می‌باشد.
        </p>
      </div>

      {/* Feature Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
          <Cpu className="w-6 h-6 text-amber-600" />
          <h3 className="text-xs font-bold text-slate-900">موتور پردازش Gemini 3.6</h3>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            استفاده از آخرین مدل‌های زبانی هوش مصنوعی گوگل برای تحلیل بندهای اسناد و استعلام قوانین.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
          <Building2 className="w-6 h-6 text-amber-600" />
          <h3 className="text-xs font-bold text-slate-900">تمرکز ویژه بر امور ثبتی و ملکی</h3>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            ارزیابی ریسک اسناد تک‌برگ، منگوله‌دار، مشاعی، افراز و صورتمجلس تفکیکی با متدولوژی حقوقی.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
          <ShieldCheck className="w-6 h-6 text-amber-600" />
          <h3 className="text-xs font-bold text-slate-900">امنیت کامل و لاگ غیرقابل تغییر</h3>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            رمزنگاری پیشرفته داده‌ها و ثبت تمام فعالیت‌های دسترسی کاربران جهت انطباق با استانداردهای امنیتی.
          </p>
        </div>
      </div>
    </div>
  );
};
