import { useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { AppLayout } from '@/components/layout/AppLayout';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { OrdersModule } from '@/components/orders/OrdersModule';
import { RefProcesModule } from '@/components/ref-proces/RefProcesModule';
import { RefInboxModule } from '@/components/ref-inbox/RefInboxModule';
import { DeliveryModule } from '@/components/delivery/DeliveryModule';
import { AccountingWorkspace } from '@/components/accounting/AccountingWorkspace';
import { DropAccountingModule } from '@/components/accounting/DropAccountingModule';
import { SkupTableModule } from '@/components/skup/SkupTableModule';
import { ProgrevCenterModule } from '@/components/progrev/ProgrevCenterModule';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'ref-proces':
        return <RefProcesModule />;
      case 'ref-inbox':
        return <RefInboxModule />;
      case 'accounting-admin':
        return <AccountingWorkspace />;
      case 'orders':
        return <OrdersModule />;
      case 'progrev-center':
        return <ProgrevCenterModule />;
      case 'accounting-worker':
        return <DropAccountingModule />;
      case 'skup-oleg':
      case 'skup-ivan':
      case 'skup-nazar':
        return <SkupTableModule />;
      default:
        return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    const titles: Record<string, string> = {
      'dashboard': 'Головна',
      'ref-proces': 'Ref Proces',
      'ref-inbox': 'Ref Inbox',
      'accounting-admin': 'Бухгалтерія',
      'orders': 'Замовлення',
      'progrev-center': 'Progrev Center',
      'accounting-worker': 'Бухгалтерія',
      'skup-oleg': 'Skup: Oleg',
      'skup-ivan': 'Skup: Ivan',
      'skup-nazar': 'Skup: Nazar',
    };
    return titles[currentPage] || 'CRM';
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AppLayout currentPage={getPageTitle()} onNavigate={setCurrentPage}>
        {renderPage()}
      </AppLayout>
    </ThemeProvider>
  );
};

export default Index;
