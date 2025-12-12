import { useState } from 'react';
import { cn } from '@/lib/utils';
import { AccountingModule } from './AccountingModule';
import { BuyerCalculationModule } from '@/components/buyer-calculation/BuyerCalculationModule';
import { StoresRefModule } from './StoresRefModule';

type AccountingTab = 'accounting' | 'buyer-calculation' | 'profit-ref';

const tabs: { id: AccountingTab; label: string }[] = [
  { id: 'accounting', label: 'Бухгалтерія' },
  { id: 'buyer-calculation', label: 'Порахунок для Скупа' },
  { id: 'profit-ref', label: 'Профіт Реф' },
];

export function AccountingWorkspace() {
  const [activeTab, setActiveTab] = useState<AccountingTab>('accounting');

  const renderContent = () => {
    switch (activeTab) {
      case 'accounting':
        return <AccountingModule />;
      case 'buyer-calculation':
        return <BuyerCalculationModule />;
      case 'profit-ref':
        return <StoresRefModule />;
      default:
        return <AccountingModule />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Google Sheets-style tabs at bottom of header */}
      <div className="border-b border-border bg-card">
        <div className="flex items-end px-2 pt-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-t-md border border-b-0 transition-colors',
                'hover:bg-muted/50',
                activeTab === tab.id
                  ? 'bg-background border-border text-foreground -mb-px'
                  : 'bg-muted/30 border-transparent text-muted-foreground'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
}
