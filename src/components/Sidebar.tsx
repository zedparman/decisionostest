import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  LayoutDashboard,
  Gavel,
  Bot,
  FileText,
  ShieldCheck,
  CreditCard,
  Info,
  Sparkles,
  ChevronLeft,
  X
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  caseCount: number;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  caseCount,
  mobileOpen,
  onCloseMobile
}) => {
  const { t } = useLanguage();

  const menuItems = [
    {
      id: 'dashboard',
      label: t('dashboard'),
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'cases',
      label: t('cases'),
      icon: Gavel,
      badge: caseCount > 0 ? caseCount : null
    },
    {
      id: 'chat',
      label: t('aiAssistant'),
      icon: Bot,
      badge: 'هوش مصنوعی',
      isAi: true
    },
    {
      id: 'documents',
      label: t('documents'),
      icon: FileText,
      badge: null
    },
    {
      id: 'audit',
      label: t('auditLogs'),
      icon: ShieldCheck,
      badge: null
    },
    {
      id: 'pricing',
      label: t('pricing'),
      icon: CreditCard,
      badge: null
    },
    {
      id: 'about',
      label: t('aboutUs'),
      icon: Info,
      badge: null
    }
  ];

  const handleSelect = (id: string) => {
    setActiveView(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 right-0 z-50 lg:z-20 h-screen w-60 bg-slate-900 text-slate-300 flex flex-col justify-between transition-transform duration-300 ease-in-out border-l border-slate-700/80 no-print ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-800 lg:hidden">
            <span className="font-bold text-white text-sm">
              Decision<span className="text-blue-500">OS</span>
            </span>
            <button
              onClick={onCloseMobile}
              className="p-1 text-slate-400 hover:text-white rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Items */}
          <div className="p-3 space-y-1">
            <div className="px-3 pt-2 pb-1 text-[11px] font-bold tracking-tight text-slate-500 uppercase pr-1">
              منوی اصلی
            </div>

            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white font-medium'
                      : item.isAi
                      ? 'hover:bg-slate-800 text-slate-300 border border-blue-900/30'
                      : 'hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.isAi ? 'text-blue-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                        isActive
                          ? 'bg-blue-700 text-white'
                          : item.isAi
                          ? 'bg-blue-900/60 text-blue-300 border border-blue-700/40'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom AI Pro Widget & Footer */}
        <div className="p-3 border-t border-slate-800">
          <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700/80 relative overflow-hidden">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>پردازش هوشمند پرونده</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              تحلیل خودکار ادله اثبات دعوا، تشخیص ریسک ثبتی و استعلام مواد قانونی با AI.
            </p>
            <button
              onClick={() => handleSelect('chat')}
              className="mt-2.5 w-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold py-1.5 px-3 rounded-md flex items-center justify-center gap-1 transition-colors"
            >
              <span>شروع گفتگوی حقوقی</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-2 text-center text-[10px] text-slate-500 font-medium">
            DecisionOS Legal Suite © 2026
          </div>
        </div>
      </aside>
    </>
  );
};
