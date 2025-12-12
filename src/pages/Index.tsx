import { useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { AppLayout } from '@/components/layout/AppLayout';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { OrdersModule } from '@/components/orders/OrdersModule';
import { RefProcesModule } from '@/components/ref-proces/RefProcesModule';
import { DeliveryModule } from '@/components/delivery/DeliveryModule';
import { AccountingModule } from '@/components/accounting/AccountingModule';
import { DropAccountingModule } from '@/components/accounting/DropAccountingModule';
import { SkupTableModule } from '@/components/skup/SkupTableModule';
import { BuyerCalculationModule } from '@/components/buyer-calculation/BuyerCalculationModule';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'ref-proces':
        return <RefProcesModule />;
      case 'accounting-admin':
        return <AccountingModule />;
      case 'orders':
        return <OrdersModule />;
      case 'progrev-center':
        return <BuyerCalculationModule />;
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
