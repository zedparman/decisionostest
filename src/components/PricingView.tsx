import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CreditCard, Check, Sparkles, Shield, Zap } from 'lucide-react';

export const PricingView: React.FC = () => {
  const { t } = useLanguage();

  const plans = [
    {
      id: 'starter',
      name: 'پایه وکلای تک‌نفره',
      price: '۲,۵۰۰,۰؛۰ تومان / ماهانه',
      description: 'مناسب وکلای مستقل و مشاوران حقوقی برای مدیریت ۱۰ پرونده فعال',
      features: [
        'مدیریت تا ۱۰ پرونده حقوقی و ملکی',
        'ارزیابی هوشمند ریسک ثبتی پایه',
        'گفتگو با دستیار هوش مصنوعی Gemini 3.6',
        'بارگذاری اسناد تا ۲ گیگابایت',
        'خروجی گزارش استاندارد PDF'
      ],
      isPopular: false,
      buttonText: 'انتخاب پلن پایه'
    },
    {
      id: 'pro',
      name: 'حرفه‌ای موسسات حقوقی',
      price: '۵,۹۰۰,۰۰۰ تومان / ماهانه',
      description: 'پرطرفدارترین پلن برای دفتر وکالت، دپارتمان‌های ملکی و شرکت‌های سازنده',
      features: [
        'مدیریت نامحدود پرونده‌های حقوقی و ملکی',
        'تحلیل پیشرفته ادله اثبات دعوا و پیش‌بینی رای',
        'استخراج خودکار بندهای متناقض مبایعه‌نامه با OCR',
        'دسترسی ۵ کاربر همزمان با سطح دسترسی',
        'چاپ گزارش‌های کارشناسی ارزیابی رسمی با کد QR',
        'پشتیبانی تلفنی و اختصاصی وکلای سرپرست'
      ],
      isPopular: true,
      buttonText: 'شروع اشتراک حرفه‌ای'
    },
    {
      id: 'enterprise',
      name: 'سازمانی & بانک‌ها',
      price: 'تماس برای استعلام',
      description: 'مخصوص هلدینگ‌های ساختمانی، بانک‌ها و موسسات اعتباری بزرگ',
      features: [
        'نصب اختصاصی روی سرورهای سازمانی (On-Premise)',
        'اتصال خودکار به سامانه‌های ثبتی و املاک',
        'تعداد کاربران نامحدود با لاگ‌های امنیتی پیشرفته',
        'آموزش اختصاصی مدل بر روی آرشیو آرای گذشته سازمان',
        'قرارداد سطح خدمات SLA ۹۹.۹٪'
      ],
      isPopular: false,
      buttonText: 'درخواست مشاوره سازمانی'
    }
  ];

  return (
    <div className="space-y-8 text-right font-vazirmatn">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>پلن‌ها و تعرفه اشتراک سامانه DecisionOS</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900">
          تعرفه خدمات هوشمند تحلیل پرونده‌های حقوقی و ملکی
        </h1>
        <p className="text-xs text-slate-600 leading-relaxed">
          پلن مناسب دفاتر وکالت یا سازمان خود را انتخاب کنید و از قدرت تحلیل الگوریتم‌های هوش مصنوعی لذت ببرید.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <div
            key={p.id}
            className={`bg-white rounded-3xl p-6 border-2 flex flex-col justify-between space-y-6 transition-all relative ${
              p.isPopular
                ? 'border-amber-500 shadow-xl ring-4 ring-amber-500/10'
                : 'border-slate-200 shadow-xs hover:border-slate-300'
            }`}
          >
            {p.isPopular && (
              <div className="absolute -top-3.5 right-6 bg-amber-500 text-slate-950 font-bold text-[10px] px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <Zap className="w-3 h-3 fill-slate-950" />
                <span>پیشنهاد ویژه موسسات</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-base font-black text-slate-900">{p.name}</h3>
                <p className="text-[11px] text-slate-500 mt-1">{p.description}</p>
              </div>

              <div className="text-xl font-black text-slate-900 border-b border-slate-100 pb-4">
                {p.price}
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className={`w-full font-bold py-3 rounded-xl text-xs transition-all shadow-md ${
                p.isPopular
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {p.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
