import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Scale, Lock, Mail, User as UserIcon, Shield } from 'lucide-react';
import { User, UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const { t } = useLanguage();
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState('دکتر محمدرضا صادقی');
  const [email, setEmail] = useState('sadeghi@decisionos.ir');
  const [password, setPassword] = useState('123456');
  const [role, setRole] = useState<UserRole>('advocate');
  const [licenseNumber, setLicenseNumber] = useState('۱۲۳۴۵ / ک');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const loggedUser: User = {
      id: `usr-${Date.now()}`,
      name: name || 'کاربر سیستم',
      email: email || 'user@decisionos.ir',
      role,
      licenseNumber,
      organization: role === 'advocate' ? 'کانون وکلای دادگستری' : 'دپارتمان حقوقی DecisionOS',
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
    };

    onLoginSuccess(loggedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden text-right">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base font-vazirmatn">
                {isRegister ? 'ثبت‌نام وکیل / متخصص حقوقی' : 'ورود به سامانه DecisionOS'}
              </h3>
              <p className="text-xs text-slate-400">ورود امن به محیط مدیریت و تحلیل پرونده‌ها</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isRegister && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">نام و نام خانوادگی</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="دکتر / مهندس..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pr-9 pl-3 py-2 text-xs focus:bg-white focus:border-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">نقش تخصصی در سامانه</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:bg-white focus:border-amber-500 focus:outline-hidden font-medium"
                >
                  <option value="advocate">وکیل پایه یک دادگستری</option>
                  <option value="legal_specialist">کارشناس ارشد حقوقی / ثبتی</option>
                  <option value="real_estate_agent">مشاور ارشد املاک و مستغلات</option>
                  <option value="client">موکل / ذینفع پرونده</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">شماره پروانه وکالت / نظام صنفی</label>
                <input
                  type="text"
                  placeholder="۱۲۳۴۵ / ک"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:bg-white focus:border-amber-500 focus:outline-hidden"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">پست الکترونیکی (ایمیل)</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="sadeghi@decisionos.ir"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg pr-9 pl-3 py-2 text-xs focus:bg-white focus:border-amber-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">رمز عبور</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg pr-9 pl-3 py-2 text-xs focus:bg-white focus:border-amber-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl transition-all shadow-md text-xs flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" />
              <span>{isRegister ? 'تکمیل ثبت‌نام و ورود' : 'ورود به حساب کاربری'}</span>
            </button>
          </div>

          <div className="text-center pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs text-amber-700 hover:text-amber-900 font-bold transition-colors"
            >
              {isRegister
                ? 'قبلاً حساب کاربری داشته‌اید؟ ورود'
                : 'حساب کاربری ندارید؟ ثبت‌نام وکلای جدید'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
