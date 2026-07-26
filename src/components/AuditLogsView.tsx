import React from 'react';
import { ShieldCheck, Lock, Activity, Eye } from 'lucide-react';
import { AuditLog } from '../types';

interface AuditLogsViewProps {
  logs: AuditLog[];
}

export const AuditLogsView: React.FC<AuditLogsViewProps> = ({ logs }) => {
  return (
    <div className="space-y-6 text-right font-vazirmatn">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-amber-600" />
            <span>لاگ‌های امنیتی و ثبت دسترسی‌ها (Audit Logs)</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            ثبت غیرقابل تغییر تمامی فعالیت‌های کاربران، دسترسی به پرونده‌ها و استعلام‌های هوش مصنوعی
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs font-bold text-slate-700">سامانه رمزنگاری فعال</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-900 text-white font-bold text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-3.5">زمان و تاریخ</th>
                <th className="p-3.5">کاربر مسئول</th>
                <th className="p-3.5">نوع فعالیت (Action)</th>
                <th className="p-3.5">هدف / پرونده</th>
                <th className="p-3.5">آدرس IP</th>
                <th className="p-3.5 text-center">وضعیت امنیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900">{log.timestamp}</td>
                  <td className="p-3.5 text-slate-700 font-semibold">{log.userEmail}</td>
                  <td className="p-3.5">
                    <span className="bg-slate-100 text-slate-900 font-bold px-2.5 py-0.5 rounded-md border border-slate-200 text-[11px]">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3.5 font-medium text-slate-800">{log.target}</td>
                  <td className="p-3.5 font-mono text-slate-500 text-[11px]">{log.ipAddress}</td>
                  <td className="p-3.5 text-center">
                    <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-md border border-emerald-200 text-[10px] inline-flex items-center gap-1">
                      <Lock className="w-3 h-3 text-emerald-600" />
                      مهر شده
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
