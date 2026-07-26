import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Scale,
  Globe,
  Bell,
  Search,
  PlusCircle,
  User as UserIcon,
  LogOut,
  Sparkles,
  Menu
} from 'lucide-react';
import { User, Language } from '../types';

interface NavbarProps {
  user: User | null;
  onOpenNewCaseModal: () => void;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  onToggleSidebarMobile: () => void;
  activeView: string;
  setActiveView: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onOpenNewCaseModal,
  onOpenAuthModal,
  onLogout,
  onToggleSidebarMobile,
  activeView,
  setActiveView
}) => {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs px-6 py-2.5 flex items-center justify-between no-print h-14">
      {/* Right Side / Brand (RTL) */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebarMobile}
          className="lg:hidden p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
          title="منو"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div
          onClick={() => setActiveView('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-slate-900 text-blue-400 flex items-center justify-center font-bold shadow-xs group-hover:bg-slate-800 transition-all border border-slate-800">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-slate-900 text-base tracking-tight font-vazirmatn">
                Decision<span className="text-blue-600">OS</span>
              </span>
              <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-blue-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-600" /> AI v2.5
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium line-clamp-1">
              {t('tagline')}
            </p>
          </div>
        </div>
      </div>

      {/* Middle: Action & Search */}
      <div className="hidden md:flex items-center gap-3 flex-1 max-w-md mx-6">
        <button
          onClick={onOpenNewCaseModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-3.5 py-1.5 rounded-md transition-all shadow-xs flex items-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t('newCase')}</span>
        </button>

        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            onClick={() => setActiveView('cases')}
            className="w-full bg-slate-100 text-slate-800 text-xs rounded-md pr-9 pl-3 py-1.5 border border-transparent focus:border-blue-500 focus:bg-white focus:outline-hidden transition-all"
          />
        </div>
      </div>

      {/* Left Side: Language Switcher, Notifications, User */}
      <div className="flex items-center gap-2.5">
        {/* Language Selector */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-md border border-slate-200 text-xs">
          <Globe className="w-3.5 h-3.5 text-slate-500 mx-1" />
          {(['fa', 'en', 'ar'] as Language[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase transition-all ${
                lang === l
                  ? 'bg-white text-slate-900 shadow-2xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Notifications */}
        <button
          className="relative p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
          title="اعلان‌ها"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
        </button>

        {/* User Badge or Login */}
        {user ? (
          <div className="flex items-center gap-2 pr-2 border-r border-slate-200">
            <img
              src={user.avatarUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100'}
              alt={user.name}
              className="w-7 h-7 rounded-md object-cover border border-slate-300"
            />
            <div className="hidden xl:block text-right">
              <p className="text-xs font-bold text-slate-800 line-clamp-1">{user.name}</p>
              <p className="text-[10px] text-blue-700 font-medium">
                {user.licenseNumber ? `پروانه: ${user.licenseNumber}` : 'وکیل دادگستری'}
              </p>
            </div>
            <button
              onClick={onLogout}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              title={t('logout')}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuthModal}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 shadow-xs"
          >
            <UserIcon className="w-3.5 h-3.5" />
            <span>{t('login')}</span>
          </button>
        )}
      </div>
    </header>
  );
};
