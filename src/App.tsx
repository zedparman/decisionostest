import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { CaseListView } from './components/CaseListView';
import { CaseDetailView } from './components/CaseDetailView';
import { AIChatView } from './components/AIChatView';
import { DocumentCenterView } from './components/DocumentCenterView';
import { AuditLogsView } from './components/AuditLogsView';
import { PricingView } from './components/PricingView';
import { AboutView } from './components/AboutView';
import { NewCaseModal } from './components/NewCaseModal';
import { AuthModal } from './components/AuthModal';
import { CaseItem, DocumentItem, AuditLog, User } from './types';

function MainApp() {
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const [cases, setCases] = useState<CaseItem[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const [isNewCaseModalOpen, setIsNewCaseModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Fetch initial data from Express backend
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [casesRes, logsRes, userRes] = await Promise.all([
        fetch('/api/cases'),
        fetch('/api/audit-logs'),
        fetch('/api/auth/me')
      ]);

      if (casesRes.ok) {
        const fetchedCases: CaseItem[] = await casesRes.json();
        setCases(fetchedCases);

        // Also fetch documents for all cases
        const allDocs: DocumentItem[] = [];
        for (const c of fetchedCases) {
          const dRes = await fetch(`/api/cases/${c.id}/documents`);
          if (dRes.ok) {
            const docsList: DocumentItem[] = await dRes.json();
            allDocs.push(...docsList);
          }
        }
        setDocuments(allDocs);
      }

      if (logsRes.ok) setAuditLogs(await logsRes.json());
      if (userRes.ok) {
        const uData = await userRes.json();
        setUser(uData.user || null);
      }
    } catch (err) {
      console.error('Failed to connect to backend server:', err);
    }
  };

  const handleCreateCase = async (payload: any) => {
    try {
      const res = await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        await fetchInitialData();
        setActiveView('cases');
      }
    } catch (err) {
      alert('خطا در ایجاد پرونده جدید.');
    }
  };

  const handleDeleteCase = async (id: string) => {
    if (!confirm('آیا از حذف این پرونده اطمینان دارید؟')) return;

    try {
      const res = await fetch(`/api/cases/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchInitialData();
        if (selectedCaseId === id) {
          setSelectedCaseId(null);
          setActiveView('cases');
        }
      }
    } catch (err) {
      alert('خطا در حذف پرونده.');
    }
  };

  const handleDeleteDocument = async (docId: string) => {
    if (!confirm('آیا از حذف این سند اطمینان دارید؟')) return;

    try {
      const res = await fetch(`/api/documents/${docId}`, { method: 'DELETE' });
      if (res.ok) fetchInitialData();
    } catch (err) {
      alert('خطا در حذف سند.');
    }
  };

  const handleSelectCase = (id: string) => {
    setSelectedCaseId(id);
    setActiveView('case_detail');
  };

  const handleGoToChatWithCase = (caseId?: string) => {
    if (caseId) setSelectedCaseId(caseId);
    setActiveView('chat');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-vazirmatn antialiased selection:bg-amber-100 selection:text-amber-900">
      <Navbar
        user={user}
        onOpenNewCaseModal={() => setIsNewCaseModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={() => setUser(null)}
        onToggleSidebarMobile={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          caseCount={cases.length}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto max-w-7xl mx-auto w-full">
          {activeView === 'dashboard' && (
            <DashboardView
              cases={cases}
              documents={documents}
              onSelectCase={handleSelectCase}
              onOpenNewCaseModal={() => setIsNewCaseModalOpen(true)}
              onGoToChat={handleGoToChatWithCase}
            />
          )}

          {activeView === 'cases' && (
            <CaseListView
              cases={cases}
              onSelectCase={handleSelectCase}
              onDeleteCase={handleDeleteCase}
              onOpenNewCaseModal={() => setIsNewCaseModalOpen(true)}
            />
          )}

          {activeView === 'case_detail' && selectedCaseId && (
            <CaseDetailView
              caseId={selectedCaseId}
              onBack={() => setActiveView('cases')}
              onGoToChatWithCase={handleGoToChatWithCase}
            />
          )}

          {activeView === 'chat' && (
            <AIChatView
              cases={cases}
              selectedCaseId={selectedCaseId || undefined}
              onSelectCaseId={(id) => setSelectedCaseId(id)}
            />
          )}

          {activeView === 'documents' && (
            <DocumentCenterView
              documents={documents}
              cases={cases}
              onSelectCase={handleSelectCase}
              onDeleteDocument={handleDeleteDocument}
            />
          )}

          {activeView === 'audit' && <AuditLogsView logs={auditLogs} />}

          {activeView === 'pricing' && <PricingView />}

          {activeView === 'about' && <AboutView />}
        </main>
      </div>

      <NewCaseModal
        isOpen={isNewCaseModalOpen}
        onClose={() => setIsNewCaseModalOpen(false)}
        onSubmit={handleCreateCase}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(u) => setUser(u)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
